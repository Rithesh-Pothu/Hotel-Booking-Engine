package com.reservation.circuscircus.dto;

import  lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class RoomDetailsDTO implements Serializable {
    private Integer roomTypeId;
    private Integer area;
    private Integer doubleBeds;
    private Integer capacity;
    private Integer singleBeds;
    private String roomType;
    private Double price;
    private Double rating;
    private Long reviews;
    private String description;
    private Double minPrice;
    private Integer lengthOfStay;
    private PromotionDTO minPricePromotion;
    private List<String> amenities;
    private List<PromotionDTO> promotions;
    private List<MealDealDTO> mealDeals;
    private Map<String, Integer> ratesInRange;
}
