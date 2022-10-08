import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { addPromotion } from "../../reducers/PromotionReducer";
import { addFeeTax, addRoomType, FeeTax } from "../../reducers/RoomDetailsReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CHECKOUT_PAGE, DEV_URL, PROD_URL, ROOM_SEARCH } from "../../links"
import { changeCompleted, setCheckOutTime } from "../../reducers/TimerReducer";
import { setItineraryVisibility } from "../../reducers/ItineraryVisibilityReducer";

interface PackageCardProps {
    title: string
    desc: string
    effectivePrice: number
    roomDetails: RoomDetails
    rates: FeeTax
    promotionId?: number
}
export interface RoomDetails {
    title: string
    price: number
    ratesInRange: {}
}


export default function PackageCard({ promotionId, rates, roomDetails, title = "Standard Rate", desc, effectivePrice }: PackageCardProps) {
    const theme = useTheme();
    const currency = useAppSelector(state => state.currency.value)
    const DOLLARTORUPEE = 79.50;

    const checked = useAppSelector((state) => state.promotion);
    const dispatch = useAppDispatch();
    const details = {
        roomType: roomDetails.title,
        price: roomDetails.price,
        ratesInRange: roomDetails.ratesInRange
    }
    console.log('Details', details)

    const navigateTo = useNavigate();

    const useNavigateParams = () => {
        const navigate = useNavigate();
        return (url: string, params: string) => {
            const path = `${url}?${params}`;
            navigate(path);
        };
    };

    let url;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        url = new URL(DEV_URL);
    } else {
        url = new URL(PROD_URL);
    }

    const params = new URLSearchParams(url.search);
    const addSearchParms = () => {
        params.append("from", ROOM_SEARCH);
    }

    const navigate = useNavigateParams();

    const navigateHandler = async () => {
        await addSearchParms();
        const searchParamString = params.toString();
        navigate("../" + CHECKOUT_PAGE, searchParamString);
    };


    return (
        <Card sx={{ display: "flex", width: 600, my: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, width: 400 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>{title}</Typography>
                    <Typography variant="subtitle1">
                        {desc}
                    </Typography>
                </CardContent>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: theme.palette.secondary.main,
                    width: 200,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CardContent>
                    {currency === "USD" && <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        ${effectivePrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </Typography>}
                    {currency === "INR" && <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        ₹{(effectivePrice * DOLLARTORUPEE).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </Typography>}

                    <Typography variant="subtitle2">per night</Typography>
                </CardContent>

                <Button
                    disableElevation
                    variant="contained"
                    onClick={() => {
                        dispatch(addPromotion({ promotionId: promotionId, title: title, description: desc!, discountedPrice: effectivePrice! }))
                        dispatch(addFeeTax(rates));
                        dispatch(addRoomType(details))
                        dispatch(changeCompleted());
                        dispatch(setCheckOutTime());
                        dispatch(setItineraryVisibility({ value: true }));
                        navigateHandler()
                    }}
                    sx={{ py: 1, fontWeight: "bold", mb: 1 }}
                >
                    Select Package
                </Button>
            </Box>
        </Card>
    );
}
