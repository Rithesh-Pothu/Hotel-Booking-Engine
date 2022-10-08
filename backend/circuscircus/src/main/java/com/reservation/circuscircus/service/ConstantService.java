package com.reservation.circuscircus.service;

import com.reservation.circuscircus.dto.ConstantDTO;
import com.reservation.circuscircus.dto.ConstantMapDTO;
import com.reservation.circuscircus.repositories.ConstantRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ConstantService {

    @Autowired
    private ConstantRepository constantRepository;
    @Autowired
    private ModelMapper modelMapper;

    public ConstantMapDTO findAll(){
        Map<String, String> constants = new HashMap<>();
        constantRepository.findAll().stream()
                .map((constant -> modelMapper.map(constant, ConstantDTO.class)))
                .forEach(constant -> constants.put(constant.getHead(), constant.getValue()));
        return new ConstantMapDTO(constants);
    }
}
