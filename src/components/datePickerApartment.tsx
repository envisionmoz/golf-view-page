"use client";
import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/app.css"; // Your custom CSS file for styling
import { FaCalendarAlt } from "react-icons/fa";


function DatePickerApartment() {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minArrivalDate = new Date(); // Today
  const maxDepartureDate = new Date();
  maxDepartureDate.setMonth(maxDepartureDate.getMonth() + 6); // Six months from today

  const handleArrivalDateChange = (date) => {
    setArrivalDate(date);
    // Adjust departure date if needed
    if (date > departureDate) {
      setDepartureDate(null);
    }
  };

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
  };

  return (
    <div className="calendar-section-container">
      <div className="calendar-container">
        <DatePicker
          className="calendar"
          showIcon
          selected={arrivalDate}
          closeOnScroll={(e) => e.target === document}
          onChange={handleArrivalDateChange}
          minDate={minArrivalDate}
          maxDate={maxDepartureDate}
          selectsStart
          startDate={arrivalDate}
          endDate={departureDate}
          dateFormat="MMM d, yy"
          placeholderText={new Date().toLocaleDateString()}
          icon={<FaCalendarAlt />}
          inline
        />

        <DatePicker
          className="calendar"
          showIcon
          selected={departureDate}
          closeOnScroll={(e) => e.target === document}
          onChange={handleDepartureDateChange}
          minDate={tomorrow}
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
      <div>
        <div className="reserve-info-container">
          <h4>Informacoes da Reserva</h4>
          <div className="reserve-info">
            <div className="info">
              <p>Chegada:</p>
              <p>O dia</p>
            </div>
            <div className="info">
              <p>Partida:</p>
              <p>O dia</p>
            </div>
            <div className="info">
              <p>Apartamento:</p>
              <p>O dia</p>
            </div>
          </div>
          <div className="reserva-factura">
            <div>
              <p>Diaria Do Apartamento:</p>
              <p>O valor</p>
            </div>
            <div>
              <p>Taxa de Ocupacao Extra(Diaria):</p>
              <p>O valor</p>
            </div>
            <div>
              <p>Total:</p>
              <p>O valor</p>
            </div>
          </div>
        </div>
        <button>Proceder Para o Pagamento</button>
      </div>
    </div>
  );
}

export default DatePickerApartment;
