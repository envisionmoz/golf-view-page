"use client";
import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/app.css"; // Your custom CSS file for styling
import { FaCalendarAlt } from "react-icons/fa";

function DatePickerApartment() {
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [numberOfExtraGuests, setNumberOfExtraGuests] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

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

  const valor = 3500;
  const taxaOcupacaoExtra = 1000;
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
  }, [arrivalDate, departureDate]);

  const calculateTotalPrice = () => {
    if (arrivalDate && departureDate) {
      const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
      const days = Math.round(
        Math.abs((departureDate.getTime() - arrivalDate.getTime()) / oneDay)
      ); // Use getTime() to get the timestamp
      const dailyPrice = valor + (days > 1 ? (days - 1) * valor : 0);

      ///escrever a condicao para que o website cobre por visitantes extras
      if (numberOfAdults > 2 || numberOfChildren > 1) {
        setTotalPrice(dailyPrice + 1 * 1000 + (days - 1) * 1000);
      } else {
        setTotalPrice(dailyPrice);
      }
    } else {
      setTotalPrice(0);
    }
  };

  const handleReserve = () => {
    // Here you can implement logic to process and show data
    // that fits the description and availability
    console.log(
      "Arrival Date:",
      arrivalDate.toString().split(" ").slice(1, 4).join(" ")
    );
    console.log(
      "Departure Date:",
      departureDate.toString().split(" ").slice(1, 4).join(" ")
    );
    console.log("Valor diario:", valor);
    console.log("Total amount:", totalPrice);
    console.log("Number of Guests:", numberOfAdults+numberOfChildren );
  };

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

          {/* <select
            value={numberOfGuests}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "" ||
                (parseInt(value) > 0 && !isNaN(parseInt(value)))
              ) {
                setNumberOfGuests(parseInt(value));
              }
            }}
          >
            <option value="0" style={{ color: "white !important" }}>
              Extra Guests
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select> */}
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
              <p>O dia</p>
            </div>
          </div>
          <div className="reserva-factura">
            <div>
              <p>Diaria Do Apartamento:</p>
              <p>{valor} MZN</p>
            </div>
            <div>
              <p>Taxa de Ocupacao Extra(Diaria):</p>
              <p>{taxaOcupacaoExtra} MZN</p>
            </div>
            <div>
              <p>Total:</p>
              <p>{totalPrice} MZN</p>
            </div>
          </div>
        </div>

        <button onClick={handleReserve} className="process-payment">Proceder Para o Pagamento</button>
      </div>
    </div>
  );
}

export default DatePickerApartment;
