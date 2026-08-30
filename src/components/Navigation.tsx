import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setIsAdminOpen } = useStore();
  const { t } = useLanguage();
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

  const navItems = [
    { to: '/', label: t('navHome') },
    { to: '/about', label: t('navAbout') },
    { to: '/products', label: t('navProducts'), matchPrefix: '/products/' },
    { to: '/careers', label: t('navCareers') },
    { to: '/media', label: t('navMedia') },
    { to: '/faq', label: t('navFaq') },
    { to: '/contact', label: t('navContact') },
    { to: '/conclusion', label: t('navConclusion') },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <NavLink to="/" className="logo" onClick={closeMenu}>
            <img src="https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg" alt="The Sarkaar Enterprise Logo" className="logo-image" />
            <span className="logo-brand">
              <span className="brand-the">THE</span>
              <span className="brand-sarkar">SARKAAR</span>
              <span className="brand-enterprise">ENTERPRISE</span>
            </span>
          </NavLink>

          <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink 
                  to={item.to} 
                  className={({isActive}) => (isActive || (item.matchPrefix && location.pathname.startsWith(item.matchPrefix))) ? 'active' : ''} 
                  onClick={closeMenu}
                >
                  <span className="nav-link-text">{item.label}</span>
                  {mobileOpen && <ChevronRight className="nav-link-arrow" size={16} />}
                </NavLink>
              </li>
            ))}
            
            <li className="nav-divider-item" aria-hidden="true" />

            <li className="nav-lang-item">
              <LanguageSwitcher isMobileNav={mobileOpen} />
            </li>

            <li className="nav-login-item">
              <button 
                className="admin-btn nav-login-btn" 
                onClick={() => { setIsAdminOpen(true); closeMenu(); }}
              >
                {t('navLogin')}
              </button>
            </li>
          </ul>

          <button 
            className={`hamburger ${mobileOpen ? 'open' : ''}`} 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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

