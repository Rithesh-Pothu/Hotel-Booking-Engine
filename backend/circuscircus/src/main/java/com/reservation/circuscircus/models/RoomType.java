package com.reservation.circuscircus.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table
public class RoomType {
    @Id
    @Column(name="room_type")
    private String roomType;
    @Column(name = "description")
    private String description;
    private Double rating;
    private Long reviews;

    @ManyToMany
    @JoinTable(
            name = "room_type_amenities",
            joinColumns = @JoinColumn(name="room_type"),
            inverseJoinColumns = @JoinColumn(name="amenity_id")
    )
    private List<Amenity> amenities;

    @ManyToMany
    @JoinTable(
            name = "room_type_promotions",
            joinColumns = @JoinColumn(name="room_type"),
            inverseJoinColumns = @JoinColumn(name="promotion_id")
    )
    private List<Promotion> promotions;

    @ManyToMany
    @JoinTable(
            name = "room_type_meal_deals",
            joinColumns = @JoinColumn(name="room_type"),
            inverseJoinColumns = @JoinColumn(name="deal_id")
    )
    private List<MealDeal> mealDeals;
}
