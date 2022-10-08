package com.reservation.circuscircus.mapper;

import com.reservation.circuscircus.dto.*;
import com.reservation.circuscircus.models.Amenity;
import com.reservation.circuscircus.models.RoomType;
import com.reservation.circuscircus.service.RoomTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class RoomDetailsMapper {

    private final SimpleDateFormat dateParser = new SimpleDateFormat("dd-MM-yyyy");
    private final PromotionMapper promotionMapper = new PromotionMapper();
    private final PromotionMaskMapper promotionMaskMapper = new PromotionMaskMapper();
    private final MealDealMapper mealDealMapper = new MealDealMapper();
    private final RatesMapper ratesMapper = new RatesMapper();

    public RoomDetailsTaxDTO getRoomDetails(Map<String, String> allParams, RoomDetailsDataDTO response,
                                            Map<String, RoomType> roomTypeMap, PropertyRatesDTO propertyRatesDTO, PromotionsDataDTO promotionsDataDTO){
        Date checkInDate = null, checkOutDate = null;
        try {
            checkInDate = dateParser.parse(allParams.get("checkInDate"));
            checkOutDate = dateParser.parse(allParams.get("checkOutDate"));
        }catch(ParseException e){e.printStackTrace();}
        List<RoomDetailsDTO> result = new ArrayList<>();
        List<DetailsDTO> listRoomsTypes = response.getData().getListRoomTypes();
        Long lengthOfStay = (((checkOutDate.getTime()-checkInDate.getTime())/ (1000 * 60 * 60 * 24)) % 365);

        List<PromotionMaskDTO> promotionList =
                promotionsDataDTO.getData().getListPromotions().stream()
                .sorted(Comparator.comparing(PromotionMaskDTO::getPrice_factor))
                .collect(Collectors.toList());




        for(DetailsDTO details: listRoomsTypes){

            RoomType currentRoomType = roomTypeMap.get(details.getRoom_type_name().toLowerCase());
            List<String> amenities = currentRoomType.getAmenities()
                    .stream().map(Amenity::getAmenity)
                    .collect(Collectors.toList());
            Map<String, Integer> ratesInRange = new LinkedHashMap<>();
            Double price = 0.0;
            Date currentDate = details.getRoom_rates().get(0).getRoom_rate().getDate();
            int startIndex = (int) (((checkInDate.getTime()-currentDate.getTime())/ (1000 * 60 * 60 * 24)) % 365);
            List<RoomRateDTO> roomRates = details.getRoom_rates();
            for(int i=startIndex-2; currentDate.before(checkOutDate);i++){
                RateDateDTO rateDate = roomRates.get(i).getRoom_rate();
                currentDate = rateDate.getDate();
                Double currentDateRate = Double.valueOf(rateDate.getBasic_nightly_rate());
                price += currentDateRate;
                ratesInRange.put(dateParser.format(currentDate), currentDateRate.intValue());
            }
            Double finalPrice = Math.round(price/lengthOfStay * 100.0)/100.0;
            List<MealDealDTO> mealDeals = currentRoomType.getMealDeals().stream()
                    .map(mealDeal -> mealDealMapper.fromEntity(mealDeal, finalPrice))
                    .sorted(Comparator.comparing(MealDealDTO::getEffectivePrice))
                    .collect(Collectors.toList());
            List<PromotionDTO> promotions = promotionList.stream()
                    .map(promotion -> promotionMaskMapper.fromEntity(promotion, finalPrice))
                    .collect(Collectors.toList());
            PromotionDTO minPricePromotion =  promotions.get(0);
            Double minPrice = minPricePromotion!=null?minPricePromotion.getEffectivePrice():price;
            minPrice = Math.round(minPrice * 100.0)/100.0;
            RoomDetailsDTO currentRoom =
                    RoomDetailsDTO.builder()
                            .roomTypeId(details.getRoom_type_id())
                            .area(details.getArea_in_square_feet())
                            .capacity(details.getMax_capacity())
                            .amenities(amenities)
                            .description(currentRoomType.getDescription())
                            .doubleBeds(details.getDouble_bed())
                            .singleBeds(details.getSingle_bed())
                            .rating(currentRoomType.getRating())
                            .reviews(currentRoomType.getReviews())
                            .roomType(currentRoomType.getRoomType())
                            .price(finalPrice)
                            .promotions(promotions)
                            .mealDeals(mealDeals)
                            .minPricePromotion(minPricePromotion)
                            .minPrice(minPrice)
                            .ratesInRange(ratesInRange)
                            .build();
            result.add(currentRoom);
        }
        return new RoomDetailsTaxDTO(result, ratesMapper.fromEntity(propertyRatesDTO, Math.toIntExact(lengthOfStay)), lengthOfStay);
    }
}
