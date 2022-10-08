package com.reservation.circuscircus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TravellerInfoDTO {
    @NotNull
    @NotBlank(message = "First Name must not be null and must contain 1 or more characters")
    private String firstName;

    @NotNull
    @NotBlank(message = "Last Name must not be null and must contain 1 or more characters")
    private String lastName;

    @NotNull
    @NotBlank(message = "Phone Number must not be empty")
    @Pattern(regexp = "\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|\n" +
            "2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|\n" +
            "4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$", message = "Phone Number should be valid")
    private String phone;


    @NotNull
    @NotBlank(message = "Email should not be empty")
    @Email(message = "Email should be valid")
    private String email;
}
