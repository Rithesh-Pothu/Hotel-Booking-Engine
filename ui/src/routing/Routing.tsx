import Timer from '../pages/checkOutPage/Timer';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import App from '../App'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/Navbar'
import { ROOT, LANDING_PAGE, ROOM_SEARCH_RESULTS, CHECKOUT_PAGE, CONFIRMATION_PAGE } from '../links'
import RoomSearchResults from '../pages/roomSearchResults'
import CheckOutPage from '../pages/checkOutPage';
import ConfirmationPage from '../pages/confirmationPage';
import BookingsPage from '../pages/myBookingsPage';
import * as Sentry from '@sentry/react';

import ReactGA from "react-ga4"
import { useEffect } from 'react';

const Routing = () => {
    const location = useLocation();
    useEffect(()=>{
        ReactGA.initialize("G-D3JCSR3GE1");
    },[])
    return (
        <>
            <Navbar headerInfo="Internet Booking Engine" />
            <Routes>
                <Route path={ROOT} element={<Navigate to={LANDING_PAGE} />} />
                <Route path={LANDING_PAGE} element={<App />} />
                <Route path={ROOM_SEARCH_RESULTS} element={<RoomSearchResults />} />
                <Route path={CHECKOUT_PAGE} element={<CheckOutPage />} />
                <Route path={CONFIRMATION_PAGE} element={<ConfirmationPage />} />
                <Route path="/bookings" element={<BookingsPage />} />
            </Routes>
            <Footer footerContent='© 2022 Kickdrum Internet Booking Engine reserves all rights.' />
            {location.pathname==='/checkout' && <Timer />}
        </>
    )
}

export default Sentry.withProfiler(Routing);