import { Grid } from "@mui/material";
import { FeeTax } from "../../reducers/RoomDetailsReducer";
import MultiActionAreaCard from "./RoomCard";

export interface PromotionType {
    title?: string;
    description?: string;
    effectivePrice: number
    promotionId: number
}


export interface roomType {
    roomTypeId: number
    area: number;
    capacity: number;
    doubleBeds: number;
    singleBeds: number;
    roomType: string;
    price: number;
    rating: number;
    reviews: number;
    description: string;
    amenities: string[];
    minPrice: number;
    minPricePromotion: PromotionType;
    mealDeals: PromotionType[],
    promotions: PromotionType[],
    ratesInRange: {}
}

interface Props {
    roomDetails: roomType[];
    rates: FeeTax
}

const RoomDetails = ({ rates, roomDetails }: Props) => {

    return (
        <Grid
            container
            spacing={6}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 0.5 }}
        >
            {roomDetails.map((room: roomType, index: number) => {

                return <Grid item key={index} >
                    <MultiActionAreaCard
                        roomTypeId={room.roomTypeId}
                        area={room.area}
                        capacity={room.capacity}
                        doubleBeds={room.doubleBeds}
                        singleBeds={room.singleBeds}
                        roomType={room.roomType}
                        price={room.price}
                        ratesInRange={room.ratesInRange}
                        rating={room.rating}
                        reviews={room.reviews}
                        description={room.description}
                        amenities={room.amenities}
                        minPricePromotion={room.minPricePromotion}
                        minPrice={room.minPrice}
                        mealDeals={room.mealDeals}
                        promotions={room.promotions}
                        rates={rates}
                    />
                </Grid>
            })
            }
        </Grid >
    );
};

export default RoomDetails;
