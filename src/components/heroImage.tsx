"use client"
import React from 'react'
import { useState } from 'react';
import Image from "next/image";
import "../css/app.css"
function heroImage() {
    const [fullImageSrc, setFullImageSrc] = useState('');

    const displayFullImage = (src) => {
      setFullImageSrc(src);
      document.body.classList.add('full-image-overlay-active');
    };
  
    const closeFullImage = () => {
      setFullImageSrc('');
      document.body.classList.remove('full-image-overlay-active');
    };
  
  
  return (
    <div className="apartments-hero">
    <div className="image-main-container">
      <div className="image-first-container">
        <div className="image-box" >
          <img
            src={"/images/apartments/1/bedroom.jpg"}
            alt="bedroom"
            className="image"
            width={2080}
            height={2080}
            onClick={() => displayFullImage("/images/apartments/1/bedroom.jpg")}
          ></img>
        </div>
      </div>
      <div className="image-sub-container">
        <div className="image-box">
          <img
            src={"/images/apartments/1/bathtub.jpg"}
            alt="bathtub"
            className="image"
            width={1080}
            height={1080}
            onClick={() => displayFullImage("/images/apartments/1/bathtub.jpg")}

          />
        </div>
        <div className="image-box">
          <img
            src={"/images/apartments/1/kitchen.jpg"}
            alt="kitchen"
            className="image"
            width={1080}
            height={1080}
            onClick={() => displayFullImage("/images/apartments/1/kitchen.jpg")}

          />
        </div>
        <div className="image-box">
          <img
            src={"/images/apartments/1/living-room.jpg"}
            alt="living room"
            className="image"
            width={1080}
            height={1080}
            onClick={() => displayFullImage("/images/apartments/1/living-room.jpg")}

          />
        </div>
        <div className="image-box">
          <img
            src={"/images/apartments/1/sink.jpg"}
            alt="sink"
            className="image"
            width={1080}
            height={1080}
            onClick={() => displayFullImage("/images/apartments/1/sink.jpg")}

          />
        </div>{" "}
      </div>
    </div>
    {fullImageSrc && (
        <div className="full-image-overlay active">
                      <button onClick={closeFullImage} className="close-button">X</button>
            <button>Previous</button>
          <img src={fullImageSrc} alt="Full Size Image" className="full-image" />
          <button>Next</button>

        </div>
      )}
  </div>
)
}

export default heroImage