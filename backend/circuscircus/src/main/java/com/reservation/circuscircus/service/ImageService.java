package com.reservation.circuscircus.service;

import com.reservation.circuscircus.dto.ImageDTO;
import com.reservation.circuscircus.dto.ImageMapDTO;
import com.reservation.circuscircus.mapper.ImageMapper;
import com.reservation.circuscircus.repositories.ImageRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ModelMapper modelMapper;

    private final ImageMapper imageMapper = new ImageMapper();

    public ImageMapDTO findByPage(String page) {
        Set<ImageDTO> data = imageRepository.findByPage(page).stream()
                .map(image -> modelMapper.map(image, ImageDTO.class))
                .collect(Collectors.toSet());
        return imageMapper.getImages(data);
    }
}
