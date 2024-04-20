import React from "react";
import PropTypes from "prop-types";
import { Link, usePathname } from "../../navigation";
import { useEffect, useState, useTransition, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import "../css/popup.css";
import { FaGlobe } from "react-icons/fa";
import LangButton from "./langbutton";

interface LanguageTogglerProps {
  isOverlayVisible: boolean;
}

const LanguageToggler: React.FC<LanguageTogglerProps> = ({
  isOverlayVisible,
}) => {
  const localActive = useLocale();
  const router = useRouter();
const searchParams = useSearchParams();

const activeCurrency = searchParams.get('currency');
  // const price
  const [currencyOptions, SetCurrencyOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("MZN");
  const [conversionRates, setConversionRates] = useState({});
  const [bookingPrice, setBookingPrice] = useState(3500);
  const [isPending, startTransition] = useTransition();
  const [selectedLocale, setSelectedLocale] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const BASE_URL =
  "https://v6.exchangerate-api.com/v6/e38d9104cd321369e784a6d0/latest/MZN";
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

  const onCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    setSelectedLocale(nextLocale);
  };
  const localePrefix = "/pt";

  const currentPage = window.location.pathname.substring(localePrefix.length);
  const handleAlterarClick = () => {
    if (localActive != selectedLocale && selectedLocale != null) {
      startTransition(() => {
        router.replace(
          `/${selectedLocale}/${currentPage}/?currency=${selectedCurrency}`
        );
      });
    } else {
      window.location.reload();
      
    }
    setIsButtonClicked(true);
    console.log("the locale is", selectedLocale, "the page is:", currentPage);
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
              <option value={localActive}> Selecione O Idioma</option>
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
              <option value="MZN">Selecione a sua moeda desejada</option>

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
