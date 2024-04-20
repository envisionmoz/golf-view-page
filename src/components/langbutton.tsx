"use client"
import React, { useState } from 'react';
import LanguageToggler from './lang-toggler';
import "../css/app.css";
import { useTranslations } from "next-intl";
import { useSearchParams } from 'next/navigation';

const LangButton = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [displaySelectedCurrency, setDisplaySelectedCurrency] = useState('MZN');

  const searchParams = useSearchParams();
  const selectedCurrency = searchParams.get('currency');

  if (selectedCurrency != displaySelectedCurrency && selectedCurrency != null) {
    setDisplaySelectedCurrency(selectedCurrency);}

  const t = useTranslations("Navbar");
  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div className='language-button'>
      <button onClick={toggleOverlay}>{t('button2')} | {displaySelectedCurrency}</button>
      <LanguageToggler isOverlayVisible={isOverlayVisible}  />
    </div>
  );
};

export default LangButton;
