package com.reservation.circuscircus.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="components")
public class Component {
    @Id
    private String id;
    private Boolean visible;
    private String page;
}
