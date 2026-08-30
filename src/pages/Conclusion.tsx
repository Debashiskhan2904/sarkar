import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { 
  Building2, 
  Target, 
  TrendingUp, 
  Layers, 
  ArrowRight,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

export const Conclusion = () => {
  const { setIsContractOpen } = useStore();
  const { t } = useLanguage();

  const businessSectors = [
    { id: 1, icon: '🛒', titleKey: 'conclusionSector1Title', descKey: 'conclusionSector1Desc' },
    { id: 2, icon: '⚙️', titleKey: 'conclusionSector2Title', descKey: 'conclusionSector2Desc' },
    { id: 3, icon: '💎', titleKey: 'conclusionSector3Title', descKey: 'conclusionSector3Desc' },
    { id: 4, icon: '🏠', titleKey: 'conclusionSector4Title', descKey: 'conclusionSector4Desc' },
    { id: 5, icon: '📦', titleKey: 'conclusionSector5Title', descKey: 'conclusionSector5Desc' },
    { id: 6, icon: '🤝', titleKey: 'conclusionSector6Title', descKey: 'conclusionSector6Desc' },
    { id: 7, icon: '🏢', titleKey: 'conclusionSector7Title', descKey: 'conclusionSector7Desc' },
    { id: 8, icon: '💼', titleKey: 'conclusionSector8Title', descKey: 'conclusionSector8Desc' },
    { id: 9, icon: '📢', titleKey: 'conclusionSector9Title', descKey: 'conclusionSector9Desc' },
    { id: 10, icon: '📋', titleKey: 'conclusionSector10Title', descKey: 'conclusionSector10Desc' },
    { id: 11, icon: '🏛️', titleKey: 'conclusionSector11Title', descKey: 'conclusionSector11Desc' },
    { id: 12, icon: '🌐', titleKey: 'conclusionSector12Title', descKey: 'conclusionSector12Desc' },
    { id: 13, icon: '🚀', titleKey: 'conclusionSector13Title', descKey: 'conclusionSector13Desc' },
  ];

  const growthPrinciples = [
    { num: '01', titleKey: 'conclusionPillar1Title', descKey: 'conclusionPillar1Desc' },
    { num: '02', titleKey: 'conclusionPillar2Title', descKey: 'conclusionPillar2Desc' },
    { num: '03', titleKey: 'conclusionPillar3Title', descKey: 'conclusionPillar3Desc' },
    { num: '04', titleKey: 'conclusionPillar4Title', descKey: 'conclusionPillar4Desc' },
    { num: '05', titleKey: 'conclusionPillar5Title', descKey: 'conclusionPillar5Desc' },
  ];

  return (
    <PageWrapper>
      {/* Hero Header */}
      <section className="section" style={{ paddingTop: '80px', paddingBottom: '50px', background: 'radial-gradient(circle at top, rgba(255, 215, 0, 0.08), transparent 70%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto' }}>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'inline-block',
                background: 'rgba(255, 215, 0, 0.15)',
                color: '#FFD700',
                border: '1px solid rgba(255, 215, 0, 0.35)',
                padding: '6px 18px',
                borderRadius: '30px',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
            >
              {t('conclusionBadge')}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
                fontFamily: "'Playfair Display', serif",
                color: '#ffffff',
                fontWeight: 800,
                lineHeight: '1.2',
                marginBottom: '20px'
              }}
            >
              {t('conclusionTitle')}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '1.12rem',
                lineHeight: '1.7',
                margin: '0 auto'
              }}
            >
              {t('conclusionSubtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="section" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          
          {/* Section 1: Executive Overview */}
          <div 
            style={{
              background: 'rgba(17, 24, 39, 0.75)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '16px',
              padding: '36px 40px',
              marginBottom: '40px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#FFD700', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
                <Building2 size={24} />
              </div>
              <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                {t('conclusionOverviewTitle')}
              </h2>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify' }}>
              {t('conclusionOverviewP1')}
            </p>

            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', lineHeight: '1.8', margin: 0, textAlign: 'justify' }}>
              {t('conclusionOverviewP2')}
            </p>
          </div>

          {/* Section 2: Business Scope and Working Sectors */}
          <div style={{ marginBottom: '50px' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span style={{ color: '#FFD700', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.1em' }}>
                {t('conclusionSectorsEyebrow')}
              </span>
              <h3 style={{ fontSize: '1.9rem', color: '#fff', fontFamily: "'Playfair Display', serif", marginTop: '6px' }}>
                {t('conclusionSectorsTitle')}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '680px', margin: '0 auto', fontSize: '0.95rem' }}>
                {t('conclusionSectorsSubtitle')}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {businessSectors.map((sector) => (
                <div
                  key={sector.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    transition: 'transform 0.2s ease, border-color 0.2s ease'
                  }}
                  className="hover-lift-card"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{sector.icon}</span>
                    <h4 style={{ color: '#FFD700', fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                      {t(sector.titleKey)}
                    </h4>
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.86rem', lineHeight: '1.5', margin: 0 }}>
                    {t(sector.descKey)}
                  </p>
                </div>
              ))}
            </div>

            <div 
              style={{
                marginTop: '20px',
                background: 'rgba(255, 215, 0, 0.08)',
                border: '1px dashed rgba(255, 215, 0, 0.4)',
                borderRadius: '10px',
                padding: '16px 20px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '0.92rem',
                lineHeight: '1.6',
                textAlign: 'center'
              }}
            >
              ✨ <em>{t('conclusionSectorExpandNote')}</em>
            </div>
          </div>

          {/* Section 3: Core Capabilities & Market Brand Development Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '50px' }}>
            
            {/* Core Capabilities */}
            <div 
              style={{
                background: '#111827',
                border: '1px solid rgba(255, 215, 0, 0.25)',
                borderRadius: '16px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#FFD700', padding: '8px', borderRadius: '8px' }}>
                  <Layers size={20} />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: '#fff', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                  {t('conclusionCapTitle')}
                </h3>
              </div>

              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.94rem', lineHeight: '1.7', marginBottom: '16px', textAlign: 'justify' }}>
                {t('conclusionCapP1')}
              </p>

              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.94rem', lineHeight: '1.7', margin: 0, textAlign: 'justify' }}>
                {t('conclusionCapP2')}
              </p>
            </div>

            {/* Market and Brand Development */}
            <div 
              style={{
                background: '#111827',
                border: '1px solid rgba(255, 215, 0, 0.25)',
                borderRadius: '16px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#FFD700', padding: '8px', borderRadius: '8px' }}>
                  <TrendingUp size={20} />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: '#fff', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                  {t('conclusionMarketTitle')}
                </h3>
              </div>

              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.94rem', lineHeight: '1.7', marginBottom: '16px', textAlign: 'justify' }}>
                {t('conclusionMarketP1')}
              </p>

              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.94rem', lineHeight: '1.7', margin: 0, textAlign: 'justify' }}>
                {t('conclusionMarketP2')}
              </p>
            </div>

          </div>

          {/* Section 4: Vision and Future Growth (5 Pillars) */}
          <div 
            style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(17, 24, 39, 0.95))',
              border: '1px solid rgba(255, 215, 0, 0.35)',
              borderRadius: '16px',
              padding: '36px 40px',
              marginBottom: '50px'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span style={{ color: '#FFD700', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.1em' }}>
                {t('conclusionPillarsEyebrow')}
              </span>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', fontFamily: "'Playfair Display', serif", marginTop: '6px' }}>
                {t('conclusionPillarsTitle')}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '750px', margin: '0 auto', fontSize: '0.98rem', lineHeight: '1.6' }}>
                {t('conclusionPillarsSub')}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {growthPrinciples.map((pillar) => (
                <div 
                  key={pillar.num}
                  style={{
                    background: '#0a0d14',
                    border: '1px solid rgba(255, 215, 0, 0.25)',
                    borderRadius: '12px',
                    padding: '20px',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'rgba(255, 215, 0, 0.3)', marginBottom: '8px' }}>
                    {pillar.num}
                  </div>
                  <h4 style={{ color: '#FFD700', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px 0' }}>
                    {t(pillar.titleKey)}
                  </h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.86rem', lineHeight: '1.55', margin: 0 }}>
                    {t(pillar.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Long-Term Corporate Objective */}
          <div 
            style={{
              background: '#0d1117',
              border: '2px solid #FFD700',
              borderRadius: '16px',
              padding: '40px',
              marginBottom: '50px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.6)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#FFD700', color: '#000', padding: '10px', borderRadius: '10px', fontWeight: 900 }}>
                <Target size={24} />
              </div>
              <h2 style={{ fontSize: '1.7rem', color: '#FFD700', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                {t('conclusionObjTitle')}
              </h2>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify' }}>
              {t('conclusionObjP1')}
            </p>

            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify' }}>
              {t('conclusionObjP2')}
            </p>

            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify' }}>
              {t('conclusionObjP3')}
            </p>

            <div style={{ background: 'rgba(255, 215, 0, 0.1)', borderLeft: '4px solid #FFD700', padding: '16px 20px', borderRadius: '0 8px 8px 0', margin: '24px 0 0 0' }}>
              <p style={{ color: '#ffffff', fontSize: '1.08rem', lineHeight: '1.75', fontWeight: 600, margin: 0, fontStyle: 'italic' }}>
                {t('conclusionQuote')}
              </p>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/products"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #d4af37)',
                color: '#000',
                fontWeight: 800,
                fontSize: '0.92rem',
                padding: '14px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
              }}
            >
              {t('conclusionBtnExplore')} <ArrowRight size={16} />
            </Link>

            <button
              onClick={() => setIsContractOpen(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(255, 215, 0, 0.4)',
                fontWeight: 700,
                fontSize: '0.92rem',
                padding: '14px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FileText size={16} color="#FFD700" /> {t('conclusionBtnAgreement')}
            </button>

            <Link
              to="/contact"
              style={{
                background: 'transparent',
                color: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: 600,
                fontSize: '0.92rem',
                padding: '14px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {t('conclusionBtnContact')}
            </Link>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
};
