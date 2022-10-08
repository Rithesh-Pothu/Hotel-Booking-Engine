package com.reservation.circuscircus.mapper;

import com.reservation.circuscircus.dto.ImageDTO;
import com.reservation.circuscircus.dto.ImageMapDTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class ImageMapper {

    public ImageMapDTO getImages(Set<ImageDTO> images){
        Map<String, ArrayList<String>> result = new HashMap<>();
        for(ImageDTO image: images){
            if(!result.containsKey(image.getDivId())) result.put(image.getDivId(), new ArrayList<>());
            result.get(image.getDivId()).add(image.getUrl());
        }
        return new ImageMapDTO(result);
    }
}
