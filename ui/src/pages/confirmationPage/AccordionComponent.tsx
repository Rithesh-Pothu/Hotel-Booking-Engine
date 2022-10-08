import { styled } from '@mui/material/styles';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { Expand } from '@mui/icons-material';


export interface Details {
    key?: string;
    value?: string;
}

export interface AccordionProps {
    summary: string;
    details: any
}

export const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const breakIntoWords = (str: string) => {
    return capitalizeFirst(str.replace(/([a-z])([A-Z0-9])/g, '$1 $2'));
}

export const dashedFormat = (num: string) => {
    console.log("dashed format called")
    return num.substring(0, 4) + "-" + num.substring(4, 8) + "-" + num.substring(8, 12)
}


export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: '2rem', }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(2),
    },
}));


const AccordionComponent = ({ summary, details }: AccordionProps) => {
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
                {
                    details ?
                        Object.keys(details).map(key =>
                            <Stack key={key} direction="row" sx={{ mx: 4 }}>

                                <Typography color="gray" variant="subtitle1" sx={{ flexGrow: 1 }}>
                                    {details[key] != null && key != "perNightTotal" && breakIntoWords(key)}
                                </Typography>
                                {key != "perNightTotal" && <Typography variant="h6">
                                    {key === "cardNumber" ? dashedFormat(details[key]) :
                                        details[key]}</Typography>}

                            </Stack>
                        ) : ""
                }

            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionComponent;
