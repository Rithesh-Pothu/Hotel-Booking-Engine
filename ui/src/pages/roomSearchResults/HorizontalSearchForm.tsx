import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import Calender from "../../components/dateRangeCalender/Calender";
import AccessibleCheckbox from "../../components/form/AccessibleCheckbox";
import BedsSelect from "../../components/form/BedsSelect";
import GuestSelect from "../../components/form/GuestSelect";
import RoomsSelect from "../../components/form/RoomsSelect";
import CustomButton from "../../components/ui/CustomButton";
import {
    BACKEND_ROOT,
    DEV_URL,
    PROD_URL,
    ROOM_DETAILS,
    ROOM_SEARCH_RESULTS,
} from "../../links";
import { addCheckOutDetails } from "../../reducers/CheckOutDetailsReducer";
import { FeeTax } from "../../reducers/RoomDetailsReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ItineraryCard from "../checkOutPage/ItineraryCard";
import Filters from "./Filters";
import PaginatedItems from "./PaginatedItems";

const HorizontalSearchForm = () => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);
    const checked = useAppSelector((state) => state.isAccessible.value);
    const beds = useAppSelector((state) => state.beds.value);
    const adults = useAppSelector((state) => state.guests.adultsCount);
    const teens = useAppSelector((state) => state.guests.teensCount);
    const kids = useAppSelector((state) => state.guests.kidsCount);
    const property_name = useAppSelector((state) => state.propertyName.value);
    const property_id = property_name.split(" ")[1];
    const promo_code_value = useAppSelector((state) => state.promoCode.value);
    const rooms = useAppSelector((state) => state.rooms.value);
    const guests = useAppSelector((state) => state.guests);
    const range = useAppSelector((state) => state.daterange);
    const itineraryVisibility = useAppSelector(
        (state) => state.itineraryVisibility.value
    );
    const [roomDetails, setRoomDetails] = useState<never[]>([]);

    const handleClose = () => {
        setLoading(false);
    };

    // const useNavigateParams = () => {
    //     const navigate = useNavigate();
    //     return (url: string, params: string) => {
    //         const path = generatePath(":url?:queryString", {
    //             url,
    //             queryString: params,
    //         });
    //         navigate(path);
    //     };
    // };

    const url =
        !process.env.NODE_ENV || process.env.NODE_ENV === "development"
            ? new URL(DEV_URL)
            : new URL(PROD_URL);

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
    const [rates, setRates] = useState<FeeTax>({
        fees: [],
        taxes: [],
        vat: 0,
        lengthOfStay: 0,
    });

    const fetcher = async () => {
        const startDate = format(range[0].startDate, "dd-MM-Y");
        const endDate = format(range[0].endDate, "dd-MM-Y");
        await axios
            .get(
                `${ROOM_DETAILS}propertyId=${property_id}&adultCount=${adults}&teensCount=${teens}&kidsCount=${kids}&promoCode=${promo_code_value}&rooms=${rooms}&accessibleRoom=${checked}&checkInDate=${startDate}&checkOutDate=${endDate}`
            )
            .then((response) => {
                const { data, rates, lengthOfStay } = response.data;
                console.log("DATA", data);
                console.log({ ...rates, lengthOfStay });
                setRates({ ...rates, lengthOfStay });
                setRoomDetails(data);
            });

        setLoading(false);
    };

    const navigate = useNavigate();
    // const [searchParams, setSearchParams] = useSearchParams();

    const navigateHandler = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        await addSearchParms();
        const searchParamString = params.toString();
        // console.log(params.toString())
        // navigate(ROOM_SEARCH_RESULTS, searchParamString);
        navigate({
            pathname: ROOM_SEARCH_RESULTS,
            search: `?${searchParamString}`,
        });
        fetcher();
    };

    const fetch = async () => {
        const response = await axios.get(`${BACKEND_ROOT}checkoutpage/details`);
        const { data } = await response.data;
        dispatch(addCheckOutDetails(data));
        console.log(data);
    };
    useEffect(() => {
        fetch();
    }, []);

    return (
        <>
            <Backdrop
                sx={{
                    color: "common.white",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
            >
                <CircularProgress color="inherit" disableShrink />
            </Backdrop>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item md={3} sx={{ ml: 1 }}>
                    <GuestSelect />
                </Grid>
                <Grid item md={1}>
                    <RoomsSelect label="Rooms" />
                </Grid>
                <Grid item md={1}>
                    <BedsSelect label="Beds" />
                </Grid>
                <Grid item md={3}>
                    <Calender label="Check in Between -> Check Out Between" />
                </Grid>
                <Grid item sx={{ mt: 4 }}>
                    <AccessibleCheckbox />
                </Grid>
                <Grid item md={2} sx={{ ml: 4, mt: 2 }}>
                    <CustomButton
                        handleSubmit={navigateHandler}
                        buttonText="Search Dates"
                    />
                </Grid>
            </Grid>
            <Typography sx={{ ml: 14, mt: 3 }} variant="h5" color="black">
                Property Results
            </Typography>

            <Grid mb={20} container columns={24}>
                <Grid item xs={1} />
                {/* <Grid item xs={5} sx={{ ml: 4.5, mt: 6.5 }}>
                    <Filters />
                </Grid> */}
                {!itineraryVisibility ? (

                    <Grid item xs={20}>
                        <PaginatedItems
                            rates={rates}
                            itemsPerPage={4}
                            fetcher={fetcher}
                            roomDetails={roomDetails}
                        />
                    </Grid>)
                    : (
                        <>
                            <Grid item xs={10}>

                                <PaginatedItems
                                    rates={rates}
                                    itemsPerPage={3}
                                    fetcher={fetcher}
                                    roomDetails={roomDetails}
                                />
                            </Grid>
                        </>
                    )}
                {itineraryVisibility ? <Grid item sx={{ mr: 2, mt: 6.5 }} xs={itineraryVisibility ? 5 : 0}>
                    <ItineraryCard />

                </Grid> : ""}

            </Grid>
        </>
    );
};

export default HorizontalSearchForm;
