import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Total animation time around 6000ms
    const duration = 6000; 
    const intervalTime = 20; 
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Custom easing function: cubic-bezier-like curve (easeOutQuart roughly)
      const rawProgress = (currentStep / steps);
      const easeProgress = rawProgress === 1 ? 1 : 1 - Math.pow(1 - rawProgress, 4);
      const newProgress = Math.min(Math.floor(easeProgress * 100), 100);
      
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setProgress(100);
        // Hold at 100% briefly before transitioning out directly to the main website
        setTimeout(() => setLoading(false), 1200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          key="preloader" 
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
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
              <img src="https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg" alt="Sarkar Enterprise Logo" className="preloader-logo-image" style={{ objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            
            <div className="preloader-text-wrap">
              <div className="preloader-title">
                <span className="preloader-title-text">Sarkar Enterprise</span>
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
