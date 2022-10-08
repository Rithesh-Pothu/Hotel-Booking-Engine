package com.reservation.circuscircus.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table
public class Tax {
    @Id
    @Column(name="tax_id")
    private Long id;
    private String name;
    private Double percent;
}
