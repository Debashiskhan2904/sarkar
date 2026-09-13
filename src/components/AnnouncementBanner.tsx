import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Megaphone, Briefcase, Gift, AlertTriangle, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store';

export const AnnouncementBanner: React.FC = () => {
  const { announcement } = useStore();
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if dismissed for this session and this specific announcement text
    const sessionDismissed = sessionStorage.getItem('announcement_dismissed');
    if (sessionDismissed === announcement?.text) {
      setDismissed(true);
    } else {
      setDismissed(false);
    }
  }, [announcement?.text]);

  if (!announcement || !announcement.active || !announcement.text?.trim() || dismissed) {
    return null;
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    if (announcement?.text) {
      sessionStorage.setItem('announcement_dismissed', announcement.text);
    }
  };

  const handleTickerClick = () => {
    if (!announcement.linkUrl) return;
    if (announcement.linkUrl.startsWith('http')) {
      window.open(announcement.linkUrl, '_blank', 'noopener,noreferrer');
    } else {
      navigate(announcement.linkUrl);
    }
  };

  const getCategoryTheme = () => {
    switch (announcement.category) {
      case 'hiring':
        return {
          bg: 'linear-gradient(90deg, #1c1500 0%, #2b1e03 50%, #161002 100%)',
          border: 'rgba(255, 215, 0, 0.45)',
          badgeBg: 'rgba(255, 215, 0, 0.18)',
          badgeText: '#ffd700',
          badgeBorder: 'rgba(255, 215, 0, 0.5)',
          pulseColor: '#ffd700',
          badgeLabel: 'HIRING ALERT',
          icon: <Briefcase size={14} className="text-yellow-400 shrink-0" />
        };
      case 'offer':
        return {
          bg: 'linear-gradient(90deg, #052414 0%, #0d3822 50%, #052012 100%)',
          border: 'rgba(52, 211, 153, 0.45)',
          badgeBg: 'rgba(52, 211, 153, 0.18)',
          badgeText: '#34d399',
          badgeBorder: 'rgba(52, 211, 153, 0.5)',
          pulseColor: '#34d399',
          badgeLabel: 'FESTIVE OFFER / SCHEME',
          icon: <Gift size={14} className="text-emerald-400 shrink-0" />
        };
      case 'urgent':
        return {
          bg: 'linear-gradient(90deg, #2b0b0b 0%, #3e1212 50%, #260909 100%)',
          border: 'rgba(248, 113, 113, 0.45)',
          badgeBg: 'rgba(248, 113, 113, 0.18)',
          badgeText: '#f87171',
          badgeBorder: 'rgba(248, 113, 113, 0.5)',
          pulseColor: '#f87171',
          badgeLabel: 'URGENT UPDATE',
          icon: <AlertTriangle size={14} className="text-red-400 shrink-0" />
        };
      case 'notice':
      default:
        return {
          bg: 'linear-gradient(90deg, #091a32 0%, #102a4f 50%, #08172c 100%)',
          border: 'rgba(96, 165, 250, 0.45)',
          badgeBg: 'rgba(96, 165, 250, 0.18)',
          badgeText: '#93c5fd',
          badgeBorder: 'rgba(96, 165, 250, 0.5)',
          pulseColor: '#60a5fa',
          badgeLabel: 'OFFICIAL NOTICE',
          icon: <Megaphone size={14} className="text-blue-300 shrink-0" />
        };
    }
  };

  const theme = getCategoryTheme();

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0, y: -16 }}
          animate={{ height: 'auto', opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: theme.bg,
            borderBottom: `1px solid ${theme.border}`,
            color: '#ffffff',
            position: 'relative',
            zIndex: 1001,
            overflow: 'hidden'
          }}
          className="announcement-bar py-2 px-2 sm:px-5"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
            
            {/* Left Category Badge with animated pulse & tilting icon */}
            <div className="flex items-center shrink-0">
              <motion.span
                whileHover={{ scale: 1.04 }}
                style={{
                  background: theme.badgeBg,
                  color: theme.badgeText,
                  border: `1px solid ${theme.badgeBorder}`,
                  letterSpacing: '0.06em',
                  boxShadow: `0 0 12px ${theme.badgeBg}`
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 select-none"
              >
                {/* Radar beacon pulsing dot */}
                <span className="relative flex h-2 w-2 mr-0.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: theme.pulseColor }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: theme.pulseColor }}
                  />
                </span>

                {/* Tilting icon */}
                <motion.span
                  animate={{ rotate: [-6, 6, -6], scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                  className="shrink-0 flex items-center"
                >
                  {theme.icon}
                </motion.span>
                <span>{theme.badgeLabel}</span>
              </motion.span>

              {/* Mobile compact badge */}
              <div className="sm:hidden flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ background: theme.badgeBg, border: `1px solid ${theme.badgeBorder}` }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: theme.pulseColor }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: theme.pulseColor }} />
                </span>
                <motion.span
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                >
                  {theme.icon}
                </motion.span>
              </div>
            </div>

            {/* Center Moving Ticker Stream (Marquee) with Pause-On-Hover */}
            <div
              className="announcement-ticker-wrapper relative flex-1 min-w-0 overflow-hidden mx-1 sm:mx-3 select-none"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 28px, black calc(100% - 28px), transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 28px, black calc(100% - 28px), transparent 100%)'
              }}
              title={announcement.linkUrl ? 'Click to explore • Hover to pause' : 'Hover to pause'}
              onClick={handleTickerClick}
            >
              <div
                className="announcement-ticker-track"
                style={{ cursor: announcement.linkUrl ? 'pointer' : 'default' }}
              >
                {/* Block 1 */}
                <div className="inline-flex items-center gap-8 pr-8 shrink-0">
                  <span className="font-semibold text-white/95 text-xs sm:text-sm tracking-wide">
                    {announcement.text}
                  </span>
                  <span className="text-yellow-400/80 font-bold text-[10px] select-none">✦</span>
                  <span className="font-medium text-white/85 text-xs sm:text-sm tracking-wide">
                    {announcement.text}
                  </span>
                  <span className="text-yellow-400/80 font-bold text-[10px] select-none">✦</span>
                </div>

                {/* Block 2 (Duplicate for seamless infinite wrap-around) */}
                <div className="inline-flex items-center gap-8 pr-8 shrink-0" aria-hidden="true">
                  <span className="font-semibold text-white/95 text-xs sm:text-sm tracking-wide">
                    {announcement.text}
                  </span>
                  <span className="text-yellow-400/80 font-bold text-[10px] select-none">✦</span>
                  <span className="font-medium text-white/85 text-xs sm:text-sm tracking-wide">
                    {announcement.text}
                  </span>
                  <span className="text-yellow-400/80 font-bold text-[10px] select-none">✦</span>
                </div>
              </div>
            </div>

            {/* Right Action Button & Dismiss Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {announcement.linkUrl && announcement.linkText && (
                announcement.linkUrl.startsWith('http') ? (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    href={announcement.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(255, 215, 0, 0.16)',
                      color: '#ffd700',
                      border: '1px solid rgba(255, 215, 0, 0.45)',
                      boxShadow: '0 2px 8px rgba(255, 215, 0, 0.15)'
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-bold hover:bg-yellow-400 hover:text-black transition-colors"
                  >
                    <span>{announcement.linkText}</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                      className="inline-flex"
                    >
                      <ArrowRight size={12} />
                    </motion.span>
                  </motion.a>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={announcement.linkUrl}
                      style={{
                        background: 'rgba(255, 215, 0, 0.16)',
                        color: '#ffd700',
                        border: '1px solid rgba(255, 215, 0, 0.45)',
                        boxShadow: '0 2px 8px rgba(255, 215, 0, 0.15)'
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-bold hover:bg-yellow-400 hover:text-black transition-colors"
                    >
                      <span>{announcement.linkText}</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                        className="inline-flex"
                      >
                        <ArrowRight size={12} />
                      </motion.span>
                    </Link>
                  </motion.div>
                )
              )}

              {/* Dismiss Button */}
              <motion.button
                whileHover={{ rotate: 90, scale: 1.18, color: '#ffffff' }}
                whileTap={{ scale: 0.85 }}
                onClick={handleDismiss}
                aria-label="Dismiss banner"
                className="p-1 text-white/60 hover:text-white rounded hover:bg-white/10 transition-colors ml-0.5"
                title="Dismiss banner"
              >
                <X size={14} />
              </motion.button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
