import Image from "next/image";
import Navbar from "../../components/navbar";
import {useTranslations} from 'next-intl';
import Apartments from "../../components/apartments";
import Location from "../../components/location";
import Footer from "../../components/footer";2
import { FaWifi, FaParking, FaSwimmingPool,FaBroom,FaBreadSlice  } from "react-icons/fa";
import "../../css/app.css"
export default function Home() {
  const ht = useTranslations("Hero");
  const at = useTranslations("Apartments");
  const amt = useTranslations("Amenities");

  return (
    <main>
      <Navbar/>
      
      <div className="hero-section" id="hero">
<h1>{ht("Title")}</h1>
<p>{ht("Subtitle")}</p>
      </div>
      <div className="apartments-section-container" id="apartments">
        <h1>{at("Title")}</h1>
<Apartments/>
      </div>
      <div className="amenities" id="amenities">
        <div className="amenities-image-container">
<Image src={"/images/amenities.jpg"} className="amenities-image" alt="image" width={500} height={522}></Image>
</div>
<div className="description">
<h1>{amt("Title")}</h1>
<p>{amt('Description')}</p>
<ul>
  <li><FaWifi style={{width:'60px', height:'25px'}}/>{amt("Internet")}</li>
  <li><FaParking style={{width:'60px', height:'25px'}}/>{amt("Parking")}</li>
  <li><FaSwimmingPool style={{width:'60px', height:'25px'}}/>{amt("Pool")}</li>
  <li><FaBroom style={{width:'60px', height:'25px'}}/>{amt("Cleaning")}</li>
  <li><FaBreadSlice style={{width:'60px', height:'25px'}}/>{amt("Breakfast")}</li>
</ul>
</div>

      </div>
      <div id="location">
      <Location/>
      </div>
      <Footer/>
    </main>
  );
}
