"use client";
import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/app.css"; // Your custom CSS file for styling
import { FaCalendarAlt } from "react-icons/fa";
import { useRouter, useSearchParams} from "next/navigation";
import { useLocale } from "next-intl";
import { useFormatter } from "next-intl";

type Props  ={
  parameter:{childId: string; childPrice:number};
  
}

function DatePickerApartment({parameter,}: Props) {
  const format = useFormatter();

  const router = useRouter();
  const locale = useLocale();
const searchParams = useSearchParams();
 
const selectedCurrency = searchParams.get('currency');

  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [numberOfExtraGuests, setNumberOfExtraGuests] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  
  const [currencyOptions, SetCurrencyOptions] = useState([]);
  const [conversionRates, setConversionRates] = useState({});

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

  const increaseNumberOfChildren = () => {
    if (numberOfChildren <= 4) {
      setNumberOfChildren((prevNumber) => prevNumber + 1);
    }
  };

  const decreaseNumberOfChildren = () => {
    if (numberOfChildren > 0) {
      setNumberOfChildren((prevNumber) => prevNumber - 1);
    }
  };

  const increaseNumberOfAdults = () => {
    if (numberOfAdults <= 4) {
      setNumberOfAdults((prevNumber) => prevNumber + 1);
    }
  };

  const decreaseNumberOfAdults = () => {
    if (numberOfAdults > 1) {
      setNumberOfAdults((prevNumber) => prevNumber - 1);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const valor = parameter.childPrice * conversionRates[selectedCurrency];
  const taxaOcupacaoExtra = 1000 * conversionRates[selectedCurrency];
  const minArrivalDate = new Date(); // Today
  const maxDepartureDate = new Date();
  maxDepartureDate.setMonth(maxDepartureDate.getMonth() + 6); // Six months from today

  const handleArrivalDateChange = (date: Date | null) => {
    setArrivalDate(date);
    // Adjust departure date if needed
    if (date > departureDate) {
      setDepartureDate(null);
    }
  };

  const handleDepartureDateChange = (date: Date | null) => {
    setDepartureDate(date);
  };

  useEffect(() => {
    calculateTotalPrice();
  },  [arrivalDate, departureDate, valor, numberOfAdults, numberOfChildren]);

  const calculateTotalPrice = () => {
    if (arrivalDate && departureDate) {
      const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
      const days = Math.round(
        Math.abs((departureDate.getTime() - arrivalDate.getTime()) / oneDay)
      ); // Use getTime() to get the timestamp
      const dailyPrice = valor + (days > 1 ? (days - 1) * valor : 0);

      ///escrever a condicao para que o website cobre por visitantes extras
      if (numberOfAdults > 2 || numberOfChildren > 1) {
        setTotalPrice(dailyPrice + 1 * taxaOcupacaoExtra + (days - 1) * taxaOcupacaoExtra );
      } else {
        setTotalPrice(dailyPrice);
      }
    } else {
      setTotalPrice(0);
    }
  };

  const handlePaymentClick = () => {
    const queryParams = new URLSearchParams({
      arrival: arrivalDate.toString().split(" ").slice(1, 4).join(" "),
      departure: departureDate.toString().split(" ").slice(1, 4).join(" "),
      apartment: parameter.childId,
      guests:(numberOfAdults + numberOfChildren).toString(),
      totalPrice: convertedTotal.toString()
    }).toString();
    router.push(`/${locale}/checkout?${queryParams}`);
  };
  
  const convertedTotal = format.number(totalPrice, {style: 'currency', currency:selectedCurrency});
const convertedtaxaOcupacaoExtra = format.number(taxaOcupacaoExtra, {style: 'currency', currency:selectedCurrency});
const convertedDaily = format.number(valor, {style: 'currency', currency:selectedCurrency});

// useEffect (()=>{
//   if (conversionRates[selectedCurrency]) {
//     taxaOcupacaoExtra * conversionRates[selectedCurrency];
//     parameter.childPrice * conversionRates[selectedCurrency];
//   }
// },[])



  return (
    <div className="calendar-section-container">
      <div className="c-s-main-container">
        <div className="calendar-container">
          <DatePicker
            className="calendar"
            showIcon
            selected={arrivalDate}
            onChange={handleArrivalDateChange}
            minDate={minArrivalDate}
            maxDate={maxDepartureDate}
            selectsStart
            startDate={arrivalDate}
            endDate={departureDate}
            dateFormat="dd/MM/yyyy"
            icon={<FaCalendarAlt />}
            inline
          />

          <DatePicker
            className="calendar"
            showIcon
            selected={departureDate}
            onChange={handleDepartureDateChange}
            minDate={arrivalDate || tomorrow}
            maxDate={maxDepartureDate}
            selectsEnd
            startDate={arrivalDate}
            endDate={departureDate}
            dateFormat="MMM d, yy"
            placeholderText={tomorrow.toLocaleDateString()}
            icon={<FaCalendarAlt />}
            inline
          />
        </div>
        <div className="guests-container">
          <div className="guest-box">
            <div className="guest-details">
              <p>
                <b>Adultos</b>
              </p>
              <p>13 anos ou mais</p>
            </div>
            <div className="guests-number">
              <button onClick={decreaseNumberOfAdults}>-</button>
              <p>{numberOfAdults} </p>
              <button onClick={increaseNumberOfAdults}>+</button>
            </div>
          </div>

          <div className="guest-box">
            <div className="guest-details">
              <p>
                <b>Criancas</b>
              </p>
              <p>Menor de 12</p>
            </div>
            <div className="guests-number">
              <button onClick={decreaseNumberOfChildren}>-</button>
              <p>{numberOfChildren} </p>
              <button onClick={increaseNumberOfChildren}>+</button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <div className="reserve-info-container">
          <h4>Informacoes da Reserva</h4>
          <div className="reserve-info">
            <div className="info">
              <p>Chegada:</p>
              <p>
                {arrivalDate
                  ? arrivalDate.toString().split(" ").slice(1, 4).join(" ")
                  : ""}
              </p>
            </div>
            <div className="info">
              <p>Partida:</p>
              <p>
                {departureDate
                  ? departureDate.toString().split(" ").slice(1, 4).join(" ")
                  : ""}
              </p>
            </div>
            <div className="info">
              <p>Apartamento:</p>
              <p>{parameter.childId}</p>
            </div>
          </div>
          <div className="reserva-factura">
            <div>
              <p>Diaria Do Apartamento:</p>
              <p>{convertedDaily}</p>
            </div>
            <div>
              <p>Taxa de Ocupacao Extra(Diaria):</p>
              <p>{convertedtaxaOcupacaoExtra}</p>
            </div>
            <div>
              <p>Total:</p>
              {/* <p>{totalPrice}</p> */}
              <p>{convertedTotal}</p>
            </div>
          </div>
        </div>

        <button onClick={handlePaymentClick} className="process-payment">Proceder Para o Pagamento</button>
      </div>
    </div>
  );
}

export default DatePickerApartment;
