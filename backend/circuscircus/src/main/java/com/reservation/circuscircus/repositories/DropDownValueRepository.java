package com.reservation.circuscircus.repositories;

import com.reservation.circuscircus.models.DropDownValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface DropDownValueRepository extends JpaRepository<DropDownValue, String> {
    List<DropDownValue> findByPage(String page);
}
