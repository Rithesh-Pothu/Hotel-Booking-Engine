package com.reservation.circuscircus.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Data
@Table(name="amenities")
public class Amenity {
    @Id
    private Long amenity_id;
    private String amenity;
    @JsonIgnore
    @ManyToMany(mappedBy = "amenities")
    private Set<RoomType> roomTypes;
}
