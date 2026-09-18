import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { useStore } from '../store';
import { Phone, MessageCircle, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface JourneySectionProps {
  className?: string;
  showSectionHeader?: boolean;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ 
  className = '',
  showSectionHeader = true
}) => {
  const { t } = useLanguage();
  const { showToast } = useStore();

  const paragraphs = [
    t('journeyP1'),
    t('journeyP2'),
    t('journeyP3'),
    t('journeyP4'),
    t('journeyP5'),
    t('journeyP6'),
    t('journeyP7'),
    t('journeyP8')
  ].filter(Boolean);

  return (
    <section className={`journey-full-section ${className}`} id="journey" style={{ scrollMarginTop: '95px', paddingTop: '20px', paddingBottom: '60px' }}>
      <div className="container">
        {showSectionHeader && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles size={13} /> {t('leadershipEyebrow') || 'LEADERSHIP & VISION'}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-3">
              {t('journeyTitle')}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
              {t('aboutHeroSub')}
            </p>
          </div>
        )}

        <div className="journey-grid">
          {/* Left Profile Card */}
          <motion.div 
            className="profile-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="profile-img-frame">
              <img 
                src="https://i.pinimg.com/736x/97/4b/a5/974ba562c0f1afb251cc30cfa5aa9cad.jpg" 
                alt="Kishore Sarkar, MBA" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/KishoreSarkar.jpg";
                }}
              />
            </div>
            <h2 className="profile-name">Kishore Sarkar, MBA</h2>
            <div className="profile-tag">
              {t('profileRole')}
            </div>
            <div className="profile-meta">
              {t('profileMeta')}
            </div>

            {/* Quick Credentials Pills */}
            <div className="w-full flex flex-col gap-2 my-4 text-left px-2">
              <div className="flex items-center gap-2 text-[11px] text-gray-300 bg-white/5 border border-white/10 rounded-lg p-2">
                <Award size={14} className="text-amber-400 shrink-0" />
                <span><strong>MBA (1997)</strong> • Specialization in Concept Marketing</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-300 bg-white/5 border border-white/10 rounded-lg p-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>3-Yr Interior, Jewellery & FMCG Specialization</span>
              </div>
            </div>

            <div className="profile-actions">
              <motion.button 
                className="btn-profile-act flex items-center justify-center gap-1.5"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  showToast('Calling +91 8670783810...', 'success');
                  window.location.href = 'tel:+918670783810';
                }}
              >
                <Phone size={14} /> {t('btnCallNow')}
              </motion.button>
              <motion.button 
                className="btn-profile-act flex items-center justify-center gap-1.5 bg-[#25D366]/20 border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  showToast('Opening WhatsApp chat...', 'success');
                  window.open('https://wa.me/918670783810?text=Hello%20Mr.%20Kishore%20Sarkar%2C%20I%20would%20like%20to%20discuss%20business%20promotion.', '_blank');
                }}
              >
                <MessageCircle size={14} /> WHATSAPP
              </motion.button>
            </div>
          </motion.div>

          {/* Right Story Content */}
          <motion.div 
            className="journey-content"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4">
              {t('journeyTitle')}
            </h2>

            <div className="space-y-3.5 text-gray-300 leading-relaxed text-sm sm:text-base">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="journey-paragraph">
                  {para}
                </p>
              ))}
            </div>

            <motion.div 
              className="journey-highlight-card mt-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="journey-card-top">
                <span className="journey-badge-pill">{t('journeyExpBadge')}</span>
                <span className="journey-badge-subtitle">{t('journeyPartnerBadge')}</span>
              </div>
              <p className="journey-quote-statement">
                {t('journeyQuote')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
