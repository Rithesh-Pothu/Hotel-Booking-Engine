package com.reservation.circuscircus.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
public class DropDownValueDTO implements Serializable {
    private String id;
    private String pk;
    private String page;
    private String value;
}
