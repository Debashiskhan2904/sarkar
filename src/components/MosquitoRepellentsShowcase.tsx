import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { 
  Mail, 
  MessageCircle, 
  ZoomIn, 
  Check, 
  Zap, 
  ShieldAlert, 
  Leaf, 
  Users, 
  Clock, 
  PiggyBank, 
  Sparkles, 
  Briefcase, 
  Truck, 
  Handshake, 
  TrendingUp,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface MosquitoRepellentsShowcaseProps {
  onOpenEnquiry: (productName: string, category: string) => void;
  onWhatsAppOrder: (productName: string) => void;
  onViewVisuals: () => void;
}

export const MosquitoRepellentsShowcase: React.FC<MosquitoRepellentsShowcaseProps> = ({
  onOpenEnquiry,
  onWhatsAppOrder,
  onViewVisuals
}) => {
  const { t } = useLanguage();
  // 3 Dedicated Images provided by the user:
  // 1st main image: https://i.pinimg.com/736x/b1/61/57/b161574feafbb517bd5a5685e3de085d.jpg (Angry Frog Anti Mosquito Main Banner)
  // 2nd image: https://i.pinimg.com/736x/c2/03/f7/c203f70725f20c7ebb0ef983cad7b98f.jpg (Anti Mosquito Coils & Agarbatti Packs)
  // 3rd image: https://i.pinimg.com/736x/03/5c/cf/035ccf72925e3420c10f5e10c339cbb3.jpg (Citronella Agarbatti & Vaporizer Display Standee)
  const mosquitoImages = [
    {
      id: 'img-1',
      indexLabel: '1st',
      title: '1st: Angry Frog Anti Mosquito Instant Kill Vaporizer',
      sub: 'Small Machine. Big Protection. (Fits in All Machines • Instant Protection)',
      webpUrl: '/images/products/mosquito/mosquito_banner_1.webp',
      url: '/images/products/mosquito/mosquito_banner_1.jpg',
      remoteUrl: 'https://i.pinimg.com/736x/b1/61/57/b161574feafbb517bd5a5685e3de085d.jpg'
    },
    {
      id: 'img-2',
      indexLabel: '2nd',
      title: '2nd: Maxwell & Encounter Mosquito Repellent Coil & Sticks',
      sub: 'Herbal Coil & Incense Sticks Formulation for Indoor & Outdoor Use',
      webpUrl: '/images/products/mosquito/mosquito_banner_2.webp',
      url: '/images/products/mosquito/mosquito_banner_2.jpg',
      remoteUrl: 'https://i.pinimg.com/736x/c2/03/f7/c203f70725f20c7ebb0ef983cad7b98f.jpg'
    },
    {
      id: 'img-3',
      indexLabel: '3rd',
      title: '3rd: Citronella Agarbatti & Standee Campaign Kit',
      sub: 'Retail Display Standee with High Margin Dealership Scheme',
      webpUrl: '/images/products/mosquito/mosquito_banner_3.webp',
      url: '/images/products/mosquito/mosquito_banner_3.jpg',
      remoteUrl: 'https://i.pinimg.com/736x/03/5c/cf/035ccf72925e3420c10f5e10c339cbb3.jpg'
    }
  ];

  // Default active image is the 1st main image
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const activeImg = mosquitoImages[activeImageIndex];

  const handleOpenZoom = (idx: number) => {
    setModalIndex(idx);
    setShowLightbox(true);
  };

  const handlePrevModal = () => {
    setModalIndex((prev) => (prev > 0 ? prev - 1 : mosquitoImages.length - 1));
  };

  const handleNextModal = () => {
    setModalIndex((prev) => (prev < mosquitoImages.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (!showLightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowLightbox(false);
      if (e.key === 'ArrowLeft') handlePrevModal();
      if (e.key === 'ArrowRight') handleNextModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox, modalIndex]);

  // 8 Feature Tiles matching the exact icons in the user screenshot
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" />,
      label: t('mosquitoFeatKill')
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
      label: t('mosquitoFeatDiseases')
    },
    {
      icon: <Leaf className="w-5 h-5 text-amber-400 fill-amber-400/20" />,
      label: t('mosquitoFeatHerbal')
    },
    {
      icon: <Users className="w-5 h-5 text-amber-400" />,
      label: t('mosquitoFeatFamily')
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      label: t('mosquitoFeatLong')
    },
    {
      icon: <PiggyBank className="w-5 h-5 text-amber-400" />,
      label: t('mosquitoFeatCost')
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      label: t('mosquitoFeatFragrance')
    },
    {
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      label: t('mosquitoFeatVersatile')
    }
  ];

  // 8 Checklist bullet points with yellow circular checkmarks matching screenshot
  const bullets = [
    t('mosquitoBullet1'),
    t('mosquitoBullet2'),
    t('mosquitoBullet3'),
    t('mosquitoBullet4'),
    t('mosquitoBullet5'),
    t('mosquitoBullet6'),
    t('mosquitoBullet7'),
    t('mosquitoBullet8')
  ];

  // Highlight and regular tags matching screenshot
  const tags = [
    { text: t('mosquitoTagHawker'), highlight: true },
    { text: t('mosquitoTagOffer'), highlight: true },
    { text: t('mosquitoTagIncome'), highlight: true },
    { text: t('mosquitoTagCitronella'), highlight: true },
    { text: t('mosquitoTagKit'), highlight: false },
    { text: t('mosquitoTagLocations'), highlight: false },
    { text: t('mosquitoTagHerbal'), highlight: false },
    { text: t('mosquitoTagLong'), highlight: false },
    { text: t('mosquitoTagFamily'), highlight: false }
  ];

  return (
    <div className="mosquito-showcase-wrapper" id="mosquito">
      <div className="mosquito-banner-card">
        {/* LEFT COLUMN: MAIN BANNER POSTER */}
        <div className="mosquito-poster-column">
          {/* Ambient blurred backdrop to eliminate dead space */}
          <div 
            className="mosquito-ambient-bg" 
            style={{ backgroundImage: `url(${activeImg.url})` }}
          />

          {/* Active Image Container */}
          <div 
            className="mosquito-img-wrapper"
            onClick={() => handleOpenZoom(activeImageIndex)}
            title="Click to view full resolution"
          >
            <picture>
              <source srcSet={activeImg.webpUrl} type="image/webp" />
              <img 
                src={activeImg.url} 
                alt={activeImg.title}
                className="mosquito-main-img"
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
            <div className="mosquito-zoom-overlay">
              <span className="mosquito-zoom-pill">
                <ZoomIn size={15} className="mr-1.5 text-amber-300" />
                <span>Zoom Full Resolution</span>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SPECIFICATIONS, CHECKLIST, MASCOT & ACTIONS */}
        <div className="mosquito-spec-column">
          {/* Top Header Row with Official public/mosquito.png Logo & Angled Yellow Ribbon */}
          <div className="mosquito-header-row">
            <div className="mosquito-header-left">
              {/* Official Mosquito Logo from public/images/logos/mosquito.png */}
              <div className="mosquito-brand-logo-wrap" title="Angry Frog Instant Kill Logo">
                <picture>
                  <source srcSet="/images/logos/mosquito.webp" type="image/webp" />
                  <img 
                    src="/images/logos/mosquito.png" 
                    alt="Angry Frog Instant Kill" 
                    className="mosquito-brand-logo-img" 
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width={160}
                    height={80}
                  />
                </picture>
              </div>

              {/* Eyebrow and Main Title */}
              <div className="mosquito-title-texts">
                <span className="mosquito-eyebrow">ANGRY FROG • MAXWELL • ENCOUNTER</span>
                <h2 className="mosquito-main-title">Mosquito Repellents</h2>
              </div>
            </div>

            {/* Top Right "Protection For a Healthier Tomorrow" Angled Yellow Brush Banner */}
            <div className="protection-tomorrow-badge">
              <div className="tomorrow-brush-bg">
                <span className="tomorrow-line-1">Protection</span>
                <span className="tomorrow-line-2">For a Healthier</span>
                <span className="tomorrow-line-3">Tomorrow</span>
              </div>
            </div>
          </div>

          {/* Subtitle / Description */}
          <p className="mosquito-description">
            Angry Frog • Maxwell • Encounter • Anti Mosquito Instant Kill Vaporizer & Citronella Agarbatti. 
            Natural herbal formulations for a safer, mosquito-free home. Protects your family from Dengue, 
            Malaria, Chikungunya and other mosquito-borne diseases.
          </p>

          {/* 8 Feature Tiles in 1 Row */}
          <div className="mosquito-features-grid">
            {features.map((feat, idx) => (
              <div key={idx} className="mosquito-feature-tile">
                <div className="mosquito-icon-box">
                  {feat.icon}
                </div>
                <span className="mosquito-tile-label">{feat.label}</span>
              </div>
            ))}
          </div>

          {/* Checklist (Left) + Mascot & Banner (Right) */}
          <div className="mosquito-bullets-and-mascot">
            {/* 8 Yellow Checkmark Bullet Items */}
            <div className="mosquito-bullets-list">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="mosquito-bullet-row">
                  <div className="mosquito-check-circle">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3.5]" />
                  </div>
                  <span className="mosquito-bullet-text">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Right Side: "Stay Protected Stay a Healthy!" Green Banner + Frog Mascot Holding Placard */}
            <div className="mosquito-mascot-container">
              {/* Angled Green Brush Banner */}
              <div className="stay-healthy-brush-banner">
                <span className="stay-line-1">Stay Protected</span>
                <span className="stay-line-2">Stay a Healthy!</span>
              </div>

              {/* Frog Mascot holding "NO DENGUE NO MALARIA" sign */}
              <div className="frog-mascot-wrapper">
                {/* Placard on stick */}
                <div className="mascot-placard">
                  <span className="placard-red-bold">NO DENGUE</span>
                  <span className="placard-red-bold">NO MALARIA</span>
                  <div className="placard-stick"></div>
                </div>

                {/* 3D Illustrated Frog Visual */}
                <div className="frog-illustration">
                  <svg 
                    viewBox="0 0 120 160" 
                    className="frog-svg" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Frog Body */}
                    <ellipse cx="60" cy="100" rx="34" ry="42" fill="url(#frogSkin)" />
                    {/* Frog Belly */}
                    <ellipse cx="60" cy="104" rx="22" ry="28" fill="#d9f99d" />
                    {/* Belly Spots */}
                    <circle cx="54" cy="95" r="2.5" fill="#84cc16" opacity="0.7" />
                    <circle cx="66" cy="102" r="3" fill="#84cc16" opacity="0.7" />
                    <circle cx="58" cy="112" r="2" fill="#84cc16" opacity="0.7" />
                    <circle cx="64" cy="118" r="2.5" fill="#84cc16" opacity="0.7" />

                    {/* Legs */}
                    <ellipse cx="32" cy="138" rx="8" ry="18" fill="#4d7c0f" transform="rotate(-15 32 138)" />
                    <ellipse cx="88" cy="138" rx="8" ry="18" fill="#4d7c0f" transform="rotate(15 88 138)" />
                    {/* Webbed Feet */}
                    <path d="M22 154 C20 158, 42 158, 40 154" stroke="#365314" strokeWidth="4" strokeLinecap="round" />
                    <path d="M78 154 C76 158, 98 158, 96 154" stroke="#365314" strokeWidth="4" strokeLinecap="round" />

                    {/* Left Arm holding stick */}
                    <path d="M35 90 Q 20 80, 22 62" stroke="#65a30d" strokeWidth="9" strokeLinecap="round" />
                    {/* Right Arm holding stick */}
                    <path d="M85 90 Q 100 80, 96 60" stroke="#65a30d" strokeWidth="9" strokeLinecap="round" />

                    {/* Head */}
                    <ellipse cx="60" cy="55" rx="38" ry="24" fill="url(#frogSkin)" />

                    {/* Big Bulging Frog Eyes */}
                    {/* Left Eye */}
                    <circle cx="40" cy="38" r="16" fill="#65a30d" />
                    <circle cx="40" cy="38" r="13" fill="#dc2626" />
                    <circle cx="40" cy="38" r="10" fill="#facc15" />
                    <ellipse cx="40" cy="38" rx="4" ry="7" fill="#000000" />
                    <circle cx="42" cy="34" r="2.5" fill="#ffffff" />

                    {/* Right Eye */}
                    <circle cx="80" cy="38" r="16" fill="#65a30d" />
                    <circle cx="80" cy="38" r="13" fill="#dc2626" />
                    <circle cx="80" cy="38" r="10" fill="#facc15" />
                    <ellipse cx="80" cy="38" rx="4" ry="7" fill="#000000" />
                    <circle cx="82" cy="34" r="2.5" fill="#ffffff" />

                    {/* Wide Friendly Smile */}
                    <path d="M38 62 Q 60 74, 82 62" stroke="#14532d" strokeWidth="4" strokeLinecap="round" />
                    <path d="M42 62 Q 60 70, 78 62" fill="#ef4444" opacity="0.8" />

                    {/* Gradient definition */}
                    <defs>
                      <radialGradient id="frogSkin" cx="40%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#84cc16" />
                        <stop offset="70%" stopColor="#4d7c0f" />
                        <stop offset="100%" stopColor="#365314" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tags / Chips Rows */}
          <div className="mosquito-chips-container">
            {tags.map((tag, idx) => (
              <span 
                key={idx} 
                className={`mosquito-chip ${tag.highlight ? 'chip-highlight' : 'chip-regular'}`}
              >
                {tag.text}
              </span>
            ))}
          </div>

          {/* Action Buttons & Trust Items */}
          <div className="mosquito-actions-footer">
            <div className="mosquito-buttons-group">
              <button 
                type="button" 
                className="btn-mosquito-enquiry"
                onClick={() => onOpenEnquiry('Angry Frog Mosquito Repellents', 'FMCG Sector')}
              >
                <Mail size={16} />
                <span>Buying Enquiry</span>
              </button>

              <button 
                type="button" 
                className="btn-mosquito-whatsapp"
                onClick={() => onWhatsAppOrder('Angry Frog Mosquito Repellents')}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Order</span>
              </button>

              <button 
                type="button" 
                className="btn-mosquito-visuals"
                onClick={onViewVisuals}
              >
                <ZoomIn size={15} />
                <span>View Visuals</span>
              </button>
            </div>

            {/* 3 Trust Badges */}
            <div className="mosquito-trust-group">
              <div className="mosquito-trust-item">
                <Truck className="w-4 h-4 text-gray-300" />
                <span>Pan India Supply</span>
              </div>
              <div className="mosquito-trust-item">
                <Handshake className="w-4 h-4 text-gray-300" />
                <span>Dealership Open</span>
              </div>
              <div className="mosquito-trust-item">
                <TrendingUp className="w-4 h-4 text-gray-300" />
                <span>Grow With Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL RESOLUTION LIGHTBOX MODAL */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-[99990] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
          onClick={() => setShowLightbox(false)}
        >
          <div 
            className="relative bg-[#0d1117] border border-red-600/40 rounded-2xl max-w-5xl w-full max-h-[92vh] p-3 sm:p-4 shadow-2xl text-white flex flex-col items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Logo & Close Button */}
            <div className="flex items-center justify-between w-full pb-2 mb-2 border-b border-gray-800 shrink-0">
              <div className="inline-flex items-center">
                <img 
                  src="/images/logos/mosquito.png" 
                  alt="Angry Frog Instant Kill Logo" 
                  className="h-9 sm:h-11 object-contain" 
                />
              </div>

              <button 
                type="button"
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer border border-red-400/40"
                onClick={() => setShowLightbox(false)}
                aria-label="Close modal"
              >
                <X size={16} strokeWidth={2.5} />
                <span>Close</span>
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
                  <source srcSet={mosquitoImages[modalIndex].webpUrl} type="image/webp" />
                  <img 
                    src={mosquitoImages[modalIndex].url} 
                    alt={mosquitoImages[modalIndex].title}
                    className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-200"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== mosquitoImages[modalIndex].remoteUrl) {
                        target.src = mosquitoImages[modalIndex].remoteUrl;
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
                  setShowLightbox(false);
                  onOpenEnquiry('Angry Frog Mosquito Repellents', 'FMCG Sector');
                }}
              >
                <Mail size={16} />
                <span>Submit Buying Enquiry</span>
              </button>

              <button 
                type="button"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold px-6 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-lg"
                onClick={() => {
                  setShowLightbox(false);
                  onWhatsAppOrder('Angry Frog Mosquito Repellents');
                }}
              >
                <MessageCircle size={16} />
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
