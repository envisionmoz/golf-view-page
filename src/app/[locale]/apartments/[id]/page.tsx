"use client"
import React from 'react'
import { useState } from 'react';
import Navbar from "../../../../components/navbar";
import "../../../../css/app.css";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../../../components/footer";
import DatePickerApartment from "../../../../components/datePickerApartment";
import Ameneties from "../../../../components/Ameneties";
import apartmentData from "../../../../components/apartmentData";
import { useSearchParams } from 'next/navigation';
function page({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();

  // const apartmentId = searchParams.get('id')
      const [fullImageSrc, setFullImageSrc] = useState('');
      const selectedCurrency = searchParams.get('currency');
      console.log("the selected currency is ", selectedCurrency)

    const displayFullImage = (src) => {
      setFullImageSrc(src);
      document.body.classList.add('full-image-overlay-active');
    };
  
    const closeFullImage = () => {
      setFullImageSrc('');
      document.body.classList.remove('full-image-overlay-active');
    }

  console.log("The id is:", params.id);

  const apartment = apartmentData.find(
    (apartment) => apartment.id === params.id
  );

  if (!apartment) {
    return <div>Apartment nr {params.id} not found here </div>;
  }

  const { imageUrl, guestsNumber, areaSize, apartmentName, description, price} =
    apartment;
    const childId = apartment.id;

    const childPrice = apartment.price;


  return (
    <>
      <Navbar></Navbar>
      <div className="apartments-hero">
        <div className="image-main-container">
          <div className="image-first-container">
            <div className="image-box">
              <img
                src={"/images/apartments/1/bedroom.jpg"}
                alt="bedroom"
                className="image"
                onClick={() =>
                  displayFullImage("/images/apartments/1/bedroom.jpg")
                }
              ></img>
            </div>
          </div>
          <div className="image-sub-container">
            <div className="image-box">
              <img
                src={"/images/apartments/1/bathtub.jpg"}
                alt="bathtub"
                className="image"
                onClick={() =>
                  displayFullImage("/images/apartments/1/bathtub.jpg")
                }
              />
            </div>
            <div className="image-box">
              <img
                src={"/images/apartments/1/kitchen.jpg"}
                alt="kitchen"
                className="image"
                onClick={() =>
                  displayFullImage("/images/apartments/1/kitchen.jpg")
                }
              />
            </div>
            <div className="image-box">
              <img
                src={"/images/apartments/1/living-room.jpg"}
                alt="living room"
                className="image"
                onClick={() =>
                  displayFullImage("/images/apartments/1/living-room.jpg")
                }
              />
            </div>
            <div className="image-box">
              <img
                src={"/images/apartments/1/sink.jpg"}
                alt="sink"
                className="image"
                onClick={() =>
                  displayFullImage("/images/apartments/1/sink.jpg")
                }
              />
            </div>{" "}
          </div>
        </div>
        {fullImageSrc && (
          <div className="full-image-overlay active">
            <button onClick={closeFullImage} className="close-button">
              X
            </button>
            <button>Previous</button>
            <img
              src={fullImageSrc}
              alt="Full Size Image"
              className="full-image"
            />
            <button>Next</button>
          </div>
        )}
      </div>
      <div className="apartment-description-container">
        <div className="description">
          <h2>Descricao</h2>
          <p>
            {description}
          </p>
        </div>
        <Ameneties/>
        <div className="price">
          <h4>Preco Por Noite</h4>
          <p>{price}.00MZN</p>
        </div>
      </div>
      <DatePickerApartment parameter={{childId, childPrice}}/>
      <Footer></Footer>
    </>
  );
}

export default page;
