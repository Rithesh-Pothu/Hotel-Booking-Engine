package com.reservation.circuscircus.controller;

import com.reservation.circuscircus.dto.*;
import com.reservation.circuscircus.service.CheckoutService;
import com.reservation.circuscircus.service.ConstantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/checkoutpage")
public class CheckoutController {
    @Autowired
    private ConstantService constantService;
    private final Logger logger = LoggerFactory.getLogger(CheckoutController.class);

    @Autowired
    private CheckoutService checkoutService;



    @ResponseBody
    @CrossOrigin
    @PostMapping("/")
    public ResponseEntity<CustomMessageDTO> saveTravellerInfoBillingInfoAndPaymentInfo
            (@RequestBody BookingInfoDTO bookingInfoDTO) {
        logger.info(String.valueOf(bookingInfoDTO));

        BookingIdDTO bookingIdDTO = checkoutService.saveBookingInfo(bookingInfoDTO);

        if(bookingIdDTO == null)
        {
            logger.info("ROOMS ARE UNAVAILABLE FOR GIVEN DATE, PLEASE TRY AGAIN!");
           return new ResponseEntity<>(CustomMessageDTO.builder()
                   .message("ROOMS ARE UNAVAILABLE FOR GIVEN DATE, PLEASE TRY AGAIN!!")
                   .build(), HttpStatus.BAD_REQUEST);
        }

        logger.info("ROOMS BOOKED SUCCESSFULLY!");

        return new ResponseEntity<>( CustomMessageDTO.builder()
                .message("Booked Successfully!")
                .data(bookingIdDTO)
                .build(), HttpStatus.OK);
    }


    @ResponseBody
    @GetMapping("/details")
    @CrossOrigin
    private ResponseEntity<ConstantMapDTO> getRoomDetails() {
        logger.info("fetching checkOut details for Checkout Page");
        ConstantMapDTO constantMap = constantService.findAll();
        return new ResponseEntity<>(constantMap, HttpStatus.OK);
    }

    @ResponseBody
    @CrossOrigin
    @PostMapping("/bookings")
    public ResponseEntity<ListDTO<BookingInfoDTO>> findByEmail(@RequestBody EmailDTO email){
        logger.info(String.valueOf(email));
        ListDTO<BookingInfoDTO> myBookings = checkoutService.findByEmail(email.getEmail());
        return new ResponseEntity<>(myBookings, HttpStatus.OK);
    }
}
