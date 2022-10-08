package com.reservation.circuscircus.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
public class Promotion {
    @Id
    private Long promotion_id;
    private String promotion_title;
    private String promotion_description;
    private Double price_factor;
}
