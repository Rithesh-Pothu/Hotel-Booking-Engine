package com.reservation.circuscircus.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class RoomIdDTO implements Serializable {
    private Integer room_id;

}
