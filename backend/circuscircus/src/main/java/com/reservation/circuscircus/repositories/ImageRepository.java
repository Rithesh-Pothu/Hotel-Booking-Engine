package com.reservation.circuscircus.repositories;

import com.reservation.circuscircus.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    Set<Image> findByPage(String page);
}