package com.reservation.circuscircus.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
public class AvailabilityIdDto implements Serializable {
    private Integer availability_id;
}
