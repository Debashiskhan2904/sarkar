import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageCircle, ZoomIn, CheckCircle2, X } from 'lucide-react';

export const ProductsHub = () => {
  const { openZoomGallery, setIsPaymentOpen, showToast, addInquiry } = useStore();
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

  // FMCG Gallery Images
  const fmcgGallery = [
    { title: "Priti-Ji Ayurvedic Chanachur", url: "https://i.pinimg.com/736x/63/e9/d2/63e9d21494581cc8af1fe6b4ea9c3749.jpg" },
    { title: "Brand Promoter Range", url: "https://i.pinimg.com/736x/21/5d/65/215d650804195427bf23fadc8839c9e4.jpg" },
    { title: "Free-Free-Free Combo Offers", url: "https://i.pinimg.com/736x/66/40/17/6640175730bda87fceecdd1a83f69982.jpg" },
    { title: "Angry Frog Income Scheme", url: "https://i.pinimg.com/736x/83/2f/d8/832fd81f0039f2f7cc392d963b3be3db.jpg" },
    { title: "Hawker Recruitment (Bengali)", url: "https://i.pinimg.com/736x/cc/34/53/cc3453162f27643b6ce147ea02c09c03.jpg" },
    { title: "Maxwell Magic Sale Scheme", url: "https://i.pinimg.com/736x/c8/c4/f6/c8c4f633b5f425547db49f6e57ab47d4.jpg" },
    { title: "Agarbatti Stock", url: "https://i.pinimg.com/736x/03/5c/cf/035ccf72925e3420c10f5e10c339cbb3.jpg" },
    { title: "Surya Maxwell Incense", url: "https://i.pinimg.com/736x/38/82/61/388261e0707aa2e976d561ef80d09b29.jpg" },
    { title: "Anti Mosquito Instant Kill", url: "https://i.pinimg.com/736x/c2/03/f7/c203f70725f20c7ebb0ef983cad7b98f.jpg" },
    { title: "Munmun Soan Papdi", url: "https://i.pinimg.com/736x/51/5f/fa/515ffa956ae2e919d5d133aaaf681ba8.jpg" },
    { title: "Distributorship Certificate", url: "https://i.pinimg.com/736x/2b/72/fa/2b72fa38167bd718e4e6053e9cc1e243.jpg" },
    { title: "Partner Benefits & Promotion", url: "https://i.pinimg.com/736x/cc/fc/da/ccfcda7177833cf137543365a7a2cb4f.jpg" }
  ];

  // Jewellery Gallery Images
  const jewelleryGallery = [
    { title: "India's No.1 Jewellery Stylo Scheme", url: "https://i.pinimg.com/736x/c4/7e/d2/c47ed2555deefcc757214b7c7ac5bb89.jpg" },
    { title: "6 Years Banking Return with Interest", url: "https://i.pinimg.com/736x/bb/1b/98/bb1b985b01de9b83abe2dfad2c6fb3c3.jpg" },
    { title: "M1 Aug'22 Competitive Scheme", url: "https://i.pinimg.com/736x/fd/ca/92/fdca92abcdbbb6e41f955d07645c4e39.jpg" },
    { title: "Project 8 – Y4 Competitive Scheme Calendar", url: "https://i.pinimg.com/736x/a5/c9/99/a5c999a293421b9e79a3435c36b66115.jpg" },
    { title: "Project 9 – Future Statistics City King Monopoly", url: "https://i.pinimg.com/736x/ef/6d/9d/ef6d9d301b943988d863ff802eaeebd3.jpg" },
    { title: "Project 5 – Daily Target Turnover Collection Unit", url: "https://i.pinimg.com/736x/e2/f0/49/e2f049b96e0bab01a27613820e7bfe09.jpg" },
    { title: "Project 6 – Expense Unit & New Concept Showroom", url: "https://i.pinimg.com/736x/a1/f6/96/a1f696a80d54b3421d474c535dbd066e.jpg" },
    { title: "Project 7 – Reference Chain Marketing Executive", url: "https://i.pinimg.com/736x/2e/24/67/2e24674736f3bf62d91d142279df04cf.jpg" },
    { title: "Project 14 – Recycling Filter Chemicals Process", url: "https://i.pinimg.com/736x/7f/3a/7a/7f3a7a40f4137ba9d50525863c2a9ec2.jpg" },
    { title: "Project 15 – Substantial Profitable Accountability", url: "https://i.pinimg.com/736x/62/d2/3d/62d23db24918b781da5b4f42e111c901.jpg" },
    { title: "Project 16 – Recycling & Reshuffling Process", url: "https://i.pinimg.com/736x/0b/8a/44/0b8a44293aef67d882bb541efb4fcca8.jpg" },
    { title: "Corner to Corner 100% Business Oriented Turnover", url: "https://i.pinimg.com/736x/34/60/5a/34605a952cfb790aefd1155b14387b00.jpg" }
  ];

  // Interior Gallery Images
  const interiorGallery = [
    { title: "The COMPAQE – Kitchen Chimney & Interior Branding", url: "https://i.pinimg.com/736x/00/a6/72/00a672f654622ee5c3aae1be346bf46f.jpg" },
    { title: "Living & Display Unit Sample", url: "https://i.pinimg.com/736x/e8/9f/bc/e89fbc508f829d7be76821f90883ce7e.jpg" },
    { title: "Modular Kitchen Work", url: "https://i.pinimg.com/736x/4a/87/9c/4a879c16399fd22771bc6320e5736b87.jpg" },
    { title: "Luxury Living Concept", url: "https://i.pinimg.com/736x/cc/ba/46/ccba4658c68f9cd68d50df5f73acb3d3.jpg" }
  ];

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
            {/* Card 1: Priti-Ji Chanachur */}
            <div className="fmcg-product-card" id="chanachur">
              <div 
                className="fmcg-product-media"
                onClick={() => openZoomGallery(fmcgGallery.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), 0, t('pritiJiTitle'))}
              >
                <img 
                  src={getEncodedUrl("https://i.pinimg.com/736x/63/e9/d2/63e9d21494581cc8af1fe6b4ea9c3749.jpg")} 
                  alt={t('pritiJiTitle')} 
                  className="fmcg-product-img"
                  loading="lazy" 
                  onError={(e) => handleImageError(e, t('pritiJiTitle'), "https://i.pinimg.com/736x/63/e9/d2/63e9d21494581cc8af1fe6b4ea9c3749.jpg")}
                />
                <span className="fmcg-media-badge">✨ First Time in WB</span>
                <span className="fmcg-media-zoom-hint"><ZoomIn size={14} /> Zoom</span>
              </div>

              <div className="fmcg-product-content">
                <div>
                  <span className="fmcg-brand-eyebrow">PRITIJI AYURVEDIC SPECIAL</span>
                  <h3 className="fmcg-product-heading">{t('pritiJiTitle')}</h3>
                  <p className="fmcg-product-desc">
                    {t('pritiJiDesc')}
                  </p>

                  <ul className="fmcg-bullet-list">
                    <li className="fmcg-bullet-item">
                      <span className="fmcg-bullet-icon">◆</span>
                      <span><strong>Dealer Price from ₹60–70</strong> combo pack</span>
                    </li>
                    <li className="fmcg-bullet-item">
                      <span className="fmcg-bullet-icon">◆</span>
                      <span><strong>Credit Limit 15 days</strong></span>
                    </li>
                    <li className="fmcg-bullet-item">
                      <span className="fmcg-bullet-icon">◆</span>
                      <span><strong>Free gifts & promotional support</strong></span>
                    </li>
                    <li className="fmcg-bullet-item">
                      <span className="fmcg-bullet-icon">◆</span>
                      <span><strong>100% Dealer Promotion</strong> + Extra ₹18k Income p.m. possible</span>
                    </li>
                  </ul>

                  <div className="fmcg-chips-container">
                    <span className="fmcg-chip highlight">₹60–70 Combo Pack</span>
                    <span className="fmcg-chip highlight">15-Day Credit Limit</span>
                    <span className="fmcg-chip highlight">+₹18,000/mo Dealer Scheme</span>
                    <span className="fmcg-chip">Dry Fruit Ayurvedic Base</span>
                    <span className="fmcg-chip">Tak-Jhal-Misti • Yasti Madhu • Green Chilli</span>
                  </div>
                </div>

                <div className="fmcg-actions-row">
                  <button 
                    type="button"
                    className="btn-buying-enquiry"
                    onClick={() => handleOpenBuyingEnquiry(t('pritiJiTitle'), 'Priti-Ji Ayurvedic Chanachur')}
                  >
                    <Mail size={16} /> Buying Enquiry
                  </button>
                  <button 
                    type="button"
                    className="btn-whatsapp-order"
                    onClick={() => handleSendWhatsAppOrder(t('pritiJiTitle'))}
                  >
                    <MessageCircle size={16} /> WhatsApp Order
                  </button>
                  <button 
                    type="button"
                    className="btn-catalog-view"
                    onClick={() => openZoomGallery(fmcgGallery.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), 0, t('pritiJiTitle'))}
                  >
                    <ZoomIn size={14} /> View Visuals
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Mosquito Repellents */}
            <div className="fmcg-product-card" id="mosquito">
              <div 
                className="fmcg-product-media"
                onClick={() => openZoomGallery(fmcgGallery.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), 8, t('mosquitoTitle'))}
              >
                <img 
                  src={getEncodedUrl("https://i.pinimg.com/736x/c2/03/f7/c203f70725f20c7ebb0ef983cad7b98f.jpg")} 
                  alt={t('mosquitoTitle')} 
                  className="fmcg-product-img"
                  loading="lazy" 
                  onError={(e) => handleImageError(e, t('mosquitoTitle'), "https://i.pinimg.com/736x/c2/03/f7/c203f70725f20c7ebb0ef983cad7b98f.jpg")}
                />
                <span className="fmcg-media-badge">⚡ Instant Kill Vaporizer</span>
                <span className="fmcg-media-zoom-hint"><ZoomIn size={14} /> Zoom</span>
              </div>

              <div className="fmcg-product-content">
                <div>
                  <span className="fmcg-brand-eyebrow">ANGRY FROG • MAXWELL • ENCOUNTER</span>
                  <h3 className="fmcg-product-heading">{t('mosquitoTitle')}</h3>
                  <p className="fmcg-product-desc">
                    {t('mosquitoDesc')}
                  </p>

                  <ul className="fmcg-bullet-list">
                    <li className="fmcg-bullet-item">
                      <span className="fmcg-bullet-icon">◆</span>
                      <span><strong>Hawker / Cycle sales model</strong> (₹600/day potential)</span>
                    </li>
                    <li className="fmcg-bullet-item">
                      <span className="fmcg-bullet-icon">◆</span>
                      <span><strong>100% Guaranteed monthly income</strong> schemes</span>
                    </li>
                    <li className="fmcg-bullet-item">
                      <span className="fmcg-bullet-icon">◆</span>
                      <span><strong>Buy 2 Get 1</strong> offers</span>
                    </li>
                    <li className="fmcg-bullet-item">
                      <span className="fmcg-bullet-icon">◆</span>
                      <span><strong>Full audio & video campaign</strong> support</span>
                    </li>
                  </ul>

                  <div className="fmcg-chips-container">
                    <span className="fmcg-chip highlight">₹600/Day Hawker Model</span>
                    <span className="fmcg-chip highlight">Buy 2 Get 1 Offer</span>
                    <span className="fmcg-chip highlight">100% Guaranteed Income</span>
                    <span className="fmcg-chip">Citronella Agarbatti</span>
                    <span className="fmcg-chip">Audio & Video Campaign Kit</span>
                  </div>
                </div>

                <div className="fmcg-actions-row">
                  <button 
                    type="button"
                    className="btn-buying-enquiry"
                    onClick={() => handleOpenBuyingEnquiry(t('mosquitoTitle'), 'Angry Frog & Maxwell Mosquito Repellents')}
                  >
                    <Mail size={16} /> Buying Enquiry
                  </button>
                  <button 
                    type="button"
                    className="btn-whatsapp-order"
                    onClick={() => handleSendWhatsAppOrder(t('mosquitoTitle'))}
                  >
                    <MessageCircle size={16} /> WhatsApp Order
                  </button>
                  <button 
                    type="button"
                    className="btn-catalog-view"
                    onClick={() => openZoomGallery(fmcgGallery.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), 8, t('mosquitoTitle'))}
                  >
                    <ZoomIn size={14} /> View Visuals
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Soan Papdi & Others */}
            <div className="fmcg-product-card" id="soan-papdi">
              <div 
                className="fmcg-product-media"
                onClick={() => openZoomGallery(fmcgGallery.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), 9, t('soanPapdiTitle'))}
              >
                <img 
                  src={getEncodedUrl("https://i.pinimg.com/736x/51/5f/fa/515ffa956ae2e919d5d133aaaf681ba8.jpg")} 
                  alt={t('soanPapdiTitle')} 
                  className="fmcg-product-img"
                  loading="lazy" 
                  onError={(e) => handleImageError(e, t('soanPapdiTitle'), "https://i.pinimg.com/736x/51/5f/fa/515ffa956ae2e919d5d133aaaf681ba8.jpg")}
                />
                <span className="fmcg-media-badge">🍯 Pure Ghee & Sweets</span>
                <span className="fmcg-media-zoom-hint"><ZoomIn size={14} /> Zoom</span>
              </div>

              <div className="fmcg-product-content">
                <div>
                  <span className="fmcg-brand-eyebrow">MUNMUN SOANPAPDI BARDHHAMAN & INDUSTRIAL FMCG</span>
                  <h3 className="fmcg-product-heading">{t('soanPapdiTitle')}</h3>
                  <p className="fmcg-product-desc">
                    {t('soanPapdiDesc')}
                  </p>

                  <ul className="fmcg-bullet-list">
                    <li className="fmcg-bullet-item">
                      <span className="fmcg-bullet-icon">◆</span>
                      <span><strong>Complete product establishment</strong></span>
                    </li>
                    <li className="fmcg-bullet-item">
                      <span className="fmcg-bullet-icon">◆</span>
                      <span><strong>Distributor & C&F network</strong></span>
                    </li>
                    <li className="fmcg-bullet-item">
                      <span className="fmcg-bullet-icon">◆</span>
                      <span><strong>Online platform integrations</strong></span>
                    </li>
                  </ul>

                  <div className="fmcg-chips-container">
                    <span className="fmcg-chip highlight">Complete Establishment</span>
                    <span className="fmcg-chip highlight">Distributor & C&F Network</span>
                    <span className="fmcg-chip">Pure Ghee & Pistachios</span>
                    <span className="fmcg-chip">Detergent Powder Support</span>
                    <span className="fmcg-chip">Kitchen Chimney Promotion</span>
                  </div>
                </div>

                <div className="fmcg-actions-row">
                  <button 
                    type="button"
                    className="btn-buying-enquiry"
                    onClick={() => handleOpenBuyingEnquiry(t('soanPapdiTitle'), 'Munmun Soan Papdi & Industrial FMCG')}
                  >
                    <Mail size={16} /> Buying Enquiry
                  </button>
                  <button 
                    type="button"
                    className="btn-whatsapp-order"
                    onClick={() => handleSendWhatsAppOrder(t('soanPapdiTitle'))}
                  >
                    <MessageCircle size={16} /> WhatsApp Order
                  </button>
                  <button 
                    type="button"
                    className="btn-catalog-view"
                    onClick={() => openZoomGallery(fmcgGallery.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), 9, t('soanPapdiTitle'))}
                  >
                    <ZoomIn size={14} /> View Visuals
                  </button>
                </div>
              </div>
            </div>
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
          <div className="ps-gallery-wrapper">
            <h3 className="ps-gallery-title">{t('jewelleryGalleryTitle')}</h3>
            <div className="ps-gallery-grid">
              {jewelleryGallery.map((item, idx) => (
                <div 
                  key={idx} 
                  className="ps-gallery-card"
                  onClick={() => openZoomGallery(jewelleryGallery.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), idx, item.title)}
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
          <div className="ps-gallery-wrapper">
            <div className="ps-gallery-grid four-cols">
              {interiorGallery.map((item, idx) => (
                <div 
                  key={idx} 
                  className="ps-gallery-card"
                  onClick={() => openZoomGallery(interiorGallery.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), idx, item.title)}
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
        </div>
      </section>

      {/* LEGAL: Contractual Agreement Framework */}
      <section className="ps-section legal-bg">
        <div className="container">
          <div className="ps-sector-header">
            <span className="ps-sector-tag">{t('legalTag')}</span>
            <h2 className="ps-sector-title">{t('legalFrameworkTitle')}</h2>
          </div>

          <div className="ps-legal-box">
            <h3 className="ps-legal-title text-gold">{t('commitmentTitle')}</h3>
            <div className="ps-legal-details">
              <p><strong>{t('tenureLabel')}</strong> {t('tenureValue')}</p>
              <p><strong>{t('commercialsLabel')}</strong> {t('commercialsValue')}</p>
              <p><strong>{t('liabilityLabel')}</strong> <em>{t('liabilityValue')}</em></p>
            </div>

            <div className="ps-turnover-cards">
              <div className="turnover-card">
                <h4>{t('jewelleryLabel')}</h4>
                <p>₹720 Crore</p>
              </div>
              <div className="turnover-card">
                <h4>{t('fmcgLabel')}</h4>
                <p>₹12 Cr / 1.2 Cr</p>
              </div>
              <div className="turnover-card">
                <h4>{t('interiorLabel')}</h4>
                <p>₹1.2 Crore +</p>
              </div>
            </div>

            <p className="ps-verify-text">
              {t('paymentVerifyText')}
            </p>

            <div className="ps-legal-btn-wrapper">
              <button 
                className="btn-partnership-pay"
                onClick={() => setIsPaymentOpen(true)}
              >
                {t('btnPartnershipPayment')}
              </button>
            </div>
          </div>
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
              className="bg-[#12141a] border border-gold/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative"
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
