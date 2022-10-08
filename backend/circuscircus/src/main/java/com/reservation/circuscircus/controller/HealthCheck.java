package com.reservation.circuscircus.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping()
public class HealthCheck {

    private final Logger logger = LoggerFactory.getLogger(HealthCheck.class);
    @CrossOrigin
    @GetMapping("/")
    public ResponseEntity<Object> sample(){
        logger.info("Health Check");
        return new ResponseEntity<>("Hello, This is Team - 3", HttpStatus.OK);
    }
}


