package com.reservation.circuscircus.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Component
public class PaymentInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "expiry_month")
    private String expiryMonth;

    @Column(name= "expiry_year")
    private String expiryYear;

    @Column(name = "cvv_code")
    private String cvvCode;
}
