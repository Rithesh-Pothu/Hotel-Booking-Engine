import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import PaymentInfo from "./PaymentInfo";
import TravellerInfo from "./TravellerInfo";
import BillingInfo from "./BillingInfo";
import ItineraryCard from "./ItineraryCard";
import { useForm } from "react-hook-form";
import { useAppSelector } from '../../redux/hooks';
import ContactInfo from "./ContactInfo";
import HorizontalLabelPositionBelowStepper from "../../components/ui/Stepper";
import WrapperForForms from "./WrapperForForms";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: "80vw",
    wordWrap: "break-word",
}));

const onSubmit = (data: any) => {
    console.log(data);
};

const CheckOutPage = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();
    const checkoutStates = useAppSelector((state) => state.checkOutForms)
    return (
        <>
            <HorizontalLabelPositionBelowStepper step={2 as number} />
            <Stack direction="row" sx={{ mt: 4, marginBottom: "100px", marginLeft: "30px" }}>
                <Stack
                    sx={{ width: "80vw" }}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    {checkoutStates.openTravellerInfo ? <TravellerInfo /> :
                        <WrapperForForms text="1. Traveller Info" />
                    }
                    {
                        checkoutStates.openBillingInfo ? <BillingInfo /> :
                            <WrapperForForms text="2. Billing Info" />
                    }

                    {
                        checkoutStates.openPaymentInfo ? <PaymentInfo /> :
                            <WrapperForForms text="3. Payment Info" />
                    }
                </Stack>
            <Stack mr={20} width={450}>
                <ItineraryCard />
                <ContactInfo />
            </Stack>

        </Stack>
        </>

    );
};

export default CheckOutPage;