import React from "react";
import PropTypes from "prop-types";
import { Link, usePathname } from "../../navigation";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import "../css/popup.css";

interface LanguageTogglerProps {
  isOverlayVisible: boolean;
}

const LanguageToggler: React.FC<LanguageTogglerProps> = ({
  isOverlayVisible,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("");
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

  const handleLanguageSelect = (locale) => {
    setSelectedLanguage(locale);
  };

  const handleAlterarClick = () => {
    // Here, you can perform any action needed when "Alterar" button is clicked
    console.log("Selected currency:", selectedCurrency);
    console.log("Selected language:", selectedLanguage);
    router.push(router.pathname, undefined, { locale: selectedLanguage });
    window.location.reload();
  };
  return (
    <>
      {isOverlayVisible && (
        <div className="pop-up-container">
          <div>
            <h1>Idioma e Moeda</h1>
          </div>
          <div className="languages">
            <button
              className={selectedLanguage === "pt" ? "selected" : ""}
              onClick={() => handleLanguageSelect("pt")}
            >
              Português
            </button>

            <button
              className={selectedLanguage === "en" ? "selected" : ""}
              onClick={() => handleLanguageSelect("en")}
            >
              English
            </button>
            {selectedLanguage && (
            <div>
              <Link href={pathname} locale={selectedLanguage}>
                {selectedLanguage === 'pt' ? 'Português' : 'English'}
              </Link>
            </div>
          )}
          </div>
          <div className="currencies">
            <select
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="select-container"
            >
              {currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAlterarClick}>Alterar</button>
        </div>
      )}
    </>
  );
};

LanguageToggler.propTypes = {
  isOverlayVisible: PropTypes.bool.isRequired,
};

export default LanguageToggler;
