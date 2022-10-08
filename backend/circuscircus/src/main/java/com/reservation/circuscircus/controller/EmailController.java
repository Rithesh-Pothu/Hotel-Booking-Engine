package com.reservation.circuscircus.controller;

import com.reservation.circuscircus.service.BookingInfoService;
import com.reservation.circuscircus.service.EmailService;
import com.reservation.circuscircus.service.OTPService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/email/send")
public class EmailController {

    @Autowired
    private EmailService emailService;
    @Autowired
    private OTPService otpService;
    @Autowired
    private BookingInfoService bookingInfoService;

    private final Logger logger = LoggerFactory.getLogger(EmailController.class);

    @PostMapping("/otp")
    private ResponseEntity sendOtp(@RequestBody Map<String, String> emailDetails){
        logger.info("sending an otp");
        if(!bookingInfoService.isBooked(Long.valueOf(emailDetails.get("bookingId")))) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        otpService.sendOtpMail(emailDetails.get("receipient"), emailDetails.get("bookingId"));
        return new ResponseEntity("", HttpStatus.OK);
    }

    @PostMapping("/roomdetails")
    private ResponseEntity sendRoomDetails(@RequestBody Map<String, String> emailDetails) {
        logger.info("sending an email with room details");
        return new ResponseEntity<>("", emailService.sendHtmlMail(emailDetails)?HttpStatus.OK:HttpStatus.INTERNAL_SERVER_ERROR);
    }
}