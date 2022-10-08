package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class RateDateDTO implements Serializable {
    private Integer basic_nightly_rate;
    private Date date;
}
