/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './store';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { Preloader } from "./components/Preloader";
import { AdminPanel } from './components/AdminPanel';

import { Home, About, Contact, Legal } from './pages/Core';
import { ProductsHub } from './pages/Sectors';
import { Careers, Media, Faq } from './pages/Company';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id) || document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

export default function App() {
  return (
    <StoreProvider>
        <Preloader />
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/products" element={<ProductsHub />} />
            
            <Route path="/careers" element={<Careers />} />
            <Route path="/media" element={<Media />} />
            <Route path="/faq" element={<Faq />} />
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
          </Routes>
        </main>
        <Footer />
        <Modals />
        <AdminPanel />
      </BrowserRouter>
    </StoreProvider>
  );
}
