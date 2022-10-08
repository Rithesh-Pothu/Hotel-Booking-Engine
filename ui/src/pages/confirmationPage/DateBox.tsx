import { Box, Grid, Typography } from "@mui/material";
import React from "react";

interface DateBoxProps {
    title: string;
    day: string;
    monthYear: string;
}

const DateBox = ({ title, day, monthYear }: DateBoxProps) => {
    return (
        <Box
            sx={{
                p: 3,
                ml: 3,
                border: "0.2rem solid #b2b5b2",
                borderRadius: "5px",
                textAlign: "center",
                color: "text.secondary",
            }}
        >
            <Typography component="div">{title}</Typography>
            <Typography variant="h6">{day}</Typography>
            <Typography>{monthYear}</Typography>
        </Box>
    );
};

export default DateBox;
