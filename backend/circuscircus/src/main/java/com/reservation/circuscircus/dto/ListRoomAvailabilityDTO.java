package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ListRoomAvailabilityDTO implements Serializable {
    private List<RoomAvailabilityDTO> listRoomAvailabilities;
}
