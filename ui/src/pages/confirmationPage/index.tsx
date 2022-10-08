import {
    Backdrop,
    CircularProgress,
    Stack,
    Typography,
    Button,
    useTheme,
    Alert,
    Snackbar
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import AccordionComponent from "./AccordionComponent";
import Header from "./Header";
import RoomInfoCard from "./RoomInfoCard";
import RoomSummaryAcc from "./RoomSummaryAcc";
import ReactToPrint from 'react-to-print';
import { format } from "date-fns";

const ConfirmationPage = () => {
    const theme = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();


    const [loading, setLoading] = useState<boolean>(true)
    const [travellerInfo, setTravellerInfo] = useState<any>();
    const [billingInfo, setBillingInfo] = useState<any>();
    const [paymentInfo, setPaymentInfo] = useState<any>();
    const [createBookingProps, setCreateBookingProps] = useState<any>();
    const [promotion, setPromotion] = useState<any>()
    const [roomSummary, setRoomSummary] = useState<any>()

    const bookingId = searchParams.get("bookingId");
    console.log(bookingId);
    const getBookingInformation = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}confirmation?bookingId=${searchParams.get("bookingId")}`).then((response) => {
            setTravellerInfo(response.data?.travellerInfo);
            setBillingInfo(response.data?.billingInfo);
            setPaymentInfo(response.data?.paymentInfo);
            setCreateBookingProps(response.data?.createBookingProps)
            setPromotion(response.data?.promotionDTO)
            setRoomSummary(response.data?.roomSummaryDTO)
            console.log("BOOKING INFO OF CONFIRMATION PAGE ", response.data);
        })
        setLoading(false);
    };

    useEffect(() => {
        getBookingInformation();
    }, []);

    const [open, setOpen] = useState(false);
    
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    const reference = useRef();
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
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Mail sent!
                </Alert>
            </Snackbar>
            <Stack ref={reference} sx={{ my: "10vh", ml: "10vw" }} direction="column" width="80vw">
                <Stack direction="row" width="80vw">
                    <Typography color={theme.palette.primary.main} sx={{ flexGrow: 1, fontWeight: "bold" }} variant="h5">Upcoming Reservation</Typography>
                    <ReactToPrint 
                        trigger={() => <Button>Print</Button>}
                        content={() => reference.current!}/>
                    <Button onClick={()=> {
                        setOpen(true);
                        const getDate = (date: string) => {
                            const dateSplit = date.substring(0,10).split("-").map((d) => parseInt(d))
                            const result = format(new Date(dateSplit[0], dateSplit[1], dateSplit[2]), 'eeee, MMM dd, yyyy')
                            return result;
                        }
                        console.log(roomSummary)
                        const mailDetails = 
                        {
                            subject:"Booking Details",
                            recipient: billingInfo?.email,
                            checkInDate: getDate(createBookingProps?.check_in_date),
                            checkOutDate: getDate(createBookingProps?.check_out_date),
                            price: roomSummary?.perNightTotal,
                            roomType: createBookingProps?.room_type,
                            subTotal: roomSummary?.subtotal,
                            tax: roomSummary?.taxesSurchargesFees,
                            totalAfterTax: roomSummary?.totalForStay,
                            bookingDetails: `${process.env.REACT_APP_URL}confirmation?bookingId=${searchParams.get("bookingId")}`
                        }
                        axios.post(`${process.env.REACT_APP_BACKEND_URL}email/send/roomdetails`, mailDetails).then((response) => {setOpen(true)})
                    }}>Email</Button>
                </Stack>
                <RoomInfoCard bookingId={bookingId} receipient={billingInfo?.email} promotion={promotion} createBookingProps={createBookingProps} perNightTotal={roomSummary?.perNightTotal} />
                <Stack sx={{ mt: 2 }}>
                    <RoomSummaryAcc summary="Room Total Summary" details={roomSummary} />
                    <AccordionComponent summary="Guest Information" details={travellerInfo} />
                    <AccordionComponent summary="Billing Address" details={billingInfo} />
                    <AccordionComponent summary="Payment Information" details={paymentInfo} />
                </Stack>
            </Stack>
        </>
    );
};

export default ConfirmationPage;
