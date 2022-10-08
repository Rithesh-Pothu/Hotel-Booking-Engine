package com.reservation.circuscircus.controller;

import com.reservation.circuscircus.dto.ComponentDTO;
import com.reservation.circuscircus.dto.DropDownValueMapDTO;
import com.reservation.circuscircus.dto.ImageMapDTO;
import com.reservation.circuscircus.dto.ListDTO;
import com.reservation.circuscircus.service.ComponentService;
import com.reservation.circuscircus.service.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("landingpage/")
public class LandingPage {
    @Autowired
    private ComponentService componentService;
    @Autowired
    private ImageService imageService;

    private final Logger logger = LoggerFactory.getLogger(LandingPage.class);
    
    private final String LANDINGPAGE = "landingpage";


    @CrossOrigin
    @GetMapping("/components")
    private ResponseEntity<ListDTO<ComponentDTO>> getComponents() {
        logger.info("fetching components for Landing Page");
        ListDTO<ComponentDTO> components= componentService.getComponents(LANDINGPAGE);
        return new ResponseEntity<>(components, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/dropdownvalues")
    private ResponseEntity<DropDownValueMapDTO> getDropDownValues() {
        logger.info("fetching drop down values for components of Landing Page");
        DropDownValueMapDTO result= componentService.getValues(LANDINGPAGE);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/images")
    private ResponseEntity<ImageMapDTO> getImages() {
        logger.info("fetching images for Search Page");
        ImageMapDTO result = imageService.findByPage(LANDINGPAGE);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
