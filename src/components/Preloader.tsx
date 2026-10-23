import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set preloader total run time to exactly 2.0 seconds (1800ms progress + 200ms 100% hold)
    const duration = 1800; 
    const intervalTime = 20; 
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const rawProgress = (currentStep / steps);
      // Smooth natural ease-out progression
      const easeProgress = rawProgress >= 1 ? 1 : 1 - Math.pow(1 - rawProgress, 1.8);
      const newProgress = Math.min(Math.floor(easeProgress * 100), 99);
      
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => setLoading(false), 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const getStatusText = () => {
    if (progress < 25) return "INITIALIZING SARKAR ENTERPRISE...";
    if (progress < 50) return "SECURING PROTOCOLS & DATA...";
    if (progress < 75) return "PREPARING BRAND PORTFOLIO...";
    if (progress < 95) return "FINALIZING LUXURY EXPERIENCE...";
    return "WELCOME TO THE SARKAR ENTERPRISE";
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          key="preloader" 
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)', pointerEvents: 'none' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
              <img 
                src="https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg" 
                alt="The Sarkar Enterprise Logo" 
                className="preloader-logo-image" 
                style={{ objectFit: 'cover', borderRadius: '50%' }} 
              />
            </div>
            
            <div className="preloader-text-wrap">
              <div className="preloader-title">
                <span className="preloader-title-text">The Sarkar Enterprise</span>
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
                <span>{getStatusText()}</span>
                <span className="preloader-status-line"></span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
