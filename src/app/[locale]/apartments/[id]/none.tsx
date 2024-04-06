"use client"
import React from "react";
import apartmentData from "../../../../components/apartmentData"

function page({ params }: { params: { id: string } }) {

console.log('The id is:', params.id)

  const apartment = apartmentData.find((apartment) => apartment.id === params.id);

  if (!apartment) {
    return <div>Apartment nr {params.id} not found here </div>;
  }

  const { imageUrl, guestsNumber, areaSize, apartmentName, description } =
    apartment;
  return (
    <div>
      <h1>{apartmentName}</h1>
      <img src={imageUrl} alt={apartmentName} />
      <p>Guests: {guestsNumber}</p>
      <p>Area: {areaSize} sq. ft.</p>
      <p>Description: {description}</p>
    </div>
  );
}

export default page;
