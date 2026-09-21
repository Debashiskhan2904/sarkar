import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { Copy, Check, X } from 'lucide-react';
import { ContractAgreementDocument } from './ContractAgreement';
import { OfficialQRPayment } from './OfficialQRPayment';

export const Modals = () => {
  const { toast, showToast, zoomModal, setZoomModal, videoModal, setVideoModal, isPaymentOpen, setIsPaymentOpen, isContractOpen, setIsContractOpen } = useStore();
  const { t } = useLanguage();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (zoomModal && e.key === 'Escape') setZoomModal(null);
      if (isPaymentOpen && e.key === 'Escape') setIsPaymentOpen(false);
      if (isContractOpen && e.key === 'Escape') setIsContractOpen(false);
      if (zoomModal && e.key === 'ArrowLeft') handleZoomNav(-1);
      if (zoomModal && e.key === 'ArrowRight') handleZoomNav(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [zoomModal, isPaymentOpen, isContractOpen]);

  const handleZoomNav = (dir: number) => {
    if (!zoomModal || zoomModal.imgs.length === 0) return;
    const newIdx = (zoomModal.start + dir + zoomModal.imgs.length) % zoomModal.imgs.length;
    setZoomModal({ ...zoomModal, start: newIdx });
  };

  const getYoutubeEmbed = (url: string) => {
    let embed = url;
    if (url.includes('youtube.com/watch')) {
      const id = new URL(url).searchParams.get('v');
      if (id) embed = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
    } else if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split(/[?&#]/)[0];
      embed = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
    } else if (url.includes('/embed/') && !url.includes('autoplay')) {
      embed = url + (url.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
    }
    return embed;
  };

  return (
    <>
      <div className={`toast ${toast ? 'show ' + toast.type : ''}`}>
        {toast?.msg}
      </div>

      {zoomModal && (() => {
        const activeTitle = zoomModal.titles?.[zoomModal.start] || zoomModal.title || 'The Sarkar Enterprise Catalog';
        return (
          <div className="modal open" onClick={(e) => { if(e.target === e.currentTarget) setZoomModal(null); }}>
            <div className="modal-content">
              <button className="modal-close" onClick={() => setZoomModal(null)} title="Close (ESC)">✕</button>
              <div className="brochure-frame">
                <div className="brochure-img-wrap" style={{ position: 'relative' }}>
                  <img 
                    key={zoomModal.start} 
                    src={zoomModal.imgs[zoomModal.start]?.startsWith('/') ? encodeURI(zoomModal.imgs[zoomModal.start]) : zoomModal.imgs[zoomModal.start]} 
                    alt={activeTitle} 
                    onError={(e) => {
                      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="#111827"/><rect x="20" y="20" width="760" height="560" rx="12" fill="none" stroke="#d4af37" stroke-width="2" stroke-dasharray="6 6" opacity="0.5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#f3f4f6" font-family="sans-serif" font-size="24" font-weight="bold">${activeTitle.replace(/&/g, '&amp;')}</text></svg>`;
                      (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
                    }}
                  />
                </div>
                <div className="brochure-bar">
                  <div className="brochure-bar-left">
                    <span className="blabel">The Sarkar Enterprise · Catalog</span>
                    <span className="btitle">{activeTitle}</span>
                  </div>
                  <div className="brochure-bar-right" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {zoomModal.imgs.length > 1 && (
                      <>
                        <button className="brochure-nav-btn" onClick={() => handleZoomNav(-1)}>‹</button>
                        <span className="brochure-counter">{zoomModal.start + 1} / {zoomModal.imgs.length}</span>
                        <button className="brochure-nav-btn" onClick={() => handleZoomNav(1)}>›</button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => setZoomModal(null)}
                      style={{
                        background: '#dc2626',
                        border: '1px solid #ef4444',
                        color: '#ffffff',
                        borderRadius: '6px',
                        padding: '6px 14px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginLeft: '8px',
                        boxShadow: '0 2px 8px rgba(220, 38, 38, 0.4)'
                      }}
                      title="Close Viewer (ESC)"
                    >
                      <X size={15} strokeWidth={2.5} />
                      <span>Close</span>
                    </button>
                  </div>
                </div>
                {zoomModal.imgs.length > 1 && (
                  <div className="brochure-thumbs" style={{ display: 'flex' }}>
                    {zoomModal.imgs.map((src: string, i: number) => (
                      <img key={i} src={src.startsWith('/assets/') ? encodeURI(src) : src} className={i === zoomModal.start ? 'active' : ''} onClick={() => setZoomModal({ ...zoomModal, start: i })} alt={`View ${i+1}`} loading="lazy" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {videoModal && (
        <div className="modal open" onClick={(e) => { if(e.target === e.currentTarget) setVideoModal(null); }}>
          <div className="modal-content" style={{ maxWidth: '960px', background: '#000' }}>
            <button className="modal-close" onClick={() => setVideoModal(null)} title="Close (ESC)">✕</button>
            <div className="modal-body" style={{ padding: 0 }}>
              <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                {videoModal.url.includes('youtube.com') || videoModal.url.includes('youtu.be') ? (
                  <iframe src={getYoutubeEmbed(videoModal.url)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} allow="autoplay; fullscreen" />
                ) : (
                  <video 
                    src={videoModal.url} 
                    controls 
                    autoPlay 
                    playsInline 
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#000' }}
                    onError={(e) => {
                      const videoEl = e.currentTarget;
                      videoEl.style.display = 'none';
                      const parent = videoEl.parentElement;
                      if (parent && !parent.querySelector('.video-fallback-msg')) {
                        const div = document.createElement('div');
                        div.className = 'video-fallback-msg';
                        div.style.cssText = 'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ffd700; padding: 20px; text-align: center; background: #111;';
                        div.innerHTML = '<div style="font-size: 2rem; margin-bottom: 8px;">🎬</div><div style="font-weight: 700; font-size: 1rem; color: #fff; margin-bottom: 6px;">Video File Unavailable or Still Processing</div><div style="font-size: 0.82rem; color: #aaa; max-width: 420px;">The video source file is currently unreachable or was removed from cloud storage. You can upload a new video clip or link from the Admin Panel.</div>';
                        parent.appendChild(div);
                      }
                    }}
                  />
                )}
              </div>
              <p style={{ color: '#fff', padding: '14px 20px', margin: 0, fontSize: '1rem' }}>{videoModal.title}</p>
            </div>
          </div>
        </div>
      )}

      {isPaymentOpen && (
        <div className="modal open" style={{ overflowY: 'auto', padding: '16px', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => { if(e.target === e.currentTarget) setIsPaymentOpen(false); }}>
          <div className="modal-content" style={{ maxWidth: '850px', width: '100%', maxHeight: '92vh', background: '#0a0a0c', border: '1px solid rgba(250, 204, 21, 0.4)', borderRadius: '20px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', margin: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95)' }}>
            <button 
              className="modal-close" 
              onClick={() => setIsPaymentOpen(false)} 
              style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 30, background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              ✕
            </button>
            <div className="modal-body payment-modal-scroll" style={{ padding: '24px 16px', overflowY: 'auto', maxHeight: '100%' }}>
              <OfficialQRPayment isModal={true} />
            </div>
          </div>
        </div>
      )}

      {isContractOpen && (
        <div 
          className="modal open" 
          style={{ 
            overflowY: 'auto', 
            padding: '20px 12px', 
            alignItems: 'flex-start', 
            justifyContent: 'center',
            zIndex: 9999
          }} 
          onClick={(e) => { if(e.target === e.currentTarget) setIsContractOpen(false); }}
        >
          <div 
            className="modal-content" 
            style={{ 
              maxWidth: '960px', 
              width: '100%', 
              maxHeight: '92vh', 
              background: '#0d1117', 
              border: '1px solid rgba(255, 215, 0, 0.4)', 
              borderRadius: '16px', 
              display: 'flex', 
              flexDirection: 'column', 
              position: 'relative', 
              overflow: 'hidden', 
              margin: 'auto', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95)' 
            }}
          >
            <button 
              className="modal-close" 
              onClick={() => setIsContractOpen(false)} 
              aria-label="Close"
              style={{ zIndex: 10, background: '#111827', border: '1px solid rgba(255,255,255,0.2)', top: '16px', right: '16px' }}
            >
              <X size={20} />
            </button>
            <div style={{ padding: 0, overflowY: 'auto', maxHeight: '100%' }}>
              <ContractAgreementDocument />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
