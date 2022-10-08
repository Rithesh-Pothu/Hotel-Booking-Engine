package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@Data
public class ListDTO<T> implements Serializable {
    private List<T> data;
}
