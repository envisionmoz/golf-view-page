import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/popup.css";
import { FaCalendarAlt } from "react-icons/fa";

interface LanguageTogglerProps {
  isOverlayVisible: boolean;
}

const ReserveToggler: React.FC<LanguageTogglerProps> = ({
  isOverlayVisible,
}) => {
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

  const handleReserve = () => {
    // Here you can implement logic to process and show data
    // that fits the description and availability
    console.log("Arrival Date:", arrivalDate);
    console.log("Departure Date:", departureDate);
    console.log("Number of Guests:", numberOfGuests);
  };
  return (
    <>
      {isOverlayVisible && (
        <div className="reserve-container">
          <form>
            <DatePicker
              className="date-picker-container"
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
              icon={<FaCalendarAlt  />}
            />

            <DatePicker
              className="date-picker-container"
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
            />
            <select
              value={numberOfGuests}
              onChange={(e) => {
                const value = e.target.value;
                // Ensure the value is a positive number or an empty string
                if (
                  value === "" ||
                  (parseInt(value) > 0 && !isNaN(parseInt(value)))
                ) {
                  setNumberOfGuests(value);
                }
              }}
            >
              <option value="" style={{ color: "white !important" }}>
                Number of Guests
              </option>
              {/* You can generate options dynamically if needed */}
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              {/* Add more options as needed */}
            </select>

            <button type="button" onClick={handleReserve}>
              Reservar
            </button>
          </form>
        </div>
      )}
    </>
  );
};

ReserveToggler.propTypes = {
  isOverlayVisible: PropTypes.bool.isRequired,
};

export default ReserveToggler;
