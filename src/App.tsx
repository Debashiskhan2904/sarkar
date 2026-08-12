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
import { ProductsHub, Fmcg, Jewellery, Interior } from './pages/Sectors';
import { Careers, Media } from './pages/Company';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
            <Route path="/products/fmcg" element={<Fmcg />} />
            <Route path="/products/jewellery" element={<Jewellery />} />
            <Route path="/products/interior" element={<Interior />} />
            
            <Route path="/careers" element={<Careers />} />
            <Route path="/media" element={<Media />} />
            
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
