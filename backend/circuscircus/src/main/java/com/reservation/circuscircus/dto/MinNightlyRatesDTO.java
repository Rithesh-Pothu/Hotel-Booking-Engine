package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class MinNightlyRatesDTO implements Serializable {
    Map<String, Integer> minNightlyRates;
}
