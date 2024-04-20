"use client"
import React, { useState } from 'react';
import LanguageToggler from './lang-toggler';
import "../css/app.css";
import { useTranslations } from "next-intl";

const LangButton = ({selectedCurrency}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const t = useTranslations("Navbar");
  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div className='language-button'>
      <button onClick={toggleOverlay}>{t('button2')} | {selectedCurrency}</button>
      <LanguageToggler isOverlayVisible={isOverlayVisible}  />
    </div>
  );
};

export default LangButton;
