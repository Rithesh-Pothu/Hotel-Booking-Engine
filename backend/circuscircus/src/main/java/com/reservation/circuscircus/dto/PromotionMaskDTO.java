package com.reservation.circuscircus.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class PromotionMaskDTO implements Serializable {
    private Long promotion_id;
    private String promotion_title;
    private String promotion_description;
    private Double price_factor;
    private Double effectivePrice;
    private Long minimum_days_of_stay;
    private Boolean is_deactivated;
}
