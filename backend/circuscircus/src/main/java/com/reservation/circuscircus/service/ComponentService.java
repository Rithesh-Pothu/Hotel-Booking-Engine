package com.reservation.circuscircus.service;

import com.reservation.circuscircus.dto.*;
import com.reservation.circuscircus.repositories.ComponentRepository;
import com.reservation.circuscircus.repositories.DropDownValueRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class ComponentService {

    @Autowired
    private ComponentRepository componentRepository;

    @Autowired
    private DropDownValueRepository dropDownValueRepository;

    @Autowired
    private ModelMapper modelMapper;
    private final String LABEL = "label";
    private final String VALUE = "value";

    public ListDTO<ComponentDTO> getComponents(String page) {
        return new ListDTO<>(componentRepository.findByPage(page).stream()
                .map(component -> modelMapper.map(component, ComponentDTO.class))
                .collect(Collectors.toList()));
    }

    public DropDownValueMapDTO getValues(String page){
        List<DropDownValueDTO> components =  dropDownValueRepository.findByPage(page).stream()
                .map(dropDownValue -> modelMapper.map(dropDownValue, DropDownValueDTO.class))
                .collect(Collectors.toList());
        Map<String, ArrayList<Map<String, String>>> result = new HashMap<>();
        for(DropDownValueDTO value: components){
            Map<String, String> in= new HashMap<>();
            if(!result.containsKey(value.getId())) result.put(value.getId(), new ArrayList<Map<String, String>>());
            in.put(LABEL, value.getValue());
            in.put(VALUE, value.getPk());
            result.get(value.getId()).add(in);
        }
        return new DropDownValueMapDTO(result);
    }
}
