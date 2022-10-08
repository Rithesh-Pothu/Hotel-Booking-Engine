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
@Table(name="billing_info")
@Builder
@Component
public class BillingInfo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long billingId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="mailing_address_1")
    private String mailingAddress1;

    @Column(name = "mailing_address_2")
    private String mailingAddress2;

    private String country;
    private String city;
    private String state;
    private String zip;
    private String phone;
    private String email;
}
