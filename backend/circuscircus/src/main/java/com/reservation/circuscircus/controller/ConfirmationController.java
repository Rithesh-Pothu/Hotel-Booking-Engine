package com.reservation.circuscircus.controller;
import com.reservation.circuscircus.dto.BookingIdDTO;
import com.reservation.circuscircus.dto.BookingInfoDTO;
import com.reservation.circuscircus.service.ConfirmationService;
import com.reservation.circuscircus.service.PropertyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/confirmation")
public class ConfirmationController {

    private final Logger logger = LoggerFactory.getLogger(ConfirmationController.class);

    @Autowired
    private ConfirmationService confirmationService;

    @Autowired
    private PropertyService propertyService;

    @GetMapping
    @ResponseBody
    @CrossOrigin
    public ResponseEntity<BookingInfoDTO> getBookingDetailsByBookingId(@RequestParam(name =
            "bookingId") Long bookingId){

        BookingInfoDTO bookingInfoDTO = confirmationService.getBookingDetailsByBookingId(bookingId);

        if(bookingInfoDTO == null)
        {
            BookingInfoDTO bookingInfoDTOForFailure = new BookingInfoDTO();
            bookingInfoDTOForFailure.setMessage("No Bookings found with given Booking ID");
            return new ResponseEntity<>(bookingInfoDTOForFailure, HttpStatus.BAD_REQUEST);
        }

        bookingInfoDTO.setMessage("Fetched Booking Successfully!");
        return new ResponseEntity<>(bookingInfoDTO, HttpStatus.OK);

    }
}
