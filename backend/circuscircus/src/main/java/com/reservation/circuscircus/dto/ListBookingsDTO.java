package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ListBookingsDTO implements Serializable {
    List<BookingIdDTO> listBookings;
}
