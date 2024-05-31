import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/popup.css";
import { FaCalendarAlt } from "react-icons/fa";
import { DatePickerWithRange } from "./Datepicker";
import "../css/global.css"
interface LanguageTogglerProps {
  isOverlayVisible: boolean;
}

const ReserveToggler: React.FC<LanguageTogglerProps> = ({
  isOverlayVisible,
}) => {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
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

  const searchAvailableApartments = () => {
    // Here you can implement logic to process and show data
    // that fits the description and availability
    console.log("Arrival Date:", arrivalDate);
    console.log("Departure Date:", departureDate);
  };
  return (
    <>
      {isOverlayVisible && (
        // <div className="reserve-container">
        //   <form>
        //     <DatePicker
        //       className="date-picker-container"
        //       showIcon
        //       selected={arrivalDate}
        //       closeOnScroll={(e) => e.target === document}
        //       onChange={handleArrivalDateChange}
        //       minDate={minArrivalDate}
        //       maxDate={maxDepartureDate}
        //       selectsStart
        //       startDate={arrivalDate}
        //       endDate={departureDate}
        //       dateFormat="MMM d, yy"
        //       placeholderText={new Date().toLocaleDateString()}
        //       icon={<FaCalendarAlt  />}
        //     />

        //     <DatePicker
        //       className="date-picker-container"
        //       showIcon
        //       selected={departureDate}
        //       closeOnScroll={(e) => e.target === document}
        //       onChange={handleDepartureDateChange}
        //       minDate={arrivalDate || tomorrow}
        //       maxDate={maxDepartureDate}
        //       selectsEnd
        //       startDate={arrivalDate}
        //       endDate={departureDate}
        //       dateFormat="MMM d, yy"
        //       placeholderText={tomorrow.toLocaleDateString()}
        //       icon={<FaCalendarAlt />}
        //     />

        //     <button type="button" onClick={searchAvailableApartments}>
        //       Pesquisar
        //     </button>
        //   </form>
        // </div>
        <DatePickerWithRange/>
      )}
    </>
  );
};

ReserveToggler.propTypes = {
  isOverlayVisible: PropTypes.bool.isRequired,
};

export default ReserveToggler;
