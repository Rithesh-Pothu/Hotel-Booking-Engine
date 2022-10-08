package com.reservation.circuscircus.repositories;

import com.reservation.circuscircus.models.CurrentBookingId;
import com.reservation.circuscircus.models.CurrentBookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Lock;

import javax.persistence.LockModeType;
import javax.transaction.Transactional;
import java.time.LocalDate;

@Repository
public interface CurrentBookingsRepository extends JpaRepository<CurrentBookings, CurrentBookingId> {
    @Modifying
    @Transactional
//    @Lock(LockModeType.WRITE)
    @Query(value = "insert into current_bookings (`date`, room_type_id) values(?1, ?2)", nativeQuery = true)
    void insertNewRecord(LocalDate currentDate, Long roomTypeId);
}
