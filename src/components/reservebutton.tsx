"use client";
import React, { useState } from "react";
import ReserveToggler from "./reserveToggler";
import "../css/app.css";
// import { useTranslations } from "next-intl";

const LangButton = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
//   const t = useTranslations("Navbar");

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div className="reserve-button">
      <button onClick={toggleOverlay}>Reservar</button>
      <ReserveToggler isOverlayVisible={isOverlayVisible} />
    </div>
  );
};

export default LangButton;
