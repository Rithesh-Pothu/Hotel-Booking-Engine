package com.reservation.circuscircus.service;

import com.reservation.circuscircus.repositories.BookingInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingInfoService {

    @Autowired
    private BookingInfoRepository bookingInfoRepository;

    public void cancelBooking(Long bookingId) {
        bookingInfoRepository.deleteById(bookingId);
    }
    public Boolean isBooked(Long bookingId) {
        return bookingInfoRepository.existsById(bookingId);
    }
}
