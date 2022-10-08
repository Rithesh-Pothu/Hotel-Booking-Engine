package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ListPromotionsDTO implements Serializable {
    private List<PromotionMaskDTO> listPromotions;
}
