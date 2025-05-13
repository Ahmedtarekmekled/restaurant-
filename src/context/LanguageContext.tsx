"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { translations, LanguageCode } from "@/constants/translations";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [isRTL, setIsRTL] = useState<boolean>(false);

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "language"
    ) as LanguageCode | null;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Update RTL setting when language changes
  useEffect(() => {
    setIsRTL(language === "ar");
    localStorage.setItem("language", language);

    // Set the dir attribute on the html element
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
      htmlElement.setAttribute("lang", language);
    }
  }, [language]);

  // Function to set language
  const setLanguage = (lang: LanguageCode) => {
    if (lang === "en" || lang === "ar") {
      setLanguageState(lang);
    }
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
