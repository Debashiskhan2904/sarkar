import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';

export const ProductsHub = () => {
  const navigate = useNavigate();
  const { showToast, openZoomGallery, setIsPaymentOpen } = useStore();

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
    { title: "Priti-Ji Ayurvedic Chanachur", url: "/images/PritiJiAyurvedicChanachur.jpg" },
    { title: "Brand Promoter Range", url: "/images/BrandPromoterRange.jpg" },
    { title: "Free-Free-Free Combo Offers", url: "/images/FreeFreeFreeComboOffers.jpg" },
    { title: "Angry Frog Income Scheme", url: "/images/AngryFrogncomeScheme.jpg" },
    { title: "Hawker Recruitment (Bengali)", url: "/images/HawkerRecruitment(Bengali).jpg" },
    { title: "Maxwell Magic Sale Scheme", url: "/images/MaxwellMagicSaleScheme.jpg" },
    { title: "Agarbatti Stock", url: "/images/AgarbattiStock.jpg" },
    { title: "Surya Maxwell Incense", url: "/images/SuryaMaxwellIncense.jpg" },
    { title: "Anti Mosquito Instant Kill", url: "/images/AntiMosquitonstantKill.jpg" },
    { title: "Munmun Soan Papdi", url: "/images/MunmunSoanPapdi.jpg" },
    { title: "Distributorship Certificate", url: "/images/DistributorshipCertificate.jpg" },
    { title: "Partner Benefits & Promotion", url: "/images/PartnerBenefits&Promotion.jpg" }
  ];

  // Jewellery Gallery Images
  const jewelleryGallery = [
    { title: "India's No.1 Jewellery Stylo Scheme", url: "/images/india’sNo.1JewelleryStyloScheme.jpg" },
    { title: "6 Years Banking Return with Interest", url: "/images/6YearsBankingReturnwithInterest.jpg" },
    { title: "M1 Aug'22 Competitive Scheme", url: "/images/M1Aug'22CompetitiveScheme.jpg" },
    { title: "Project 8 – Y4 Competitive Scheme Calendar", url: "/images/Project8Y4CompetitiveSchemeCalendar.jpg" },
    { title: "Project 9 – Future Statistics City King Monopoly", url: "/images/Project9FutureStatisticsCityKingMonopoly.jpg" },
    { title: "Project 5 – Daily Target Turnover Collection Unit", url: "/images/Project5DailyTargetTurnoverCollectionUnit.jpg" },
    { title: "Project 6 – Expense Unit & New Concept Showroom", url: "/images/Project6ExpenseUnit&NewConceptShowroom.jpg" },
    { title: "Project 7 – Reference Chain Marketing Executive", url: "/images/Project7ReferenceChainMarketingExecutive.jpg" },
    { title: "Project 14 – Recycling Filter Chemicals Process", url: "/images/Project14RecyclingFilterChemicalsProcess.jpg" },
    { title: "Project 15 – Substantial Profitable Accountability", url: "/images/Project15SubstantialProfitableAccountability.jpg" },
    { title: "Project 16 – Recycling & Reshuffling Process", url: "/images/Project16Recycling&ReshufflingProcess.jpg" },
    { title: "Corner to Corner 100% Business Oriented Turnover", url: "/images/CornertoCorner100%BusinessOrientedTurnover.jpg" }
  ];

  // Interior Gallery Images
  const interiorGallery = [
    { title: "The Compage – Interior Branding", url: "/images/TheCompageInteriorBranding.jpg" },
    { title: "Living & Display Unit Sample", url: "/images/Living&DisplayUnitSample.jpg" },
    { title: "Modular Kitchen Work", url: "/images/ModularKitchenWork.jpg" },
    { title: "Luxury Living Concept", url: "/images/LuxuryLivingConcept.jpg" }
  ];

  return (
    <PageWrapper>
      {/* Products & Sectors Hero */}
      <section className="ps-hero">
        <div className="container">
          <div className="faq-breadcrumb">
            <Link to="/">Home</Link> / Products & Sectors
          </div>
          <h1 className="ps-hero-title">
            Products <span className="text-gold">&</span> Sectors
          </h1>
          <p className="ps-hero-list">
            Commitment to establish your Mall • Gold ornaments Jewellery outlet • Domestic/Corporate Interior Project • Kitchen Chimney Manufacturer • Chanachur Company • Soanpapdi company • Mosquito Repellent Sticks/Vaporizer • Detergent powder
          </p>
        </div>
      </section>

      {/* SECTOR 1: FMCG */}
      <section className="ps-section" id="fmcg" style={{ scrollMarginTop: '80px' }}>
        <div className="container">
          <div className="ps-sector-header">
            <span className="ps-sector-tag">SECTOR 1</span>
            <h2 className="ps-sector-title">FMCG Marketing Blueprint</h2>
            <p className="ps-sector-scale">Projected Scale: ₹12 Crore / ₹1.2 Crore per annum</p>
          </div>

          {/* 3 Cards */}
          <div className="ps-cards-grid">
            <div className="ps-card">
              <h3 className="ps-card-title text-gold">Priti-Ji Chanachur</h3>
              <p className="ps-card-desc">
                Dry Fruit Base Ayurvedic Chanachur – First time in West Bengal. Digestive, protein rich, unique masala taste. Available in Lemon Tak-Jhal-Misti, Yasti Madhu Misti/Salty, Green Chilli Special Jhal.
              </p>
              <ul className="ps-bullets">
                <li><span className="ps-bullet-icon">◆</span> Dealer Price from ₹60–70 combo pack</li>
                <li><span className="ps-bullet-icon">◆</span> Credit Limit 15 days</li>
                <li><span className="ps-bullet-icon">◆</span> Free gifts & promotional support</li>
                <li><span className="ps-bullet-icon">◆</span> 100% Dealer Promotion + Extra ₹18k Income p.m. possible</li>
              </ul>
            </div>

            <div className="ps-card">
              <h3 className="ps-card-title text-gold">Mosquito Repellents</h3>
              <p className="ps-card-desc">
                Angry Frog • Maxwell • Encounter • Anti Mosquito Instant Kill Vaporizer & Citronella Agarbatti. Natural herbal formulations.
              </p>
              <ul className="ps-bullets">
                <li><span className="ps-bullet-icon">◆</span> Hawker / Cycle sales model (₹600/day potential)</li>
                <li><span className="ps-bullet-icon">◆</span> 100% Guaranteed monthly income schemes</li>
                <li><span className="ps-bullet-icon">◆</span> Buy 2 Get 1 offers</li>
                <li><span className="ps-bullet-icon">◆</span> Full audio & video campaign support</li>
              </ul>
            </div>

            <div className="ps-card">
              <h3 className="ps-card-title text-gold">Soan Papdi & Others</h3>
              <p className="ps-card-desc">
                Traditional Indian flaky sweet with pistachios. Detergent powder, Kitchen Chimney manufacturing support also available under FMCG/Industrial promotion.
              </p>
              <ul className="ps-bullets">
                <li><span className="ps-bullet-icon">◆</span> Complete product establishment</li>
                <li><span className="ps-bullet-icon">◆</span> Distributor & C&F network</li>
                <li><span className="ps-bullet-icon">◆</span> Online platform integrations</li>
              </ul>
            </div>
          </div>

          {/* FMCG Gallery */}
          <div className="ps-gallery-wrapper">
            <h3 className="ps-gallery-title">FMCG Product Gallery</h3>
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
            <span className="ps-sector-tag">SECTOR 2</span>
            <h2 className="ps-sector-title">Premium Jewellery Blueprints</h2>
            <p className="ps-sector-scale">Projected Scale: ₹720 Crore per annum • City King Monopoly Models</p>
          </div>

          {/* Board of Directors Message Box */}
          <div className="ps-board-box">
            <h3 className="ps-board-title text-gold">Message to Jewellery Company Board of Directors</h3>
            <p className="ps-board-text">
              We bring an <strong>Administrative Strong Competitive & Scientific marketing infrastructure</strong> backed by an <strong>Analytical and Scrutinize program</strong> designed for city-king monopoly expansion. New concept showroom, high-profile motivation, unlimited national & international standard high-fidelity design availability, 100% target achievement commitment, net entire company profitable accountability — more than ₹3-6 Crore per month in overall sales possible under our schemes.
            </p>
          </div>

          {/* Jewellery Diagrams & Schemes */}
          <div className="ps-gallery-wrapper">
            <h3 className="ps-gallery-title">Key Jewellery Project Diagrams & Schemes</h3>
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
            <h3 className="ps-highlights-title text-gold">M1 / M2 / Y4 Competitive Schemes Highlights</h3>
            <div className="ps-highlights-grid">
              <ul>
                <li>One time design & many times rotation sales</li>
                <li>Fixed One Time Investment models</li>
                <li>Service charge for exchange handling</li>
                <li>Valid 1 year exchange offer schemes</li>
              </ul>
              <ul>
                <li>Reference Chain Marketing Executives (RCMA)</li>
                <li>Daily Target Turnover (DTTO) tracking</li>
                <li>Assured collection & net company profit calculations</li>
                <li>Digital ID, Uniform, Showroom decoration support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTOR 3: INTERIORS */}
      <section className="ps-section" id="interior" style={{ scrollMarginTop: '80px' }}>
        <div className="container">
          <div className="ps-sector-header">
            <span className="ps-sector-tag">SECTOR 3</span>
            <h2 className="ps-sector-title">Domestic & Corporate Interiors</h2>
            <p className="ps-sector-scale">Projected Scale: ₹1.2 Crore + Additional Tasks per annum</p>
          </div>

          {/* 4 Cards */}
          <div className="ps-cards-grid four-cols">
            <div className="ps-card">
              <div className="ps-card-icon">🏢</div>
              <h3 className="ps-card-title">Corporate Interior Projects</h3>
              <p className="ps-card-desc">
                Complete turnkey interior solutions for offices, showrooms and commercial spaces with modern design language.
              </p>
            </div>

            <div className="ps-card">
              <div className="ps-card-icon">🏠</div>
              <h3 className="ps-card-title">Domestic Establishments</h3>
              <p className="ps-card-desc">
                Full home interior packages – living, kitchen, bedroom, false ceiling, modular solutions.
              </p>
            </div>

            <div className="ps-card">
              <div className="ps-card-icon">🍳</div>
              <h3 className="ps-card-title">Kitchen Chimney Manufacturing</h3>
              <p className="ps-card-desc">
                Support for manufacturing and market establishment of kitchen chimney products.
              </p>
            </div>

            <div className="ps-card">
              <div className="ps-card-icon">🏬</div>
              <h3 className="ps-card-title">Shopping Mall Establishment</h3>
              <p className="ps-card-desc">
                End-to-end commitment to establish your mall or retail project with full marketing infrastructure.
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
            <span className="ps-sector-tag">LEGAL</span>
            <h2 className="ps-sector-title">Contractual Agreement Framework</h2>
          </div>

          <div className="ps-legal-box">
            <h3 className="ps-legal-title text-gold">The Sarkar Enterprise Commitment</h3>
            <div className="ps-legal-details">
              <p><strong>Tenure:</strong> 5-Year Agreement</p>
              <p><strong>Commercials:</strong> 2% of company face value business turnover per annum</p>
              <p><strong>Liability:</strong> <em>“We will take liability, responsibility to establish your company within one/two year.”</em></p>
            </div>

            <div className="ps-turnover-cards">
              <div className="turnover-card">
                <h4>Jewellery</h4>
                <p>₹720 Crore</p>
              </div>
              <div className="turnover-card">
                <h4>FMCG</h4>
                <p>₹12 Cr / 1.2 Cr</p>
              </div>
              <div className="turnover-card">
                <h4>Interior</h4>
                <p>₹1.2 Crore +</p>
              </div>
            </div>

            <p className="ps-verify-text">
              Payment & Verification via Secure QR Code & Money Receipt. Full GST Registration available.
            </p>

            <div className="ps-legal-btn-wrapper">
              <button 
                className="btn-partnership-pay"
                onClick={() => setIsPaymentOpen(true)}
              >
                PROCEED TO PARTNERSHIP PAYMENT →
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
