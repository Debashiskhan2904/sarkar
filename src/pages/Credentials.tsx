import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PageWrapper } from '../components/PageWrapper';
import { useLanguage } from '../lib/LanguageContext';
import { useStore } from '../store';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink,
  Download,
  Eye,
  Building2,
  Lock,
  Phone,
  MessageCircle,
  FileCheck2,
  MapPin,
  Mail
} from 'lucide-react';

export const Credentials = () => {
  const { t } = useLanguage();
  const { mediaItems, openZoomGallery, showToast } = useStore();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    showToast(`Copied ${label} to clipboard`, 'success');
    setTimeout(() => setCopiedField(null), 2500);
  };

  const companyBrandCredentials = [
    {
      id: 'munmun-soanpapdi',
      name: 'Munmun Soanpapdi',
      category: 'Confectionery & Traditional Sweets',
      badge: 'FSSAI Certified Sweet',
      authority: 'Food Safety and Standards Authority of India (FSSAI)',
      regNo: 'FSSAI 22824144000511',
      gstNo: '19EONPD4969G1ZD',
      address: 'Khandra Parulia Road, Khandra Parulia, Kalna, Purba Bardhaman, West Bengal 713422, India',
      email: 'munmunsoanpapdi@gmail.com',
      description: 'Handmade flaky delicacy prepared with pure desi ghee, premium roasted gram flour, and crushed pistachios. Sealed with automated freshness-lock tamper-proof packaging.',
      features: ['100% Pure Vegetarian', 'Automated Moisture-Proof Pack', 'Wholesale Bulk & Retail Boxes'],
      link: '/products/fmcg'
    },
    {
      id: 'pritiji-chanachur',
      name: 'Pritiji Chanachur',
      category: 'Namkeen & Savory Bengali Snacks (Since 2019)',
      badge: 'Signature FMCG Namkeen',
      authority: 'Central MSME & FSSAI Standards',
      regNo: 'FSSAI Regulated Formulation',
      gstNo: '19BZSPS5314M1ZG',
      manufacturer: 'JPC Foods & Snacks Products (Since 2019)',
      address: 'Raghunathpur, P.O- Pilkhan, Dist.- Hooghly (W.B.) PIN- 712613',
      marketedBy: 'The Sarkar Enterprise (Purba Bardhaman)',
      email: 'kishore8670@gmail.com',
      consumerCare: 'Quality Manager (Consumer Care Cell)',
      consumerCareEmail: 'jpc5531@gmail.com',
      description: 'Signature Bengali Chanachur crafted with proprietary Ayurvedic digestive spices, Tok-Jhal-Misti blends, roasted peanuts, and zero trans-fat refined oils.',
      features: ['Since 2019 Quality Heritage', '₹5, ₹10, ₹70 Packet Formats', 'Consumer Care Quality Guaranteed'],
      link: '/products/fmcg'
    },
    {
      id: 'maxwel',
      name: 'Maxwell (Maxwel)',
      category: 'Industrial, Agarbatti & Consumer Lines',
      badge: 'Quality Standard Certified',
      authority: 'Ministry of MSME & Commercial Trade License',
      regNo: 'UDYAM-WB-02-0019284',
      address: 'Plot no. 19, Royal Garden, Street no. 2, Kotla Vihar, Phase-II, Near Vijendra Farm House, New Delhi, Delhi, 110043, India',
      description: 'Premium consumer brand line offering export-grade fragrant agarbatti sticks, household commodities, and multi-tier distributor retail packaging networks.',
      features: ['High-Retention Natural Aromas', 'Industrial Grade Manufacturing', 'Verified Retailer Margins'],
      link: '/products/fmcg'
    },
    {
      id: 'angry-frog-mosquito',
      name: 'Angry Frog Mosquito',
      category: 'Pest Control & Insect Repellents',
      badge: 'Fast Knockdown Formula',
      authority: 'CIB&RC Active Safety Compliance',
      regNo: 'Certified Active Transfluthrin',
      manufacturer: 'Hirak Industries',
      address: 'Plot No. 289, Vaishali Nagar, Debari, Tehsil Girwa, Udaipur, Rajasthan, India',
      description: 'High-potency rapid knockdown liquid mosquito vaporizers, universal refill cartridges, and long-lasting 12-hour mosquito coils for residential & commercial protection.',
      features: ['Instant Room Vapor Knockdown', 'Universal Fit Machine Refills', 'Non-Irritant Safe Formulation'],
      link: '/products/fmcg'
    }
  ];

  // Dynamic uploaded certificates from Supabase / AdminPanel
  const uploadedCertificates = (mediaItems || []).filter((m: any) => m.type === 'credential');

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '50px', paddingBottom: '90px', background: '#0a0d14' }}>
        <div className="container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: '24px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}
          >
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,215,0,0.5)' }}>/</span>
            <span style={{ color: '#ffd700', fontWeight: 600 }}>Credentials</span>
          </motion.div>

          {/* SECTION: Authorized Enterprise Brands & Product Line Credentials */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '2rem', fontWeight: 700, margin: '0 0 8px 0' }}>
                Authorized Brands &amp; Commercial Entities
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem', maxWidth: '750px', margin: '0 auto' }}>
                Statutory food safety compliance, registered trademarks, and commercial distribution credentials for flagship product lines under <strong>The Sarkar Enterprise</strong>.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '22px' }}>
              {companyBrandCredentials.map((brand) => (
                <div
                  key={brand.id}
                  style={{
                    background: 'linear-gradient(135deg, #131826 0%, #0c0f17 100%)',
                    border: '1px solid rgba(255,215,0,0.22)',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.45)'
                  }}
                >
                  <div>
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ background: 'rgba(255,215,0,0.12)', color: '#ffd700', padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700 }}>
                        {brand.badge}
                      </span>
                    </div>

                    <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px 0', lineHeight: 1.25 }}>
                      {brand.name}
                    </h3>
                    
                    <div style={{ color: '#ffd700', fontSize: '0.8rem', fontWeight: 600, marginBottom: '10px' }}>
                      {brand.category}
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,215,0,0.15)', borderRadius: '8px', padding: '8px 12px', marginBottom: '14px', fontSize: '0.76rem', color: 'rgba(255,255,255,0.75)' }}>
                      <strong style={{ color: '#ffd700' }}>Compliance: </strong>{brand.authority}
                    </div>

                    <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '16px' }}>
                      {brand.description}
                    </p>

                    {/* Features list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                      {brand.features.map((feat, fIdx) => (
                        <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)' }}>
                          <Check size={13} color="#10b981" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Official Commercial & Registration Details */}
                    {(brand.gstNo || brand.address || brand.email || brand.manufacturer || brand.marketedBy) && (
                      <div style={{ 
                        background: 'rgba(255, 215, 0, 0.04)', 
                        border: '1px solid rgba(255, 215, 0, 0.22)', 
                        borderRadius: '12px', 
                        padding: '14px', 
                        marginBottom: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}>
                        {brand.gstNo && (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', borderBottom: '1px solid rgba(255, 215, 0, 0.12)', paddingBottom: '8px' }}>
                            <div>
                              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                GST Number
                              </div>
                              <code style={{ color: '#ffd700', fontWeight: 800, fontSize: '0.92rem', letterSpacing: '0.04em', fontFamily: 'monospace' }}>
                                {brand.gstNo}
                              </code>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(brand.gstNo!, `${brand.name} GSTIN`)}
                              style={{
                                background: copiedField === `${brand.name} GSTIN` ? 'rgba(16,185,129,0.2)' : 'rgba(255,215,0,0.15)',
                                border: copiedField === `${brand.name} GSTIN` ? '1px solid #10b981' : '1px solid rgba(255,215,0,0.4)',
                                color: copiedField === `${brand.name} GSTIN` ? '#10b981' : '#ffd700',
                                borderRadius: '6px',
                                padding: '4px 10px',
                                cursor: 'pointer',
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                flexShrink: 0
                              }}
                              title="Copy GST Number"
                            >
                              {copiedField === `${brand.name} GSTIN` ? <Check size={12} /> : <Copy size={12} />}
                              <span>{copiedField === `${brand.name} GSTIN` ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        )}

                        {brand.manufacturer && (
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.76rem' }}>
                            <Building2 size={15} color="#ffd700" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <span style={{ color: 'rgba(255,255,255,0.5)', display: 'block', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Manufacturer
                              </span>
                              <span style={{ color: '#ffffff', fontWeight: 600, lineHeight: 1.4, display: 'block' }}>
                                {brand.manufacturer}
                              </span>
                            </div>
                          </div>
                        )}

                        {brand.address && (
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.76rem' }}>
                            <MapPin size={15} color="#ffd700" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <span style={{ color: 'rgba(255,255,255,0.5)', display: 'block', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Address / Facility
                              </span>
                              <span style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.45, display: 'block' }}>
                                {brand.address}
                              </span>
                            </div>
                          </div>
                        )}

                        {brand.marketedBy && (
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.76rem' }}>
                            <Building2 size={15} color="#ffd700" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <span style={{ color: 'rgba(255,255,255,0.5)', display: 'block', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Marketed By
                              </span>
                              <span style={{ color: '#ffffff', fontWeight: 600, lineHeight: 1.4, display: 'block' }}>
                                {brand.marketedBy}
                              </span>
                            </div>
                          </div>
                        )}

                        {brand.email && (
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.76rem' }}>
                            <Mail size={15} color="#ffd700" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <span style={{ color: 'rgba(255,255,255,0.5)', display: 'block', fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Official Email
                              </span>
                              <a 
                                href={`mailto:${brand.email}`} 
                                style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600, display: 'block', wordBreak: 'break-word', lineHeight: 1.4 }}
                              >
                                {brand.email}
                              </a>
                            </div>
                          </div>
                        )}

                        {brand.consumerCareEmail && (
                          <div style={{ 
                            marginTop: '4px',
                            paddingTop: '8px',
                            borderTop: '1px dashed rgba(255,215,0,0.18)',
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '3px', 
                            fontSize: '0.74rem' 
                          }}>
                            <span style={{ color: '#fbbf24', fontWeight: 700 }}>
                              Consumer Care Cell:
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.35 }}>
                              In case of complaints or suggestions, contact Quality Manager:
                            </span>
                            <a 
                              href={`mailto:${brand.consumerCareEmail}`} 
                              style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600, marginTop: '2px' }}
                            >
                              ✉️ {brand.consumerCareEmail}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <Link
                      to={brand.link}
                      style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,215,0,0.3)',
                        color: '#ffffff',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      View Catalog <ExternalLink size={13} color="#ffd700" />
                    </Link>

                    <a
                      href={`https://wa.me/918670783810?text=${encodeURIComponent(`Hello The Sarkar Enterprise, I am inquiring about ${brand.name} wholesale trade terms and dealership authorization.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'linear-gradient(135deg, #ffd700 0%, #eab308 100%)',
                        color: '#000000',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}
                    >
                      <MessageCircle size={14} /> Trade Inquiry
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: Official Uploaded Certificate Documents */}
          {uploadedCertificates.length > 0 && (
            <div style={{ 
              background: 'linear-gradient(135deg, #12151e 0%, #0d1017 100%)',
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: '20px',
              padding: 'clamp(24px, 4vw, 36px)',
              marginBottom: '50px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ color: '#ffd700', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    DOCUMENT REPOSITORY
                  </span>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '1.9rem', fontWeight: 700, margin: '4px 0 0 0' }}>
                    Official Certificates &amp; Agreements ({uploadedCertificates.length})
                  </h2>
                </div>
                <span style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)', padding: '4px 10px', borderRadius: '14px', fontSize: '0.75rem', fontWeight: 600 }}>
                  ✓ Live Verified from Supabase Cloud
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
                {uploadedCertificates.map((doc: any, idx: number) => (
                  <div 
                    key={doc.id || idx}
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,215,0,0.25)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Preview / Image */}
                    <div 
                      onClick={() => openZoomGallery ? openZoomGallery(doc.url, doc.title || 'Official Document') : window.open(doc.url, '_blank')}
                      style={{ height: '180px', background: '#000', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                    >
                      {doc.url?.match(/\.(jpe?g|png|webp|gif|svg)/i) || doc.url?.startsWith('data:image/') ? (
                        <img 
                          src={doc.url} 
                          alt={doc.title || 'Certificate'} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#ffd700' }}>
                          <FileCheck2 size={44} />
                          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>PDF Document / Charter</span>
                        </div>
                      )}
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.75)', color: '#ffd700', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye size={12} /> Click to View
                      </div>
                    </div>

                    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, margin: '0 0 6px 0' }}>
                          {doc.title || 'Official Certificate'}
                        </h4>
                        <div style={{ color: '#ffd700', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '12px' }}>
                          {doc.productLabel || doc.sector || 'Accreditation'}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <a 
                          href={doc.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ flex: 1, background: 'linear-gradient(135deg, #ffd700 0%, #d4af37 100%)', color: '#000', textDecoration: 'none', padding: '8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                        >
                          <Download size={13} /> Open / Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Callout Bar */}
          <div style={{ 
            background: 'linear-gradient(135deg, #131826 0%, #0a0d14 100%)',
            border: '1px solid rgba(255,215,0,0.3)',
            borderRadius: '16px',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h4 style={{ color: '#ffd700', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 4px 0' }}>
                Official Verification Helpline &amp; Distributor Charter Desk
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.86rem', margin: 0 }}>
                For bank credit verification, GST e-invoicing confirmations, or C&amp;F Super Stockist contracts, contact MD Kishore Sarkar directly.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href="tel:+918670783810"
                style={{
                  background: 'linear-gradient(135deg, #ffd700 0%, #eab308 100%)',
                  color: '#000000',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Phone size={15} /> Call Direct (+91 8670783810)
              </a>

              <a
                href={`https://wa.me/918670783810?text=${encodeURIComponent('Hello The Sarkar Enterprise, I am requesting official credential verification and distributor contract details.')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25D366',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <MessageCircle size={15} /> WhatsApp Verification
              </a>
            </div>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
};
