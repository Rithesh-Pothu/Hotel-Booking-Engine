package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.Map;

@Data
@AllArgsConstructor
public class ConstantMapDTO implements Serializable {
    private Map<String, String> data;
}
