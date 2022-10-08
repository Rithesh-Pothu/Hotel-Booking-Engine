package com.reservation.circuscircus.repositories;

import com.reservation.circuscircus.models.BookingInfo;
import com.reservation.circuscircus.models.TravellerInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TravellerInfoRepository extends JpaRepository<TravellerInfo, Long> {
    List<TravellerInfo> getTravellerInfoByEmail(String email);
}
