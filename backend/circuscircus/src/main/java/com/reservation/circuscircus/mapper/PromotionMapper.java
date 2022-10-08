package com.reservation.circuscircus.mapper;

import com.reservation.circuscircus.dto.PromotionDTO;
import com.reservation.circuscircus.models.Promotion;

public class PromotionMapper {
    public PromotionDTO fromEntity(Promotion promotion, Double currentPrice){
        Double effectivePrice = Math.round(promotion.getPrice_factor()*currentPrice * 100.0) / 100.0;
        return PromotionDTO.builder()
                .promotionId(promotion.getPromotion_id())
                .description(promotion.getPromotion_description())
                .effectivePrice(effectivePrice)
                .title(promotion.getPromotion_title())
                .build();
    }
}
