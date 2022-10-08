package com.reservation.circuscircus.repositories;

import com.reservation.circuscircus.models.Component;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComponentRepository extends JpaRepository<Component, String> {
    List<Component> findByPage(String page);

}
