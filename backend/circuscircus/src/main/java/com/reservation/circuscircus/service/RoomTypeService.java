package com.reservation.circuscircus.service;

import com.reservation.circuscircus.controller.RoomController;
import com.reservation.circuscircus.mapper.RoomTypeMapper;
import com.reservation.circuscircus.models.RoomType;
import com.reservation.circuscircus.repositories.RoomTypeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class RoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private ModelMapper modelMapper;

    private final RoomTypeMapper roomTypeMapper = new RoomTypeMapper();

    public RoomType find(String roomType){
        return roomTypeRepository.findById(roomType).get();
    }
    public Map<String, RoomType> findAll(){
        List<RoomType> res = roomTypeRepository.findAll();
        return roomTypeMapper.fromEntityToMap(res);
    }
}
