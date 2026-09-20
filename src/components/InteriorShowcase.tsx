import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { 
  Mail, 
  MessageCircle, 
  ZoomIn, 
  Building2, 
  Home, 
  CookingPot, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  Layers, 
  Store,
  Award,
  CircleDollarSign,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2
} from 'lucide-react';
import { INTERIOR_GALLERY } from '../data';

interface InteriorShowcaseProps {
  onOpenEnquiry: (productName: string, category: string) => void;
  onWhatsAppOrder: (productName: string) => void;
  onViewVisuals?: () => void;
}

export const InteriorShowcase: React.FC<InteriorShowcaseProps> = ({
  onOpenEnquiry,
  onWhatsAppOrder,
  onViewVisuals
}) => {
  const { t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [imageFitMode, setImageFitMode] = useState<'fill' | 'fit'>('fill');

  // Automatically default: 1st image (index 0) is Full Grid ('fill'), images 2, 3, 4 default to 'fit'
  useEffect(() => {
    if (activeImageIndex === 0) {
      setImageFitMode('fill');
    } else {
      setImageFitMode('fit');
    }
  }, [activeImageIndex]);

  const images = INTERIOR_GALLERY;
  const activeImg = images[activeImageIndex] || images[0];

  // Dynamic localization for the 4 official Interior schemes
  const getLocalizedScheme = (idx: number, fallback: typeof activeImg) => {
    if (!fallback) return fallback;
    const num = idx + 1;
    const code = t(`interiorScheme${num}Code`);
    const badge = t(`interiorScheme${num}Badge`);
    const title = t(`interiorScheme${num}Title`);
    const desc = t(`interiorScheme${num}Desc`);
    return {
      ...fallback,
      schemeCode: code && code !== `interiorScheme${num}Code` ? code : fallback.schemeCode,
      badge: badge && badge !== `interiorScheme${num}Badge` ? badge : fallback.badge,
      title: title && title !== `interiorScheme${num}Title` ? title : fallback.title,
      desc: desc && desc !== `interiorScheme${num}Desc` ? desc : fallback.desc,
    };
  };

  const currentScheme = getLocalizedScheme(activeImageIndex, activeImg);

  const handleOpenZoom = (idx: number) => {
    setModalIndex(idx);
    setShowLightbox(true);
  };

  const handlePrevModal = () => {
    setModalIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextModal = () => {
    setModalIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
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

  // 8 Strategic capability tiles for Interiors & Infrastructure
  const features = [
    {
      icon: <Layers className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />,
      label: t('intFeat1Title'),
      detail: t('intFeat1Sub')
    },
    {
      icon: <Building2 className="w-5 h-5 text-emerald-400" />,
      label: t('intFeat2Title'),
      detail: t('intFeat2Sub')
    },
    {
      icon: <Home className="w-5 h-5 text-emerald-400" />,
      label: t('intFeat3Title'),
      detail: t('intFeat3Sub')
    },
    {
      icon: <CookingPot className="w-5 h-5 text-emerald-400" />,
      label: t('intFeat4Title'),
      detail: t('intFeat4Sub')
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />,
      label: t('intFeat5Title'),
      detail: t('intFeat5Sub')
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-emerald-400" />,
      label: t('intFeat6Title'),
      detail: t('intFeat6Sub')
    },
    {
      icon: <Store className="w-5 h-5 text-emerald-400" />,
      label: t('intFeat7Title'),
      detail: t('intFeat7Sub')
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      label: t('intFeat8Title'),
      detail: t('intFeat8Sub')
    }
  ];

  // 8 Checklist bullet points extracted from the blueprints
  const bullets = [
    t('intBullet1'),
    t('intBullet2'),
    t('intBullet3'),
    t('intBullet4'),
    t('intBullet5'),
    t('intBullet6'),
    t('intBullet7'),
    t('intBullet8')
  ];

  // Highlight tags
  const tags = [
    { text: t('intTagCapacity'), highlight: true },
    { text: t('intTagSaburi'), highlight: true },
    { text: t('intTagSureShot'), highlight: true },
    { text: t('intTagChinarPark'), highlight: false },
    { text: t('intTagKitchen'), highlight: false },
    { text: t('intTagLegal'), highlight: false }
  ];

  return (
    <div id="interior-showcase-card" className="interior-banner-card bg-gradient-to-b from-[#0c1310] to-[#070b09] border border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl relative mb-12">
      {/* Top Banner Header Bar */}
      <div className="bg-gradient-to-r from-[#0a1811] via-[#0f231a] to-[#0a1811] px-4 sm:px-6 py-4 border-b border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold shadow-lg shadow-emerald-500/10 shrink-0 mt-0.5 sm:mt-0">
            🏢
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                {t('interiorSectorBadge')}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400">• {t('interiorCertified')}</span>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight leading-snug break-words">
              {t('interiorMainHeading')}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-400/90 font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-400">📍</span>
              <span>{t('interiorSubHeading')}</span>
            </p>
          </div>
        </div>

        {/* 4 Image Tab Buttons */}
        <div className="w-full md:w-auto overflow-x-auto no-scrollbar py-0.5">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:flex md:items-center gap-1.5 p-1 bg-black/70 rounded-xl border border-white/10 w-full">
            {images.map((img, idx) => {
              const locImg = getLocalizedScheme(idx, img);
              return (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center sm:justify-start gap-1.5 cursor-pointer text-center whitespace-normal sm:whitespace-nowrap ${
                    activeImageIndex === idx
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-md shadow-emerald-500/30 font-extrabold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="opacity-80">{idx + 1}.</span>
                  <span className="truncate">{locImg.schemeCode || `Document ${idx + 1}`}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Grid: Left Poster Column & Right Details Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Column: Interactive Blueprint Viewer (5 cols on lg) - FILLS GRID */}
        <div className="lg:col-span-5 bg-[#040907] border-b lg:border-b-0 lg:border-r border-emerald-500/20 flex flex-col justify-between relative group overflow-hidden">
          {/* Ambient Background Glow matching active image */}
          <div 
            className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-20 pointer-events-none transition-all duration-700"
            style={{ backgroundImage: `url(${activeImg.url})` }}
          />

          {/* Top Control Bar: Active Document Badge + Fill Grid / Fit Toggle */}
          <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-black/85 text-emerald-300 border border-emerald-400/40 backdrop-blur-md shadow-md pointer-events-auto">
              {currentScheme.schemeCode}
            </span>
            
            {/* View Mode Toggle: Fill Grid vs Fit */}
            <div className="flex items-center bg-black/85 backdrop-blur-md border border-emerald-400/40 rounded-lg p-0.5 shadow-md pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImageFitMode('fill');
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all flex items-center gap-1 cursor-pointer ${
                  imageFitMode === 'fill'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow font-extrabold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={t('btnFillGridTitle')}
              >
                <Maximize2 size={12} />
                {t('btnFillGrid')}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImageFitMode('fit');
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all flex items-center gap-1 cursor-pointer ${
                  imageFitMode === 'fit'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow font-extrabold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={t('btnFitTitle')}
              >
                {t('btnFit')}
              </button>
            </div>
          </div>

          {/* Active Image Stage (Fills Grid) */}
          <div 
            className="w-full flex-1 flex items-center justify-center cursor-pointer relative z-10 min-h-[440px] lg:min-h-[520px] overflow-hidden"
            onClick={() => handleOpenZoom(activeImageIndex)}
            title="Click to zoom in high-resolution"
          >
            <img 
              src={activeImg.url} 
              alt={currentScheme.title}
              loading="eager"
              decoding="async"
              className={`w-full h-full transition-all duration-300 group-hover:scale-[1.02] ${
                imageFitMode === 'fill'
                  ? 'object-cover object-top'
                  : 'object-contain max-h-[500px] p-3'
              }`}
              onError={(e) => {
                const target = e.currentTarget;
                if (activeImg.remoteUrl && target.src !== activeImg.remoteUrl) {
                  target.src = activeImg.remoteUrl;
                }
              }}
            />

            {/* Hover Zoom Overlay Pill */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-black/90 border border-emerald-400 text-emerald-300 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                <ZoomIn className="w-4 h-4 text-emerald-400" />
                {t('btnZoomFullResolution')}
              </span>
            </div>
          </div>

          {/* Bottom Thumbnail Selector Row */}
          <div className="w-full relative z-10 p-3 bg-black/80 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
              <span className="font-semibold text-emerald-300/90">{currentScheme.badge || currentScheme.schemeCode}</span>
              <span>{activeImageIndex + 1} of {images.length} {t('blueprintsCount')}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => {
                const locImg = getLocalizedScheme(idx, img);
                return (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-md overflow-hidden border transition-all h-16 bg-black/80 cursor-pointer ${
                      activeImageIndex === idx 
                        ? 'border-emerald-400 ring-2 ring-emerald-400/40 scale-105 z-10' 
                        : 'border-white/15 opacity-70 hover:opacity-100 hover:border-emerald-300/50'
                    }`}
                  >
                    <img 
                      src={img.url} 
                      alt={locImg.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (img.remoteUrl && target.src !== img.remoteUrl) target.src = img.remoteUrl;
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 px-1 py-0.5 text-[10px] text-center font-bold text-white truncate">
                      {locImg.schemeCode || `#${idx + 1}`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Scheme Details, Capabilities, and CTAs (7 cols on lg) */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between relative z-10 bg-[#070e0a]/90">
          <div>
            {/* Header info for currently selected document */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
                  {currentScheme.schemeCode}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  {currentScheme.badge}
                </span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                {currentScheme.title}
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {currentScheme.desc}
              </p>
            </div>

            {/* 8 Feature Tiles Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              {features.map((feat, idx) => (
                <div 
                  key={idx}
                  className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-emerald-400/40 rounded-xl p-3 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="mb-2">{feat.icon}</div>
                  <div>
                    <div className="text-xs font-bold text-white leading-tight mb-1">{feat.label}</div>
                    <div className="text-[11px] text-slate-400 leading-tight">{feat.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checklist Bullet Points Grid */}
            <div className="mb-6 bg-black/40 border border-white/10 rounded-xl p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {t('interiorStratHighlights')}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <span className="w-4 h-4 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/50 flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5 font-bold">
                      ✓
                    </span>
                    <span className="leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${
                    tag.highlight
                      ? 'bg-emerald-400/10 text-emerald-300 border-emerald-400/40'
                      : 'bg-white/5 text-slate-300 border-white/10'
                  }`}
                >
                  {tag.text}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenEnquiry('Interiors & Plywood Commercial Partnership (Saburi Plywood & Ganapati Marketing)', 'interior')}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-bold py-3 px-5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-black" />
              {t('interiorBtnApply')}
            </button>

            <button
              onClick={() => onWhatsAppOrder(`Inquiry for Interiors & Plywood Blueprint (${activeImg.schemeCode} - ${activeImg.title})`)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              {t('interiorBtnDesk')}
            </button>

            <button
              onClick={() => handleOpenZoom(activeImageIndex)}
              className="bg-white/10 hover:bg-white/15 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all border border-white/15 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ZoomIn className="w-4 h-4 text-emerald-400" />
              {t('btnViewVisuals')}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-[99990] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6"
          onClick={() => setShowLightbox(false)}
        >
          <div 
            className="relative max-w-5xl w-full h-full max-h-[94vh] flex flex-col items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            {(() => {
              const currentModalScheme = getLocalizedScheme(modalIndex, images[modalIndex]);
              return (
                <>
                  <div className="w-full flex items-center justify-between text-white py-2.5 px-3 sm:px-4 bg-black/80 rounded-xl border border-white/15 mb-2 shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
                      <span className="text-emerald-400 font-bold text-xs sm:text-sm bg-emerald-400/20 px-2 sm:px-2.5 py-0.5 rounded border border-emerald-400/30 whitespace-nowrap">
                        {currentModalScheme?.schemeCode}
                      </span>
                      <span className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
                        {currentModalScheme?.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-400 mr-1 sm:mr-2">
                        {modalIndex + 1} of {images.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowLightbox(false)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer border border-red-400/40"
                        title="Close (ESC)"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4 stroke-[2.5]" />
                        <span>{t('enquiryCloseWindow')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Modal Image Viewport */}
                  <div className="flex-1 min-h-0 w-full flex items-center justify-center relative overflow-hidden my-1">
                    {/* Prev Button */}
                    <button
                      type="button"
                      onClick={handlePrevModal}
                      className="absolute left-2 md:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black text-emerald-400 border border-emerald-400/40 hover:scale-110 transition-all shadow-xl cursor-pointer"
                      aria-label="Previous document"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <img 
                      src={images[modalIndex]?.url} 
                      alt={currentModalScheme?.title}
                      className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-white/15"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (images[modalIndex]?.remoteUrl && target.src !== images[modalIndex]?.remoteUrl) {
                          target.src = images[modalIndex]?.remoteUrl;
                        }
                      }}
                    />

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={handleNextModal}
                      className="absolute right-2 md:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black text-emerald-400 border border-emerald-400/40 hover:scale-110 transition-all shadow-xl cursor-pointer"
                      aria-label="Next document"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Modal Footer Description */}
                  <div className="w-full flex items-center justify-between py-2 px-3 sm:px-4 bg-black/80 rounded-xl border border-white/15 text-xs text-slate-300 shrink-0">
                    <span className="flex-1 text-left line-clamp-2 sm:line-clamp-none">{currentModalScheme?.desc}</span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
