import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../css/app.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import apartmentData from "./apartmentData";
import { useTranslations } from "next-intl";

const ApartmentDisplay = ({ apartmentData }) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Apartment");
  const p = useTranslations("Apartments");


  const locale = useLocale();
  const selectedCurrency = searchParams.get('currency') === null ? 'MZN' : searchParams.get('currency');
  const apartmentDescription = t(apartmentData.description);
  const truncatedDescription = apartmentDescription.split(" ").slice(0, 18).join(" ");

  const handleReservarClick = () => {
    // Navigate to the dynamic page for the selected apartment
    router.push(
      `/${locale}/apartments/${apartmentData.id}?currency=${selectedCurrency}`
    );
  };
  return (
    <div className="apartment-display">
      <div className="ap-image-container">
        <Image
          src={apartmentData.imageUrl}
          alt={apartmentData.apartmentName}
          className="apartment-image"
          width={640}
          height={426}
        />
      </div>
      <div className="apartment-size">
        <p>{p('GUEST')}: {apartmentData.guestsNumber}</p>
        <p>Area: {apartmentData.areaSize} m2</p>
      </div>
      <div className="apartment-details">
        <h2>{t(apartmentData.apartmentName)}</h2>

        <p>{truncatedDescription}...</p>
        <button onClick={handleReservarClick}>{p('BOOK')}</button>
      </div>
    </div>
  );
};

export default ApartmentDisplay;
