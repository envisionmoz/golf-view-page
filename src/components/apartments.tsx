import React from "react";
import ApartmentDisplay from "./apartmentDisplay";

const Apartments = () => {
  const apartmentData1 = {
    imageUrl: "/images/apartments/apartmenttest.jpg",
    guestsNumber: 4,
    areaSize: 1200,
    apartmentName: "Cozy Retreat",
    description:
      "Este magnífico e requintado apartamento possui dois elegantes quartos, sendo um deles uma suíte, proporcionando o máximo conforto. A espaçosa sala de estar é ideal para momentos de convívio, enquanto a cozinha, ampla e funcional, atende às necessidades culinárias mais exigentes. Além disso, conta com uma área de serviço independente, garantindo praticidade e organização. Sua localização privilegiada permite desfrutar da proximidade com a praia, a apenas 15 minutos de distância, proporcionando uma experiência residencial única e luxuosa.",
  };

  const apartmentData2 = {
    imageUrl: "/images/apartments/apartmenttest.jpg",
    guestsNumber: 2,
    areaSize: 800,
    apartmentName: "Sunset View",
    description:
      "Enjoy breathtaking sunset views from this beautiful apartment.",
  };

  const apartmentData3 = {
    imageUrl: "/images/apartments/apartmenttest.jpg",
    guestsNumber: 6,
    areaSize: 1500,
    apartmentName: "Luxury Penthouse",
    description:
      "Indulge in luxury with this spacious penthouse offering top-notch facilities.",
  };

  return (
    <div className="apartments-section">
      <ApartmentDisplay apartmentData={apartmentData1} />
      <ApartmentDisplay apartmentData={apartmentData2} />
      <ApartmentDisplay apartmentData={apartmentData3} />
    </div>
  );
};

export default Apartments;
