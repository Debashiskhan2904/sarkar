import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { 
  Mail, 
  MessageCircle, 
  ZoomIn, 
  Check, 
  Leaf, 
  Heart, 
  Users, 
  ShieldCheck, 
  Truck, 
  Handshake, 
  TrendingUp,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface PritiJiShowcaseProps {
  onOpenEnquiry: (productName: string, category: string) => void;
  onWhatsAppOrder: (productName: string) => void;
  onViewVisuals: () => void;
}

export const PritiJiShowcase: React.FC<PritiJiShowcaseProps> = ({
  onOpenEnquiry,
  onWhatsAppOrder,
  onViewVisuals
}) => {
  const { t } = useLanguage();
  // The 3 dedicated Priti-Ji images requested by the user:
  // 1st: https://i.pinimg.com/736x/9f/63/a9/9f63a9ae3bb1b1da075a53c362e56abd.jpg (Green Chilli Special Jhal)
  // 2nd: https://i.pinimg.com/736x/63/e9/d2/63e9d21494581cc8af1fe6b4ea9c3749.jpg (Official Bengali Flyer shown on left of banner)
  // 3rd: https://i.pinimg.com/736x/af/0e/1f/af0e1f2bbb6c9a9fdbe28c01ce46bdce.jpg (Yasti Madhu Misti / Salty Packets)
  const pritiImages = [
    {
      id: 'img-1',
      indexLabel: '1st',
      title: '1st: Priti-Ji Green Chilli Special Jhal Ayurvedic Pack',
      sub: 'Green Chilli Special Jhal (Enriched with Dry Fruits & Ayurvedic Masala)',
      webpUrl: '/images/products/priti-ji/priti_packet_1.webp',
      url: '/images/products/priti-ji/priti_packet_1.jpg',
      remoteUrl: 'https://i.pinimg.com/736x/9f/63/a9/9f63a9ae3bb1b1da075a53c362e56abd.jpg'
    },
    {
      id: 'img-2',
      indexLabel: '2nd',
      title: '2nd: Priti-Ji Official Dealership Leaflet & Scheme (West Bengal)',
      sub: 'Dry Fruit Base Ayurvedic Chanachur – Promotional Leaflet & Dealer Offer',
      webpUrl: '/images/products/priti-ji/priti_packet_2.webp',
      url: '/images/products/priti-ji/priti_packet_2.jpg',
      remoteUrl: 'https://i.pinimg.com/736x/63/e9/d2/63e9d21494581cc8af1fe6b4ea9c3749.jpg'
    },
    {
      id: 'img-3',
      indexLabel: '3rd',
      title: '3rd: Priti-Ji Yasti Madhu Misti & Salty Digestive Packets',
      sub: 'Yasti Madhu Digestive Ayurvedic Chanachur (Twin Packets)',
      webpUrl: '/images/products/priti-ji/priti_packet_3.webp',
      url: '/images/products/priti-ji/priti_packet_3.jpg',
      remoteUrl: 'https://i.pinimg.com/736x/af/0e/1f/af0e1f2bbb6c9a9fdbe28c01ce46bdce.jpg'
    }
  ];

  // Default to index 0 (the main Green Chilli Ayurvedic Chanachur banner shown in screenshot)
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFlyerZoom, setShowFlyerZoom] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const activeImg = pritiImages[activeImageIndex];

  const handleOpenZoom = (idx: number) => {
    setModalIndex(idx);
    setShowFlyerZoom(true);
  };

  const handlePrevModal = () => {
    setModalIndex((prev) => (prev > 0 ? prev - 1 : pritiImages.length - 1));
  };

  const handleNextModal = () => {
    setModalIndex((prev) => (prev < pritiImages.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (!showFlyerZoom) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowFlyerZoom(false);
      if (e.key === 'ArrowLeft') handlePrevModal();
      if (e.key === 'ArrowRight') handleNextModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFlyerZoom, modalIndex]);

  // 8 Benefit tiles matching the exact icons in the user screenshot
  const features = [
    { 
      icon: <Leaf className="w-5 h-5 text-emerald-400" />, 
      label: t('pritiFeatDryFruit') 
    },
    { 
      icon: (
        <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4c-3 0-5 2-5 5 0 3 1.5 5 2 7 1 4 4 4 6 4s4-1 4-4c0-3-1-5-2-7-.8-1.6-1.8-3-2-5 0-2-1.5-3-3-3z" />
          <path d="M10 9c.5-1 1.5-2 3-2" />
        </svg>
      ), 
      label: t('pritiFeatDigest') 
    },
    { 
      icon: (
        <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 13a4 4 0 0 1 4-4h4a3 3 0 0 1 3 3v2a4 4 0 0 1-4 4H9a3 3 0 0 1-3-3v-2z" />
          <path d="M6 9a3 3 0 0 1 3-3h2" />
          <path d="M17 11a2 2 0 0 1 2 2v1" />
        </svg>
      ), 
      label: t('pritiFeatProtein') 
    },
    { 
      icon: (
        <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v6" />
          <path d="M7 10c0-2.8 2.2-5 5-5s5 2.2 5 5c0 3-2 5-5 5s-5-2-5-5z" />
          <path d="M12 15v7" />
          <path d="M8 19c2 1 6 1 8 0" />
        </svg>
      ), 
      label: t('pritiFeatAyurvedic') 
    },
    { 
      icon: <Heart className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />, 
      label: t('pritiFeatHealthyTasty') 
    },
    { 
      icon: <Users className="w-5 h-5 text-emerald-400" />, 
      label: t('pritiFeatAllAges') 
    },
    { 
      icon: (
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3h6M10 3v6l-4 8a2 2 0 0 0 1.8 3h12.4a2 2 0 0 0 1.8-3l-4-8V3" />
          </svg>
          <div className="absolute w-6 h-0.5 bg-rose-500 rotate-45"></div>
        </div>
      ), 
      label: t('pritiFeatNoColours') 
    },
    { 
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, 
      label: t('pritiFeatNoPreservatives') 
    }
  ];

  // 8 Checklist bullet points matching screenshot
  const bullets = [
    t('pritiBullet1'),
    t('pritiBullet2'),
    t('pritiBullet3'),
    t('pritiBullet4'),
    t('pritiBullet5'),
    t('pritiBullet6'),
    t('pritiBullet7'),
    t('pritiBullet8')
  ];

  // Chips matching screenshot
  const tags = [
    { text: t('pritiTagCombo'), highlight: true },
    { text: t('pritiTagCredit'), highlight: true },
    { text: t('pritiTagScheme'), highlight: true },
    { text: `${t('pritiFeatDryFruit')} • ${t('pritiFeatAyurvedic')}`, highlight: true },
    { text: t('pritiTagFlavours'), highlight: false },
    { text: t('pritiFeatNoPreservatives'), highlight: false },
    { text: t('pritiTagDemand'), highlight: false }
  ];

  return (
    <div className="pritiji-showcase-wrapper" id="chanachur">
      <div className="pritiji-banner-card">
        {/* LEFT COLUMN: THE AUTHENTIC BENGALI FLYER POSTER */}
        <div className="pritiji-flyer-column">
          {/* Ambient blurred backdrop to eliminate dead space */}
          <div 
            className="flyer-ambient-bg" 
            style={{ backgroundImage: `url(${activeImg.url})` }}
          />

          {/* Active Flyer Image Container */}
          <div 
            className="flyer-img-wrapper"
            onClick={() => handleOpenZoom(activeImageIndex)}
            title="Click to view full resolution"
          >
            <picture>
              <source srcSet={activeImg.webpUrl} type="image/webp" />
              <img 
                src={activeImg.url} 
                alt={activeImg.title}
                className="flyer-main-img"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== activeImg.remoteUrl) {
                    target.src = activeImg.remoteUrl;
                  }
                }}
              />
            </picture>

            {/* Hover Zoom Overlay */}
            <div className="flyer-zoom-overlay">
              <span className="flyer-zoom-pill">
                <ZoomIn size={15} className="mr-1.5 text-amber-300" />
                <span>{t('btnZoomFullResolution')}</span>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MODERN PRODUCT SPECIFICATIONS & ACTIONS (MATCHING SCREENSHOT) */}
        <div className="pritiji-spec-column">
          {/* Top Header Row with Logo, Brand & "Now in Durgapur!" badge */}
          <div className="spec-header-row">
            <div className="spec-header-left">
              {/* Official Priti-Ji Brand Logo from public/images/logos/pritilogo.png */}
              <div className="pritiji-brand-logo-wrap">
                <picture>
                  <source srcSet="/images/logos/pritilogo.webp" type="image/webp" />
                  <img 
                    src="/images/logos/pritilogo.png" 
                    alt="Priti-Ji Official Brand Logo" 
                    className="pritiji-brand-logo-img" 
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width={160}
                    height={62}
                  />
                </picture>
              </div>

              {/* Eyebrow and Main Display Title */}
              <div className="spec-title-texts">
                <span className="spec-eyebrow">{t('pritiEyebrow')}</span>
                <h2 className="spec-main-title">{t('pritiJiTitle')}</h2>
              </div>
            </div>

            {/* Top Right "Now in Durgapur!" Angled Yellow Splash Badge */}
            <div className="now-in-durgapur-badge">
              <div className="durgapur-brush-bg">
                <span className="durgapur-text-small">{t('pritiNowIn')}</span>
                <span className="durgapur-text-bold">{t('pritiDurgapur')}</span>
              </div>
            </div>
          </div>

          {/* Subtitle / Description */}
          <p className="spec-description">
            {t('pritiDescDetailed')}
          </p>

          {/* 8 Feature Tiles in 1 Row */}
          <div className="spec-features-grid">
            {features.map((feat, idx) => (
              <div key={idx} className="spec-feature-tile">
                <div className="feature-icon-wrapper">
                  {feat.icon}
                </div>
                <span className="feature-tile-label">{feat.label}</span>
              </div>
            ))}
          </div>

          {/* Checklist + Angled Green Brush Banner Row */}
          <div className="spec-bullets-and-banner">
            <div className="spec-bullets-list">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="spec-bullet-row">
                  <div className="spec-check-circle">
                    <Check className="w-3 h-3 text-black stroke-[3.5]" />
                  </div>
                  <span className="spec-bullet-text">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Right Side: Angled Green Brush Banner ("More than a Snack, It's a Healthy Habit!") */}
            <div className="spec-healthy-habit-banner">
              <div className="healthy-habit-brush">
                <span className="habit-line-1">{t('pritiHabitLine1')}</span>
                <span className="habit-line-2">{t('pritiHabitLine2')}</span>
                <Leaf className="habit-leaf-icon" />
              </div>
            </div>
          </div>

          {/* Highlight Chips Row */}
          <div className="spec-chips-row">
            {tags.map((tag, idx) => (
              <span 
                key={idx} 
                className={`spec-chip ${tag.highlight ? 'chip-highlight' : 'chip-regular'}`}
              >
                {tag.text}
              </span>
            ))}
          </div>

          {/* Action Buttons & Trust Items */}
          <div className="spec-actions-footer">
            <div className="spec-buttons-group">
              <button 
                type="button" 
                className="btn-spec-enquiry"
                onClick={() => onOpenEnquiry('Priti-Ji Ayurvedic Chanachur', 'FMCG Sector')}
              >
                <Mail size={16} />
                <span>{t('btnBuyingEnquiry')}</span>
              </button>

              <button 
                type="button" 
                className="btn-spec-whatsapp"
                onClick={() => onWhatsAppOrder('Priti-Ji Ayurvedic Chanachur')}
              >
                <MessageCircle size={16} />
                <span>{t('btnWhatsAppOrder')}</span>
              </button>

              <button 
                type="button" 
                className="btn-spec-visuals"
                onClick={onViewVisuals}
              >
                <ZoomIn size={15} />
                <span>{t('btnViewVisuals')}</span>
              </button>
            </div>

            {/* 3 Trust Badges */}
            <div className="spec-trust-group">
              <div className="spec-trust-item">
                <Truck className="w-4 h-4 text-gray-300" />
                <span>{t('trustPanIndia')}</span>
              </div>
              <div className="spec-trust-item">
                <Handshake className="w-4 h-4 text-gray-300" />
                <span>{t('trustDealershipOpen')}</span>
              </div>
              <div className="spec-trust-item">
                <TrendingUp className="w-4 h-4 text-gray-300" />
                <span>{t('trustGrowWithUs')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL RESOLUTION POSTER LIGHTBOX MODAL */}
      {showFlyerZoom && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
          onClick={() => setShowFlyerZoom(false)}
        >
          <div 
            className="relative bg-[#0d1117] border border-amber-500/40 rounded-2xl max-w-5xl w-full max-h-[92vh] p-3 sm:p-4 shadow-2xl text-white flex flex-col items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Logo & Close Button */}
            <div className="flex items-center justify-between w-full pb-2 mb-2 border-b border-gray-800 shrink-0">
              <div className="bg-white px-3.5 py-1 rounded-full border-2 border-red-600 shadow-md inline-flex items-center">
                <img 
                  src="/images/logos/pritilogo.png" 
                  alt="Priti-Ji Official Brand Logo" 
                  className="h-7 sm:h-9 object-contain" 
                />
              </div>

              <button 
                type="button"
                className="bg-gray-800/90 hover:bg-gray-700 text-gray-200 hover:text-white p-2 rounded-full transition-colors cursor-pointer"
                onClick={() => setShowFlyerZoom(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Image Carousel Navigation */}
            <div className="relative flex items-center justify-center w-full flex-1 min-h-0 my-auto overflow-hidden">
              <button
                type="button"
                onClick={handlePrevModal}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full z-10 border border-white/20 transition-all hover:scale-110 shadow-xl cursor-pointer"
                title="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex items-center justify-center w-full h-full">
                <picture className="flex items-center justify-center w-full h-full">
                  <source srcSet={pritiImages[modalIndex].webpUrl} type="image/webp" />
                  <img 
                    src={pritiImages[modalIndex].url} 
                    alt={pritiImages[modalIndex].title}
                    className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-200"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== pritiImages[modalIndex].remoteUrl) {
                        target.src = pritiImages[modalIndex].remoteUrl;
                      }
                    }}
                  />
                </picture>
              </div>

              <button
                type="button"
                onClick={handleNextModal}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full z-10 border border-white/20 transition-all hover:scale-110 shadow-xl cursor-pointer"
                title="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Order / Enquiry CTAs inside modal */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 mt-2 w-full border-t border-gray-800 shrink-0">
              <button 
                type="button"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-lg shadow-emerald-900/40 cursor-pointer"
                onClick={() => {
                  setShowFlyerZoom(false);
                  onOpenEnquiry('Priti-Ji Ayurvedic Chanachur', 'FMCG Sector');
                }}
              >
                <Mail size={16} />
                <span>Submit Buying Enquiry</span>
              </button>

              <button 
                type="button"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold px-6 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-lg cursor-pointer"
                onClick={() => {
                  setShowFlyerZoom(false);
                  onWhatsAppOrder('Priti-Ji Ayurvedic Chanachur');
                }}
              >
                <MessageCircle size={16} />
                <span>Order on WhatsApp (₹70/- Pack)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
