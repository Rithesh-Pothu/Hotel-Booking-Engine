package com.reservation.circuscircus.models;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
public class CurrentBookingId implements Serializable {
    private Long roomTypeId;
    private LocalDate date;
}
