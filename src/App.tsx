/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './store';
import { LanguageProvider } from './lib/LanguageContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { Preloader } from "./components/Preloader";
import { AdminPanel } from './components/AdminPanel';
import { SEOManager } from './components/SEOManager';

import { Home, About, Contact, Legal } from './pages/Core';
import { ProductsHub } from './pages/Sectors';
import { Careers, Media, Faq } from './pages/Company';
import { Conclusion } from './pages/Conclusion';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const scrollWithOffset = () => {
        const el = document.getElementById(id) || document.querySelector(hash);
        if (el) {
          const navHeight = 90;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const offsetPosition = (elementRect - bodyRect) - navHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          return true;
        }
        return false;
      };

      if (!scrollWithOffset()) {
        const t1 = setTimeout(scrollWithOffset, 120);
        const t2 = setTimeout(scrollWithOffset, 350);
        const t3 = setTimeout(scrollWithOffset, 700);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
      }
    } else {
      const match = pathname.match(/^\/products\/(jewellery|jewelry|fmcg|interior|interiors)$/i);
      if (match) {
        let id = match[1].toLowerCase();
        if (id === 'jewelry') id = 'jewellery';
        if (id === 'interiors') id = 'interior';
        const scrollWithOffset = () => {
          const el = document.getElementById(id);
          if (el) {
            const navHeight = 90;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const offsetPosition = (elementRect - bodyRect) - navHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            return true;
          }
          return false;
        };
        if (!scrollWithOffset()) {
          const t1 = setTimeout(scrollWithOffset, 120);
          const t2 = setTimeout(scrollWithOffset, 350);
          const t3 = setTimeout(scrollWithOffset, 700);
          return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        }
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);
  return null;
};

export default function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <Preloader />
        <BrowserRouter>
          <SEOManager />
          <ScrollToTop />
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              
              <Route path="/products" element={<ProductsHub />} />
              <Route path="/products/:sector" element={<ProductsHub />} />
              
              <Route path="/careers" element={<Careers />} />
              <Route path="/media" element={<Media />} />
              <Route path="/faq" element={<Faq />} />
              
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/conclusion" element={<Conclusion />} />
            </Routes>
          </main>
          <Footer />
          <Modals />
          <AdminPanel />
        </BrowserRouter>
      </StoreProvider>
    </LanguageProvider>
  );
}

