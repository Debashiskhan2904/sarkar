import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageCircle, ZoomIn, CheckCircle2, X, Sparkles, Package, Phone, Check, MapPin, Gem, Home as HomeIcon } from 'lucide-react';
import { PritiJiShowcase } from '../components/PritiJiShowcase';
import { MosquitoRepellentsShowcase } from '../components/MosquitoRepellentsShowcase';
import { SoanPapdiShowcase } from '../components/SoanPapdiShowcase';
import { JewelleryShowcase } from '../components/JewelleryShowcase';
import { InteriorShowcase } from '../components/InteriorShowcase';
import { JEWELLERY_GALLERY, INTERIOR_GALLERY } from '../data';

export const ProductsHub = () => {
  const { sector } = useParams<{ sector?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { mediaItems, openZoomGallery, setIsPaymentOpen, showToast, addInquiry } = useStore();
  const { t } = useLanguage();
  const [activeSector, setActiveSector] = useState<'all' | 'fmcg' | 'jewellery' | 'interior'>('all');
  const [buyingModalProduct, setBuyingModalProduct] = useState<{ title: string; category: string } | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    location: '',
    role: 'Dealer / Wholesaler',
    quantity: '',
    message: ''
  });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const getProductInfo = (title: string) => {
    const lower = (title || '').toLowerCase();
    if (lower.includes('frog') || lower.includes('mosquito') || lower.includes('vaporizer') || lower.includes('repellent')) {
      return {
        brand: 'Angry Frog',
        quickBadge: 'Instant Mosquito Kill',
        packInfo: 'Fits All Machines · Liquid & Citronella',
        moq: 'MOQ: 1 Master Carton',
        dispatch: 'Immediate dispatch from Barddhaman across WB',
        badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
        chips: ['Instant Protection', 'Liquid & Agarbatti', 'High Dealer Margins']
      };
    }
    if (lower.includes('priti') || lower.includes('chanachur')) {
      return {
        brand: 'Priti-Ji Ayurvedic',
        quickBadge: 'Ayurvedic Chanachur',
        packInfo: '₹70/- Pack (200g) · Dry Fruit Base',
        moq: 'MOQ: 50 Pkts Crate',
        dispatch: 'Daily fresh batch delivery across Bengal',
        badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
        chips: ['₹70/- Pack (200g)', 'Helps Digestion', 'Green Chilli Special Jhal']
      };
    }
    if (lower.includes('soan') || lower.includes('munmun') || lower.includes('sweet') || lower.includes('papdi')) {
      return {
        brand: 'Munmun Food Products',
        quickBadge: 'Premium Confectionery',
        packInfo: 'Desi Ghee & Elaichi Soan Papdi',
        moq: 'MOQ: 24/48 Box Wholesale',
        dispatch: 'Factory fresh supply to grocery shops',
        badgeColor: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
        chips: ['Pure Desi Ghee', 'Tamper-evident Trays', 'Wholesale Margin']
      };
    }
    if (lower.includes('detergent') || lower.includes('soap') || lower.includes('cleaning') || lower.includes('wash')) {
      return {
        brand: 'Sarkar HomeCare',
        quickBadge: 'Fabric & Detergent Care',
        packInfo: 'Active Foam Detergent & Cleaning Care',
        moq: 'MOQ: Direct Wholesale Crates',
        dispatch: 'Factory direct billing across Bengal',
        badgeColor: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
        chips: ['Active Stain Removal', 'Fabric Safe Formula', 'High Retail Margins']
      };
    }
    if (lower.includes('incense') || lower.includes('agarbatti') || lower.includes('maxwell') || lower.includes('dhoop')) {
      return {
        brand: 'Maxwell Incense',
        quickBadge: 'Premium Agarbatti',
        packInfo: 'Long-Lasting Natural Aroma Agarbatti',
        moq: 'MOQ: Master Carton Packs',
        dispatch: 'Direct C&F dispatch to retail dealers',
        badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
        chips: ['Natural Fragrances', 'Low Smoke Sticks', 'High Dealer Margin']
      };
    }
    return {
      brand: 'Sarkar FMCG Division',
      quickBadge: 'Trade Supply',
      packInfo: 'Direct Wholesale Sourcing & GST Bill',
      moq: 'Wholesale Tiers Available',
      dispatch: 'State-wide logistics across West Bengal',
      badgeColor: 'text-gold bg-gold/10 border-gold/30',
      chips: ['GST Invoiced', 'Direct Wholesaler Sourcing', 'Trade Support']
    };
  };

  const handleOpenBuyingEnquiry = (productTitle: string, brandCategory: string) => {
    setBuyingModalProduct({ title: productTitle, category: brandCategory });
    setInquirySuccess(false);
    setInquiryForm({
      name: '',
      phone: '',
      location: '',
      role: 'Dealer / Wholesaler',
      quantity: '',
      message: `I am interested in trade / dealership for ${productTitle} (${brandCategory}). Please share combo pricing and terms.`
    });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) {
      showToast('Please provide your Name and Phone Number', 'error');
      return;
    }

    setIsSubmittingInquiry(true);
    try {
      await addInquiry({
        name: inquiryForm.name,
        phone: inquiryForm.phone,
        email: inquiryForm.location,
        company: `${inquiryForm.role} (${inquiryForm.location || 'Bengal'})`,
        type: `Buying Enquiry: ${buyingModalProduct?.title || 'FMCG Product'}`,
        message: `[${inquiryForm.role}] Requested Qty: ${inquiryForm.quantity || 'Standard Combo'}. ${inquiryForm.message}`,
        date: new Date().toISOString()
      });
      setInquirySuccess(true);
      showToast('Buying Enquiry registered! Our trade manager will contact you shortly.', 'success');
    } catch (err: any) {
      console.warn('Inquiry submission error:', err?.message);
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  const handleSendWhatsAppOrder = (productTitle: string) => {
    const text = `Hello Sarkar Enterprise,\nI would like to enquire about buying / dealership for:\n*Product:* ${productTitle}\nPlease share dealer pricing, combo schemes, and dispatch details.`;
    window.open(`https://wa.me/918670783810?text=${encodeURIComponent(text)}`, '_blank');
  };

  useEffect(() => {
    if (buyingModalProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [buyingModalProduct]);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [window.location.hash]);

  const getEncodedUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('/assets/') ? encodeURI(url) : url;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, title: string, originalUrl: string) => {
    const img = e.currentTarget;
    const currentSrc = img.src;

    const cleanName = originalUrl
      .replace('/assets/images/', '')
      .replace(/\s+/g, '')
      .replace(/'/g, '')
      .replace(/–/g, '-')
      .replace(/&/g, 'And');

    const alternativeUrl = `/assets/images/${cleanName}`;
    if (!currentSrc.includes(cleanName) && cleanName.length > 4) {
      img.src = alternativeUrl;
      return;
    }

    img.src = getFallbackSvg(title);
  };

  const getFallbackSvg = (title: string) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#111827"/>
      <rect x="20" y="20" width="760" height="560" rx="12" fill="none" stroke="#d4af37" stroke-width="2" stroke-dasharray="6 6" opacity="0.5"/>
      <circle cx="400" cy="240" r="48" fill="rgba(212,175,55,0.1)" stroke="#d4af37" stroke-width="2"/>
      <path d="M380 240 h40 M400 220 v40" stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
      <text x="50%" y="360" dominant-baseline="middle" text-anchor="middle" fill="#f3f4f6" font-family="sans-serif" font-size="26" font-weight="bold">${title.replace(/&/g, '&amp;')}</text>
      <text x="50%" y="410" dominant-baseline="middle" text-anchor="middle" fill="#d4af37" font-family="sans-serif" font-size="18">Sarkar Enterprise Official Visual Blueprint</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // Eager pre-caching of all critical product showcase images and brand logos
  useEffect(() => {
    const priorityAssets = [
      '/images/products/priti-ji/priti_packet_1.webp',
      '/images/products/priti-ji/priti_packet_1.jpg',
      '/images/products/mosquito/mosquito_banner_1.webp',
      '/images/products/mosquito/mosquito_banner_1.jpg',
      '/images/products/soan-papdi/soanpapdi_banner.webp',
      '/images/products/soan-papdi/soanpapdi_banner.jpg',
      '/images/logos/pritilogo.webp',
      '/images/logos/pritilogo.png',
      '/images/logos/mosquito.webp',
      '/images/logos/mosquito.png',
      '/images/logos/soanpapdilogo.webp',
      '/images/logos/soanpapdilogo.png'
    ];
    priorityAssets.forEach(src => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, []);

  // Dynamic media collections from Admin Panel / Store (mediaItems)
  const fmcgPhotos = useMemo(() => {
    return (mediaItems || []).filter(m => m.type === 'photo' && (m.sector === 'fmcg' || !m.sector));
  }, [mediaItems]);

  const jewelleryPhotos = useMemo(() => {
    const dynamic = (mediaItems || []).filter(m => m.type === 'photo' && m.sector === 'jewellery');
    if (dynamic.length > 0) return dynamic;
    return JEWELLERY_GALLERY;
  }, [mediaItems]);

  const interiorPhotos = useMemo(() => {
    const dynamic = (mediaItems || []).filter(m => m.type === 'photo' && m.sector === 'interior');
    if (dynamic.length > 0) return dynamic;
    return INTERIOR_GALLERY;
  }, [mediaItems]);

  // Product-specific item lookups from uploaded media
  const chanachurItem = useMemo(() => {
    return fmcgPhotos.find(m => m.productSub === 'chanachur') || null;
  }, [fmcgPhotos]);

  const mosquitoItem = useMemo(() => {
    return fmcgPhotos.find(m => m.productSub === 'mosquito') || null;
  }, [fmcgPhotos]);

  const soanPapdiItem = useMemo(() => {
    return fmcgPhotos.find(m => m.productSub === 'soan_papdi') || null;
  }, [fmcgPhotos]);

  const handleOpenProductVisuals = (productItem: any, fallbackTitle: string) => {
    if (productItem?.url) {
      openZoomGallery([
        { url: getEncodedUrl(productItem.url), title: productItem.title || fallbackTitle },
        { url: '/images/logos/pritilogo.png', title: 'Priti-Ji Official Brand Logo' }
      ], 0, fallbackTitle);
    } else if (fallbackTitle.toLowerCase().includes('priti') || fallbackTitle.toLowerCase().includes('chanachur')) {
      openZoomGallery([
        { url: '/images/logos/pritilogo.png', title: 'Priti-Ji Official Brand Logo & Identity' }
      ], 0, fallbackTitle);
    } else if (fmcgPhotos.length > 0) {
      openZoomGallery(fmcgPhotos.map(g => ({ url: getEncodedUrl(g.url), title: g.title || fallbackTitle })), 0, fallbackTitle);
    } else {
      showToast('No catalog visuals uploaded yet. Admins can upload photos from the Admin Panel.', 'info');
    }
  };

  const handleNavigateSector = (secId: 'all' | 'fmcg' | 'jewellery' | 'interior') => {
    setActiveSector(secId);
    if (secId === 'all') {
      navigate('/products', { replace: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(`/products/${secId}#${secId}`, { replace: true });
      const el = document.getElementById(secId) || document.getElementById(secId === 'interior' ? 'interiors' : secId);
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
    }
  };

  // Sync active sector and auto-scroll on mount or route/hash change
  useEffect(() => {
    const s = (sector || '').toLowerCase();
    const h = (location.hash || '').replace('#', '').toLowerCase();
    const resolved = s || h;

    if (resolved === 'fmcg') {
      setActiveSector('fmcg');
    } else if (resolved === 'jewellery' || resolved === 'jewelry') {
      setActiveSector('jewellery');
    } else if (resolved === 'interior' || resolved === 'interiors') {
      setActiveSector('interior');
    } else {
      setActiveSector('all');
    }

    if (resolved && resolved !== 'all') {
      let targetId = resolved;
      if (targetId === 'jewelry') targetId = 'jewellery';
      if (targetId === 'interiors') targetId = 'interior';

      const scrollToTarget = () => {
        const el = document.getElementById(targetId);
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

      if (!scrollToTarget()) {
        const t1 = setTimeout(scrollToTarget, 100);
        const t2 = setTimeout(scrollToTarget, 300);
        const t3 = setTimeout(scrollToTarget, 650);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
      }
    }
  }, [sector, location.hash]);

  return (
    <PageWrapper>
      {/* Products & Sectors Hero */}
      <section className="ps-hero">
        <div className="container">
          <div className="faq-breadcrumb">
            <Link to="/">{t('breadcrumbHome')}</Link> / {t('breadcrumbProducts')}
          </div>
          <h1 className="ps-hero-title">
            {t('productsTitle')}
          </h1>
          <p className="ps-hero-list">
            {t('productsSubtitle')}
          </p>

          {/* Quick Sector Navigation & Filter Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 flex-wrap">
            <button
              type="button"
              id="sector-tab-all"
              onClick={() => handleNavigateSector('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                activeSector === 'all'
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-lg shadow-amber-400/20 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10 hover:border-white/20'
              }`}
            >
              <span>{t('productsFilterAll')}</span>
            </button>
            <button
              type="button"
              id="sector-tab-fmcg"
              onClick={() => handleNavigateSector('fmcg')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                activeSector === 'fmcg'
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-lg shadow-amber-400/20 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10 hover:border-white/20'
              }`}
            >
              <Package size={15} />
              <span>{t('fmcgTitle')}</span>
            </button>
            <button
              type="button"
              id="sector-tab-jewellery"
              onClick={() => handleNavigateSector('jewellery')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                activeSector === 'jewellery'
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-lg shadow-amber-400/20 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10 hover:border-white/20'
              }`}
            >
              <Gem size={15} />
              <span>{t('jewelleryTitle')}</span>
            </button>
            <button
              type="button"
              id="sector-tab-interior"
              onClick={() => handleNavigateSector('interior')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                activeSector === 'interior'
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-lg shadow-amber-400/20 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10 hover:border-white/20'
              }`}
            >
              <HomeIcon size={15} />
              <span>{t('interiorTitle')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTOR 1: FMCG */}
      <section className="ps-section" id="fmcg" style={{ scrollMarginTop: '95px' }}>
        <div className="container">
          <div className="ps-sector-header">
            <span className="ps-sector-tag">SECTOR 1</span>
            <h2 className="ps-sector-title">{t('fmcgTitle')}</h2>
            <p className="ps-sector-scale">{t('fmcgScale')}</p>
          </div>

          {/* 3 Redesigned Split Cards */}
          <div className="fmcg-showcase-container">
            {/* Card 1: Priti-Ji Chanachur (Custom Showcase matching uploaded flyer banner) */}
            <PritiJiShowcase 
              onOpenEnquiry={(title, cat) => handleOpenBuyingEnquiry(title, cat)}
              onWhatsAppOrder={(title) => handleSendWhatsAppOrder(title)}
              onViewVisuals={() => handleOpenProductVisuals(chanachurItem, t('pritiJiTitle'))}
            />

            {/* Card 2: Mosquito Repellents Showcase (Custom Showcase matching uploaded Angry Frog banner) */}
            <MosquitoRepellentsShowcase 
              onOpenEnquiry={(title, cat) => handleOpenBuyingEnquiry(title, cat)}
              onWhatsAppOrder={(title) => handleSendWhatsAppOrder(title)}
              onViewVisuals={() => handleOpenProductVisuals(mosquitoItem, t('mosquitoTitle'))}
            />

            {/* Card 3: Munmun Food Products - Soan Papdi & Others (Custom Showcase matching uploaded flyer banner) */}
            <SoanPapdiShowcase 
              onOpenEnquiry={(title, cat) => handleOpenBuyingEnquiry(title, cat)}
              onWhatsAppOrder={(title) => handleSendWhatsAppOrder(title)}
              onViewVisuals={() => handleOpenProductVisuals(soanPapdiItem, t('soanPapdiTitle'))}
            />
          </div>
        </div>
      </section>

      {/* SECTOR 2: JEWELLERY */}
      <div id="jewelry" style={{ scrollMarginTop: '95px' }} />
      <section className="ps-section dark-alt" id="jewellery" style={{ scrollMarginTop: '95px' }}>
        <div className="container">
          <div className="ps-sector-header">
            <span className="ps-sector-tag">{t('sector2Tag')}</span>
            <h2 className="ps-sector-title">{t('jewelleryTitle')}</h2>
            <p className="ps-sector-scale">{t('jewelleryScale')}</p>
          </div>

          {/* Dedicated Jewellery Interactive Blueprint Showcase Card */}
          <JewelleryShowcase 
            onOpenEnquiry={(title, cat) => handleOpenBuyingEnquiry(title, cat)}
            onWhatsAppOrder={(title) => handleSendWhatsAppOrder(title)}
            onViewVisuals={() => openZoomGallery(jewelleryPhotos.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), 0, t('jewelleryTitle'))}
          />

          {/* Board of Directors Message Box */}
          <div className="ps-board-box">
            <h3 className="ps-board-title text-gold">{t('jewelleryBoardTitle')}</h3>
            <p className="ps-board-text">
              {t('jewelleryBoardText')}
            </p>
          </div>

          {/* Jewellery Diagrams & Schemes */}
          {jewelleryPhotos.length > 0 && (
            <div className="ps-gallery-wrapper">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="ps-gallery-title mb-0">{t('jewelleryGalleryTitle')}</h3>
                <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                  {jewelleryPhotos.length} Official Scheme Documents
                </span>
              </div>
              <div className="ps-gallery-grid four-cols">
                {jewelleryPhotos.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    className="ps-gallery-card group"
                    onClick={() => openZoomGallery(jewelleryPhotos.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), idx, item.title)}
                  >
                    <picture>
                      <source srcSet={item.url} type="image/webp" />
                      <img 
                        src={getEncodedUrl(item.fallbackUrl || item.url)} 
                        alt={item.title} 
                        loading="lazy" 
                        onError={(e) => handleImageError(e, item.title, item.remoteUrl || item.url)}
                      />
                    </picture>
                    <div className="ps-gallery-overlay">
                      <div className="flex flex-col gap-1 w-full">
                        {item.schemeCode && (
                          <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider bg-amber-400/20 px-1.5 py-0.5 rounded w-fit border border-amber-400/30">
                            {item.schemeCode}
                          </span>
                        )}
                        <span className="truncate">{item.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights Box */}
          <div className="ps-highlights-box">
            <h3 className="ps-highlights-title text-gold">{t('jewelleryHighlightsTitle')}</h3>
            <div className="ps-highlights-grid">
              <ul>
                <li>{t('jewelleryHighlight1')}</li>
                <li>{t('jewelleryHighlight2')}</li>
                <li>{t('jewelleryHighlight3')}</li>
                <li>{t('jewelleryHighlight4')}</li>
              </ul>
              <ul>
                <li>{t('jewelleryHighlight5')}</li>
                <li>{t('jewelleryHighlight6')}</li>
                <li>{t('jewelleryHighlight7')}</li>
                <li>{t('jewelleryHighlight8')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTOR 3: INTERIORS */}
      <div id="interiors" style={{ scrollMarginTop: '95px' }} />
      <section className="ps-section" id="interior" style={{ scrollMarginTop: '95px' }}>
        <div className="container">
          <div className="ps-sector-header">
            <span className="ps-sector-tag">{t('sector3Tag')}</span>
            <h2 className="ps-sector-title">{t('interiorTitle')}</h2>
            <p className="ps-sector-scale">{t('interiorScale')}</p>
          </div>

          {/* Dedicated Interior & Saburi Plywood Interactive Showcase */}
          <InteriorShowcase 
            onOpenEnquiry={(title, cat) => handleOpenBuyingEnquiry(title, cat)}
            onWhatsAppOrder={(title) => handleSendWhatsAppOrder(title)}
            onViewVisuals={() => openZoomGallery(interiorPhotos.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), 0, t('interiorTitle'))}
          />

          {/* 4 Cards */}
          <div className="ps-cards-grid four-cols">
            <div className="ps-card">
              <div className="ps-card-icon">🏢</div>
              <h3 className="ps-card-title">{t('corpInteriorTitle')}</h3>
              <p className="ps-card-desc">
                {t('corpInteriorDesc')}
              </p>
            </div>

            <div className="ps-card">
              <div className="ps-card-icon">🏠</div>
              <h3 className="ps-card-title">{t('domInteriorTitle')}</h3>
              <p className="ps-card-desc">
                {t('domInteriorDesc')}
              </p>
            </div>

            <div className="ps-card">
              <div className="ps-card-icon">🍳</div>
              <h3 className="ps-card-title">{t('kitchenChimneyTitle')}</h3>
              <p className="ps-card-desc">
                {t('kitchenChimneyDesc')}
              </p>
            </div>

            <div className="ps-card">
              <div className="ps-card-icon">🏬</div>
              <h3 className="ps-card-title">{t('mallEstablishmentTitle')}</h3>
              <p className="ps-card-desc">
                {t('mallEstablishmentDesc')}
              </p>
            </div>
          </div>

          {/* Interior Gallery */}
          {interiorPhotos.length > 0 && (
            <div className="ps-gallery-wrapper mt-8">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="ps-gallery-title mb-0">Architectural Plans &amp; Interior Infrastructure</h3>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full">
                  {interiorPhotos.length} Official Blueprint Documents
                </span>
              </div>
              <div className="ps-gallery-grid four-cols">
                {interiorPhotos.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    className="ps-gallery-card group"
                    onClick={() => openZoomGallery(interiorPhotos.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), idx, item.title)}
                  >
                    <picture>
                      <source srcSet={item.url} type="image/webp" />
                      <img 
                        src={getEncodedUrl(item.fallbackUrl || item.url)} 
                        alt={item.title} 
                        loading="lazy" 
                        onError={(e) => handleImageError(e, item.title, item.remoteUrl || item.url)}
                      />
                    </picture>
                    <div className="ps-gallery-overlay">
                      <div className="flex flex-col gap-1 w-full">
                        {item.schemeCode && (
                          <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider bg-emerald-400/20 px-1.5 py-0.5 rounded w-fit border border-emerald-400/30">
                            {item.schemeCode}
                          </span>
                        )}
                        <span className="truncate">{item.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Buying Enquiry Modal - Rendered via Portal with high z-index to sit cleanly above fixed Navbar */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {buyingModalProduct && (
            <div 
              className="fixed inset-0 overflow-y-auto bg-black/85 backdrop-blur-md px-3 py-6 sm:px-4 sm:py-10 flex justify-center items-center"
              style={{ zIndex: 999999 }}
              onClick={() => setBuyingModalProduct(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                className="bg-[#12141a] border-2 border-gold/50 rounded-2xl max-w-lg w-full text-white shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Header */}
                <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-white/10 bg-[#161922] flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="p-2 bg-gold/10 text-gold rounded-lg border border-gold/30 shrink-0">
                      <Mail size={18} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-serif font-bold text-white leading-tight truncate">
                        Direct Trade & Buying Enquiry
                      </h3>
                      <p className="text-[11px] text-gold font-semibold uppercase tracking-wider truncate">
                        {buyingModalProduct.title}
                      </p>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setBuyingModalProduct(null)}
                    className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0 ml-2 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                {inquirySuccess ? (
                  <div className="p-6 text-center space-y-3.5">
                    <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-white">Enquiry Received Successfully!</h4>
                    <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                      Our Trade & Dealership Division will contact you within 2-4 business hours with combo pricing, dispatch catalogs, and promotional schemes.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                      <button
                        type="button"
                        onClick={() => handleSendWhatsAppOrder(buyingModalProduct.title)}
                        className="px-4 py-2 bg-[#25D366] text-black font-bold text-xs rounded-lg hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        <MessageCircle size={16} /> Chat on WhatsApp Now
                      </button>
                      <button
                        type="button"
                        onClick={() => setBuyingModalProduct(null)}
                        className="px-4 py-2 bg-white/10 text-white font-semibold text-xs rounded-lg hover:bg-white/20 transition-all cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="p-4 sm:p-5 space-y-3">
                    {/* Compact Product Info Strip */}
                    {(() => {
                      const info = getProductInfo(buyingModalProduct.title);
                      return (
                        <div className="bg-[#181c26] border border-white/10 rounded-xl p-2.5 space-y-1.5">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${info.badgeColor}`}>
                                {info.brand}
                              </span>
                              <span className="text-xs text-gray-200 font-medium truncate">
                                {info.packInfo}
                              </span>
                            </div>
                            <a 
                              href="tel:+918670783810"
                              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 shrink-0"
                            >
                              <Phone size={11} /> +91 86707 83810
                            </a>
                          </div>
                          <div className="flex flex-wrap gap-1.5 text-[10px] pt-0.5">
                            {info.chips.map((chip, idx) => (
                              <span key={idx} className="bg-white/5 border border-white/10 text-gray-300 px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Check size={10} className="text-emerald-400 shrink-0" />
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Form fields: Clean, visible without hidden overflow */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">Your Full Name *</label>
                        <input 
                          type="text"
                          required
                          placeholder="e.g., Rajesh Ghosh"
                          value={inquiryForm.name}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                          className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">Phone Number (WhatsApp) *</label>
                        <input 
                          type="tel"
                          required
                          placeholder="e.g., +91 9876543210"
                          value={inquiryForm.phone}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                          className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">District / City (WB)</label>
                        <input 
                          type="text"
                          placeholder="e.g., Barddhaman, Kolkata, Durgapur"
                          value={inquiryForm.location}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, location: e.target.value })}
                          className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">Business Role / Model</label>
                        <select
                          value={inquiryForm.role}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, role: e.target.value })}
                          className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                        >
                          <option value="Dealer / Wholesaler">Dealer / Wholesaler</option>
                          <option value="Hawker / Cycle Sales">Hawker / Cycle Sales</option>
                          <option value="Retail Grocery Shop">Retail Grocery Shop</option>
                          <option value="C&F / Area Distributor">C&F / Area Distributor</option>
                          <option value="Direct Buyer / Bulk">Direct Buyer / Bulk</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-300 mb-1">Approx Requirement / Quantity</label>
                      <input 
                        type="text"
                        placeholder="e.g., 50 Combo packs / 100 Vaporizers"
                        value={inquiryForm.quantity}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, quantity: e.target.value })}
                        className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-300 mb-1">Requirements / Questions</label>
                      <textarea 
                        rows={2}
                        value={inquiryForm.message}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                        className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-gold resize-none"
                      />
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                      <button
                        type="submit"
                        disabled={isSubmittingInquiry}
                        className="w-full sm:flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmittingInquiry ? 'Submitting...' : 'Submit Buying Enquiry'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendWhatsAppOrder(buyingModalProduct.title)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageCircle size={15} /> WhatsApp Direct
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </PageWrapper>
  );
};
