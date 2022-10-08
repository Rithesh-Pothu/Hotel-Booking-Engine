import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import DateBox from "./DateBox";
import { useAppSelector } from "../../redux/hooks";
import Modal from '@mui/material/Modal';
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import OtpInput from 'react-otp-input';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];


const getMonthAndYear = (date: string) => {
    if (date && date?.length >= 8)
        return monthNames[parseInt(date.substring(5, 7)) - 1] +
            " " +
            date.substring(0, 4);
    return ""
}



const capitalizeWord = (str: string) => {
    if (str && str.length > 0)
        return str.split("_")[0].charAt(0) + str.split("_")[0].substring(1).toLocaleLowerCase() + " " + str.split("_")[1].charAt(0) + str.split("_")[1].substring(1).toLocaleLowerCase()
}



const RoomInfoCard = ({ receipient, bookingId, createBookingProps, promotion, perNightTotal }: any) => {
    const check_in_date = createBookingProps?.check_in_date;
    const check_out_date = createBookingProps?.check_out_date;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [otp, setOtp] = useState({otp: ""});
    const [openOtpModal, setOpenOtpModal] = useState(false);

    const theme = useTheme()

    const [openToast, setOpenToast] = useState(false);
    const [openVerified, setOpenVerified] = useState(false);
    const [openNotVerified, setOpenNotVerified] = useState(false);
    const [verifyVisible, setVerifyVisible] = useState(true);

    const handleCloseVerified = () => setOpenVerified(false);
    const handleCloseNotVerified = () => setOpenNotVerified(false);
    const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpenToast(false);
    };

    return (
        <>
            <Snackbar open={openToast} autoHideDuration={3000} onClose={handleCloseToast}>
                <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
                    Mail sent!
                </Alert>
            </Snackbar>
            <Snackbar open={openVerified} autoHideDuration={3000} onClose={handleCloseVerified}>
                <Alert onClose={handleCloseVerified} severity="success" sx={{ width: '100%' }}>
                    Booking Cancelled!
                </Alert>
            </Snackbar>
            <Snackbar open={openNotVerified} autoHideDuration={3000} onClose={handleCloseNotVerified}>
                <Alert onClose={handleCloseNotVerified} severity="error" sx={{ width: '100%' }}>
                    OTP not verified!
                </Alert>
            </Snackbar>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    {/* call the api for details */}
                    <Stack direction="row" alignItems="center">
                        <Typography sx={{ fontWeight: "bold" }} variant="h6">
                            Room: {capitalizeWord(createBookingProps?.room_type)}
                        </Typography>

                        <Person2OutlinedIcon sx={{ ml: 4, mt: 0.3 }} />
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{ flexGrow: 1 }}
                        >
                            {createBookingProps?.adult_count} Adults,
                            {createBookingProps?.child_count} Child
                        </Typography>

                        <Stack>
                            <Button variant="contained" disableElevation>
                                Room Details
                            </Button>
                            <Button onClick={()=> {
                                const details = 
                                {
                                    bookingId: bookingId,
                                    receipient: receipient
                                }
                                
                                setVerifyVisible(true);
                                setOpenOtpModal(true);
                                axios.post(`${process.env.REACT_APP_BACKEND_URL}email/send/otp`, details)
                                .then((response)=>{
                                    setOpenToast(true);
                                    setVerifyVisible(false);
                                })
                                
                            }}>Cancel Room</Button>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-start">
                        <img
                            width={400}
                            height={250}
                            src="https://images.unsplash.com/photo-1617104678098-de229db51175?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                        />

                        <Stack>
                            <Stack direction="row">
                                <DateBox
                                    title="Check In"
                                    day={createBookingProps?.check_in_date.substring(8, 10)}
                                    monthYear={getMonthAndYear(check_in_date)}
                                />
                                <DateBox
                                    title="Check Out"
                                    day={check_out_date?.substring(8, 10)}
                                    monthYear={getMonthAndYear(check_out_date)}
                                />
                            </Stack>
                            <Stack sx={{ ml: 3, my: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {promotion?.title ? promotion.title : "$150 Dining Credit Package"}
                                </Typography>
                                <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
                                    {promotion?.description ? promotion.description : "Spend $10 every night you stay and earn $150 on doining credit at the resort."}
                                </Typography>

                                <Stack direction="row" justifyContent="space-between">
                                    <Button sx={{ ml: -1, mt: 2 }} onClick={handleOpen}>Cancellation Policy</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Typography sx={{ mt: 0.7, float: "right", mb: 2 }} variant="h6">
                        ${Number(perNightTotal).toFixed(2)} /night total
                    </Typography>
                </CardContent>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: "center" }} color={theme.palette.primary.main} id="modal-modal-title" variant="h6" component="h2">
                        Cancellation Policy
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Cancellations made 7 days or more in advance of the Check In Date, will receive a 100% refund, or else you will be incurred a 30% fee.
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openOtpModal}
                onClose={() => setOpenOtpModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box textAlign="center" ml={3}>
                    <OtpInput
                        containerStyle={{justifyContent: 'space-around'}}
                        inputStyle={{width: '50%'}}
                        value={otp.otp}
                        onChange={(otp: string) => setOtp({otp: otp})}
                        numInputs={6}
                        separator={<span> </span>}
                    />
                    <Button sx={{bgcolor:"primary", mt: 3}} disabled={verifyVisible} onClick={() =>{
                        const details =
                        {
                            bookingId: bookingId,
                            receipient: receipient,
                            otp: otp.otp
                        }
                        axios.post(`${process.env.REACT_APP_BACKEND_URL}verify/otp`, details)
                        .then((response)=> {
                            if(response.data.verified){
                                setOpenVerified(true);
                                setOpenOtpModal(false);
                            }
                            else setOpenNotVerified(true);
                        })
                    }}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default RoomInfoCard;
