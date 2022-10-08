package com.reservation.circuscircus.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table
public class Fee {
    @Id
    @Column(name="fee_id")
    private Long id;
    private String name;
    private Double amount;
}
