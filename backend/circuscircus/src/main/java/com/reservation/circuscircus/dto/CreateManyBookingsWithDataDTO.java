package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CreateManyBookingsWithDataDTO implements Serializable {
    private CreateManyBookingsDTO data;
}
