import { Button, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

interface HeaderProps {
    bookingId: number
}

const Header = ({ bookingId }: HeaderProps) => {
    const theme = useTheme()

    return (
        <Stack direction="row" width="80vw">
            <Typography color={theme.palette.primary.main} sx={{ flexGrow: 1, fontWeight: "bold" }} variant="h5">Previous Bookings: #{bookingId}</Typography>
        </Stack>
    )
}

export default Header