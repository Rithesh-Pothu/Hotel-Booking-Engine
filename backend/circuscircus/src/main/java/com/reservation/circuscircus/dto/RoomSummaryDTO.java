package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomSummaryDTO implements Serializable {

    private Double perNightTotal;

    private Double nightlyRate;

    private Double subtotal;

    private Double taxesSurchargesFees;

    private Double vat;

    private Long totalForStay;


}
