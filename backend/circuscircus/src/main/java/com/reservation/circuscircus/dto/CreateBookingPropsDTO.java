package com.reservation.circuscircus.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateBookingPropsDTO implements Serializable {

    @JsonProperty(value = "room_type_id")
    private Long roomTypeId;

    @JsonProperty(value = "room_type")
    private String roomType;

    @JsonProperty(value = "amount_due_at_resort")
    private Long amountDueAtResort;

    @JsonProperty(value = "adult_count")
    private Long adultCount;

    @JsonProperty(value = "check_in_date")
    private String  checkInDate;

    @JsonProperty(value = "check_out_date")
    private String checkOutDate;

    @JsonProperty(value = "child_count")
    private Long childCount;

    @JsonProperty(value = "promotion_id")
    private Long promotionId;

    @JsonProperty(value = "property_id")
    private Long propertyId;

    @JsonProperty(value = "status_id")
    private Long statusId;

    @JsonProperty(value = "total_cost")
    private Long totalCost;

    @JsonProperty(value = "rooms")
    private Long rooms;
}
