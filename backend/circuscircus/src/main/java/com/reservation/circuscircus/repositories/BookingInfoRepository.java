package com.reservation.circuscircus.repositories;

import com.reservation.circuscircus.models.BookingInfo;
import com.reservation.circuscircus.models.TravellerInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookingInfoRepository extends JpaRepository<BookingInfo, Long> {
    BookingInfo findByTravellerInfo(TravellerInfo travellerInfo);
}
