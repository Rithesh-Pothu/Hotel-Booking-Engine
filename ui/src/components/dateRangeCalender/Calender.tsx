import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
    FormControl,
    FormLabel,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Moment from "moment";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { updateRange } from "../../reducers/DateRangeReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import axios from "axios";
import { CALENDAR_RATES } from "../../links";
import { format, parseISO } from "date-fns";
import "../../index.css";

interface Props {
    label?: string;
}

const Calender = ({ label = "Select Dates" }: Props) => {
    const theme = useTheme();

    const property_name = useAppSelector((state) => state.propertyName.value);
    const property_id = property_name.split(" ")[1];

    let range = useAppSelector((state: any) => state.daterange);
    const dispatch = useAppDispatch();

    const [minPrices, setMinPrices] = useState(null);
    const currency = useAppSelector((state) => state.currency.value);

    // const style = {
    //     position: "absolute" as "absolute",
    //     top: "50%",
    //     left: "60.5%",
    //     transform: "translate(-50%, -50%)",
    //     width: 700,
    //     bgcolor: "background.paper",
    //     boxShadow: 24,
    //     p: 2,
    //     height: "auto",
    // };

    const DOLLARTORUPEE = 79.50

    const getMinimumPricesForEachDay = async () => {
        const response = await axios.get(
            CALENDAR_RATES + `propertyId=${property_id}`
        );
        const { minNightlyRates } = response?.data;
        setMinPrices(minNightlyRates);
    };

    useEffect(() => {
        getMinimumPricesForEachDay();
    }, []);

    const handleCustomPrices = (date: Date) => {
        const formatDate = format(date, "dd-MM-yyyy");
        const rangeStartDate = format(range[0]?.startDate, "dd-MM-yyyy");
        const rangeEndDate = format(range[0]?.endDate, "dd-MM-yyyy");

        // if (formatDate == rangeStartDate)
        //     console.log(formatDate, " ", formatDate == rangeStartDate);

        if (date > new Date() || date.getDate() == new Date().getDate()) {
            if (minPrices != null) {
                if (currency === "USD") {
                    return (
                        <Stack direction="column" spacing={-1}>
                            <Typography variant="caption" component="p">
                                {date?.getDate()}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {" "}
                                ${(minPrices[formatDate] * 1).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </Typography>
                        </Stack>
                    );
                } else {
                    return (
                        <Stack direction="column" spacing={-1}>
                            <Typography variant="caption" component="p">
                                {date?.getDate()}
                            </Typography>
                            <Typography variant="caption" component="p">
                                {" "}
                                ₹{(minPrices[formatDate] * DOLLARTORUPEE).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </Typography>
                        </Stack>
                    );
                }
            }
        }
    };

    const handleChange = async (item: any) => {
        console.log(item.selection);
        await dispatch(updateRange(item.selection));
    };

    return (
        <>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <div
                    style={{
                        height: "55px",
                        display: "flex",
                        justifyContent: "",
                        alignItems: "center",
                        position: "absolute",
                        marginLeft: "15px",
                        marginTop: "20px",
                        width: "100%",
                    }}
                >
                    {range[0].endDate &&
                        Moment(range[0].startDate).format("Do MMM, YYYY")}
                    {range[0].endDate ? <ArrowForwardIcon /> : ""}
                    {range[0].endDate && Moment(range[0].endDate).format("Do MMM, YYYY")}
                    <CalendarMonthOutlinedIcon
                        sx={{
                            position: "absolute",
                            float: "right",
                            right: "50px",
                            top: "13px",
                        }}
                    />
                </div>
                <FormLabel id="demo-simple-select-label">{label}</FormLabel>

                <Select labelId="demo-simple-select-label" id="demo-simple-select">
                    <DateRange
                        className="calenderElement"
                        onChange={handleChange}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={2}
                        direction="horizontal"
                        showPreview={false}
                        showMonthAndYearPickers={false}
                        editableDateInputs={true}
                        showDateDisplay={false}
                        rangeColors={[
                            theme.palette.secondary.main,
                        ]}
                        dayContentRenderer={handleCustomPrices}
                        minDate={new Date()}

                    // maxDate={maxLimit}
                    />
                </Select>
            </FormControl>
        </>
    );
};

export default Calender;
