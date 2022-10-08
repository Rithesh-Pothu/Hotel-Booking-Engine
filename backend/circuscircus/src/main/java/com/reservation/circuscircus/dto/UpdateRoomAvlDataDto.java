package com.reservation.circuscircus.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class UpdateRoomAvlDataDto implements Serializable {
    private UpdateRoomAvlDto data;
}
