package com.reservation.circuscircus.repositories;

import com.reservation.circuscircus.models.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    Optional<Property> findById(Long id);
}
