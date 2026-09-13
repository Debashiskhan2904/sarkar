import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  Navigation, 
  MessageCircle, 
  ChevronRight, 
  ShieldCheck, 
  CreditCard, 
  FileText, 
  Lock, 
  Scale, 
  Cookie 
} from 'lucide-react';

export const Footer = () => {
  const { setIsPaymentOpen, setIsContractOpen } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectorClick = (e: React.MouseEvent, sectorId: string) => {
    const targetPath = `/products/${sectorId}#${sectorId}`;
    if (location.pathname.startsWith('/products')) {
      e.preventDefault();
      window.history.pushState(null, '', targetPath);
      const el = document.getElementById(sectorId) || document.getElementById(sectorId === 'interior' ? 'interiors' : sectorId);
      if (el) {
        const navHeight = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const offsetPosition = (elementRect - bodyRect) - navHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      e.preventDefault();
      navigate(targetPath);
    }
  };

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFD700', boxShadow: '0 0 8px rgba(255, 215, 0, 0.6)' }} />
              <h5 style={{ color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Navigation
              </h5>
            </div>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #FFD700, transparent)', marginBottom: '12px', borderRadius: '1px' }} />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: t('navHome') === 'HOME' ? 'Home' : t('navHome'), path: '/' },
                { label: t('navAbout') === 'ABOUT US' ? 'About Us' : t('navAbout'), path: '/about' },
                { label: t('jewelleryTitle'), path: '/products/jewellery#jewellery', sector: 'jewellery' },
                { label: t('fmcgTitle'), path: '/products/fmcg#fmcg', sector: 'fmcg' },
                { label: t('interiorTitle'), path: '/products/interior#interior', sector: 'interior' },
                { label: t('navContact') === 'CONTACT' ? 'Contact & Inquiries' : t('navContact'), path: '/contact' }
              ].map((item, i) => (
                <li key={i} style={{ margin: 0, padding: 0 }}>
                  <Link 
                    to={item.path} 
                    onClick={(e) => {
                      if (item.sector) {
                        handleSectorClick(e, item.sector);
                      }
                    }}
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.78)', 
                      textDecoration: 'none', 
                      fontSize: '0.84rem', 
                      fontWeight: 500,
                      letterSpacing: '0.02em', 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '3px 0',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)' 
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFD700';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)';
                      e.currentTarget.style.transform = 'translateX(0px)';
                    }}
                  >
                    <ChevronRight size={13} style={{ color: '#FFD700', opacity: 0.6, flexShrink: 0 }} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              
              {/* Payment Verification highlighted interactive action */}
              <li style={{ margin: '6px 0 0 0', padding: 0 }}>
                <button 
                  onClick={() => setIsPaymentOpen(true)}
                  style={{ 
                    background: 'rgba(255, 215, 0, 0.07)', 
                    border: '1px solid rgba(255, 215, 0, 0.28)', 
                    padding: '8px 12px', 
                    borderRadius: '8px',
                    color: '#FFD700', 
                    fontSize: '0.82rem', 
                    fontWeight: 600,
                    letterSpacing: '0.02em', 
                    cursor: 'pointer', 
                    textAlign: 'left', 
                    transition: 'all 0.2s ease', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 215, 0, 0.16)';
                    e.currentTarget.style.borderColor = '#FFD700';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 215, 0, 0.07)';
                    e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.28)';
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                    <ShieldCheck size={15} style={{ color: '#FFD700', flexShrink: 0 }} />
                    <span>{t('footerPayLink')}</span>
                  </span>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    background: 'rgba(255, 215, 0, 0.2)', 
                    color: '#ffffff', 
                    border: '1px solid rgba(255, 215, 0, 0.4)', 
                    padding: '1px 6px', 
                    borderRadius: '4px',
                    fontWeight: 700,
                    letterSpacing: '0.04em'
                  }}>
                    UTR / UPI
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Protection & Policies */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00d2ff', boxShadow: '0 0 8px rgba(0, 210, 255, 0.6)' }} />
              <h5 style={{ color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Client Protection &amp; Policies
              </h5>
            </div>
            <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #00d2ff, transparent)', marginBottom: '12px', borderRadius: '1px' }} />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ margin: 0, padding: 0 }}>
                <button
                  onClick={() => setIsContractOpen(true)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: '3px 0', 
                    color: 'rgba(255, 255, 255, 0.78)', 
                    fontSize: '0.84rem', 
                    fontWeight: 500,
                    cursor: 'pointer', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    textAlign: 'left', 
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)' 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00d2ff';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)';
                    e.currentTarget.style.transform = 'translateX(0px)';
                  }}
                >
                  <ChevronRight size={13} style={{ color: '#00d2ff', opacity: 0.6, flexShrink: 0 }} />
                  <span>{t('legalAgreementTitle')}</span>
                  <span style={{ 
                    background: 'rgba(0, 210, 255, 0.12)', 
                    color: '#00d2ff', 
                    border: '1px solid rgba(0, 210, 255, 0.3)', 
                    fontSize: '0.62rem', 
                    padding: '1px 5px', 
                    borderRadius: '3px', 
                    fontWeight: 600, 
                    letterSpacing: '0.04em',
                    marginLeft: '4px' 
                  }}>
                    VERIFIED
                  </span>
                </button>
              </li>
              <li style={{ margin: 0, padding: 0 }}>
                <Link 
                  to="/legal#privacy" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.78)', 
                    textDecoration: 'none', 
                    fontSize: '0.84rem', 
                    fontWeight: 500,
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '3px 0',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)' 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00d2ff';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)';
                    e.currentTarget.style.transform = 'translateX(0px)';
                  }}
                >
                  <ChevronRight size={13} style={{ color: '#00d2ff', opacity: 0.6, flexShrink: 0 }} />
                  <span>{t('contactPrivacyTitle')}</span>
                </Link>
              </li>
              <li style={{ margin: 0, padding: 0 }}>
                <Link 
                  to="/legal#terms" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.78)', 
                    textDecoration: 'none', 
                    fontSize: '0.84rem', 
                    fontWeight: 500,
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '3px 0',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)' 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00d2ff';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)';
                    e.currentTarget.style.transform = 'translateX(0px)';
                  }}
                >
                  <ChevronRight size={13} style={{ color: '#00d2ff', opacity: 0.6, flexShrink: 0 }} />
                  <span>{t('contactTermsTitle')}</span>
                </Link>
              </li>
              <li style={{ margin: 0, padding: 0 }}>
                <Link 
                  to="/legal#cookies" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.78)', 
                    textDecoration: 'none', 
                    fontSize: '0.84rem', 
                    fontWeight: 500,
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '3px 0',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)' 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00d2ff';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)';
                    e.currentTarget.style.transform = 'translateX(0px)';
                  }}
                >
                  <ChevronRight size={13} style={{ color: '#00d2ff', opacity: 0.6, flexShrink: 0 }} />
                  <span>{t('contactCookiesTitle')}</span>
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
                border: '1px solid rgba(255,255,255,0.14)', 
                color: '#ffffff', 
                padding: '7px 14px', 
                borderRadius: '6px', 
                fontSize: '0.78rem', 
                textDecoration: 'none', 
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0px)';
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




