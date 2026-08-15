import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

export const Footer = () => {
  const { setIsPaymentOpen } = useStore();

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
              Premium business and brand promotion across FMCG, Jewellery, and Interior sectors. Elevating brands that define markets. Estd. 2001
            </p>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">SECTORS</h5>
            <ul className="footer-links">
              <li><Link to="/products#fmcg">FMCG Catalog</Link></li>
              <li><Link to="/products#jewellery">Jewellery Collection</Link></li>
              <li><Link to="/products#interior">Interior Portfolio</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">COMPANY</h5>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/media">Media Gallery</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">LEGAL</h5>
            <ul className="footer-links">
              <li><Link to="/legal#privacy">Privacy Policy</Link></li>
              <li><Link to="/legal#terms">Terms of Service</Link></li>
              <li><Link to="/legal#cookies">Cookies</Link></li>
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
                  Payment / QR
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Sarkar Enterprise. All rights reserved.</p>
          <p className="footer-credit">Design & Developed by <a href="https://www.hintonevolution.com" target="_blank" rel="noopener noreferrer"><strong>Hinton Evolution Tech</strong></a></p>
        </div>
      </div>
    </footer>
  );
};

