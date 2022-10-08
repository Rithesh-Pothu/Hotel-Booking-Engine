package com.reservation.circuscircus.repositories;

import com.reservation.circuscircus.models.Constant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConstantRepository extends JpaRepository<Constant, String> {
}
