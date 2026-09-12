import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageCircle, ZoomIn, CheckCircle2, X } from 'lucide-react';
import { PritiJiShowcase } from '../components/PritiJiShowcase';
import { MosquitoRepellentsShowcase } from '../components/MosquitoRepellentsShowcase';
import { SoanPapdiShowcase } from '../components/SoanPapdiShowcase';

export const ProductsHub = () => {
  const { mediaItems, openZoomGallery, setIsPaymentOpen, showToast, addInquiry } = useStore();
  const { t } = useLanguage();
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

  // Dynamic media collections from Admin Panel / Store (mediaItems)
  const fmcgPhotos = useMemo(() => {
    return (mediaItems || []).filter(m => m.type === 'photo' && (m.sector === 'fmcg' || !m.sector));
  }, [mediaItems]);

  const jewelleryPhotos = useMemo(() => {
    return (mediaItems || []).filter(m => m.type === 'photo' && m.sector === 'jewellery');
  }, [mediaItems]);

  const interiorPhotos = useMemo(() => {
    return (mediaItems || []).filter(m => m.type === 'photo' && m.sector === 'interior');
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
        </div>
      </section>

      {/* SECTOR 1: FMCG */}
      <section className="ps-section" id="fmcg" style={{ scrollMarginTop: '80px' }}>
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
      <section className="ps-section dark-alt" id="jewellery" style={{ scrollMarginTop: '80px' }}>
        <div className="container">
          <div className="ps-sector-header">
            <span className="ps-sector-tag">{t('sector2Tag')}</span>
            <h2 className="ps-sector-title">{t('jewelleryTitle')}</h2>
            <p className="ps-sector-scale">{t('jewelleryScale')}</p>
          </div>

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
              <h3 className="ps-gallery-title">{t('jewelleryGalleryTitle')}</h3>
              <div className="ps-gallery-grid">
                {jewelleryPhotos.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    className="ps-gallery-card"
                    onClick={() => openZoomGallery(jewelleryPhotos.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), idx, item.title)}
                  >
                    <img 
                      src={getEncodedUrl(item.url)} 
                      alt={item.title} 
                      loading="lazy" 
                      onError={(e) => handleImageError(e, item.title, item.url)}
                    />
                    <div className="ps-gallery-overlay">
                      <span>{item.title}</span>
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
      <section className="ps-section" id="interior" style={{ scrollMarginTop: '80px' }}>
        <div className="container">
          <div className="ps-sector-header">
            <span className="ps-sector-tag">{t('sector3Tag')}</span>
            <h2 className="ps-sector-title">{t('interiorTitle')}</h2>
            <p className="ps-sector-scale">{t('interiorScale')}</p>
          </div>

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
            <div className="ps-gallery-wrapper">
              <div className="ps-gallery-grid four-cols">
                {interiorPhotos.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    className="ps-gallery-card"
                    onClick={() => openZoomGallery(interiorPhotos.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), idx, item.title)}
                  >
                    <img 
                      src={getEncodedUrl(item.url)} 
                      alt={item.title} 
                      loading="lazy" 
                      onError={(e) => handleImageError(e, item.title, item.url)}
                    />
                    <div className="ps-gallery-overlay">
                      <span>{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Buying Enquiry Modal */}
      <AnimatePresence>
        {buyingModalProduct && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setBuyingModalProduct(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#12141a] border border-gold/40 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-white shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button"
                onClick={() => setBuyingModalProduct(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="p-3 bg-gold/10 text-gold rounded-xl border border-gold/30">
                  <Mail size={22} />
                </span>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Direct Trade & Buying Enquiry</h3>
                  <p className="text-xs text-gold font-semibold uppercase tracking-wider">{buyingModalProduct.title}</p>
                </div>
              </div>

              {inquirySuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Enquiry Received Successfully!</h4>
                  <p className="text-sm text-gray-300 max-w-sm mx-auto">
                    Our Trade & Dealership Division will contact you within 2-4 business hours with combo pricing, dispatch catalogs, and promotional schemes.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => handleSendWhatsAppOrder(buyingModalProduct.title)}
                      className="px-5 py-2.5 bg-[#25D366] text-black font-bold text-sm rounded-lg hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageCircle size={18} /> Chat on WhatsApp Now
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuyingModalProduct(null)}
                      className="px-5 py-2.5 bg-white/10 text-white font-semibold text-sm rounded-lg hover:bg-white/20 transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Your Full Name *</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g., Rajesh Ghosh"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number (WhatsApp) *</label>
                      <input 
                        type="tel"
                        required
                        placeholder="e.g., +91 9876543210"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">District / City (WB)</label>
                      <input 
                        type="text"
                        placeholder="e.g., Barddhaman, Kolkata"
                        value={inquiryForm.location}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, location: e.target.value })}
                        className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Business Role / Model</label>
                      <select
                        value={inquiryForm.role}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, role: e.target.value })}
                        className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
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
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Approx Requirement / Quantity</label>
                    <input 
                      type="text"
                      placeholder="e.g., 50 Combo packs / 100 Vaporizers"
                      value={inquiryForm.quantity}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, quantity: e.target.value })}
                      className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Requirements / Questions</label>
                    <textarea 
                      rows={2}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      className="w-full bg-[#1c202a] border border-white/15 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmittingInquiry}
                      className="w-full sm:flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmittingInquiry ? 'Submitting...' : 'Submit Buying Enquiry'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendWhatsAppOrder(buyingModalProduct.title)}
                      className="w-full sm:w-auto px-4 py-3 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={16} /> WhatsApp Direct
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};
