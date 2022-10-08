package com.reservation.circuscircus.controller;

import com.reservation.circuscircus.dto.*;
import com.reservation.circuscircus.service.BookingInfoService;
import com.reservation.circuscircus.service.CheckoutService;
import com.reservation.circuscircus.service.GraphQLService;
import com.reservation.circuscircus.service.OTPService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/")
public class CancelController {

    @Autowired
    private BookingInfoService bookingInfoService;
    @Autowired
    private GraphQLService graphQLService;
    @Autowired
    private OTPService otpService;

    private final Logger logger = LoggerFactory.getLogger(CancelController.class);

    @PostMapping("/verify/otp")
    @CrossOrigin
    private ResponseEntity<OTPVerificationDTO> verifyOtp(@RequestBody Map<String, String> otpDetails) {
        OTPVerificationDTO response = otpService.validateOtp(otpDetails);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/cancel")
    @CrossOrigin
    private ResponseEntity cancelBooking(@RequestParam Long bookingId) {
        logger.info("cancelling a booking with id: " + bookingId);
        String response = graphQLService.cancelBooking(bookingId);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }
}
