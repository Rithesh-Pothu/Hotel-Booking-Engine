package com.reservation.circuscircus.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class DataDTO<T> implements Serializable {
    private T data;
}
