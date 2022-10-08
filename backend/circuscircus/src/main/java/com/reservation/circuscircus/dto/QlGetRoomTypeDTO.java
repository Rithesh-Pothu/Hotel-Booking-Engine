package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QlGetRoomTypeDTO implements Serializable {
    private QlRoomTypeNameDTO getRoomType;
}
