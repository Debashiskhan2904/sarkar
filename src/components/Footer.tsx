import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { Phone, Mail, MapPin, Sparkles, Navigation, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const { setIsPaymentOpen, setIsContractOpen } = useStore();
  const { t } = useLanguage();

  return (
    <footer className="footer" style={{ background: '#0a0f18', paddingTop: '36px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div 
          className="footer-main-grid"
          style={{ 
            alignItems: 'start',
            paddingBottom: '28px'
          }}
        >
          {/* Column 1: Brand & Mission */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to="/" className="logo" style={{ marginBottom: '12px', textDecoration: 'none' }}>
              <img 
                src="https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg" 
                alt="The Sarkar Enterprise Logo" 
                className="logo-image"
                style={{ width: '32px', height: '32px' }}
              />
              <span className="logo-brand" style={{ gap: '4px', fontSize: '0.95rem' }}>
                <span className="brand-the">THE</span>
                <span className="brand-sarkar">SARKAR</span>
                <span className="brand-enterprise">ENTERPRISE</span>
              </span>
            </Link>
            
            <p style={{ color: 'rgba(255, 255, 255, 0.68)', fontSize: '0.82rem', lineHeight: '1.45', margin: '0 0 14px 0', maxWidth: '420px' }}>
              {t('footerDesc')}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 4px 0', display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <li style={{ margin: 0, padding: 0, lineHeight: 1.4 }}>
                <a 
                  href="tel:+918670783810" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)')}
                >
                  <Phone size={14} style={{ color: '#00d2ff', flexShrink: 0 }} />
                  <span>+91 8670783810</span>
                </a>
              </li>
              <li style={{ margin: 0, padding: 0, lineHeight: 1.4 }}>
                <a 
                  href="https://wa.me/918670783810" 
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)')}
                >
                  <MessageCircle size={14} style={{ color: '#25D366', flexShrink: 0 }} />
                  <span>+91 8670783810</span>
                </a>
              </li>
              <li style={{ margin: 0, padding: 0, lineHeight: 1.4 }}>
                <a 
                  href="mailto:kishore8670@gmail.com" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)')}
                >
                  <Mail size={14} style={{ color: '#00d2ff', flexShrink: 0 }} />
                  <span>kishore8670@gmail.com</span>
                </a>
              </li>
              <li style={{ margin: 0, padding: 0, display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.82rem', lineHeight: '1.4' }}>
                <MapPin size={15} style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0, marginTop: '2px' }} />
                <span>Bhiringi More, Benachity, Durgapur, West Bengal - 713213</span>
              </li>
            </ul>

            <div 
              className="footer-trust-badges"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                flexWrap: 'wrap',
                marginTop: '16px'
              }}
            >
              <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '4px 10px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500, whiteSpace: 'nowrap' }}>India &amp; Global Delivery</span>
              <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '4px 10px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500, whiteSpace: 'nowrap' }}>Verified Legal Contracts</span>
              <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '4px 10px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500, whiteSpace: 'nowrap' }}>GSTIN: 19BZSPS5314M1ZG</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h5 style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.72rem', fontWeight: 600, marginBottom: '10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              NAVIGATION
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[
                { label: t('navHome'), path: '/' },
                { label: t('navAbout'), path: '/about' },
                { label: t('jewelleryTitle'), path: '/products/jewellery' },
                { label: t('fmcgTitle'), path: '/products/fmcg' },
                { label: t('interiorTitle'), path: '/products/interior' },
                { label: t('navContact'), path: '/contact' }
              ].map((item, i) => (
                <li key={i} style={{ margin: 0, padding: 0, lineHeight: 1.3 }}>
                  <Link 
                    to={item.path} 
                    style={{ color: 'rgba(255, 255, 255, 0.72)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', transition: 'color 0.2s ease', display: 'inline-block' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li style={{ margin: 0, padding: 0, lineHeight: 1.3 }}>
                <button 
                  onClick={() => setIsPaymentOpen(true)}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s ease', display: 'inline-block' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)')}
                >
                  {t('footerPayLink')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Protection & Policies */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h5 style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.72rem', fontWeight: 600, marginBottom: '10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              CLIENT PROTECTION &amp; POLICIES
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <li style={{ margin: 0, padding: 0, lineHeight: 1.3 }}>
                <button
                  onClick={() => setIsContractOpen(true)}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)')}
                >
                  <span>{t('legalAgreementTitle')}</span>
                  <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>→</span>
                </button>
              </li>
              <li style={{ margin: 0, padding: 0, lineHeight: 1.3 }}>
                <Link 
                  to="/legal#privacy" 
                  style={{ color: 'rgba(255, 255, 255, 0.72)', textDecoration: 'none', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)')}
                >
                  <span>{t('contactPrivacyTitle')}</span>
                  <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>→</span>
                </Link>
              </li>
              <li style={{ margin: 0, padding: 0, lineHeight: 1.3 }}>
                <Link 
                  to="/legal#terms" 
                  style={{ color: 'rgba(255, 255, 255, 0.72)', textDecoration: 'none', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)')}
                >
                  <span>{t('contactTermsTitle')}</span>
                  <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>→</span>
                </Link>
              </li>
              <li style={{ margin: 0, padding: 0, lineHeight: 1.3 }}>
                <Link 
                  to="/legal#cookies" 
                  style={{ color: 'rgba(255, 255, 255, 0.72)', textDecoration: 'none', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)')}
                >
                  <span>{t('contactCookiesTitle')}</span>
                  <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>→</span>
                </Link>
              </li>
            </ul>

            <Link 
              to="/contact" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                marginTop: '14px', 
                alignSelf: 'flex-start',
                background: 'rgba(255,255,255,0.06)', 
                border: '1px solid rgba(255,255,255,0.12)', 
                color: '#ffffff', 
                padding: '6px 12px', 
                borderRadius: '5px', 
                fontSize: '0.75rem', 
                textDecoration: 'none', 
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <Sparkles size={13} style={{ color: '#00d2ff' }} />
              <span>Schedule Consultation</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
            paddingTop: '14px', 
            paddingBottom: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.45)' }}>
            © 2026 The Sarkar Enterprise. {t('footerRights')}
          </p>
          <p style={{ margin: 0, fontSize: '0.78rem' }}>
            <a href="https://www.hintonevolution.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500, textDecoration: 'none' }}>
              Design &amp; Developed by <span style={{ color: '#ffffff', fontWeight: 600 }}>Hinton Evolution Tech</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};




