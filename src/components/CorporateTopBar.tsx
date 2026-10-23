import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  ChevronDown, 
  ArrowRight,
  X,
  ExternalLink,
  Store,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CorporateTopBar: React.FC = () => {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

  const productSectors = [
    {
      title: 'Priti-Ji Chanachur (FMCG Foods)',
      subtitle: 'Crispy & Savoury Bengal Snacks',
      desc: 'Authentic spicy Chanachur, Tok-Jhal-Misti, Besan Bhujia, Fried Dalmut, and packaged savoury namkeens.',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80',
      path: '/products/fmcg',
      badge: 'FSSAI Certified'
    },
    {
      title: 'Stylo Gold & Diamond Jewellery',
      subtitle: 'Luxury Hallmarked Fine Ornaments',
      desc: '100% BIS Hallmarked 22K/18K gold necklaces, certified diamond rings, polki bangles, and bridal collections.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80',
      path: '/products/jewellery',
      badge: 'BIS Hallmarked'
    },
    {
      title: 'Luxury Modular Kitchen & Interiors',
      subtitle: 'Custom Turnkey Architectural Fitouts',
      desc: 'German-hardware modular kitchens, acrylic master wardrobes, false ceiling acoustic lighting & living interiors.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
      path: '/products/interior',
      badge: 'ISO 9001 Quality'
    }
  ];

  return (
    <div 
      style={{ 
        background: 'linear-gradient(90deg, #070a10 0%, #0d121c 50%, #070a10 100%)', 
        borderBottom: '1px solid rgba(255, 215, 0, 0.22)',
        fontSize: '0.78rem',
        color: 'rgba(255, 255, 255, 0.85)',
        position: 'relative',
        zIndex: 1001
      }}
    >
      <div 
        style={{ 
          maxWidth: '100%', 
          margin: '0 auto', 
          padding: '6px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px 16px'
        }}
      >
        {/* Left: Company Name & Credentials Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#ffd700', fontWeight: 800, letterSpacing: '0.04em' }}>
              THE SARKAR ENTERPRISE
            </span>
            <span style={{ 
              background: 'rgba(255,215,0,0.15)', 
              color: '#ffd700', 
              border: '1px solid rgba(255,215,0,0.35)', 
              padding: '1px 6px', 
              borderRadius: '4px', 
              fontSize: '0.68rem', 
              fontWeight: 700 
            }}>
              GOVT. REGISTERED
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs text-white/70">
            <Link 
              to="/credentials"
              style={{ 
                color: '#ffd700', 
                textDecoration: 'none', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '4px',
                fontWeight: 600,
                transition: 'opacity 0.2s ease'
              }}
              title="View all official Government Certificates & Licences"
            >
              <ShieldCheck size={14} color="#ffd700" />
              <span>GST: 19BZSPS5314M1ZG</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 2px' }}>|</span>
              <span>FSSAI: 22824144000511</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 2px' }}>|</span>
              <span style={{ textDecoration: 'underline' }}>View Credentials</span>
            </Link>
          </div>
        </div>

        {/* Right: Contact Coordinates & Products Quick Showcase Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          
          {/* Phone */}
          <a 
            href="tel:+918670783810"
            style={{ 
              color: 'rgba(255,255,255,0.85)', 
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '5px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffd700')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
          >
            <Phone size={13} color="#ffd700" />
            <span style={{ fontWeight: 600 }}>+91 8670783810</span>
          </a>

          {/* Mail */}
          <a 
            href="mailto:kishore8670@gmail.com"
            className="hidden md:inline-flex"
            style={{ 
              color: 'rgba(255,255,255,0.85)', 
              textDecoration: 'none', 
              alignItems: 'center', 
              gap: '5px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffd700')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
          >
            <Mail size={13} color="#ffd700" />
            <span>kishore8670@gmail.com</span>
          </a>

          {/* Address */}
          <span 
            className="hidden xl:inline-flex"
            style={{ 
              alignItems: 'center', 
              gap: '5px', 
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.74rem'
            }}
          >
            <MapPin size={13} color="rgba(255,215,0,0.8)" />
            <span>Bhiringi More, Benachity, Durgapur, WB - 713213</span>
          </span>

          {/* Products Quick Showcase Toggle Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProductsDropdown(!showProductsDropdown)}
              style={{
                background: showProductsDropdown ? 'rgba(255,215,0,0.2)' : 'rgba(255,215,0,0.08)',
                border: '1px solid rgba(255,215,0,0.35)',
                color: '#ffd700',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.2s ease'
              }}
              title="Preview core products with descriptions & images"
            >
              <Store size={13} />
              <span>Products Overview</span>
              <ChevronDown 
                size={12} 
                style={{ 
                  transform: showProductsDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }} 
              />
            </button>

            {/* Products Mega Dropdown Overlay */}
            <AnimatePresence>
              {showProductsDropdown && (
                <>
                  {/* Backdrop for closing */}
                  <div 
                    onClick={() => setShowProductsDropdown(false)}
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 1002,
                      background: 'rgba(0,0,0,0.3)'
                    }}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: 'min(92vw, 680px)',
                      background: '#10141d',
                      border: '1px solid rgba(255,215,0,0.4)',
                      borderRadius: '12px',
                      padding: '16px',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                      zIndex: 1003,
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={16} color="#ffd700" />
                        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.86rem' }}>
                          The Sarkar Enterprise — Core Product Sectors
                        </span>
                      </div>
                      <button
                        onClick={() => setShowProductsDropdown(false)}
                        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '2px' }}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* 3 Sectors Product Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
                      {productSectors.map((prod, idx) => (
                        <Link
                          key={idx}
                          to={prod.path}
                          onClick={() => setShowProductsDropdown(false)}
                          style={{
                            textDecoration: 'none',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,215,0,0.15)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#ffd700';
                            e.currentTarget.style.background = 'rgba(255,215,0,0.06)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,215,0,0.15)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                          }}
                        >
                          <div style={{ height: '90px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                            <img 
                              src={prod.image} 
                              alt={prod.title}
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <span style={{ 
                              position: 'absolute', 
                              bottom: '6px', 
                              left: '6px', 
                              background: 'rgba(0,0,0,0.75)', 
                              backdropFilter: 'blur(4px)',
                              color: '#ffd700', 
                              fontSize: '0.64rem', 
                              fontWeight: 700, 
                              padding: '2px 6px', 
                              borderRadius: '4px',
                              border: '1px solid rgba(255,215,0,0.3)'
                            }}>
                              {prod.badge}
                            </span>
                          </div>

                          <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h4 style={{ color: '#ffd700', fontSize: '0.8rem', fontWeight: 700, margin: '0 0 4px 0', lineHeight: 1.25 }}>
                              {prod.title}
                            </h4>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', lineHeight: 1.4, margin: '0 0 8px 0', flex: 1 }}>
                              {prod.desc}
                            </p>
                            <span style={{ color: '#ffffff', fontSize: '0.72rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              Explore Catalog <ArrowRight size={11} color="#ffd700" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Link 
                        to="/credentials"
                        onClick={() => setShowProductsDropdown(false)}
                        style={{ color: '#ffd700', fontSize: '0.74rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                      >
                        <ShieldCheck size={13} /> Official ISO, FSSAI &amp; GST Licences
                      </Link>
                      <Link 
                        to="/products"
                        onClick={() => setShowProductsDropdown(false)}
                        style={{ color: '#ffffff', fontSize: '0.74rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
                      >
                        View All Sectors <ArrowRight size={12} color="#ffd700" />
                      </Link>
                    </div>

                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
