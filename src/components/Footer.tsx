import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export const Footer = () => {
  const { setIsPaymentOpen, setIsContractOpen } = useStore();
  const { t } = useLanguage();

  return (
    <footer className="footer" style={{ borderTop: '1px solid rgba(255, 215, 0, 0.15)', background: '#0a0f18', paddingTop: '50px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div 
          className="footer-grid-container"
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'start',
            paddingBottom: '40px'
          }}
        >
          {/* Column 1: Brand & Mission */}
          <div className="footer-col-brand" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="logo-box" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src="https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg" 
                alt="The Sarkaar Enterprise Logo" 
                className="footer-logo-img"
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span className="logo-brand" style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                <span className="brand-the" style={{ color: '#ffffff', marginRight: '5px' }}>THE</span>
                <span className="brand-sarkar" style={{ color: '#FFD700', marginRight: '5px' }}>SARKAAR</span>
                <span className="brand-enterprise" style={{ color: '#d4af37' }}>ENTERPRISE</span>
              </span>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.9rem', lineHeight: '1.7', margin: '0 0 16px 0', maxWidth: '360px' }}>
              {t('heroBadge')} • {t('fmcgTitle')}, {t('jewelleryTitle')}, {t('interiorTitle')}. Estd. 2001
            </p>
          </div>

          {/* Column 2: Corporate Office & Reach */}
          <div className="footer-col-contact" style={{ display: 'flex', flexDirection: 'column' }}>
            <h5 
              style={{ 
                color: '#FFD700', 
                fontSize: '0.92rem', 
                fontWeight: 700, 
                marginBottom: '18px', 
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
                paddingBottom: '8px',
                display: 'inline-block'
              }}
            >
              {t('contactVisitUs')}
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                <MapPin size={17} style={{ color: '#FFD700', flexShrink: 0, marginTop: '2px' }} />
                <span>Bhiringi More, Benachity, Durgapur, West Bengal - 713213</span>
              </li>
              <li>
                <a 
                  href="tel:+918670783810" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    fontSize: '0.88rem', 
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
                >
                  <Phone size={16} style={{ color: '#FFD700', flexShrink: 0 }} />
                  <span>+91 86 707 838 10</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:hello@sarkaarenterprise.com" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    fontSize: '0.88rem', 
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
                >
                  <Mail size={16} style={{ color: '#FFD700', flexShrink: 0 }} />
                  <span>hello@sarkaarenterprise.com</span>
                </a>
              </li>
              <li style={{ marginTop: '4px' }}>
                <Link 
                  to="/contact" 
                  style={{ 
                    color: '#FFD700', 
                    fontSize: '0.86rem', 
                    fontWeight: 700, 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    textDecoration: 'none'
                  }}
                >
                  {t('breadcrumbContact')} <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Governance */}
          <div className="footer-col-legal" style={{ display: 'flex', flexDirection: 'column' }}>
            <h5 
              style={{ 
                color: '#FFD700', 
                fontSize: '0.92rem', 
                fontWeight: 700, 
                marginBottom: '18px', 
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
                paddingBottom: '8px',
                display: 'inline-block'
              }}
            >
              {t('contactLegalBadge')} &amp; GOVERNANCE
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  onClick={() => setIsContractOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: '#FFD700',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textAlign: 'left',
                    transition: 'opacity 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {t('legalAgreementTitle')}
                </button>
              </li>
              <li>
                <Link 
                  to="/legal#privacy" 
                  style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                >
                  {t('contactPrivacyTitle')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/legal#terms" 
                  style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                >
                  {t('contactTermsTitle')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/legal#cookies" 
                  style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                >
                  {t('contactCookiesTitle')}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => setIsPaymentOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'rgba(255, 255, 255, 0.75)',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    textAlign: 'left',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                >
                  {t('footerPayLink')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="footer-bottom" 
          style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
            paddingTop: '22px', 
            paddingBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            © 2026 The Sarkaar Enterprise. {t('footerRights')}
          </p>
          <p className="footer-credit" style={{ margin: 0, fontSize: '0.85rem' }}>
            Design &amp; Developed by <a href="https://www.hintonevolution.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', fontWeight: 600, textDecoration: 'none' }}>Hinton Evolution Tech</a>
          </p>
        </div>
      </div>
    </footer>
  );
};



