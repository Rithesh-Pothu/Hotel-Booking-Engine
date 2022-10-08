package com.reservation.circuscircus.controller;

import com.reservation.circuscircus.dto.ImageMapDTO;
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
@RequestMapping("searchpage/")
public class SearchPage {
    @Autowired
    private ImageService imageService;

    private final Logger logger = LoggerFactory.getLogger(SearchPage.class);

    private final String SEARCHPAGE = "searchpage";

    @GetMapping("/images")
    @CrossOrigin
    private ResponseEntity<ImageMapDTO> getImages() {
        logger.info("fetching images for Search Page");
        ImageMapDTO result = imageService.findByPage(SEARCHPAGE);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
