import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES, LanguageOption, translations } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
  languages: LANGUAGES,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    // Ensure zero data stored in localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem('language');
        window.localStorage.removeItem('sarkar_app_lang');
        window.localStorage.removeItem('sarkar_language');
      }
    } catch {}
  }, []);

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
