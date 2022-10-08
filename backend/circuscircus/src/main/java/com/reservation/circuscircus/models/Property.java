package com.reservation.circuscircus.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table
public class Property {
    @Id
    @Column(name="property_id")
    private Long id;
    private String name;
    private String location;
    private Double vat;
    @ManyToMany
    @JoinTable(
            name = "property_fees",
            joinColumns = @JoinColumn(name="property_id"),
            inverseJoinColumns = @JoinColumn(name="fee_id")
    )
    private List<Fee> fees;
    @ManyToMany
    @JoinTable(
            name = "property_taxes",
            joinColumns = @JoinColumn(name="property_id"),
            inverseJoinColumns = @JoinColumn(name="tax_id")
    )
    private List<Tax> taxes;

}
