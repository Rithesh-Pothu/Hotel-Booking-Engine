package com.reservation.circuscircus.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Builder
@Data
public class MealDealDTO implements Serializable {
    private String title;
    private String description;
    private Double effectivePrice;
}
