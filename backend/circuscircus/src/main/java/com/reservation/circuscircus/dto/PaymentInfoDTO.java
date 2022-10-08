package com.reservation.circuscircus.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentInfoDTO {
    @NotNull
    @NotBlank(message = "Card Number should not be empty")
    private String cardNumber;

    @NotNull
    @NotBlank(message = "Expiry Month should not be empty")
    @Size(min = 2, max = 2, message = "Expiry Month should contain exactly 2 Digits")
    private String expiryMonth;

    @NotNull
    @NotBlank(message = "Expiry Year should not be empty")
    @Size(min = 2, max = 2, message = "Expiry Year should contain exactly 2 Digits")
    private String expiryYear;

    @NotNull
    @NotBlank(message = "Expiry Month should not be empty")
    @Size(min = 3, max = 4, message = "Expiry Month should contain 3-4 digits")
    private String cvvCode;
}
