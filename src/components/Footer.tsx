import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo"><img src="https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg" alt="Sarkar Enterprise Logo" className="logo-image" style={{ marginRight: '8px' }} /> Sarkar Enterprise</div>
            <p>Premium business and brand promotion across FMCG, Jewellery, and Interior sectors. Elevating brands that define markets.</p>
          </div>
          <div>
            <h5>Sectors</h5>
            <ul>
              <li><Link to="/products/fmcg">FMCG Catalog</Link></li>
              <li><Link to="/products/jewellery">Jewellery Collection</Link></li>
              <li><Link to="/products/interior">Interior Portfolio</Link></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/media">Media Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              <li><Link to="/legal">Privacy Policy</Link></li>
              <li><Link to="/legal">Terms of Service</Link></li>
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
