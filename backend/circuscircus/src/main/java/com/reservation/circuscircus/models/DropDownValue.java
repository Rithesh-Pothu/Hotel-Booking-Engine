package com.reservation.circuscircus.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="dropdown_values")
public class DropDownValue {
    private String id;
    @Id
    private String pk;
    private String page;
    private String value;
}
