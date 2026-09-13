import React, { useState, useEffect } from 'react';
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
  Award
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
  // The dedicated Munmun Soan Papdi image requested by user:
  // https://i.pinimg.com/736x/d6/16/1e/d6161e0676203b2168b0c1d3b5ca4650.jpg
  const bannerImage = {
    title: 'Munmun Food Products – Soan Papdi & Others',
    sub: 'Traditional Indian Flaky Sweet with Pistachios & Almonds',
    webpUrl: '/images/products/soan-papdi/soanpapdi_banner.webp',
    url: '/images/products/soan-papdi/soanpapdi_banner.jpg',
    remoteUrl: 'https://i.pinimg.com/736x/d6/16/1e/d6161e0676203b2168b0c1d3b5ca4650.jpg'
  };

  const [showLightbox, setShowLightbox] = useState(false);

  const handleOpenZoom = () => {
    setShowLightbox(true);
    if (onViewVisuals) {
      onViewVisuals();
    }
  };

  useEffect(() => {
    if (!showLightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowLightbox(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox]);

  const featureBadges = [
    { 
      icon: <Sparkles className="w-5 h-5 text-amber-400" />, 
      title: 'Made with Pure Ghee' 
    },
    { 
      icon: <Award className="w-5 h-5 text-amber-400" />, 
      title: 'Rich in Pistachios' 
    },
    { 
      icon: <ChefHat className="w-5 h-5 text-amber-400" />, 
      title: 'Traditional Indian Recipe' 
    },
    { 
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />, 
      title: 'Hygienically Prepared' 
    },
    { 
      icon: <Users className="w-5 h-5 text-amber-400" />, 
      title: 'Trusted by Families' 
    },
    { 
      icon: <Package className="w-5 h-5 text-amber-400" />, 
      title: 'Available in Retail & FMCG Packs' 
    },
    { 
      icon: <Building2 className="w-5 h-5 text-amber-400" />, 
      title: 'Complete Product Establishment' 
    },
    { 
      icon: <Handshake className="w-5 h-5 text-amber-400" />, 
      title: 'Distributor & C&F Network' 
    }
  ];

  const checklistItems = [
    'Complete product establishment',
    'Distributor & C&F network',
    'Online platform integrations',
    'Detergent powder, Kitchen Chimney manufacturing support',
    'Retail, wholesale & bulk supply',
    'Custom branding & OEM support',
    'Pan India supply with reliable logistics',
    'Festival & corporate gifting solutions'
  ];

  const chipTags = [
    'Complete Establishment',
    'Distributor & C&F Network',
    'Pure Ghee & Pistachios',
    'Detergent Powder Support',
    'Kitchen Chimney Promotion'
  ];

  return (
    <div className="soanpapdi-showcase-wrapper my-8" id="soan-papdi">
      <div className="soanpapdi-banner-card">
        {/* FLYER POSTER COLUMN (LEFT) */}
        <div className="soanpapdi-poster-column">
          {/* Ambient blurred backdrop */}
          <div 
            className="soanpapdi-ambient-bg"
            style={{ backgroundImage: `url(${bannerImage.url})` }}
          />

          <div 
            className="soanpapdi-img-wrapper"
            onClick={handleOpenZoom}
            title="Click to view full resolution banner"
          >
            <picture>
              <source srcSet={bannerImage.webpUrl} type="image/webp" />
              <img 
                src={bannerImage.url} 
                alt={bannerImage.title}
                className="soanpapdi-main-img"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== bannerImage.remoteUrl) {
                    target.src = bannerImage.remoteUrl;
                  }
                }}
              />
            </picture>
            <div className="soanpapdi-zoom-overlay">
              <span className="soanpapdi-zoom-pill">
                <ZoomIn size={15} className="mr-1.5 text-amber-400" />
                Zoom Full Resolution
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
                <picture>
                  <source srcSet="/images/logos/soanpapdilogo.webp" type="image/webp" />
                  <img 
                    src="/images/logos/soanpapdilogo.png" 
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
                </picture>
              </div>
              <div className="soanpapdi-titles-wrap">
                <span className="soanpapdi-eyebrow">
                  MUNMUN FOOD PRODUCTS
                </span>
                <h3 className="soanpapdi-title">
                  Soan Papdi &amp; Others
                </h3>
              </div>
            </div>

            {/* Slogan Stamp on Top Right */}
            <div className="soanpapdi-slogan-stamp" title="Taste That Brings People Together">
              <div className="soanpapdi-slogan-text">
                <span>Taste</span>
                <span>That Brings</span>
                <span>People Together</span>
              </div>
            </div>
          </div>

          {/* Subtitle Description */}
          <p className="soanpapdi-description">
            Traditional Indian flaky sweet with pistachios. Detergent powder, Kitchen Chimney manufacturing support also available under FMCG/Industrial promotion.
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
                  India's Favourite Soan Papdi!
                </span>
              </div>
              <div 
                className="soanpapdi-plate-frame"
                onClick={handleOpenZoom}
                title="Click to zoom in"
              >
                <img 
                  src="/images/products/soan-papdi/soanpapdi_sweets.jpg" 
                  alt="Delicious Munmun Soan Papdi with Pistachios"
                  className="soanpapdi-plate-img"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== bannerImage.url) {
                      target.src = bannerImage.url;
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
                <span>Buying Enquiry</span>
              </button>

              <button 
                type="button"
                className="btn-soanpapdi-whatsapp"
                onClick={() => onWhatsAppOrder('Munmun Soan Papdi & Others')}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Order</span>
              </button>

              <button 
                type="button"
                className="btn-soanpapdi-visuals"
                onClick={handleOpenZoom}
              >
                <ZoomIn size={16} />
                <span>View Visuals</span>
              </button>
            </div>

            {/* 3 Trust Badges */}
            <div className="soanpapdi-trust-group">
              <div className="soanpapdi-trust-item">
                <Truck size={15} className="text-amber-400" />
                <span>Pan India Supply</span>
              </div>
              <div className="soanpapdi-trust-item">
                <Handshake size={15} className="text-amber-400" />
                <span>Dealership Open</span>
              </div>
              <div className="soanpapdi-trust-item">
                <TrendingUp size={15} className="text-amber-400" />
                <span>Grow With Us</span>
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
                  src="/images/logos/soanpapdilogo.png" 
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
                <span>Close</span>
              </button>
            </div>

            {/* Modal Image Display (Single High-Res Image for Soan Papdi) */}
            <div className="relative flex items-center justify-center w-full flex-1 min-h-0 my-auto overflow-hidden">
              <picture className="flex items-center justify-center w-full h-full">
                <source srcSet={bannerImage.webpUrl} type="image/webp" />
                <img 
                  src={bannerImage.url} 
                  alt={bannerImage.title}
                  className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-200"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== bannerImage.remoteUrl) {
                      target.src = bannerImage.remoteUrl;
                    }
                  }}
                />
              </picture>
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
                <span>Submit Buying Enquiry</span>
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
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
