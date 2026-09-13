import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MessageCircle, 
  ZoomIn, 
  Check, 
  Coins, 
  Gem, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  RefreshCw, 
  Store,
  Award,
  CircleDollarSign,
  Layers,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { JEWELLERY_GALLERY } from '../data';

interface JewelleryShowcaseProps {
  onOpenEnquiry: (productName: string, category: string) => void;
  onWhatsAppOrder: (productName: string) => void;
  onViewVisuals?: () => void;
}

export const JewelleryShowcase: React.FC<JewelleryShowcaseProps> = ({
  onOpenEnquiry,
  onWhatsAppOrder,
  onViewVisuals
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const images = JEWELLERY_GALLERY;
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

  // 8 Strategic capability tiles for Jewellery sector
  const features = [
    {
      icon: <Coins className="w-5 h-5 text-amber-400 fill-amber-400/20" />,
      label: 'Instant Gold Loan Up to ₹10 Crore',
      detail: 'Mortgage / Stock Provision'
    },
    {
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      label: 'Octopus Marketing Policy',
      detail: 'Multi-Channel Brand Dominance'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
      label: 'Pentangle Sales Strategy',
      detail: 'Counter, RCMA, Online & Dealer'
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-amber-400" />,
      label: 'One-Time Design & Rotation',
      detail: 'Continuous Customer Footfall'
    },
    {
      icon: <Gem className="w-5 h-5 text-amber-400" />,
      label: 'Design Exchange Scheme',
      detail: 'Monthly / Quarterly / Yearly'
    },
    {
      icon: <CircleDollarSign className="w-5 h-5 text-amber-400 fill-amber-400/20" />,
      label: '₹7.2 Crore Annual Turnover Model',
      detail: '₹60 Lac/Month Gross Return'
    },
    {
      icon: <Award className="w-5 h-5 text-amber-400" />,
      label: '6-Year Capital Banking Return',
      detail: '₹1 Cr p.a. on ₹4 Cr Capital'
    },
    {
      icon: <Store className="w-5 h-5 text-amber-400" />,
      label: 'Modern Concept Showroom',
      detail: 'Digital ID, Uniform & Tech Tools'
    }
  ];

  // 8 Checklist bullet points extracted from the blueprints
  const bullets = [
    'India’s No. 1 Jewellery Stylo Scheme (Blue-Print 13) for 2x turnover',
    'Octopus Marketing Policy & Pentangle Sales Model for City-King Monopoly',
    'Gold Necklace Design Exchange: buy once & rotate designs with service charge',
    'M-1 Jewellery Scheme (2022) with ₹7.2 Crore annual turnover blueprint',
    '6-Year Banking Return with Interest (M2 & Y4 valid 1-year exchange offer)',
    'Reference Chain Marketing Executives (RCMA) & Daily Target Turnover (DTTO)',
    'Analytical & Scrutinize program generating ₹3–6 Crore/month overall sales',
    'Backed by Sarkar Enterprise 5-Year legal agreement framework'
  ];

  // Highlight tags
  const tags = [
    { text: '₹720 Cr Annual Market Scale', highlight: true },
    { text: 'City-King Monopoly Model', highlight: true },
    { text: '₹10 Cr Instant Gold Loan', highlight: true },
    { text: 'M1 / M2 / Y4 Schemes', highlight: false },
    { text: 'Design Exchange Offer', highlight: false },
    { text: '5-Year Legal Contract', highlight: false }
  ];

  return (
    <div id="jewellery-showcase-card" className="jewellery-banner-card bg-gradient-to-b from-[#0e1017] to-[#08090d] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl relative mb-12">
      {/* Top Banner Header Bar */}
      <div className="bg-gradient-to-r from-[#171305] via-[#231b08] to-[#120f04] px-6 py-4 border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold shadow-lg shadow-amber-500/10">
            💎
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                Official Sector 2 Blueprint
              </span>
              <span className="text-xs text-slate-400">• Sarkar Enterprise Certified</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Gold Ornaments & Jewellery Monopoly Outlets
              <span className="text-amber-400 text-sm font-normal">| M-1 / M-2 / Y-4 Schemes</span>
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
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-md shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{img.schemeCode || `Scheme ${idx + 1}`}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Left Poster Column (480px) & Right Details Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Column: Interactive Blueprint Viewer (5 cols on lg) */}
        <div className="lg:col-span-5 bg-[#050608] border-b lg:border-b-0 lg:border-r border-amber-500/20 flex flex-col items-center justify-between p-4 relative group">
          {/* Ambient Background Glow matching the active image */}
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
              <span className="bg-black/90 border border-amber-400 text-amber-300 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                <ZoomIn className="w-4 h-4 text-amber-400" />
                Click to Zoom High-Res Blueprint
              </span>
            </div>
          </div>

          {/* Bottom Thumbnail Selector Row */}
          <div className="w-full relative z-10 mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
              <span className="font-semibold text-amber-300/90">{activeImg.badge || activeImg.schemeCode}</span>
              <span>{activeImageIndex + 1} of {images.length} Blueprints</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-md overflow-hidden border transition-all h-16 bg-black/80 ${
                    activeImageIndex === idx 
                      ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 z-10' 
                      : 'border-white/15 opacity-70 hover:opacity-100 hover:border-amber-300/50'
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
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between relative z-10 bg-[#0a0c10]/90">
          <div>
            {/* Header info for currently selected blueprint */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  {activeImg.schemeCode}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
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
                  className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-amber-400/40 rounded-xl p-3 transition-all duration-200 flex flex-col justify-between"
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
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Strategic Blueprint Highlights & Commercial Rules
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <span className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/50 flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5 font-bold">
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
                      ? 'bg-amber-400/10 text-amber-300 border-amber-400/40'
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
              onClick={() => onOpenEnquiry('Jewellery Monopoly Outlet (M1 / Y4 / 6-Year Competitive Schemes)', 'jewellery')}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold py-3 px-5 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-black" />
              Apply for Jewellery Monopoly Franchise
            </button>

            <button
              onClick={() => onWhatsAppOrder(`Inquiry for Jewellery Schemes (${activeImg.schemeCode} - ${activeImg.title})`)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Inquiry
            </button>

            <button
              onClick={() => handleOpenZoom(activeImageIndex)}
              className="bg-white/10 hover:bg-white/15 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all border border-white/15 flex items-center justify-center gap-2"
            >
              <ZoomIn className="w-4 h-4 text-amber-400" />
              Zoom Blueprint
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
                <span className="text-amber-400 font-bold text-xs sm:text-sm bg-amber-400/20 px-2 sm:px-2.5 py-0.5 rounded border border-amber-400/30 whitespace-nowrap">
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
                className="absolute left-2 md:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black text-amber-400 border border-amber-400/40 hover:scale-110 transition-all shadow-xl cursor-pointer"
                aria-label="Previous blueprint"
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
                className="absolute right-2 md:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black text-amber-400 border border-amber-400/40 hover:scale-110 transition-all shadow-xl cursor-pointer"
                aria-label="Next blueprint"
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
