package com.reservation.circuscircus.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "booking_info")
@Builder
public class BookingInfo {

    @Id
    private Long bookingId;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "traveller_id",
            referencedColumnName = "travellerId"
    )
    private TravellerInfo travellerInfo;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "billing_id",
            referencedColumnName = "billingId"
    )
    private BillingInfo billingInfo;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "payment_id",
            referencedColumnName = "paymentId"
    )
    private PaymentInfo paymentInfo;


}
