package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Map;

@Data
@AllArgsConstructor
public class ImageMapDTO {
    private Map<String, ArrayList<String>> data;
}
