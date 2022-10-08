package com.reservation.circuscircus.mapper;

import com.reservation.circuscircus.dto.MealDealDTO;
import com.reservation.circuscircus.models.MealDeal;

public class MealDealMapper {
    public MealDealDTO fromEntity(MealDeal mealDeal, Double currentPrice){
        Double effectivePrice = Math.round(mealDeal.getEffectivePriceRatio()*currentPrice * 100.0) / 100.0;
        return MealDealDTO.builder()
                .description(mealDeal.getDescription())
                .effectivePrice(effectivePrice)
                .title(mealDeal.getTitle())
                .build();
    }
}
