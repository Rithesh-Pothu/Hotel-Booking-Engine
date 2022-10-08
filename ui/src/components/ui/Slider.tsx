import { A11y, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { ROOM_IMAGES } from "../../links";
import axios from "axios";

// import "../../index.css"

interface SliderProps {
    title?: string;
    height?: number | string,
    images?: string[]
}

export default ({ title, height = "auto", images }: SliderProps) => {



    // const images = [image1, image2, image3];
    // const images: any[] = [
    //     "https://images.ctfassets.net/d54vtp3the1y/3rPRxoKNcKIFCInxEfBFie/b305075969b97bc55920611cbcbb42cf/CCLV_0013_West_Tower_King.jpg?fit=scale&w=800&h=400",
    //     "https://images.ctfassets.net/d54vtp3the1y/4Jpmvh4V2MRIi7IwlFp81t/80c38860c267b6e815425fc053f68494/CCLV_0012_West_Tower_King_2.jpg?fit=scale&w=800&h=400",
    // ];
    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
            >
                {images && images.map((image, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div style={{ position: "relative", width: "100vw", height: height }}>
                                <img
                                    className="image"
                                    src={image}
                                    alt="carousel-image"
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        color: "white",
                                        bottom: 25,
                                        left: "15%",
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    <Typography variant="h3">{title}</Typography>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};
