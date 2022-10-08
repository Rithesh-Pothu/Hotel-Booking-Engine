import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    InputLabel,
    Stack,
    TextField,
    Typography,
    useTheme,
    Paper
} from "@mui/material";
import React, { useState } from "react";
import { BootstrapInput } from "../../components/form/BootstrapInput";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateTravellerInfo } from "../../reducers/BookingInfoReducer";
import {
    setOpenBillingInfo,
    setOpenTravellerInfo,
} from "../../reducers/CheckoutFormOpenStateReducer";

// Define a type for the slice state
export interface TravellerInfoState {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export default function TravellerInfo() {
    const textBoxWidth: string = "25vw";

    const travellerInfo = useAppSelector(
        (state) => state?.bookingInfo.travellerInfo
    );
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const onSubmit = (data: any) => {
        dispatch(updateTravellerInfo(data));
        dispatch(setOpenTravellerInfo(false));
        dispatch(setOpenBillingInfo(true));
        console.log("TRAVELLER INFO FROM TRAVELLER.TSX", data);
    };

    const theme = useTheme()

    return (
        <Paper elevation={3} sx={{ p: 2, py: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="column" spacing={3} sx={{ ml: 2 }}>
                    <Typography color={theme.palette.primary.main} variant="h6" fontWeight="bold">
                        1. Traveller Info
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="baseline">
                        <FormControl variant="standard" sx={{ width: textBoxWidth }}>
                            <InputLabel shrink>First Name</InputLabel>
                            <BootstrapInput
                                {...register("firstName", {
                                    required: true,
                                    maxLength: 20,
                                    minLength: 3,
                                })}
                                defaultValue={travellerInfo.firstName}
                            />

                            {errors.firstName && errors.firstName.type === "required" && (
                                <FormHelperText error>First Name cannot be Empty!</FormHelperText>
                            )}
                            {errors.firstName && errors.firstName.type === "minLength" && (
                                <FormHelperText error>
                                    First Name size should be containing a minimum of 3 letters
                                </FormHelperText>
                            )}
                            {errors.firstName && errors.firstName.type === "maxLength" && (
                                <FormHelperText error>
                                    First Name size should be containing a maximum of 20 letters
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl variant="standard" sx={{ width: textBoxWidth }}>
                            <InputLabel shrink>Last Name</InputLabel>
                            <BootstrapInput defaultValue={travellerInfo.lastName} {...register("lastName", {
                                required: true,
                                maxLength: 20,
                                minLength: 3,
                            })} />
                            {errors.lastName && errors.lastName.type === "required" && (
                                <FormHelperText error>Last Name cannot be Empty!</FormHelperText>
                            )}
                            {errors.lastName && errors.lastName.type === "minLength" && (
                                <FormHelperText error>
                                    Last Name size should be containing a minimum of 3 letters
                                </FormHelperText>
                            )}
                            {errors.lastName && errors.lastName.type === "maxLength" && (
                                <FormHelperText error>
                                    Last Name size should be containing a maximum of 20 letters
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Stack>

                    <FormControl variant="standard" sx={{ width: textBoxWidth }}>
                        <InputLabel shrink>Phone</InputLabel>
                        <BootstrapInput
                            defaultValue={travellerInfo.phone}
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "/^+?[1-9][0-9]{7,14}$/",
                            }}
                            {...register("phone", {
                                required: true,
                                pattern: /^\+?[1-9][0-9]{7,14}$/,
                            })}
                        />
                        {errors.phone && errors.phone.type === "required" && (
                            <FormHelperText error>Phone Number cannot be Empty!</FormHelperText>
                        )}

                        {errors.phone && errors.phone.type == "pattern" && (
                            <FormHelperText error>
                                Please Enter a valid International Phone Number
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl variant="standard" sx={{ width: textBoxWidth }}>
                        <InputLabel shrink>Email</InputLabel>
                        <BootstrapInput
                            defaultValue={travellerInfo.email}
                            {...register("email", {
                                required: true,
                                pattern:
                                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })}
                        />
                        {errors.email && errors.email.type === "required" && (
                            <FormHelperText error>Email cannot be Empty!</FormHelperText>
                        )}
                        {errors.email && errors.email.type === "pattern" && (
                            <FormHelperText error>
                                Please enter a valid Email!
                            </FormHelperText>
                        )}
                    </FormControl>
                </Stack>
                <Button
                    variant="contained"
                    sx={{ mt: 2, float: "right", marginTop: -1 }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Next: Billing Info
                </Button>
                {/* <Divider style={{ width: "100%", marginTop: "30px" }} /> */}
            </form>
        </Paper>
    );
};

