package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class RoomRateDTO implements Serializable {
    private RateDateDTO room_rate;
}
