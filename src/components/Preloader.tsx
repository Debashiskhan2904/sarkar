import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cinematic, calm luxury preloader duration (3600ms)
    const duration = 3600; 
    const intervalTime = 25; 
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const rawProgress = (currentStep / steps);
      // Smooth ease-out progression
      const easeProgress = rawProgress >= 1 ? 1 : 1 - Math.pow(1 - rawProgress, 2.2);
      const newProgress = Math.min(Math.floor(easeProgress * 100), 100);
      
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => setLoading(false), 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleSkip = () => {
    setLoading(false);
  };

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
          onClick={handleSkip}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)', pointerEvents: 'none' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ cursor: 'pointer' }}
          title="Click to skip"
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

            {/* Subtle skip indicator */}
            <div style={{ marginTop: '8px', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.25)', textTransform: 'uppercase' }}>
              CLICK ANYWHERE TO SKIP
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
