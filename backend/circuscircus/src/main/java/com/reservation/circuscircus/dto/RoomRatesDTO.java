package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class RoomRatesDTO implements Serializable {
    private List<RoomRateDTO> room_rates;
}
