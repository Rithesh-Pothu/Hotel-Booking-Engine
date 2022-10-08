package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class GraphQlGuestDTO implements Serializable {
    private Long guest_id;
    private String guest_name;
}
