package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QlRoomDTO implements Serializable {
    private QlRoomTypeIdDTO room;
}
