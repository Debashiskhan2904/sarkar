import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Preloader = () => {
  const isFirstVisit = typeof window !== 'undefined' && !sessionStorage.getItem('sarkaar_preloader_seen');
  const [loading, setLoading] = useState(isFirstVisit);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isFirstVisit) {
      setLoading(false);
      return;
    }

    // Snappy loading duration for first visit (900ms)
    const duration = 900; 
    const intervalTime = 18; 
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const rawProgress = (currentStep / steps);
      const easeProgress = rawProgress === 1 ? 1 : 1 - Math.pow(1 - rawProgress, 3);
      const newProgress = Math.min(Math.floor(easeProgress * 100), 100);
      
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setProgress(100);
        sessionStorage.setItem('sarkaar_preloader_seen', 'true');
        setTimeout(() => setLoading(false), 250);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isFirstVisit]);

  const handleSkip = () => {
    sessionStorage.setItem('sarkaar_preloader_seen', 'true');
    setLoading(false);
  };

  if (!loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          key="preloader" 
          className="preloader-overlay"
          onClick={handleSkip}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ cursor: 'pointer' }}
        >
          <div className="preloader-content">
            <div className="preloader-emblem-wrap">
              {/* Outer slow rotation ring with a glowing dot */}
              <div className="preloader-outer-ring">
                <div className="preloader-dot"></div>
              </div>
              
              {/* Concentric dotted circle */}
              <div className="preloader-concentric-dotted"></div>

              {/* Extremely subtle concentric circles */}
              <div className="preloader-concentric"></div>
              
              {/* Thin gold ring draws itself */}
              <svg className="preloader-gold-ring-svg" viewBox="0 0 200 200">
                <circle className="preloader-gold-circle" cx="100" cy="100" r="98" />
              </svg>
              
              <div className="preloader-logo-glow"></div>
              <img src="https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg" alt="The Sarkaar Enterprise Logo" className="preloader-logo-image" style={{ objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            
            <div className="preloader-text-wrap">
              <div className="preloader-title">
                <span className="preloader-title-text">The Sarkaar Enterprise</span>
              </div>
              <div className="preloader-subtitle">
                <span className="preloader-subtitle-inner">
                  <span className="preloader-diamond">♦</span>
                  Excellence Redefined
                  <span className="preloader-diamond">♦</span>
                </span>
              </div>
            </div>
            
            <div className="preloader-progress-wrap">
              <div className="preloader-progress-track">
                <div 
                  className="preloader-progress-bar" 
                  style={{ width: `${progress}%` }}
                >
                  <div className="preloader-progress-glow"></div>
                </div>
              </div>
              <div className="preloader-progress-text">
                {progress.toString().padStart(2, '0')}%
              </div>
              <div className="preloader-status">
                <span className="preloader-status-line"></span>
                <span>PREPARING EXPERIENCE...</span>
                <span className="preloader-status-line"></span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
