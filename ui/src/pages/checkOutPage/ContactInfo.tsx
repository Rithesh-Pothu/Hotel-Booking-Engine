import { Box, Typography, useTheme } from '@mui/material';
import React from 'react'
import { useAppSelector } from '../../redux/hooks';


const ContactInfo = () => {
    const theme = useTheme();
    const checkOutDetails = useAppSelector((state) => state.checkOutDetails);
  return (
    <Box sx={
        { 
            color:theme.palette.secondary.dark, 
            backgroundColor:theme.palette.secondary.light,
            padding: 2, 
            mt:3,
        }
    }
    >
        <Box mt={1}>
            <Typography variant="h6" fontWeight="bold" mt={1} mb={1} color='black'>
                Need Help?
            </Typography>
            <Typography mb={1} fontWeight="bold" color='black'>Call {checkOutDetails.supportPhone}</Typography>
            <Typography>{checkOutDetails.supportHours}</Typography>
        </Box>
    </Box>
  )
}

export default ContactInfo