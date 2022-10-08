package com.reservation.circuscircus.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class RatesDTO implements Serializable {
    private List<FeeDTO> fees;
    private List<TaxDTO> taxes;
    private Double vat;
}