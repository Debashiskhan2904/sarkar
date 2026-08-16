import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setIsAdminOpen } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <NavLink to="/" className="logo" onClick={closeMenu}>
            <img src="https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg" alt="Sarkar Enterprise Logo" className="logo-image" />
            <span className="logo-brand">
              <span className="brand-sarkar">SARKAR</span>
              <span className="brand-enterprise">ENTERPRISE</span>
            </span>
          </NavLink>

          <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''} onClick={closeMenu}>{t('navHome')}</NavLink></li>
            <li><NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''} onClick={closeMenu}>{t('navAbout')}</NavLink></li>
            <li><NavLink to="/products" className={({isActive}) => isActive || location.pathname.startsWith('/products/') ? 'active' : ''} onClick={closeMenu}>{t('navProducts')}</NavLink></li>
            <li><NavLink to="/careers" className={({isActive}) => isActive ? 'active' : ''} onClick={closeMenu}>{t('navCareers')}</NavLink></li>
            <li><NavLink to="/media" className={({isActive}) => isActive ? 'active' : ''} onClick={closeMenu}>{t('navMedia')}</NavLink></li>
            <li><NavLink to="/faq" className={({isActive}) => isActive ? 'active' : ''} onClick={closeMenu}>{t('navFaq')}</NavLink></li>
            <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''} onClick={closeMenu}>{t('navContact')}</NavLink></li>
            
            <li className="nav-lang-item">
              <LanguageSwitcher isMobileNav={mobileOpen} />
            </li>

            <li>
              <button className="admin-btn nav-login-btn" onClick={() => { setIsAdminOpen(true); closeMenu(); }}>{t('navLogin')}</button>
            </li>
          </ul>

          <button 
            className={`hamburger ${mobileOpen ? 'open' : ''}`} 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Backdrop overlay for mobile drawer */}
      <div 
        className={`mobile-nav-backdrop ${mobileOpen ? 'open' : ''}`} 
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
};

