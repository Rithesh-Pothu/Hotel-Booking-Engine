package com.reservation.circuscircus.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="constants")
public class Constant {
    @Id
    private String head;
    private String value;
}
