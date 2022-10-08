package com.reservation.circuscircus.mapper;

import com.reservation.circuscircus.dto.PromotionDTO;
import com.reservation.circuscircus.dto.PromotionMaskDTO;
import lombok.Data;

import java.io.Serializable;

@Data
public class PromotionMaskMapper implements Serializable {

    public PromotionDTO fromEntity(PromotionMaskDTO promotion, Double finalPrice){
        return PromotionDTO.builder()
                .promotionId(promotion.getPromotion_id())
                .title(promotion.getPromotion_title())
                .description(promotion.getPromotion_description())
                .effectivePrice(Math.round(promotion.getPrice_factor() * finalPrice * 100.0)/100.0)
                .build();
    }
}
