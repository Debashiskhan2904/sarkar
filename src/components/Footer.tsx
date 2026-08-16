import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';

export const Footer = () => {
  const { setIsPaymentOpen } = useStore();
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-box">
              <img src="https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg" alt="Sarkar Enterprise Logo" className="footer-logo-img" />
              <span className="logo-sarkar">SARKAR</span>
              <span className="logo-enterprise">ENTERPRISE</span>
            </div>
            <p className="footer-brand-desc">
              {t('heroBadge')} • {t('fmcgTitle')}, {t('jewelleryTitle')}, {t('interiorTitle')}. Estd. 2001
            </p>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">{t('navProducts')}</h5>
            <ul className="footer-links">
              <li><Link to="/products#fmcg">{t('fmcgTitle')}</Link></li>
              <li><Link to="/products#jewellery">{t('jewelleryTitle')}</Link></li>
              <li><Link to="/products#interior">{t('interiorTitle')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">{t('navAbout')}</h5>
            <ul className="footer-links">
              <li><Link to="/about">{t('navAbout')}</Link></li>
              <li><Link to="/careers">{t('navCareers')}</Link></li>
              <li><Link to="/media">{t('navMedia')}</Link></li>
              <li><Link to="/faq">{t('navFaq')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">{t('contactLegalBadge')}</h5>
            <ul className="footer-links">
              <li><Link to="/legal#privacy">{t('contactPrivacyTitle')}</Link></li>
              <li><Link to="/legal#terms">{t('contactTermsTitle')}</Link></li>
              <li><Link to="/legal#cookies">{t('contactCookiesTitle')}</Link></li>
              <li>
                <button 
                  onClick={() => setIsPaymentOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'color 0.25s ease'
                  }}
                  className="footer-payment-btn"
                >
                  {t('contactPayTitle')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Sarkar Enterprise. {t('footerRights')}</p>
          <p className="footer-credit">Design & Developed by <a href="https://www.hintonevolution.com" target="_blank" rel="noopener noreferrer"><strong>Hinton Evolution Tech</strong></a></p>
        </div>
      </div>
    </footer>
  );
};


