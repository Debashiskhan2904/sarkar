import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES, LanguageOption, translations } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  languages: LanguageOption[];
}

const PRIMARY_STORAGE_KEY = 'language';
const SECONDARY_STORAGE_KEY = 'sarkaar_app_lang';

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
  languages: LANGUAGES,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(PRIMARY_STORAGE_KEY) || localStorage.getItem(SECONDARY_STORAGE_KEY);
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'bn')) {
        return saved as Language;
      }
    } catch (e) {
      console.warn('localStorage error for language reading:', e);
    }
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(PRIMARY_STORAGE_KEY, newLang);
      localStorage.setItem(SECONDARY_STORAGE_KEY, newLang);
    } catch (e) {
      console.warn('localStorage error for language saving:', e);
    }
  };

  useEffect(() => {
    // Set document lang attribute for accessibility and proper font rendering
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    // Fallback to English if translation key is missing in current language
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
