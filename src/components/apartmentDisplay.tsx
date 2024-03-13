import React from "react";
import Image from "next/image";
import "../css/app.css";
const ApartmentDisplay = ({ apartmentData }) => {
  const { imageUrl, guestsNumber, areaSize, apartmentName, description } =
    apartmentData;

  // Truncate description to show a limit of 15 words
  const truncatedDescription = description.split(" ").slice(0, 18).join(" ");

  return (
    <div className="apartment-display">
      <div className="ap-image-container">
      <Image
        src={imageUrl}
        alt={apartmentName}
        className="apartment-image"
        width={640}
        height={426}
      />
      </div>
      <div className="apartment-size">
        <p>Guests: {guestsNumber}</p>
        <p>Area: {areaSize} sq. ft.</p>
      </div>
      <div className="apartment-details">
        <h2>{apartmentName}</h2>

        <p>{truncatedDescription}...</p>
      </div>
    </div>
  );
};

export default ApartmentDisplay;
