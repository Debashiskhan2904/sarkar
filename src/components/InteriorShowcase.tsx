import React, { useState, useEffect } from 'react';
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
  X
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const images = INTERIOR_GALLERY;
  const activeImg = images[activeImageIndex] || images[0];

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
      label: 'Saburi Plywood Infrastructure',
      detail: 'Chinar Park, Kol - 59 Hub'
    },
    {
      icon: <Building2 className="w-5 h-5 text-emerald-400" />,
      label: 'Corporate Interior Architecture',
      detail: 'Executive Cabins & Acoustic Fit-Outs'
    },
    {
      icon: <Home className="w-5 h-5 text-emerald-400" />,
      label: 'Luxury Domestic Interiors',
      detail: 'Living Spaces, Lounges & Ceilings'
    },
    {
      icon: <CookingPot className="w-5 h-5 text-emerald-400" />,
      label: 'Modular Kitchen & Chimney',
      detail: 'Heat & Moisture Resistant Ply'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />,
      label: '100% Sure-Shot Turnover Model',
      detail: 'Ganapati Marketing Co. Tie-Up'
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-emerald-400" />,
      label: 'Digital Marketplace Hub',
      detail: 'Snapdeal • Flipkart • Amazon'
    },
    {
      icon: <Store className="w-5 h-5 text-emerald-400" />,
      label: 'Mall & Retail Establishment',
      detail: 'Commercial Showrooms & Outlets'
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      label: '5-Year Legal Agreement',
      detail: 'Sarkar Enterprise Execution Guarantee'
    }
  ];

  // 8 Checklist bullet points extracted from the blueprints
  const bullets = [
    'Saburi Plywood Pvt. Ltd. administrative marketing infrastructure (Chinar Park, Kolkata - 59)',
    '12-Hour daily target framework (7:00 AM to 7:00 PM) with 7-day internal advertising loops',
    'Luxury corporate interiors, executive boardrooms & commercial architectural execution',
    'Domestic interior infrastructure with heat & moisture-resistant marine/commercial ply',
    'Turnkey modular kitchen installations with advanced kitchen chimney engineering',
    'Ganapati Marketing Co. Pvt. Ltd. tie-up for 100% sure-shot turnover acceleration',
    'Omni-channel retail distribution integrated with Snapdeal, Flipkart & Amazon platforms',
    'Protected under Sarkar Enterprise 5-Year legal agreement and compliance framework'
  ];

  // Highlight tags
  const tags = [
    { text: '₹50 Cr+ Project Capacity', highlight: true },
    { text: 'Saburi Plywood Tie-Up', highlight: true },
    { text: '100% Sure-Shot Turnover', highlight: true },
    { text: 'Chinar Park Kolkata Hub', highlight: false },
    { text: 'Modular Kitchen & Chimney', highlight: false },
    { text: '5-Year Legal Contract', highlight: false }
  ];

  return (
    <div id="interior-showcase-card" className="interior-banner-card bg-gradient-to-b from-[#0c1310] to-[#070b09] border border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl relative mb-12">
      {/* Top Banner Header Bar */}
      <div className="bg-gradient-to-r from-[#0a1811] via-[#0f231a] to-[#0a1811] px-6 py-4 border-b border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold shadow-lg shadow-emerald-500/10">
            🏢
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                Official Sector 3 Blueprint
              </span>
              <span className="text-xs text-slate-400">• Sarkar Enterprise Certified</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Interiors, Infrastructure &amp; Saburi Plywood Tie-Up
              <span className="text-emerald-400 text-sm font-normal">| Chinar Park, Kolkata - 59</span>
            </h3>
          </div>
        </div>

        {/* 4 Image Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-white/10 overflow-x-auto max-w-full">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveImageIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeImageIndex === idx
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-md shadow-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{img.schemeCode || `Document ${idx + 1}`}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Left Poster Column & Right Details Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Column: Interactive Blueprint Viewer (5 cols on lg) */}
        <div className="lg:col-span-5 bg-[#040907] border-b lg:border-b-0 lg:border-r border-emerald-500/20 flex flex-col items-center justify-between p-4 relative group">
          {/* Ambient Background Glow matching active image */}
          <div 
            className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-20 pointer-events-none transition-all duration-700"
            style={{ backgroundImage: `url(${activeImg.url})` }}
          />

          {/* Active Image Stage */}
          <div 
            className="w-full flex-1 flex items-center justify-center p-2 cursor-pointer relative z-10 min-h-[380px] max-h-[500px]"
            onClick={() => handleOpenZoom(activeImageIndex)}
            title="Click to zoom in high-resolution"
          >
            <picture className="w-full h-full flex items-center justify-center">
              <source srcSet={activeImg.url} type="image/webp" />
              <img 
                src={activeImg.fallbackUrl || activeImg.url} 
                alt={activeImg.title}
                loading="eager"
                decoding="async"
                className="max-h-[460px] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10 transition-transform duration-300 group-hover:scale-[1.02]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (activeImg.remoteUrl && target.src !== activeImg.remoteUrl) {
                    target.src = activeImg.remoteUrl;
                  }
                }}
              />
            </picture>

            {/* Hover Zoom Overlay Pill */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg pointer-events-none">
              <span className="bg-black/90 border border-emerald-400 text-emerald-300 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                <ZoomIn className="w-4 h-4 text-emerald-400" />
                Click to Zoom High-Res Document
              </span>
            </div>
          </div>

          {/* Bottom Thumbnail Selector Row */}
          <div className="w-full relative z-10 mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
              <span className="font-semibold text-emerald-300/90">{activeImg.badge || activeImg.schemeCode}</span>
              <span>{activeImageIndex + 1} of {images.length} Documents</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-md overflow-hidden border transition-all h-16 bg-black/80 ${
                    activeImageIndex === idx 
                      ? 'border-emerald-400 ring-2 ring-emerald-400/40 scale-105 z-10' 
                      : 'border-white/15 opacity-70 hover:opacity-100 hover:border-emerald-300/50'
                  }`}
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (img.remoteUrl && target.src !== img.remoteUrl) target.src = img.remoteUrl;
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/80 px-1 py-0.5 text-[10px] text-center font-bold text-white truncate">
                    {img.schemeCode || `#${idx + 1}`}
                  </div>
                </button>
              ))}
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
                  {activeImg.schemeCode}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  {activeImg.badge}
                </span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                {activeImg.title}
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {activeImg.desc}
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
                Architectural Blueprint Highlights &amp; Commercial Scope
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
              className="flex-1 min-w-[200px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-bold py-3 px-5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-black" />
              Apply for Interior &amp; Plywood Tie-Up
            </button>

            <button
              onClick={() => onWhatsAppOrder(`Inquiry for Interiors & Plywood Blueprint (${activeImg.schemeCode} - ${activeImg.title})`)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Architectural Desk
            </button>

            <button
              onClick={() => handleOpenZoom(activeImageIndex)}
              className="bg-white/10 hover:bg-white/15 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all border border-white/15 flex items-center justify-center gap-2"
            >
              <ZoomIn className="w-4 h-4 text-emerald-400" />
              Zoom Document
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
            <div className="w-full flex items-center justify-between text-white py-2.5 px-3 sm:px-4 bg-black/80 rounded-xl border border-white/15 mb-2 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
                <span className="text-emerald-400 font-bold text-xs sm:text-sm bg-emerald-400/20 px-2 sm:px-2.5 py-0.5 rounded border border-emerald-400/30 whitespace-nowrap">
                  {images[modalIndex]?.schemeCode}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
                  {images[modalIndex]?.title}
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
                  <span>Close</span>
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

              <picture className="max-w-full max-h-full flex items-center justify-center h-full">
                <source srcSet={images[modalIndex]?.url} type="image/webp" />
                <img 
                  src={images[modalIndex]?.fallbackUrl || images[modalIndex]?.url} 
                  alt={images[modalIndex]?.title}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-white/15"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (images[modalIndex]?.remoteUrl && target.src !== images[modalIndex]?.remoteUrl) {
                      target.src = images[modalIndex]?.remoteUrl;
                    }
                  }}
                />
              </picture>

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
              <span className="flex-1 text-left line-clamp-2 sm:line-clamp-none">{images[modalIndex]?.desc}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
