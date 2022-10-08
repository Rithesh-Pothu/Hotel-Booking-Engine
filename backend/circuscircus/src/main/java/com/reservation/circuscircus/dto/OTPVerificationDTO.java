package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class OTPVerificationDTO implements Serializable {
    private Boolean verified;
    private String message;
}
