package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QlBookingDTO implements Serializable {
    private Long adult_count;
    private Long amount_due_at_resort;
    private Long booking_id;
    private String check_in_date;
    private String check_out_date;
    private Long child_count;
    private Long guest_id;
    private Long promotion_id;
    private Long property_id;
    private Long status_id;
    private Long total_cost;
    private List<QlRoomDTO> room_booked;
}
