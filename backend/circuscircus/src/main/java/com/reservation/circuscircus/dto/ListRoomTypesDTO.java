package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ListRoomTypesDTO implements Serializable {
    private List<DetailsDTO> listRoomTypes;
}
