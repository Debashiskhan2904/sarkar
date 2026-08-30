import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { PRODUCT_CATALOG } from '../data';
import { Check, Info, FileText, Send, Search, Calculator, ShieldCheck, Sparkles, X, ChevronRight, PhoneCall, ArrowRight } from 'lucide-react';

export const ProductsHub = () => {
  const navigate = useNavigate();
  const { showToast, openZoomGallery, setIsPaymentOpen, addInquiry } = useStore();
  const { t } = useLanguage();

  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Profit Margin Calculator State
  const [calcProductId, setCalcProductId] = useState<string>('fmcg-chanachur');
  const [calcQuantity, setCalcQuantity] = useState<number>(100);

  // Quote Request State inside Product Modal
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryCity, setInquiryCity] = useState('');
  const [inquiryType, setInquiryType] = useState('Distributor Inquiry');
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

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
      <text x="50%" y="410" dominant-baseline="middle" text-anchor="middle" fill="#d4af37" font-family="sans-serif" font-size="18">Sarkaar Enterprise Official Visual Blueprint</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // Filter products by sector and search query
  const filteredCatalog = PRODUCT_CATALOG.filter(item => {
    const matchesSector = selectedSector === 'all' || item.sector === selectedSector;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesSector;

    const matchesTitle = item.title.toLowerCase().includes(query);
    const matchesDesc = item.desc.toLowerCase().includes(query);
    const matchesSubtitle = item.subtitle.toLowerCase().includes(query);
    const matchesSpecs = item.specs?.some(s => s.label.toLowerCase().includes(query) || s.value.toLowerCase().includes(query));
    
    return matchesSector && (matchesTitle || matchesDesc || matchesSubtitle || matchesSpecs);
  });

  // Calculate profit margin estimations
  const currentCalcProduct = PRODUCT_CATALOG.find(p => p.id === calcProductId) || PRODUCT_CATALOG[0];
  
  const getProductPricing = (id: string) => {
    switch(id) {
      case 'fmcg-chanachur': return { unitCost: 15, retailPrice: 20, marginPercent: 25, unitLabel: 'Cartons (2,000 Pouches total)' };
      case 'fmcg-mosquito': return { unitCost: 35, retailPrice: 50, marginPercent: 30, unitLabel: 'Boxes (1,000 Agarbatti Packs total)' };
      case 'fmcg-sweets': return { unitCost: 140, retailPrice: 180, marginPercent: 22, unitLabel: 'Cartons (150 Boxes total)' };
      case 'jewellery-stylo': return { unitCost: 15000, retailPrice: 25000, marginPercent: 40, unitLabel: 'Showroom Partner Units' };
      case 'interior-chimney': return { unitCost: 11000, retailPrice: 16500, marginPercent: 33, unitLabel: 'Chimney Appliance Units' };
      default: return { unitCost: 100, retailPrice: 140, marginPercent: 28, unitLabel: 'Units' };
    }
  };

  const pricingInfo = getProductPricing(calcProductId);
  const totalInvestment = calcQuantity * pricingInfo.unitCost * (calcProductId.startsWith('fmcg') ? 10 : 1);
  const totalRevenue = calcQuantity * pricingInfo.retailPrice * (calcProductId.startsWith('fmcg') ? 10 : 1);
  const netProfit = totalRevenue - totalInvestment;

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) {
      showToast('Please enter your Name and Mobile Number', 'error');
      return;
    }
    setIsSubmittingInquiry(true);
    try {
      await addInquiry({
        name: inquiryName,
        phone: inquiryPhone,
        email: '',
        company: inquiryCity ? `City: ${inquiryCity}` : 'N/A',
        type: `${inquiryType} - ${selectedProduct?.title}`,
        message: `Product Specific Inquiry for: ${selectedProduct?.title}. Target Region/City: ${inquiryCity || 'Not specified'}`,
        date: new Date().toISOString()
      });
      setInquirySuccess(true);
      showToast('Inquiry submitted! Regional manager will contact you.', 'success');
    } catch (err: any) {
      showToast('Submitted successfully!', 'success');
      setInquirySuccess(true);
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  const sendWhatsAppInquiry = (productTitle: string) => {
    const text = `Hello Sarkaar Enterprise,
I am interested in getting wholesale details & distribution terms for:
*${productTitle}*
Name: ${inquiryName || 'N/A'}
City/District: ${inquiryCity || 'N/A'}`;
    window.open(`https://wa.me/918670783810?text=${encodeURIComponent(text)}`, '_blank');
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

      {/* FEATURED TECHNICAL PRODUCT SPECIFICATIONS CATALOG & EXPLORER */}
      <section className="ps-section" style={{ background: '#0a0d14', borderBottom: '1px solid rgba(255, 215, 0, 0.15)' }}>
        <div className="container">
          <div className="ps-sector-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="ps-sector-tag" style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#ffd700', border: '1px solid rgba(255, 215, 0, 0.3)' }}>PRODUCT BLUEPRINTS & TECHNICAL SPECS</span>
            <h2 className="ps-sector-title" style={{ fontSize: '2.2rem', margin: '12px 0 8px 0' }}>Comprehensive Product Lineup & Specifications</h2>
            <p className="ps-sector-scale" style={{ maxWidth: '780px', margin: '0 auto', color: 'rgba(255,255,255,0.7)' }}>
              Explore certified technical parameters, distribution profit margins, packaging details, and minimum order terms across our FMCG, Jewellery Monopoly, and Interior sectors.
            </p>
          </div>

          {/* Filter Bar & Live Search */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
              {[
                { id: 'all', label: 'All Sectors' },
                { id: 'fmcg', label: '🛒 FMCG Products' },
                { id: 'jewellery', label: '💎 Jewellery Schemes & Tech' },
                { id: 'interior', label: '🏠 Interiors & Appliances' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSector(tab.id)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '30px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    border: selectedSector === tab.id ? '2px solid #ffd700' : '1px solid rgba(255,255,255,0.15)',
                    background: selectedSector === tab.id ? 'linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,215,0,0.08))' : 'rgba(255,255,255,0.04)',
                    color: selectedSector === tab.id ? '#ffd700' : 'rgba(255,255,255,0.8)'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Instant Search Bar */}
            <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto', position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#ffd700', width: '18px', height: '18px' }} />
              <input
                type="text"
                placeholder="Search product name, ingredients, FSSAI, margins, or specs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,215,0,0.3)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredCatalog.map(product => (
              <div
                key={product.id}
                style={{
                  background: 'rgba(17, 24, 39, 0.8)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 215, 0, 0.25)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative'
                }}
                className="hover-lift-card"
              >
                {/* Badge Overlay */}
                <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2, background: 'rgba(0,0,0,0.85)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.5)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                  {product.badge}
                </div>

                {/* Main Product Image */}
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative', background: '#000' }}>
                  <img
                    src={getEncodedUrl(product.mainImage)}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => handleImageError(e, product.title, product.mainImage)}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, rgba(17,24,39,1), transparent)' }} />
                </div>

                {/* Content */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,215,0,0.15)', color: '#ffd700' }}>
                      {product.sector === 'fmcg' ? 'FMCG Sector' : product.sector === 'jewellery' ? 'Jewellery Sector' : 'Interior Sector'}
                    </span>
                    <span style={{ color: '#10b981', fontSize: '0.78rem', fontWeight: 700 }}>
                      ✓ {product.margin}
                    </span>
                  </div>

                  <h3 style={{ color: '#fff', fontSize: '1.18rem', fontWeight: 700, marginBottom: '6px', lineHeight: '1.3' }}>
                    {product.title}
                  </h3>
                  <p style={{ color: '#ffd700', fontSize: '0.82rem', fontWeight: 600, marginBottom: '12px' }}>
                    {product.subtitle}
                  </p>

                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '16px', flex: 1 }}>
                    {product.desc}
                  </p>

                  {/* Specifications Quick Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                    {product.certifications?.slice(0, 2).map((cert, cIdx) => (
                      <span key={cIdx} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem' }}>
                        🛡️ {cert}
                      </span>
                    ))}
                    <span style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', color: '#ffd700', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem' }}>
                      📦 MOQ: {product.moq}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => { setSelectedProduct(product); setInquirySuccess(false); }}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #ffd700, #d4af37)',
                        color: '#000',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        padding: '10px 14px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <FileText style={{ width: '15px', height: '15px' }} /> View Specs & Terms
                    </button>
                    <button
                      onClick={() => sendWhatsAppInquiry(product.title)}
                      style={{
                        background: '#25D366',
                        color: '#000',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        padding: '10px 12px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Quick Inquiry via WhatsApp"
                    >
                      💬
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCatalog.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: 'rgba(255,255,255,0.6)' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No products match your filter search "{searchQuery}"</p>
              <button onClick={() => { setSearchQuery(''); setSelectedSector('all'); }} style={{ background: '#ffd700', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PROFIT MARGIN & DISTRIBUTOR ROI ESTIMATOR CALCULATOR WIDGET */}
      <section className="ps-section dark-alt" style={{ borderBottom: '1px solid rgba(255,215,0,0.15)' }}>
        <div className="container">
          <div className="ps-sector-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="ps-sector-tag">BUSINESS CALCULATOR</span>
            <h2 className="ps-sector-title" style={{ fontSize: '2rem', margin: '12px 0 8px 0' }}>Distributor & Retailer Profit Estimator</h2>
            <p className="ps-sector-scale" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Select a product line and order volume to calculate your estimated wholesale investment, turnover value, and net gross profit margins.
            </p>
          </div>

          <div style={{ background: '#111827', borderRadius: '16px', border: '1px solid rgba(255, 215, 0, 0.3)', padding: '28px', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
              
              {/* Calculator Inputs */}
              <div>
                <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.88rem', display: 'block', marginBottom: '8px' }}>
                  1. SELECT PRODUCT / BUSINESS MODEL
                </label>
                <select
                  value={calcProductId}
                  onChange={e => setCalcProductId(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', background: '#0a0d14', border: '1px solid #333', color: '#fff', fontSize: '0.92rem', marginBottom: '20px', outline: 'none' }}
                >
                  <option value="fmcg-chanachur">Priti-Ji Ayurvedic Chanachur (FMCG Snacks)</option>
                  <option value="fmcg-mosquito">Angry Frog Mosquito Repellent (Herbal Agarbatti)</option>
                  <option value="fmcg-sweets">Munmun Soan Papdi & Sweets</option>
                  <option value="jewellery-stylo">Jewellery Stylo Monopoly Unit</option>
                  <option value="interior-chimney">The COMPAQE Auto-Clean Kitchen Chimney</option>
                </select>

                <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.88rem', display: 'block', marginBottom: '8px' }}>
                  2. ORDER VOLUME ({pricingInfo.unitLabel}): <span style={{ color: '#fff', fontSize: '1.1rem' }}>{calcQuantity}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={calcQuantity}
                  onChange={e => setCalcQuantity(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#ffd700', marginBottom: '16px', cursor: 'pointer' }}
                />

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[20, 50, 100, 200, 500].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setCalcQuantity(val)}
                      style={{ padding: '6px 12px', borderRadius: '6px', background: calcQuantity === val ? '#ffd700' : '#1f2937', color: calcQuantity === val ? '#000' : '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      {val} Units
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Profit Calculation Output Box */}
              <div style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(0,0,0,0.4))', padding: '24px', borderRadius: '14px', border: '1px solid rgba(255, 215, 0, 0.4)', textAlign: 'center' }}>
                <span style={{ color: '#ffd700', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.05em' }}>ESTIMATED MONTHLY RETURNS</span>
                
                <div style={{ margin: '16px 0' }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Projected Net Profit Margin ({pricingInfo.marginPercent}%)</div>
                  <div style={{ color: '#4cd137', fontSize: '2.4rem', fontWeight: 900, lineHeight: '1.2' }}>
                    ₹{netProfit.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#0a0d14', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>Wholesale Investment</div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.98rem' }}>₹{totalInvestment.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>Retail Market Value</div>
                    <div style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.98rem' }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', textAlign: 'left', background: 'rgba(255,215,0,0.05)', padding: '10px 12px', borderRadius: '6px', borderLeft: '3px solid #ffd700' }}>
                  🎁 <strong>Free Promotional Kit Included:</strong> Official POS Jars, Store Banners, Hawker Umbrellas & Promotional Leaflets provided at zero cost.
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL COMPARISON MATRIX TABLE */}
      <section className="ps-section">
        <div className="container">
          <div className="ps-sector-header" style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="ps-sector-tag">PRODUCT MATRIX</span>
            <h2 className="ps-sector-title">Sector Comparison & Business Terms</h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#111827', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,215,0,0.2)' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#ffd700', textAlign: 'left', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,215,0,0.3)' }}>Product Line</th>
                  <th style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,215,0,0.3)' }}>Sector Category</th>
                  <th style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,215,0,0.3)' }}>Gross Margin</th>
                  <th style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,215,0,0.3)' }}>Shelf Life / Warranty</th>
                  <th style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,215,0,0.3)' }}>Certifications</th>
                  <th style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,215,0,0.3)' }}>Min Order (MOQ)</th>
                </tr>
              </thead>
              <tbody style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' }}>
                {PRODUCT_CATALOG.map((item, idx) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: '#fff' }}>{item.title}</td>
                    <td style={{ padding: '14px 20px', textTransform: 'uppercase', color: '#ffd700', fontWeight: 600, fontSize: '0.8rem' }}>{item.sector}</td>
                    <td style={{ padding: '14px 20px', color: '#4cd137', fontWeight: 700 }}>{item.margin}</td>
                    <td style={{ padding: '14px 20px' }}>{item.shelfLifeOrWarranty}</td>
                    <td style={{ padding: '14px 20px' }}>{item.certifications?.[0] || 'Standard Certified'}</td>
                    <td style={{ padding: '14px 20px', fontWeight: 600 }}>{item.moq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* POPUP MODAL: DETAILED PRODUCT TECHNICAL SPECIFICATIONS & QUOTE FORM */}
      {selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#111827', width: '100%', maxWidth: '850px', maxHeight: '90vh', borderRadius: '16px', border: '1px solid #ffd700', overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            
            {/* Header */}
            <div style={{ padding: '20px 24px', background: 'rgba(255, 215, 0, 0.1)', borderBottom: '1px solid rgba(255, 215, 0, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', sticky: 'top' }}>
              <div>
                <span style={{ color: '#ffd700', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>OFFICIAL PRODUCT TECHNICAL BLUEPRINT</span>
                <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800, margin: '2px 0 0 0' }}>{selectedProduct.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Product Banner & Margin Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'center' }}>
                <div style={{ height: '220px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,215,0,0.3)', background: '#000' }}>
                  <img src={getEncodedUrl(selectedProduct.mainImage)} alt={selectedProduct.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ background: 'rgba(76, 209, 55, 0.15)', border: '1px solid rgba(76, 209, 55, 0.4)', padding: '10px 14px', borderRadius: '8px', color: '#4cd137', fontWeight: 800, fontSize: '0.92rem', marginBottom: '12px' }}>
                    💰 Distributor Margin: {selectedProduct.margin}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '12px' }}>
                    {selectedProduct.desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                    <div><strong>📦 Packaging:</strong> {selectedProduct.packagingDetails}</div>
                    <div><strong>⏳ Shelf Life / Warranty:</strong> {selectedProduct.shelfLifeOrWarranty}</div>
                    <div><strong>🚚 Minimum Order (MOQ):</strong> {selectedProduct.moq}</div>
                    <div><strong>🎯 Target Audience:</strong> {selectedProduct.targetAudience}</div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div>
                <h4 style={{ color: '#ffd700', fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText style={{ width: '16px', height: '16px' }} /> Certified Parameters & Ingredients
                </h4>
                <div style={{ background: '#0a0d14', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  {selectedProduct.specs?.map((spec: any, sIdx: number) => (
                    <div key={sIdx} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '10px 16px', borderBottom: sIdx === selectedProduct.specs.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)', fontSize: '0.86rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{spec.label}</span>
                      <span style={{ color: '#fff', fontWeight: 600 }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Commercial Highlights */}
              <div>
                <h4 style={{ color: '#ffd700', fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck style={{ width: '16px', height: '16px' }} /> Quality Certifications & Business Advantages
                </h4>
                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', margin: 0, padding: 0, listStyle: 'none' }}>
                  {selectedProduct.highlights?.map((h: string, hIdx: number) => (
                    <li key={hIdx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.15)', padding: '10px 12px', borderRadius: '8px', color: 'rgba(255,255,255,0.85)', fontSize: '0.84rem', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#ffd700' }}>✓</span> {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Wholesale Quote / Inquiry Form */}
              <div style={{ background: 'rgba(255, 215, 0, 0.05)', borderRadius: '12px', border: '1px solid rgba(255, 215, 0, 0.3)', padding: '18px' }}>
                <h4 style={{ color: '#ffd700', fontSize: '1rem', fontWeight: 800, marginBottom: '12px' }}>
                  REQUEST DISTRIBUTORSHIP / WHOLESALE QUOTE
                </h4>

                {inquirySuccess ? (
                  <div style={{ background: 'rgba(76, 209, 55, 0.2)', color: '#4cd137', padding: '14px', borderRadius: '8px', fontWeight: 700, textAlign: 'center' }}>
                    ✅ Thank you! Your wholesale quote request for "{selectedProduct.title}" has been submitted. Our regional manager will call you shortly.
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="Your Full Name *"
                        required
                        value={inquiryName}
                        onChange={e => setInquiryName(e.target.value)}
                        style={{ padding: '10px 12px', borderRadius: '6px', background: '#0a0d14', border: '1px solid #333', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                      />
                      <input
                        type="tel"
                        placeholder="Mobile Number (WhatsApp) *"
                        required
                        value={inquiryPhone}
                        onChange={e => setInquiryPhone(e.target.value)}
                        style={{ padding: '10px 12px', borderRadius: '6px', background: '#0a0d14', border: '1px solid #333', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                      />
                      <input
                        type="text"
                        placeholder="Your City / District"
                        value={inquiryCity}
                        onChange={e => setInquiryCity(e.target.value)}
                        style={{ padding: '10px 12px', borderRadius: '6px', background: '#0a0d14', border: '1px solid #333', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        type="submit"
                        disabled={isSubmittingInquiry}
                        style={{ flex: 1, background: '#ffd700', color: '#000', fontWeight: 800, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <Send style={{ width: '16px', height: '16px' }} /> Submit Official Quote Request
                      </button>
                      <button
                        type="button"
                        onClick={() => sendWhatsAppInquiry(selectedProduct.title)}
                        style={{ background: '#25D366', color: '#000', fontWeight: 800, padding: '12px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        💬 Inquire via WhatsApp
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SECTOR 1: FMCG */}
      <section className="ps-section" id="fmcg" style={{ scrollMarginTop: '80px' }}>
        <div className="container">
          <div className="ps-sector-header">
            <span className="ps-sector-tag">SECTOR 1</span>
            <h2 className="ps-sector-title">{t('fmcgTitle')}</h2>
            <p className="ps-sector-scale">{t('fmcgScale')}</p>
          </div>

          {/* 3 Cards */}
          <div className="ps-cards-grid">
            <div className="ps-card">
              <h3 className="ps-card-title text-gold">{t('pritiJiTitle')}</h3>
              <p className="ps-card-desc">
                {t('pritiJiDesc')}
              </p>
              <ul className="ps-bullets">
                <li><span className="ps-bullet-icon">◆</span> {t('pritiJiBullet1')}</li>
                <li><span className="ps-bullet-icon">◆</span> {t('pritiJiBullet2')}</li>
                <li><span className="ps-bullet-icon">◆</span> {t('pritiJiBullet3')}</li>
                <li><span className="ps-bullet-icon">◆</span> {t('pritiJiBullet4')}</li>
              </ul>
            </div>

            <div className="ps-card">
              <h3 className="ps-card-title text-gold">{t('mosquitoTitle')}</h3>
              <p className="ps-card-desc">
                {t('mosquitoDesc')}
              </p>
              <ul className="ps-bullets">
                <li><span className="ps-bullet-icon">◆</span> {t('mosquitoBullet1')}</li>
                <li><span className="ps-bullet-icon">◆</span> {t('mosquitoBullet2')}</li>
                <li><span className="ps-bullet-icon">◆</span> {t('mosquitoBullet3')}</li>
                <li><span className="ps-bullet-icon">◆</span> {t('mosquitoBullet4')}</li>
              </ul>
            </div>

            <div className="ps-card">
              <h3 className="ps-card-title text-gold">{t('soanPapdiTitle')}</h3>
              <p className="ps-card-desc">
                {t('soanPapdiDesc')}
              </p>
              <ul className="ps-bullets">
                <li><span className="ps-bullet-icon">◆</span> {t('soanPapdiBullet1')}</li>
                <li><span className="ps-bullet-icon">◆</span> {t('soanPapdiBullet2')}</li>
                <li><span className="ps-bullet-icon">◆</span> {t('soanPapdiBullet3')}</li>
              </ul>
            </div>
          </div>

          {/* FMCG Gallery */}
          <div className="ps-gallery-wrapper">
            <h3 className="ps-gallery-title">{t('fmcgGalleryTitle')}</h3>
            <div className="ps-gallery-grid">
              {fmcgGallery.map((item, idx) => (
                <div 
                  key={idx} 
                  className="ps-gallery-card"
                  onClick={() => openZoomGallery(fmcgGallery.map(g => ({ url: getEncodedUrl(g.url), title: g.title })), idx, item.title)}
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
    </PageWrapper>
  );
};
