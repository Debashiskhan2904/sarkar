import React, { useEffect } from 'react';
import { useStore } from '../store';

export const Modals = () => {
  const { toast, zoomModal, setZoomModal, videoModal, setVideoModal } = useStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (zoomModal && e.key === 'Escape') setZoomModal(null);
      if (zoomModal && e.key === 'ArrowLeft') handleZoomNav(-1);
      if (zoomModal && e.key === 'ArrowRight') handleZoomNav(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [zoomModal]);

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

      {zoomModal && (
        <div className="modal open" onClick={(e) => { if(e.target === e.currentTarget) setZoomModal(null); }}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setZoomModal(null)} title="Close">✕</button>
            <div className="brochure-frame">
              <div className="brochure-img-wrap">
                <img key={zoomModal.start} src={zoomModal.imgs[zoomModal.start]} alt="Product view" />
              </div>
              <div className="brochure-bar">
                <div className="brochure-bar-left">
                  <span className="blabel">Sarkar Enterprise · Catalog</span>
                  <span className="btitle">{zoomModal.title}</span>
                </div>
                <div className="brochure-bar-right">
                  {zoomModal.imgs.length > 1 && (
                    <>
                      <button className="brochure-nav-btn" onClick={() => handleZoomNav(-1)}>‹</button>
                      <span className="brochure-counter">{zoomModal.start + 1} / {zoomModal.imgs.length}</span>
                      <button className="brochure-nav-btn" onClick={() => handleZoomNav(1)}>›</button>
                    </>
                  )}
                </div>
              </div>
              {zoomModal.imgs.length > 1 && (
                <div className="brochure-thumbs" style={{ display: 'flex' }}>
                  {zoomModal.imgs.map((src: string, i: number) => (
                    <img key={i} src={src} className={i === zoomModal.start ? 'active' : ''} onClick={() => setZoomModal({ ...zoomModal, start: i })} alt={`View ${i+1}`} loading="lazy" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {videoModal && (
        <div className="modal open" onClick={(e) => { if(e.target === e.currentTarget) setVideoModal(null); }}>
          <div className="modal-content" style={{ maxWidth: '960px', background: '#000' }}>
            <button className="modal-close" onClick={() => setVideoModal(null)}>✕</button>
            <div className="modal-body" style={{ padding: 0 }}>
              <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                {videoModal.url.includes('youtube.com') || videoModal.url.includes('youtu.be') ? (
                  <iframe src={getYoutubeEmbed(videoModal.url)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} allow="autoplay; fullscreen" />
                ) : (
                  <video src={videoModal.url} controls autoPlay playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#000' }} />
                )}
              </div>
              <p style={{ color: '#fff', padding: '14px 20px', margin: 0, fontSize: '1rem' }}>{videoModal.title}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
