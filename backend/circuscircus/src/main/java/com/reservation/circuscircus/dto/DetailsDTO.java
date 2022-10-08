package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class DetailsDTO implements Serializable {
    private Integer room_type_id;
    private Integer area_in_square_feet;
    private Integer double_bed;
    private Integer max_capacity;
    private Integer single_bed;
    private String room_type_name;
    private List<RoomRateDTO> room_rates;
}
