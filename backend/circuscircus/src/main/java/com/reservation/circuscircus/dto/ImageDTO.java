package com.reservation.circuscircus.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
public class ImageDTO implements Serializable {
    private Long id;
    private String divId;
    private String url;
    private String page;
}
