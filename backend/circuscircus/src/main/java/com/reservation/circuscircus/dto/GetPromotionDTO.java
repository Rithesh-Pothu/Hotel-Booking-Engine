package com.reservation.circuscircus.dto;

import com.reservation.circuscircus.models.Promotion;
import lombok.Data;

import java.io.Serializable;

@Data
public class GetPromotionDTO implements Serializable {
    private Promotion getPromotion;
}
