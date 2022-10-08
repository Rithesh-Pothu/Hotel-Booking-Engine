import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    InputLabel,
    Paper,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import { BootstrapInput } from "../../components/form/BootstrapInput";
import { updateBillingInfo } from "../../reducers/BookingInfoReducer";
import { setOpenBillingInfo, setOpenPaymentInfo, setOpenTravellerInfo } from "../../reducers/CheckoutFormOpenStateReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Country, State, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city'
import { useEffect, useState } from "react";
const postalCodes = require('postal-codes-js')

const BillingInfo = () => {
    const textBoxWidth: string = "25vw";
    const oneThirdTextBoxWidth: string = "11.5vw";

    const dispatch = useAppDispatch();
    const checkOutForms = useAppSelector((state) => state.checkOutForms)

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const onSubmit = (data: any) => {
        dispatch(updateBillingInfo(data))
        dispatch(setOpenBillingInfo(false))
        dispatch(setOpenPaymentInfo(true))
        console.log('BILLING INFO FROM BILLING INFO.TSX', data)
    };

    const handleClick = () => {
        dispatch(setOpenBillingInfo(false))
        dispatch(setOpenTravellerInfo(true))
    }

    const billingInfo = useAppSelector(
        (state) => state.bookingInfo?.billingInfo
    );

    const theme = useTheme()

    const [isoCode, setIsoCode] = useState("IN");
    // const selectedCountry = getValues("country");


    // const countries = Country.getAllCountries()

    // console.log(countries)
    const OPTIONS_LIMIT = 10;
    const defaultFilterOptions = createFilterOptions();



    const filterOptions = (options: any[], state: any) => {
        return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
    };



    return (
        <Paper elevation={3} sx={{ p: 2, py: 6 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="column" spacing={3} sx={{ ml: 2 }}>
                    <Typography color={theme.palette.primary.main} variant="h6" fontWeight="bold">
                        2. Billing Info
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="baseline">
                        <FormControl variant="standard" sx={{ width: textBoxWidth }}>
                            <InputLabel shrink>First Name</InputLabel>
                            <BootstrapInput
                                defaultValue={billingInfo.firstName}
                                {...register("firstName", {
                                    required: true,
                                    maxLength: 20,
                                    minLength: 3,
                                })}
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
                            <BootstrapInput
                                defaultValue={billingInfo.lastName}

                                {...register("lastName", {
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
                    <Stack direction="row" spacing={2} alignItems="baseline">
                        <FormControl variant="standard" sx={{ width: textBoxWidth }}>
                            <InputLabel shrink>Mailing Address 1</InputLabel>
                            <BootstrapInput
                                defaultValue={billingInfo.mailingAddress1}

                                {...register("mailingAddress1", { required: true, maxLength: 100 })}
                            />

                            {errors.mailingAddress1 && errors.mailingAddress1.type === "required" && (
                                <FormHelperText error> Mailing Address 1 cannot be Empty!</FormHelperText>
                            )}

                            {errors.mailingAddress1 && errors.mailingAddress1.type === "maxLength" && (
                                <FormHelperText error>
                                    Mailing Address 1 size should be containing a maximum of 100
                                    letters
                                </FormHelperText>
                            )}

                        </FormControl>
                        <FormControl variant="standard" sx={{ width: textBoxWidth }}>
                            <InputLabel shrink>Mailing Address 2</InputLabel>
                            <BootstrapInput defaultValue={billingInfo.mailingAddress2} {...register("mailingAddress2", {
                                required: true, maxLength: 100
                            })} />
                            {errors.mailingAddress2 && errors.mailingAddress2.type === "required" && (
                                <FormHelperText error> Mailing Address 2 cannot be Empty!</FormHelperText>
                            )}

                            {errors.mailingAddress2 && errors.mailingAddress2.type === "maxLength" && (
                                <FormHelperText error>
                                    Mailing Address 2 size should be containing a maximum of 100
                                    letters
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Stack>

                    <FormControl variant="standard" sx={{ width: textBoxWidth }}>
                        <FormLabel>Country</FormLabel>
                        <Autocomplete
                            onChange={(e, v) => { v != null && setIsoCode(v?.isoCode) }}
                            options={Country.getAllCountries()}
                            getOptionLabel={option => option.name.toString()}
                            // filterOptions={filterOptions}
                            renderInput={(params) => (
                                <TextField
                                    // defaultValue={billingInfo.country}
                                    {...params}
                                    {...register("country", { required: true, minLength: 1 })}
                                />
                            )}
                        />
                        {errors.country && (errors.country.type === "minLength") && (
                            <FormHelperText error>
                                Country field cannot be empty!
                            </FormHelperText>
                        )}
                        {errors.country && (errors.country.type === "required") && (
                            <FormHelperText error>
                                Country field cannot be empty!
                            </FormHelperText>
                        )}
                    </FormControl>

                    <Stack direction="row" spacing={3} alignItems="flex-start">
                        <FormControl variant="standard" sx={{ width: textBoxWidth }}>
                            <InputLabel shrink>City</InputLabel>
                            <BootstrapInput defaultValue={billingInfo.city} {...register("city", { required: true })} />
                            {errors.city && errors.city.type === "required" && (
                                <FormHelperText error>City field cannot be empty!</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl variant="standard" sx={{ width: oneThirdTextBoxWidth }}>
                            <FormLabel>State</FormLabel>
                            <Autocomplete
                                // defaultValue={billingInfo.state}
                                options={State.getStatesOfCountry(isoCode).map(state => state.name)}
                                filterOptions={filterOptions}
                                // getOptionLabel={(option: IState) => option?.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...register("state", { required: true, minLength: 1 })}
                                        {...params}
                                    // defaultValue={billingInfo.state}
                                    />
                                )}
                            />
                            {errors.state && (errors.state.type === "minLength" || errors.state.type === "required") && (
                                <FormHelperText error> State field cannot be empty!</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl variant="standard" sx={{ width: oneThirdTextBoxWidth }}>
                            <InputLabel shrink>Zip</InputLabel>
                            <BootstrapInput
                                defaultValue={billingInfo.zip}
                                {...register("zip", {
                                    required: true,
                                })}
                            />
                            {errors.zip && errors.zip.type === "required" && (
                                <FormHelperText error>Zip field cannot be empty!</FormHelperText>
                            )}
                            {
                                getValues("zip")?.length != 0 && postalCodes.validate(isoCode, getValues("zip")) !== true && postalCodes.validate(isoCode, billingInfo.zip) !== true && <FormHelperText error>Please enter a valid Zip code</FormHelperText>
                            }
                        </FormControl>
                    </Stack>

                    <FormControl variant="standard" sx={{ width: textBoxWidth }}>
                        <InputLabel shrink>Phone</InputLabel>
                        <BootstrapInput
                            defaultValue={billingInfo.phone}
                            inputProps={{
                                inputMode: "numeric",
                            }}
                            {...register("phone", {
                                required: true,
                                pattern: /^\+(?:[0-9] ?){6,14}[0-9]$/
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
                            defaultValue={billingInfo.email}
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
                <Stack direction="row" justifyContent="flex-end" alignItems="center">
                    <Button variant="outlined" sx={{ marginTop: -1 }} onClick={handleClick} >Edit Traveller Info</Button>
                    <Button variant="contained" sx={{ mx: 2, marginTop: -1 }} onClick={handleSubmit(onSubmit)} disableElevation>Next: Payment Info</Button>
                </Stack>
                {/* <Divider style={{ width: "100%", marginTop: "30px" }} /> */}
            </form>
        </Paper>
    );
};



export default BillingInfo;

//TODO: 1. validation problem for autocomplete of countries and states
//TODO: 2. validation for zip code based on country zip format
