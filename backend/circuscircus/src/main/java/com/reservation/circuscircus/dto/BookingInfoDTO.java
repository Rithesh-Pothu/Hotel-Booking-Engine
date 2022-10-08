package com.reservation.circuscircus.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingInfoDTO  {


    private Long bookingId;

    @JsonProperty(value = "travellerInfo")
    private TravellerInfoDTO travellerInfoDTO;

    @JsonProperty(value = "billingInfo")
    private BillingInfoDTO billingInfoDTO;

    @JsonProperty(value = "paymentInfo")
    private PaymentInfoDTO paymentInfoDTO;

    @JsonProperty(value = "createBookingProps")
    private CreateBookingPropsDTO createBookingPropsDTO;

    private PromotionDTO promotionDTO;

    private RoomSummaryDTO roomSummaryDTO;

    private String message;

}
