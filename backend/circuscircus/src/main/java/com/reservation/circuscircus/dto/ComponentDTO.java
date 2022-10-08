package com.reservation.circuscircus.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ComponentDTO implements Serializable {
    private String id;
    private Boolean visible;
    private String page;
}
