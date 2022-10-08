package com.reservation.circuscircus.mapper;

import com.reservation.circuscircus.models.RoomType;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RoomTypeMapper {
    public Map<String, RoomType> fromEntityToMap(List<RoomType> roomTypeList){
        Map<String, RoomType> roomTypeMap = new HashMap<>();
        for(RoomType i: roomTypeList){
            roomTypeMap.put(i.getRoomType(), i);
        }
        return roomTypeMap;
    }
}
