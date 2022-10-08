package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomMessageDTO<T> implements Serializable {
    private String message;
    private T data;
}
