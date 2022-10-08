package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UpdateRoomAvlDto implements Serializable {
    private BookingIdDTO updateRoomAvailability;
}
