package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ListRoomsDTO implements Serializable {
    private List<RoomTypeDTO> listRooms;
}
