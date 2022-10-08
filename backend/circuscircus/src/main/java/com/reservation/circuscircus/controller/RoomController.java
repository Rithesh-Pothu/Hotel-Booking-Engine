package com.reservation.circuscircus.controller;

import com.reservation.circuscircus.dto.MinNightlyRatesDTO;
import com.reservation.circuscircus.dto.RoomDetailsTaxDTO;
import com.reservation.circuscircus.service.GraphQLService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("rooms/")
public class RoomController {

    @Autowired
    private GraphQLService graphQLService;
    private final Logger logger = LoggerFactory.getLogger(RoomController.class);

    @GetMapping("/minnightlyrates")
    @CrossOrigin
    private ResponseEntity<MinNightlyRatesDTO> minNightlyRates(@RequestParam(name="propertyId") String propertyId) {
        logger.info("fetching Minimum Nightly Rates");
        MinNightlyRatesDTO minRates = graphQLService.getRates(propertyId);
        return new ResponseEntity<>(minRates, HttpStatus.OK);
    }

    @GetMapping("/roomdetails")
    @CrossOrigin
    private ResponseEntity<RoomDetailsTaxDTO> getRoomDetails(@RequestParam Map<String, String> allParams) {
        logger.info("fetching room details for Search Page");
        RoomDetailsTaxDTO roomDetails = graphQLService.getRoomDetails(allParams);
        return new ResponseEntity<>(roomDetails, HttpStatus.OK);
    }
}
