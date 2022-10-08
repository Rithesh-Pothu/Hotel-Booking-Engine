package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CreateManyBookingsDTO implements Serializable {
    private CreateBookingCountDTO createBooking;
}
