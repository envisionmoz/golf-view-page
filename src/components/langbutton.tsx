"use client"
import React, { useState } from 'react';
import LanguageToggler from './lang-toggler';
import "../css/app.css";
import { useTranslations } from "next-intl";

const LangButton = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div className='language-button'>
      <button onClick={toggleOverlay}>PORTUGUES | MZN</button>
      <LanguageToggler isOverlayVisible={isOverlayVisible}  />
    </div>
  );
};

export default LangButton;
