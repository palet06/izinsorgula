"use client"
import React, { ReactNode, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { IntlProvider} from "react-intl";
import enMessages from "@/shared/localization/en_US.json";
import trMessages from "@/shared/localization/tr_TR.json";
const messages: { [key: string]: { [key: string]: string } } = {
  en: enMessages,
  tr: trMessages,
};

const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState("tr");

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  const handleLanguageChange = (newLocale:string) => {
    setLocale(newLocale); 
    localStorage.setItem("locale", newLocale); 
    
  };
  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Navbar onLanguageChange={handleLanguageChange} locale={locale} />
        {children}
        <Footer />
      </IntlProvider>
    </>
  );
};

export default AppWrapper;
