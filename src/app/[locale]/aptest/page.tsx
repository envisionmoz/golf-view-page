import React from "react";
import Image from "next/image";
import Navbar from "../../../components/navbar";
import { useTranslations } from "next-intl";
import "../../../css/app.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaBroom,
  FaBreadSlice,
} from "react-icons/fa";
import Footer from "../../../components/footer";
import DatePickerApartment from "../../../components/datePickerApartment";
import ImageHero from "../../../components/Ameneties";
function page() {
  const amt = useTranslations("Amenities");


  return (
    <>
      <Navbar></Navbar>
      <ImageHero/>
      <div className="apartment-description-container">
        <div className="description">
          <h2>Descricao</h2>
          <p>
            Este magnífico e requintado apartamento possui dois elegantes
            quartos, sendo um deles uma suíte, proporcionando o máximo conforto.
            A espaçosa sala de estar é ideal para momentos de convívio, enquanto
            a cozinha, ampla e funcional, atende às necessidades culinárias mais
            exigentes. Além disso, conta com uma área de serviço independente,
            garantindo praticidade e organização. Sua localização privilegiada
            permite desfrutar da proximidade com a praia, a apenas 15 minutos de
            distância, proporcionando uma experiência residencial única e
            luxuosa.
          </p>
        </div>
        <div className="apartment-amenities">
          <h2>Comodidades</h2>
          <ul>
            <li>
              <FaWifi style={{ width: "60px", height: "25px" }} />
              {amt("Internet")}
            </li>
            <li>
              <FaParking style={{ width: "60px", height: "25px" }} />
              {amt("Parking")}
            </li>
            <li>
              <FaSwimmingPool style={{ width: "60px", height: "25px" }} />
              {amt("Pool")}
            </li>
            <li>
              <FaBroom style={{ width: "60px", height: "25px" }} />
              {amt("Cleaning")}
            </li>
            <li>
              <FaBreadSlice style={{ width: "60px", height: "25px" }} />
              {amt("Breakfast")}
            </li>
          </ul>
        </div>
        <div className="price">
          <h4>Preco Por Noite</h4>
          <p>3500.00MZN</p>
        </div>
      </div>
      <DatePickerApartment />
      <Footer></Footer>
    </>
  );
}

export default page;
