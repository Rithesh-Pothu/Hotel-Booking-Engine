package com.reservation.circuscircus.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="meal_deals")
public class MealDeal {
    @Id
    private Long deal_id;
    private String title;
    private String Description;
    private Double effectivePriceRatio;
}
