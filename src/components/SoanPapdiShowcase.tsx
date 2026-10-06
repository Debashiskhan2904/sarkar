import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { 
  Mail, 
  MessageCircle, 
  ZoomIn, 
  CheckCircle2, 
  Sparkles, 
  ChefHat, 
  ShieldCheck, 
  Users, 
  Package, 
  Building2, 
  Handshake, 
  Truck, 
  TrendingUp,
  X,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SoanPapdiShowcaseProps {
  onOpenEnquiry: (productName: string, category: string) => void;
  onWhatsAppOrder: (productName: string) => void;
  onViewVisuals?: () => void;
}

export const SoanPapdiShowcase: React.FC<SoanPapdiShowcaseProps> = ({
  onOpenEnquiry,
  onWhatsAppOrder,
  onViewVisuals
}) => {
  const { t } = useLanguage();
  // Dedicated Munmun Soan Papdi & FMCG Distribution images:
  const soanImages = [
    {
      id: 'soan-img-1',
      indexLabel: '1st',
      title: '1st: Munmun Food Products – Soan Papdi & Others',
      sub: 'Traditional Indian Flaky Sweet with Pistachios & Almonds',
      webpUrl: 'https://i.pinimg.com/736x/d6/16/1e/d6161e0676203b2168b0c1d3b5ca4650.jpg',
      url: 'https://i.pinimg.com/736x/d6/16/1e/d6161e0676203b2168b0c1d3b5ca4650.jpg',
      remoteUrl: 'https://i.pinimg.com/736x/d6/16/1e/d6161e0676203b2168b0c1d3b5ca4650.jpg'
    },
    {
      id: 'soan-img-2',
      indexLabel: '2nd',
      title: '2nd: Munmun Food Products Distribution & Trade Scheme',
      sub: 'Regional FMCG Confectionery Wholesale & Retail Distribution Blueprint',
      webpUrl: 'https://i.pinimg.com/736x/4f/78/f4/4f78f4cbb438ecb514d738868bcff1f7.jpg',
      url: 'https://i.pinimg.com/736x/4f/78/f4/4f78f4cbb438ecb514d738868bcff1f7.jpg',
      remoteUrl: 'https://i.pinimg.com/736x/4f/78/f4/4f78f4cbb438ecb514d738868bcff1f7.jpg'
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const activeImg = soanImages[activeImageIndex];

  const handleOpenZoom = (idx = 0) => {
    setModalIndex(idx);
    setShowLightbox(true);
    if (onViewVisuals) {
      onViewVisuals();
    }
  };

  const handlePrevModal = () => {
    setModalIndex((prev) => (prev > 0 ? prev - 1 : soanImages.length - 1));
  };

  const handleNextModal = () => {
    setModalIndex((prev) => (prev < soanImages.length - 1 ? prev + 1 : 0));
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

  const featureBadges = [
    { 
      icon: <Sparkles className="w-5 h-5 text-amber-400" />, 
      title: t('soanFeatGhee') 
    },
    { 
      icon: <Award className="w-5 h-5 text-amber-400" />, 
      title: t('soanFeatPistachio') 
    },
    { 
      icon: <ChefHat className="w-5 h-5 text-amber-400" />, 
      title: t('soanFeatRecipe') 
    },
    { 
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />, 
      title: t('soanFeatHygiene') 
    },
    { 
      icon: <Users className="w-5 h-5 text-amber-400" />, 
      title: t('soanFeatTrust') 
    },
    { 
      icon: <Package className="w-5 h-5 text-amber-400" />, 
      title: t('soanFeatPacks') 
    },
    { 
      icon: <Building2 className="w-5 h-5 text-amber-400" />, 
      title: t('soanFeatEstablish') 
    },
    { 
      icon: <Handshake className="w-5 h-5 text-amber-400" />, 
      title: t('soanFeatNetwork') 
    }
  ];

  const checklistItems = [
    t('soanPapdiBullet1'),
    t('soanPapdiBullet2'),
    t('soanPapdiBullet3'),
    t('soanBullet4'),
    t('soanBullet5'),
    t('soanBullet6'),
    t('soanBullet7'),
    t('soanBullet8')
  ];

  const chipTags = [
    t('soanTagEstablish'),
    t('soanTagNetwork'),
    t('soanTagGhee'),
    t('soanTagDetergent'),
    t('soanTagChimney')
  ];

  return (
    <div className="soanpapdi-showcase-wrapper my-8" id="soan-papdi">
      <div className="soanpapdi-banner-card">
        {/* FLYER POSTER COLUMN (LEFT) */}
        <div className="soanpapdi-poster-column">
          {/* Ambient blurred backdrop */}
          <div 
            className="soanpapdi-ambient-bg"
            style={{ backgroundImage: `url(${activeImg.webpUrl})` }}
          />

          <div 
            className="soanpapdi-img-wrapper cursor-pointer"
            onClick={() => handleOpenZoom(activeImageIndex)}
            title="Click to view full resolution banner"
          >
            <img 
              src={activeImg.webpUrl} 
              alt={activeImg.title}
              className="soanpapdi-main-img"
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
            <div className="soanpapdi-zoom-overlay">
              <span className="soanpapdi-zoom-pill">
                <ZoomIn size={15} className="mr-1.5 text-amber-400" />
                {t('btnZoomFullResolution')}
              </span>
            </div>
          </div>
        </div>

        {/* DETAILS & SPECIFICATIONS COLUMN (RIGHT) */}
        <div className="soanpapdi-details-column">
          {/* Top Brand Header Row */}
          <div className="soanpapdi-top-header">
            <div className="soanpapdi-brand-group">
              <div className="soanpapdi-brand-logo-wrap">
                <img 
                  src="/images/logos/soanpapdilogo.webp" 
                  alt="Munmun Food Products Official Logo" 
                  className="soanpapdi-brand-logo-img"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={140}
                  height={70}
                  onError={(e) => {
                    // Fallback to text if missing
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
              </div>
              <div className="soanpapdi-titles-wrap">
                <span className="soanpapdi-eyebrow">
                  {t('soanEyebrow')}
                </span>
                <h3 className="soanpapdi-title">
                  {t('soanPapdiTitle')}
                </h3>
              </div>
            </div>

            {/* Slogan Stamp on Top Right */}
            <div className="soanpapdi-slogan-stamp" title="Taste That Brings People Together">
              <div className="soanpapdi-slogan-text">
                <span>{t('soanSlogan1')}</span>
                <span>{t('soanSlogan2')}</span>
                <span>{t('soanSlogan3')}</span>
              </div>
            </div>
          </div>

          {/* Subtitle Description */}
          <p className="soanpapdi-description">
            {t('soanDescDetailed')}
          </p>

          {/* 8 Feature Badges Grid */}
          <div className="soanpapdi-features-grid">
            {featureBadges.map((badge, idx) => (
              <div key={idx} className="soanpapdi-feature-card">
                <div className="soanpapdi-feature-icon">
                  {badge.icon}
                </div>
                <span className="soanpapdi-feature-label">
                  {badge.title}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Dual-Pane: Checklist + Food Visual */}
          <div className="soanpapdi-bottom-grid">
            {/* Left: Checklist & Pills */}
            <div className="soanpapdi-checklist-section">
              <div className="soanpapdi-checklist">
                {checklistItems.map((item, idx) => (
                  <div key={idx} className="soanpapdi-check-item">
                    <CheckCircle2 size={16} className="text-amber-400 shrink-0 fill-amber-400/20" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tag Pills */}
              <div className="soanpapdi-chips-row">
                {chipTags.map((tag, idx) => (
                  <span key={idx} className="soanpapdi-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Sweets Highlight Platter & Callout */}
            <div className="soanpapdi-visual-callout">
              <div className="soanpapdi-callout-header">
                <span className="soanpapdi-callout-cursive">
                  {t('soanFavCallout')}
                </span>
              </div>
              <div 
                className="soanpapdi-plate-frame cursor-pointer"
                onClick={() => handleOpenZoom(0)}
                title="Click to zoom in"
              >
                <img 
                  src="https://i.pinimg.com/736x/d6/16/1e/d6161e0676203b2168b0c1d3b5ca4650.jpg" 
                  alt="Delicious Munmun Soan Papdi with Pistachios"
                  className="soanpapdi-plate-img"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== 'https://i.pinimg.com/736x/d6/16/1e/d6161e0676203b2168b0c1d3b5ca4650.jpg') {
                      target.src = 'https://i.pinimg.com/736x/d6/16/1e/d6161e0676203b2168b0c1d3b5ca4650.jpg';
                    }
                  }}
                />
                <div className="soanpapdi-plate-overlay">
                  <ZoomIn size={18} className="text-amber-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons & Trust Items Row */}
          <div className="soanpapdi-actions-footer">
            <div className="soanpapdi-buttons-group">
              <button 
                type="button"
                className="btn-soanpapdi-enquiry"
                onClick={() => onOpenEnquiry('Munmun Soan Papdi & Others', 'FMCG Sector')}
              >
                <Mail size={16} />
                <span>{t('btnBuyingEnquiry')}</span>
              </button>

              <button 
                type="button"
                className="btn-soanpapdi-whatsapp"
                onClick={() => onWhatsAppOrder('Munmun Soan Papdi & Others')}
              >
                <MessageCircle size={16} />
                <span>{t('btnWhatsAppOrder')}</span>
              </button>

              <button 
                type="button"
                className="btn-soanpapdi-visuals"
                onClick={handleOpenZoom}
              >
                <ZoomIn size={16} />
                <span>{t('btnViewVisuals')}</span>
              </button>
            </div>

            {/* 3 Trust Badges */}
            <div className="soanpapdi-trust-group">
              <div className="soanpapdi-trust-item">
                <Truck size={15} className="text-amber-400" />
                <span>{t('trustPanIndia')}</span>
              </div>
              <div className="soanpapdi-trust-item">
                <Handshake size={15} className="text-amber-400" />
                <span>{t('trustDealershipOpen')}</span>
              </div>
              <div className="soanpapdi-trust-item">
                <TrendingUp size={15} className="text-amber-400" />
                <span>{t('trustGrowWithUs')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL RESOLUTION LIGHTBOX MODAL */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-[99990] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
          onClick={() => setShowLightbox(false)}
        >
          <div 
            className="relative bg-[#0d1117] border border-amber-500/40 rounded-2xl max-w-5xl w-full max-h-[92vh] p-3 sm:p-4 shadow-2xl text-white flex flex-col items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Logo & Close Button */}
            <div className="flex items-center justify-between w-full pb-2 mb-2 border-b border-gray-800 shrink-0">
              <div className="inline-flex items-center">
                <img 
                  src="/images/logos/soanpapdilogo.webp" 
                  alt="Munmun Food Products Official Logo" 
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
                <span>{t('enquiryCloseWindow')}</span>
              </button>
            </div>

            {/* Modal Image Display (Supports multiple FMCG showcase images) */}
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
                <img 
                  src={soanImages[modalIndex].webpUrl} 
                  alt={soanImages[modalIndex].title}
                  className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-200"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== soanImages[modalIndex].remoteUrl) {
                      target.src = soanImages[modalIndex].remoteUrl;
                    }
                  }}
                />
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
                  onOpenEnquiry('Munmun Soan Papdi & Others', 'FMCG Sector');
                }}
              >
                <Mail size={16} />
                <span>{t('btnBuyingEnquiry')}</span>
              </button>

              <button 
                type="button"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold px-6 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-lg cursor-pointer"
                onClick={() => {
                  setShowLightbox(false);
                  onWhatsAppOrder('Munmun Soan Papdi & Others');
                }}
              >
                <MessageCircle size={16} />
                <span>{t('btnWhatsAppOrder')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
