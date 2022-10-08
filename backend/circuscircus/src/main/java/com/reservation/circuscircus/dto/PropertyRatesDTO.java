package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyRatesDTO {
    private List<FeeDTO> fees;
    private List<TaxDTO> taxes;
    private Double vat;
}