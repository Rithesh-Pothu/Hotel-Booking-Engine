package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class FeeDTO implements Serializable {
    private String name;
    private Double amount;
}
