import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { Language } from '../lib/translations';
import { ChevronDown, Check, Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC<{ isMobileNav?: boolean }> = ({ isMobileNav = false }) => {
  const { lang, setLang, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div className={`lang-switcher-container ${isMobileNav ? 'mobile' : ''}`} ref={dropdownRef}>
      <button 
        type="button"
        className={`lang-switcher-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select website language"
      >
        <span className="lang-flag" role="img" aria-label={currentLangObj.name}>{currentLangObj.flag}</span>
        <span className="lang-label">{currentLangObj.nativeName}</span>
        <ChevronDown className={`lang-chevron ${isOpen ? 'rotate' : ''}`} size={14} />
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu" role="menu">
          <div className="lang-dropdown-header">
            <Globe size={13} className="text-amber-400" />
            <span>Select Language</span>
          </div>
          <div className="lang-options-list">
            {languages.map((item) => {
              const isSelected = item.code === lang;
              return (
                <button
                  key={item.code}
                  type="button"
                  className={`lang-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(item.code)}
                  role="menuitem"
                >
                  <span className="lang-opt-flag">{item.flag}</span>
                  <span className="lang-opt-native">{item.nativeName}</span>
                  <span className="lang-opt-en">({item.name})</span>
                  {isSelected && <Check size={14} className="lang-check" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
