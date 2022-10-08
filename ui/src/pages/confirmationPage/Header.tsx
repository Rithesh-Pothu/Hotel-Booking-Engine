import { Button, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Header = () => {
    const theme = useTheme()
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Stack direction="row" width="80vw">
            <Typography color={theme.palette.primary.main} sx={{ flexGrow: 1, fontWeight: "bold" }} variant="h5">Upcoming Reservation: #{searchParams.get("bookingId")}</Typography>
            <Button>Print</Button>
            <Button>Email</Button>
        </Stack>
    )
}

export default Header