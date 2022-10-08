package com.reservation.circuscircus.controller;

import com.reservation.circuscircus.dto.PropertyRatesDTO;
import com.reservation.circuscircus.service.PropertyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("property/")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;
    private final Logger logger = LoggerFactory.getLogger(PropertyController.class);

    @GetMapping("/rates")
    @CrossOrigin
    private ResponseEntity<PropertyRatesDTO> getRoomDetails(@RequestParam Long propertyId) {
        logger.info("fetching room details for Search Page");
        PropertyRatesDTO roomDetails = propertyService.getPropertyRates(propertyId);
        return new ResponseEntity<>(roomDetails, HttpStatus.OK);
    }
}

