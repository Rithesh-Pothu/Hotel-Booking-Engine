package com.reservation.circuscircus.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class RoomAvailabilityDTO implements Serializable {
    private Integer availability_id;
    private Integer booking_id;
    private String date;
    private Integer property_id;
    private Integer room_id;
}
