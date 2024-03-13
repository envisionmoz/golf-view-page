"use client";
import { useEffect, useState } from "react";

function currencyPage() {
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
        const selectedCurrencies = ['MZN', 'USD', 'EUR', 'ZAR', 'CNY', 'INR', 'BRL'];
        const filteredOptions = selectedCurrencies.filter(curr => data.conversion_rates[curr] !== undefined);
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
      <div>
        <label>Select Currency: </label>
        <select  value={selectedCurrency} onChange={handleCurrencyChange}>
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>



      {selectedCurrency && (
          <p>Booking Price: {bookingPrice} {selectedCurrency}</p>
      )}

    </>
  );
}
export default currencyPage;
