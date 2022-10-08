package com.reservation.circuscircus.mapper;

import com.reservation.circuscircus.dto.FeeDTO;
import com.reservation.circuscircus.dto.PropertyRatesDTO;
import com.reservation.circuscircus.dto.RatesDTO;

public class RatesMapper {

    public RatesDTO fromEntity(PropertyRatesDTO propertyRatesDTO, int lengthOfStay){
        return RatesDTO.builder()
                .fees(propertyRatesDTO.getFees())
                .taxes(propertyRatesDTO.getTaxes())
                .vat(propertyRatesDTO.getVat())
                .build();
    }
}
