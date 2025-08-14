import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardMedia, Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Image from "next/image";

const images = [
  "/assets/carousel/img1.jpeg",
  "/assets/carousel/img2.jpeg",
  "/assets/carousel/img3.jpeg",
  "/assets/carousel/img4.jpeg",
];

const Carousel = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box position="relative" margin="auto">
      <Slider ref={sliderRef} {...settings}>
        {images.map((img, index) => (
          <div className="w-full aspect-[3/1] relative rounded" key={index}>
            <Image
              src={img}
              alt={`Top Banner Ads: ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
