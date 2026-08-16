import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';

export const ProductsHub = () => {
  const navigate = useNavigate();
  const { showToast, openZoomGallery, setIsPaymentOpen } = useStore();
  const { t } = useLanguage();

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
    { title: "The Compage – Interior Branding", url: "https://i.pinimg.com/736x/03/96/52/03965240cf22daf093eb4a706f5c5c83.jpg" },
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
