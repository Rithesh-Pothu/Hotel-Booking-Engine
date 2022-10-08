import { BookOnline } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import AccordionComponent from "../confirmationPage/AccordionComponent";
import Header from "./Header";

const BookingsComponent = () => {
    const email = useAppSelector((state) => state.email);
    const [bookingInfo, setBookingInfo] = useState<any[]>([]);
    const [travellerInfo, setTravellerInfo] = useState<any>();
    const [billingInfo, setBillingInfo] = useState<any>();
    const [paymentInfo, setPaymentInfo] = useState<any>();

    useEffect(() => {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}checkoutpage/bookings`,
            data: email,
        }).then((response) => {
            console.log(response.data.data);
            setBookingInfo(response.data?.data);
        });
    }, [email]);

    const theme = useTheme()

    return (
        <Stack >
            <Typography textAlign="center" variant="h6" color={theme.palette.primary.main}>Bookings for Email: {email.email}</Typography>

            <Stack >
                {bookingInfo?.map((booking: any, index: number) => {
                    return (
                        <Stack key={index} direction="column" width="80vw" sx={{ my: 3 }}>
                            <Header bookingId={booking?.bookingId} />
                            {/* <Typography>{booking?.bookingId}</Typography> */}
                            <Stack sx={{ mt: 2 }}>
                                <AccordionComponent
                                    summary="Guest Information"
                                    details={booking?.travellerInfo}
                                />
                                <AccordionComponent
                                    summary="Billing Address"
                                    details={booking?.billingInfo}
                                />
                                <AccordionComponent
                                    summary="Payment Information"
                                    details={booking?.paymentInfo}
                                />
                            </Stack>
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
};

export default BookingsComponent;
