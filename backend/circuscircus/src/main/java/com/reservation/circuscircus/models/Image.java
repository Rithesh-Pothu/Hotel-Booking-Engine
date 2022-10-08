package com.reservation.circuscircus.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="images")
public class Image {
    @Id
    private Long id;
    @Column(name="div_id")
    private String divId;
    private String url;
    private String page;
}
