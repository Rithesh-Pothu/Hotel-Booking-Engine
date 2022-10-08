import { Paper, Typography, useTheme } from '@mui/material'
import React from 'react'

interface WrapperForFormsProps {
    text: string
}

const WrapperForForms = ({ text }: WrapperForFormsProps) => {
    const theme = useTheme()
    return (
        <Paper elevation={3} sx={{ width: 988, pl: 4, py: 2 }} >
            <Typography color={theme.palette.primary.main} variant="h6" fontWeight="bold">
                {text}
            </Typography>
        </Paper>
    )
}

export default WrapperForForms; 