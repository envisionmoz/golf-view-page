import Image from "next/image";
import "../css/app.css";
import {
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaBroom,
  FaBreadSlice,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

function Ameneties() {
const amt = useTranslations();
  return (
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
  );
}

export default Ameneties;
