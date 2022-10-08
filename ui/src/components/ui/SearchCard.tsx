import { Backdrop, Box, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { CombinedState } from "@reduxjs/toolkit";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import {
    COMPONENTS_CONFIGURATION_URL,
    DEV_URL,
    PROD_URL,
    ROOM_SEARCH_RESULTS,
} from "../../links";
import { useAppSelector } from "../../redux/hooks";
import Calender from "../dateRangeCalender/Calender";
import CheckboxLabels from "../form/AccessibleCheckbox";
import BootstrapInput from "../form/BootstrapInput";
import GuestSelect from "../form/GuestSelect";
import AutoComplete from "../form/PropertyField";
import BasicSelect from "../form/RoomsSelect";
import Button from "./CustomButton";
import ReactGA from "react-ga4"

var sectionStyle = {
    width: 500,
    marginLeft: 150,
    marginTop: 50,
};



const handleSubmit = () => {
    return true;
};

export default function OutlinedCard(props: any) {
    const [loading, setLoading] = useState(true);
    const [accessibility_checkbox, setaccessibilityCheckboxVisibility] =
        useState(false);
    const [guests_visibility, setGuestsVisibility] = useState(false);
    const [promo_code_visibility, setPromoCodeVisibility] = useState(false);
    const [property_name_visibility, setPropertyNameVisibility] = useState(false);
    const [rooms_visibility, setRoomsVisibility] = useState(false);
    const [search_visibility, setSearchVisibility] = useState(false);
    const [date_range_visibility, setDateRangeVisibility] = useState(false);

    const checked = useAppSelector((state) => state.isAccessible.value);
    const beds = useAppSelector((state) => state.beds.value);
    const adults = useAppSelector((state) => state.guests.adultsCount);
    const teens = useAppSelector((state) => state.guests.teensCount);
    const kids = useAppSelector((state) => state.guests.kidsCount);
    const property_name = useAppSelector((state) => state.propertyName.value);
    const promo_code_value = useAppSelector((state) => state.promoCode.value);
    const rooms = useAppSelector((state) => state.rooms.value);
    const guests = useAppSelector((state) => state.guests);
    const range = useAppSelector((state) => state.daterange);

    const handleClose = () => {
        setLoading(false);
    };


    // const useNavigateParams = () => {
    //     const navigate = useNavigate();
    //     return (url: string, params: string) => {
    //         const path = generatePath(":queryString", {
    //             // url,
    //             queryString: params,
    //         });
    //         navigate(path);
    //     };
    // };

    const url = (!process.env.NODE_ENV || process.env.NODE_ENV === "development") ? new URL(DEV_URL) : new URL(PROD_URL)


    const params = new URLSearchParams(url.search);
    const addSearchParms = () => {
        params.append("propertyId", property_name.toString().split(" ")[1]);
        params.append("adultCount", adults.toString());
        params.append("teensCount", teens.toString());
        params.append("kidsCount", kids.toString());
        params.append("promoCode", promo_code_value.toString());
        params.append("rooms", rooms.toString());
        params.append("accessibleRoom", checked.toString());
        params.append("checkInDate", format(range[0].startDate, "dd-MM-Y"));
        params.append("checkOutDate", format(range[0].endDate, "dd-MM-Y"));
    };

    const navigate = useNavigate();
    // const [searchParams, setSearchParams] = useSearchParams();

    const navigateHandler = async (e: any) => {
        e.preventDefault();
        await addSearchParms();
        const searchParamString = params.toString();
        // console.log(params.toString())
        // navigate(ROOM_SEARCH_RESULTS, searchParamString);
        navigate({
            pathname: ROOM_SEARCH_RESULTS,
            search: `?${searchParamString}`,
        });
    };

    const getComponentData = async () => {
        await axios
            .get(COMPONENTS_CONFIGURATION_URL)
            .then((response) => {
                const { data } = response.data;
                console.log(data)
                var i = 0,
                    len = data.length;
                while (i < len) {
                    const { id, visible } = data[i];
                    switch (id) {
                        case "accessible_checkbox_id":
                            setaccessibilityCheckboxVisibility(visible);
                            break;
                        case "guests_visibility_id":
                            setGuestsVisibility(visible);
                            break;
                        case "promo_code_id":
                            setPromoCodeVisibility(visible);
                            break;
                        case "property_name_visibility_id":
                            setPropertyNameVisibility(visible);
                            break;
                        case "rooms_visibility_id":
                            setRoomsVisibility(visible);
                            break;
                        case "search_visibility_id":
                            setSearchVisibility(visible);
                            break;
                        case "date_range_visibility_id":
                            setDateRangeVisibility(visible);
                            break;
                    }
                    i++;
                }
                setLoading(false);
            })
            .catch((e) => console.error(e));
    };

    useEffect(() => {
        getComponentData();
    }, []);

    return loading ? (

        <Backdrop
            sx={{ color: 'common.white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" disableShrink />
        </Backdrop >
    ) : (
        <Card variant="outlined" style={sectionStyle}>
            <CardContent sx={{ my: 3, mx: 4 }}>
                {property_name_visibility && <AutoComplete />}

                {date_range_visibility && <Calender />}

                <Grid container direction="row" spacing={1}>
                    {guests_visibility && (
                        <Grid item md={9} sm={12}>
                            <GuestSelect />
                        </Grid>
                    )}
                    {rooms_visibility && (
                        <Grid item md={3} sm={12}>
                            <BasicSelect label="Rooms" />
                        </Grid>
                    )}
                </Grid>
                {accessibility_checkbox && (
                    <CheckboxLabels label="I need an Accessible Room" />
                )}

                {promo_code_visibility && (
                    <BootstrapInput label="Promo code or Special rate" />
                )}

                {search_visibility && (
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Grid onClick={(e) => {
                            navigateHandler(e);
                            ReactGA.event({
                                category: "Button",
                                action: "Click",
                                label: "Search",
                              })
                            }} item>
                            <Button buttonText="Search" />
                        </Grid>
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
}
