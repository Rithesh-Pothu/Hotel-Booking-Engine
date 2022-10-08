import { useTheme, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

const steps = ["1. Choose Room", "2. Choose Addon", "3. Checkout"];

interface Props {
    step: number;
}

export default function HorizontalLabelPositionBelowStepper({ step }: Props) {
    const theme: Theme = useTheme();
    return (
        <Box
            bgcolor={theme.palette.secondary.main}
            sx={{ width: "100%", marginTop: 8, py: 1 }}
        >
            <Stepper activeStep={step} alternativeLabel>
                {steps.map((label) => (
                    <Step
                        key={label}
                        sx={{
                            "& .MuiStepLabel-root .Mui-active": {
                                color: "red", // circle color (ACTIVE)
                            },
                            "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                            {
                                color: "common.black", // Just text label (ACTIVE)
                            },
                            "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                                fill: "white", // circle's number (ACTIVE)
                            },
                        }}
                    >
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}
