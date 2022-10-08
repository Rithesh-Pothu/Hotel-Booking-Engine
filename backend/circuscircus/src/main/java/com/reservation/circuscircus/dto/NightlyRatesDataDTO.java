package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class NightlyRatesDataDTO implements Serializable {
    private ListRoomsDTO data;
}
