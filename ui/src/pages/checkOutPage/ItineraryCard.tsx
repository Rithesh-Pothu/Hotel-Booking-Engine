import { Grid, Modal, Typography, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { format } from "date-fns";
import {
    generatePath,
    Navigate,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    ROOM_SEARCH_RESULTS,
    CHECKOUT_PAGE,
    DEV_URL,
    PROD_URL, ROOM_SEARCH,
} from "../../links";
import { setItineraryVisibility } from "../../reducers/ItineraryVisibilityReducer";
import DueInfo from "./itinerary/DueInfo";
import FeeTax from "./itinerary/FeeTax";

const style = {
    position: "absolute" as "absolute",
    top: "20vh",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    border: "none",
    padding: 5
};

export default function ItineraryCard() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [promoInfoOpen, setpromoInfoOpen] = useState(false);
    const promoCodeInfoOpen = () => setpromoInfoOpen(true);
    const promoCodeInfoClose = () => setpromoInfoOpen(false);
    const [rateInfoOpen, setrateInfoOpen] = useState(false);
    const rateBreakDownInfoOpen = () => setrateInfoOpen(true);
    const rateBreakDownInfoClose = () => setrateInfoOpen(false);
    const preventDefault = (event: React.SyntheticEvent) =>
        event.preventDefault();
    const removeItineraryCard = () =>
        dispatch(setItineraryVisibility({ value: false }));

    const guests = useAppSelector((state) => state.guests);
    const dates = useAppSelector((state) => state.daterange[0]);
    const rooms = useAppSelector((state) => state.rooms.value);
    const promotion = useAppSelector((state) => state.promotion);
    const propertyName = useAppSelector((state) => state.propertyName.value);
    const selectedPlan = useAppSelector((state) => state.selectedRatePlan);
    const startDate = format(dates.startDate, "MMM dd");
    const endDate = format(dates.endDate, "MMM dd, yyyy");
    const itineraryVisibility = useAppSelector(
        (state) => state.itineraryVisibility.value
    );

    const dateValues: string[][] = Object.entries(selectedPlan.ratesInRange);
    const getDate = (date: string) => {
        const dateSplit = date.split("-").map((d) => parseInt(d));
        const result = format(
            new Date(dateSplit[2], dateSplit[1], dateSplit[0]),
            "eeee, MMM dd, yyyy"
        );
        return result;
    };

    const location = useLocation();
    const navigateTo = useNavigate();

    const useNavigateParams = () => {
        const navigate = useNavigate();
        return (url: string, params: string) => {
            const path = `${url}?${params}`;
            navigate(path);
        };
    };

    let url;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        url = new URL(DEV_URL);
    } else {
        url = new URL(PROD_URL);
    }

    const params = new URLSearchParams(url.search);
    const addSearchParms = () => {
        params.append("from", ROOM_SEARCH);
    }


    const navigate = useNavigateParams();

    const navigateHandler = async () => {
        await addSearchParms();
        const searchParamString = params.toString();
        navigate("../" + CHECKOUT_PAGE, searchParamString);
    };

    return (
        <>
            {itineraryVisibility && (
                <Box
                    sx={{
                        color: theme.palette.secondary.dark,
                        backgroundColor: theme.palette.secondary.light,
                        p: 3,
                        // mt: 6,
                        // py: 7
                    }}
                    onClick={preventDefault}
                >
                    <Grid container justifyContent="space-between">
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            mt={1}
                            mb={1}
                            color="black"
                        >
                            Your Trip Itinerary
                        </Typography>
                        <Link
                            component="button"
                            underline="hover"
                            onClick={() => dispatch(setItineraryVisibility({ value: false }))}
                        >
                            Remove
                        </Link>
                    </Grid>

                    <Box mt={1}>
                        <Typography mb={0.3} fontWeight="bold" color="black">
                            {propertyName}
                        </Typography>
                        <Typography>
                            {startDate} - {endDate} | {guests.adultsCount} adult{" "}
                            {guests.teensCount > 0 ? guests.teensCount + "teen" : ""}{" "}
                            {guests.kidsCount > 0 ? guests.kidsCount + "child" : ""}
                        </Typography>
                        <Typography>{selectedPlan?.roomType}</Typography>
                        <Typography>${selectedPlan?.price}/night</Typography>
                        <Typography>{rooms} rooms</Typography>
                        <Typography>
                            {promotion.title}, ${promotion.discountedPrice}/night
                            <InfoOutlinedIcon
                                onClick={promoCodeInfoOpen}
                                sx={{ color: "#858685", fontSize: 13 }}
                            />
                        </Typography>
                    </Box>
                    <Typography
                        display="block"
                        sx={{
                            border: `1px solid ${theme.palette.secondary.dark}`,
                            mb: 1.5,
                            mt: 1.5,
                        }}
                    />
                    <Box>
                        <Grid container justifyContent="space-between">
                            <Typography>Sub Total</Typography>
                            <Typography color="black">
                                ${selectedPlan.totalBeforeTax}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent="space-between">
                            <Typography>
                                Taxes, Surcharges, Fees
                                <InfoOutlinedIcon
                                    onClick={rateBreakDownInfoOpen}
                                    sx={{ color: "#858685", fontSize: 13 }}
                                />
                            </Typography>
                            <Typography color="black">${selectedPlan.totalTax}</Typography>
                        </Grid>
                        <Grid container justifyContent="space-between">
                            <Typography>VAT</Typography>
                            <Typography color="black">${selectedPlan.vat}</Typography>
                        </Grid>
                    </Box>
                    <Typography
                        display="block"
                        sx={{
                            border: `1px solid ${theme.palette.secondary.dark}`,
                            mb: 1.5,
                            mt: 1.5,
                        }}
                    />
                    <DueInfo selectedPlan={selectedPlan} />
                    <Grid container justifyContent="center" mt={2}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                location.pathname === CHECKOUT_PAGE
                                    ? navigateTo(ROOM_SEARCH_RESULTS)
                                    : navigateHandler();
                            }}
                        >
                            {location.pathname === CHECKOUT_PAGE
                                ? "Continue Shopping"
                                : "Checkout"}
                        </Button>
                    </Grid>
                </Box>
            )}
            <Modal
                open={promoInfoOpen}
                onClose={promoCodeInfoClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: "scroll", border: "none" }}
            >
                <Box sx={style}>
                    <Grid container justifyContent="flex-end">
                        <CloseIcon sx={{ fontSize: 35 }} onClick={promoCodeInfoClose} />
                    </Grid>
                    <Box sx={{ border: "none" }}>
                        <Typography variant="h6" mb={1.5} color="black">
                            {promotion.title}
                        </Typography>
                        <Typography width={250}>{promotion.description}</Typography>
                        <Grid container justifyContent="space-between" mt={1}>
                            <Typography>Package Total</Typography>
                            <Typography color="black">
                                ${promotion.discountedPrice}
                            </Typography>
                        </Grid>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={rateInfoOpen}
                onClose={rateBreakDownInfoClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: "scroll", border: "none", top: 75 }}
            >
                <Box sx={style}>
                    <Grid container justifyContent="flex-end">
                        <CloseIcon
                            sx={{ fontSize: 30, mt: 30 }}
                            onClick={rateBreakDownInfoClose}
                        />
                    </Grid>
                    <Box border="none">
                        <Typography variant="h5" mb={3} color="black">
                            Rate BreakDown
                        </Typography>
                        <Typography variant="h6" mb={1}>
                            Room Type
                        </Typography>
                        <Typography variant="h6" mb={0.2}>
                            Nightly Rate (Per Room)
                        </Typography>

                        <Box ml={1}>
                            <Typography variant="h6">Circus Savings Promotion</Typography>
                            {dateValues.map((item) => (
                                <Grid container justifyContent="space-between">
                                    <Typography>{getDate(item[0])}</Typography>
                                    <Typography color="black">${item[1]}</Typography>
                                </Grid>
                            ))}
                        </Box>

                        <Grid container justifyContent="space-between">
                            <Typography variant="h6">Room Total</Typography>
                            <Typography color="black">
                                ${selectedPlan.totalBeforeTax}
                            </Typography>
                        </Grid>
                        <Typography
                            display="block"
                            sx={{
                                border: `1px solid ${theme.palette.secondary.dark}`,
                                mb: 1.5,
                                mt: 1.5,
                            }}
                        />
                        <FeeTax selectedPlan={selectedPlan} />
                        <Typography
                            display="block"
                            sx={{
                                border: `1px solid ${theme.palette.secondary.dark}`,
                                mb: 1.5,
                                mt: 1.5,
                            }}
                        />
                        <DueInfo selectedPlan={selectedPlan} />
                    </Box>
                </Box>
            </Modal>
        </>
    );
}