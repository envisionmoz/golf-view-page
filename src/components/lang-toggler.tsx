import React from "react";
import PropTypes from "prop-types";
import { Link, usePathname } from "../../navigation";
import { useEffect, useState } from "react";

import "../css/popup.css";

interface LanguageTogglerProps {
  isOverlayVisible: boolean;
}

const LanguageToggler: React.FC<LanguageTogglerProps> = ({
  isOverlayVisible,
}) => {
  const pathname = usePathname();
  const BASE_URL =
    "https://v6.exchangerate-api.com/v6/4d8b22b0e7ac78a0bde870fb/latest/MZN";
  const [currencyOptions, SetCurrencyOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("MZN");
  const [conversionRates, setConversionRates] = useState({});
  const [bookingPrice, setBookingPrice] = useState(3500);

  console.log(currencyOptions);
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const selectedCurrencies = [
          "MZN",
          "USD",
          "EUR",
          "ZAR",
          "CNY",
          "INR",
          "BRL",
        ];
        const filteredOptions = selectedCurrencies.filter(
          (curr) => data.conversion_rates[curr] !== undefined
        );
        SetCurrencyOptions(filteredOptions);
        setConversionRates(data.conversion_rates);
      })
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  const handleCurrencyChange = (event) => {
    const currency = event.target.value;
    setSelectedCurrency(currency);

    // Update booking price based on the selected currency
    if (conversionRates[currency]) {
      setBookingPrice(3500 * conversionRates[currency]);
    }
  };

  return (
    <>
      {isOverlayVisible && (
        <div className="pop-up-container">
          
          <div>
            <h1>Idioma e Moeda</h1>
          </div>
          <div className="languages">
            <select className="select-container">
              <option value="">Select Language</option>
              <option value="pt">
                <Link href={pathname} locale="pt">
                  Português
                </Link>
              </option>
              <option value="en">
                <Link href={pathname} locale="en">
                  English
                </Link>
              </option>
            </select>
          </div>
          <div className="currencies">
        <select  value={selectedCurrency} onChange={handleCurrencyChange} className="select-container">
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>

              {currency}
            </option>
          ))}
        </select>
      </div>
        </div>
      )}
    </>
  );
};

LanguageToggler.propTypes = {
  isOverlayVisible: PropTypes.bool.isRequired,
};

export default LanguageToggler;
