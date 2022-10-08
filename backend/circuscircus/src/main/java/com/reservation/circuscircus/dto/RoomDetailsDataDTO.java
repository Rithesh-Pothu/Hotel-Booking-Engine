package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class RoomDetailsDataDTO implements Serializable {
    private ListRoomTypesDTO data;
}
