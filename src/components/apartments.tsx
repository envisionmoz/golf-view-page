"use client";
import React from "react";
import ApartmentDisplay from "./apartmentDisplay";
import apartmentData from "./apartmentData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Apartments = () => {

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Slider className="slider-container" {...settings}>
      {apartmentData.map((apartment, index) => (
        <div key={apartment.id} >
          <ApartmentDisplay apartmentData={apartment} />
        </div>
      ))}
    </Slider>
  );
};

export default Apartments;
