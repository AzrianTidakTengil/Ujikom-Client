import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardMedia, Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Image from "next/image";

const images = [
  "/assets/carousel/img1.jpg",
  "/assets/carousel/img2.jpg",
  "/assets/carousel/img1.jpg",
  "/assets/carousel/img3.jpg",
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
          <Card key={index}>
            <Image src={img} alt={`Slide ${index + 1}`} width={760} height={130} layout="responsive" />
          </Card>
        ))}
      </Slider>
      <IconButton
        sx={{ position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", background: "rgba(255,255,255,0.5)" }}
        onClick={() => sliderRef.current.slickPrev()}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        sx={{ position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)", background: "rgba(255,255,255,0.5)" }}
        onClick={() => sliderRef.current.slickNext()}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default Carousel;
