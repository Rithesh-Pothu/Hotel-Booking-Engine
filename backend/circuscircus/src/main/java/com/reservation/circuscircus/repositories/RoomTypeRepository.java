package com.reservation.circuscircus.repositories;

import com.reservation.circuscircus.models.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, String> {
}