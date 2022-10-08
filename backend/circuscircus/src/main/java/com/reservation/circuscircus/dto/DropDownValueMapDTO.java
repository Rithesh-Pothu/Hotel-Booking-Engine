package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Map;

@AllArgsConstructor
@Data
public class DropDownValueMapDTO {
    private Map<String, ArrayList<Map<String, String>>> dropDownValues;
}
