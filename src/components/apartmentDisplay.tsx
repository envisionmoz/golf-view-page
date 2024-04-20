import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../css/app.css";
import { useRouter, useSearchParams} from 'next/navigation';
import { useLocale } from "next-intl";

const ApartmentDisplay = ({ apartmentData }) => {
  const { id, imageUrl, guestsNumber, areaSize, apartmentName, description } =
    apartmentData;
    const router = useRouter();
    const searchParams = useSearchParams();

    const locale = useLocale();
const selectedCurrency = searchParams.get('currency');
  const truncatedDescription = description.split(" ").slice(0, 18).join(" ");

  const handleReservarClick = () => {
    // Navigate to the dynamic page for the selected apartment
    router.push(`/${locale}/apartments/${apartmentData.id}?currency=${selectedCurrency}`);    
  };
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
        <button onClick={handleReservarClick}>Reservar Agora</button>
      </div>
    </div>
  );
};

export default ApartmentDisplay;
