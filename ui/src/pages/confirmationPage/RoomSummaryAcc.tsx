import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { Expand } from "@mui/icons-material";
import {
    AccordionProps,
    AccordionSummary,
    dashedFormat,
    breakIntoWords,
} from "./AccordionComponent";

const RoomSummaryAcc = ({ summary, details }: AccordionProps) => {
    const theme = useTheme();
    return (
        <Accordion>
            <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                    color={theme.palette.primary.main}
                >
                    {summary}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {details
                    ? Object.keys(details).map((key) => (
                        <Stack key={key} direction="row" sx={{ mx: 4 }}>
                            <Typography
                                color="gray"
                                variant="subtitle1"
                                sx={{ flexGrow: 1 }}
                            >
                                {details[key] != null &&
                                    key != "perNightTotal" &&
                                    breakIntoWords(key)}
                            </Typography>
                            {key != "perNightTotal" && (
                                <Typography variant="h6">${Number(details[key]).toFixed(2)}</Typography>
                            )}
                        </Stack>
                    ))
                    : ""}
            </AccordionDetails>
        </Accordion>
    );
};

export default RoomSummaryAcc;
