"use client"
import React from "react";
import apartmentData from "../../../../components/apartmentData"
import { useSearchParams } from "next/navigation";

function page() {
  const searchParams = useSearchParams();

  const apartmentId = searchParams.get('id')


  const apartment = apartmentData.find((apartment) => apartment.id === apartmentId);

  if (!apartment) {
    return <div>Apartment nr {apartmentId} not found here </div>;
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
