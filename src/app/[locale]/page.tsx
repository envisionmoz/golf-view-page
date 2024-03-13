import Image from "next/image";
import Navbar from "../../components/navbar";
import {useTranslations} from 'next-intl';
import Apartments from "../../components/apartments";
import Currency from "../../components/currency";
import Footer from "../../components/footer";
import "../../css/app.css"
export default function Home() {
  const ht = useTranslations("Hero");
  const at = useTranslations("Apartments");
  const amt = useTranslations("Amenities");

  return (
    <main>
      <Navbar/>
      <div className="hero-section">
<h1>{ht("Title")}</h1>
<p>{ht("Subtitle")}</p>
      </div>
      <div className="apartments-section-container">
        <h1>{at("Title")}</h1>
<Apartments/>
      </div>
      <div className="amenities">
        <div className="amenities-image-container">
<Image className="amenities-image" alt="image"></Image>
</div>
<div className="description">
<h1>{amt("Title")}</h1>
<p>{amt('Description')}</p>
<ul>
  <li>{amt("Internet")}</li>
  <li>{amt("Parking")}</li>
  <li>{amt("Pool")}</li>
  <li>{amt("Cleaning")}</li>
  <li>{amt("Breakfast")}</li>
</ul>
</div>

      </div>
      <Footer/>
      {/* <Currency/> */}
    </main>
  );
}
