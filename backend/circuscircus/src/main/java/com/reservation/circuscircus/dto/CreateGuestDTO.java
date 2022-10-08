package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CreateGuestDTO implements Serializable {
    private GraphQlGuestDTO createGuest;
}
