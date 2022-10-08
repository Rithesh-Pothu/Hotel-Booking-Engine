package com.reservation.circuscircus.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="current_bookings")
@Entity
@IdClass(CurrentBookingId.class)
public class CurrentBookings {
    @Id
    private Long roomTypeId;
    @Id
    private LocalDate date;
}
