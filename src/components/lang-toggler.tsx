import React from "react";
import PropTypes from "prop-types";
import { Link, usePathname } from "../../navigation";
import { useEffect, useState, useTransition, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import "../css/popup.css";
import { FaGlobe } from "react-icons/fa";

interface LanguageTogglerProps {
  isOverlayVisible: boolean;
}

const LanguageToggler: React.FC<LanguageTogglerProps> = ({
  isOverlayVisible,
}) => {
  const localActive = useLocale();
  const router = useRouter();
  const BASE_URL =
    "https://v6.exchangerate-api.com/v6/4d8b22b0e7ac78a0bde870fb/latest/MZN";
  const [currencyOptions, SetCurrencyOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("MZN");
  const [conversionRates, setConversionRates] = useState({});
  const [bookingPrice, setBookingPrice] = useState(3500);
  const [isPending, startTransition] = useTransition();
  const [selectedLocale, setSelectedLocale] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

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

  // useEffect(() => {
  //   console.log("the currency is", selectedCurrency);

  //   // Update booking price based on the selected currency
  //   if (conversionRates[selectedCurrency]) {
  //     setBookingPrice(3500 * conversionRates[selectedCurrency]);
  //   }
  // }, [selectedCurrency, conversionRates]);

  const onCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
    // Update booking price based on the selected currency
    if (conversionRates[currency]) {
      setBookingPrice(3500 * conversionRates[currency]);
    }
  };
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    setSelectedLocale(nextLocale);
  };

  const handleAlterarClick = () => {
    if (localActive != selectedLocale) {
      startTransition(() => {
        router.replace(`/${selectedLocale}`);
      });
    }else{
      window.location.reload();
    }
    setIsButtonClicked(true);
  };

  return (
    <>
      {isOverlayVisible && (
        <div className="pop-up-container">
          <div>
            <h1>Idioma e Moeda</h1>
          </div>
          <div className="languages">
            <select
              className="select-container"
              disabled={isButtonClicked}
              onChange={onSelectChange}
            >
              <option> Selecione O Idioma</option>
              <option value="pt">Português</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="currencies">
            <select
              className="select-container"
              disabled={isButtonClicked}
              onChange={onCurrencyChange}
            >
              <option>Selecione a sua moeda desejada</option>

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
