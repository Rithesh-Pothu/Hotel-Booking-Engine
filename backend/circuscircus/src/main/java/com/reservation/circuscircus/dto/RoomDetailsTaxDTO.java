package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
public class RoomDetailsTaxDTO implements Serializable {
    private List<RoomDetailsDTO> data;
    private RatesDTO rates;
    private Long lengthOfStay;
}
