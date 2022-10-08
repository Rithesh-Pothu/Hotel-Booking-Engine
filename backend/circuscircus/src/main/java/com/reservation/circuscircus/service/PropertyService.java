package com.reservation.circuscircus.service;

import com.reservation.circuscircus.dto.PropertyRatesDTO;
import com.reservation.circuscircus.repositories.PropertyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;
    @Autowired
    private ModelMapper modelMapper;

    public PropertyRatesDTO getPropertyRates(Long id){
        if(propertyRepository.findById(id).isPresent())
            return modelMapper.map(propertyRepository.findById(id).get(),PropertyRatesDTO.class);
        return new PropertyRatesDTO();
    }
}
