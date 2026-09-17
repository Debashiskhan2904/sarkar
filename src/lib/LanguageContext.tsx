import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES, LanguageOption, translations } from './translations';
import { idbGet, idbSet } from './idbStorage';

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
  const [lang, setLangState] = useState<Language>('en');

  // Load language preference from IndexedDB (zero localStorage)
  useEffect(() => {
    // Purge any legacy keys from localStorage so nothing remains there
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('language');
        localStorage.removeItem('sarkar_app_lang');
      }
    } catch {}

    idbGet<Language>('sarkar_language').then((saved) => {
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'bn')) {
        setLangState(saved);
      }
    }).catch(() => {});
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    // Persist to client IndexedDB without touching localStorage
    idbSet('sarkar_language', newLang).catch(() => {});
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
