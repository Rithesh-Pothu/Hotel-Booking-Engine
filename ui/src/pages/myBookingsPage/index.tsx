import { Backdrop, Button, CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingsComponent from "./BookingsComponent";
import { useActionData, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateEmail } from "../../reducers/EmailReducer";

Amplify.configure(awsconfig);

interface EmailDTO {
    email: string
}

const MyBookings = ({ signOut, user }: any) => {
    // const [email, setEmail] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);


    const dispatch = useAppDispatch()
    const email = useAppSelector((state) => state.email)


    useEffect(() => {
        Auth.currentSession()
            .then(data => {
                // setEmail(data?.getIdToken()?.payload?.email);
                dispatch(updateEmail(data?.getIdToken()?.payload?.email))
                console.log(data.getIdToken().payload.email)
                setLoading(false)
                return data.getIdToken().payload.email;
            })
    }, [])

    const navigate = useNavigate();

    const goToHomepage = () => {
        navigate("/")
    }

    const theme = useTheme()

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


            <Stack sx={{ my: "8vh" }} direction="column" justifyContent="center" alignItems="center">

                <BookingsComponent />

                {/* <Button sx={{ m: 2, float: "right" }} variant="contained" onClick={goToHomepage}>Go to Homepage</Button> */}
                <Button sx={{ backgroundColor: theme.palette.primary.main, width: 200 }} variant="contained" onClick={signOut}>Sign Out</Button>

            </Stack>


        </>
    );
};

export default withAuthenticator(MyBookings);
