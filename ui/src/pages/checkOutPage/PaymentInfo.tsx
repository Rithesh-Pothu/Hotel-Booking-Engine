import {
    Backdrop,
    Button,
    Checkbox, CircularProgress, FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText, InputLabel,
    Paper,
    Snackbar,
    Stack, Typography,
    useTheme
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BootstrapInput } from "../../components/form/BootstrapInput";
import { updatePaymentInfo } from "../../reducers/BookingInfoReducer";
import {
    setOpenBillingInfo,
    setOpenPaymentInfo
} from "../../reducers/CheckoutFormOpenStateReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { CreateBookingProps, updateCreateBookingProps } from "../../reducers/BookingInfoReducer";
import { store } from "../../redux/store";
import axios from "axios";
import { generatePath, useNavigate } from "react-router-dom";
import { CONFIRMATION_PAGE, DEV_URL, PROD_URL } from "../../links";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PaymentInfo = () => {
    const textBoxWidth: string = "25vw";
    const oneThirdTextBoxWidth: string = "11.5vw";
    const currency = useAppSelector((state) => state.currency.value);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const [open, setOpen] = useState(false);
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const paymentInfo = useAppSelector((state) => state.bookingInfo?.paymentInfo);
    // const travellerInfo = useAppSelector((state) => state.bookingInfo.travellerInfo)
    // const billingInfo = useAppSelector((state) => state.bookingInfo.billingInfo)

    const adultsCount = useAppSelector((state) => state.guests.adultsCount)
    const kidsCount = useAppSelector((state) => state.guests.kidsCount)
    const check_in_date = useAppSelector((state) => state.daterange[0]?.startDate).toISOString()
    const check_out_date = useAppSelector((state) => state.daterange[0]?.endDate).toISOString()
    // const promotion_id = useAppSelector((state) => state);
    const propertyName = useAppSelector((state) => state.propertyName.value)
    const property_id = parseInt(propertyName.split(" ")[1])
    const rooms = useAppSelector((state) => state.rooms.value)
    const room_type_id = useAppSelector((state) => state.rooms.room_type_id)
    const room_type = useAppSelector((state) => state.rooms.room_type)
    const selectedPlan = useAppSelector((state) => state.selectedRatePlan);
    const promotion = useAppSelector((state) => state.promotion);


    const bookingInfo = useAppSelector((state) => state.bookingInfo)
    console.log('PAYMENT INFO', bookingInfo)


    const url = (!process.env.NODE_ENV || process.env.NODE_ENV === "development") ? new URL(DEV_URL) : new URL(PROD_URL)



    const params = new URLSearchParams(url.search);

    const navigate = useNavigate()

    const saveToDatabase = async () => {
        try {
            const bookingInfo = store.getState().bookingInfo;
            console.log('BOOKING INFO IN REDUX', bookingInfo)
            const response = await axios({
                method: "post",
                url: `${process.env.REACT_APP_BACKEND_URL}checkoutpage/`,
                data: bookingInfo,
            });

            console.log('RESPONSE FROM BACKEND', response.data);
            console.log("RESPONSE.DATA.DATA", response.data.data)
            console.log("RESPONSE.DATA.DATA.BOOKINGID", response.data.data?.booking_id)
            // setBookingId(response.data.data?.booking_id)
            params.append("bookingId", String(response.data.data?.booking_id));

            // console.log("COMPLETED FORM IN REDUX", bookingInfo);

        } catch (err) {
            console.error(err);
        }
    };

    const onSubmit = async (data: any) => {
        setLoading(true);
        dispatch(updatePaymentInfo(data))
        // const bookingInfo = { travellerInfo, billingInfo, paymentInfo }
        const createBookingProps: CreateBookingProps = {
            amount_due_at_resort: selectedPlan.amountDueAtProperty,
            adult_count: adultsCount,
            check_in_date: check_in_date,
            check_out_date: check_out_date,
            child_count: kidsCount,
            promotion_id: promotion.promotionId,
            property_id: property_id,
            status_id: 1,
            total_cost: selectedPlan.totalAfterTax,
            rooms: rooms,
            room_type_id: room_type_id,
            room_type: room_type
        }
        dispatch(updateCreateBookingProps(createBookingProps))
        await saveToDatabase()
        const searchParamString = params.toString();
        // console.log(params.toString())
        // navigate("/confirmation", searchParamString);
        navigate({
            pathname: CONFIRMATION_PAGE,
            search: `?${searchParamString}`,
        });
        setOpen(true)
        setLoading(false);
    };

    const handleClick = () => {
        dispatch(setOpenPaymentInfo(false));
        dispatch(setOpenBillingInfo(true));
    };
    const [loading, setLoading] = useState<boolean>(false);

    const theme = useTheme()
    return (
        <><Backdrop
            sx={{
                color: "common.white",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loading}
        >
            <CircularProgress color="inherit" disableShrink />
        </Backdrop>
            <Paper elevation={3} sx={{ p: 2, py: 4, mb: 4 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction="column" spacing={3} sx={{ ml: 2 }}>
                        <Typography color={theme.palette.primary.main} variant="h6" fontWeight="bold">
                            3. Payment Info
                        </Typography>
                        <Stack direction="row" spacing={3} alignItems="flex-start">
                            <FormControl variant="standard" sx={{ width: textBoxWidth }}>
                                <InputLabel shrink>Card Number</InputLabel>
                                <BootstrapInput
                                    data-sl="mask"
                                    defaultValue={paymentInfo.cardNumber}
                                    {...register("cardNumber", { required: true })}
                                />
                                {errors.cardNumber && errors.cardNumber.type === "required" && (
                                    <FormHelperText error>
                                        Card Number field cannot be empty!
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{ width: oneThirdTextBoxWidth }}
                            >
                                <InputLabel shrink>Exp MM</InputLabel>
                                <BootstrapInput
                                    defaultValue={paymentInfo.expiryMonth}
                                    {...register("expiryMonth", { required: true })}
                                />

                                {errors.expiryMonth && errors.expiryMonth.type === "required" && (
                                    <FormHelperText error>
                                        Expiry Month field cannot be empty!
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{ width: oneThirdTextBoxWidth }}
                            >
                                <InputLabel shrink>Exp YY</InputLabel>
                                <BootstrapInput
                                    defaultValue={paymentInfo.expiryYear}
                                    {...register("expiryYear", {
                                        required: true,
                                    })}
                                />
                                {errors.expiryYear && errors.expiryYear.type === "required" && (
                                    <FormHelperText error>
                                        Expiry Year field cannot be empty!
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                        <FormControl variant="standard" sx={{ width: oneThirdTextBoxWidth }}>
                            <InputLabel shrink>CVV Code</InputLabel>
                            <BootstrapInput
                                data-sl="mask"
                                inputProps={{
                                    maxLength: 3,
                                }}
                                defaultValue={paymentInfo.cvvCode}
                                {...register("cvvCode", { required: true, maxLength: 3 })}
                            />
                            {errors.cvvCode && errors.cvvCode.type === "required" && (
                                <FormHelperText error>
                                    CVV Code field cannot be empty!
                                </FormHelperText>
                            )}
                            {errors.cvvCode && errors.cvvCode.type === "maxLength" && (
                                <FormHelperText error>
                                    CVV cannot be more than 3 letters!
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Send me special offers"
                                {...register("canSendSpecialOffers")}
                            />
                            <Stack direction="row" sx={{ mb: 2 }}>
                                <FormControl required sx={{ flexGrow: 1 }}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="I agree to the Terms and Policies of travel"
                                        value={true}
                                        {...register("isAgreeingTermsAndConditions", {
                                            required: true,
                                        })}
                                    />
                                    {errors.isAgreeingTermsAndConditions && (
                                        <FormHelperText sx={{ ml: 3.5, mt: -1 }} error>
                                            This Field is Mandatory!
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <Typography variant="h6" sx={{ mr: 1 }}>
                                    Total Due:
                                </Typography>
                                <Typography sx={{ mr: 2 }} variant="h6">
                                    {currency === "USD" ? '$' + selectedPlan.totalAfterTax : '₹' + (selectedPlan.totalAfterTax * 79.5)}
                                </Typography>
                            </Stack>
                        </FormGroup>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        sx={{ mt: 2 }}
                    >
                        <Button
                            variant="outlined"
                            sx={{ marginTop: -1 }}
                            onClick={handleClick}
                        >
                            Edit Billing Info
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ ml: 2, marginTop: -1, px: 6 }}
                            onClick={handleSubmit(onSubmit)}
                            disableElevation
                        >
                            Purchase
                        </Button>
                    </Stack>
                </form>

                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                        Form Submitted Successfully!
                    </Alert>
                </Snackbar>
            </Paper>
        </>
    );
};

export default PaymentInfo;
