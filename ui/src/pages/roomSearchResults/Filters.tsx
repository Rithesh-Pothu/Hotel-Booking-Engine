import { Box, useTheme } from '@mui/material'
import React from 'react'

const Filters = () => {

    const theme = useTheme()
    return (
        <Box sx={{
            color: theme.palette.secondary.dark,
            backgroundColor: theme.palette.secondary.light,
            padding: 2
        }}
        >
        </Box>
    )
}

export default Filters