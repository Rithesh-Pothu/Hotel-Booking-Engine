package com.reservation.circuscircus.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class BookingIdDTO implements Serializable {
    private Long booking_id;
}
