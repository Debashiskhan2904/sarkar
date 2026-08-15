import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { Copy, Check } from 'lucide-react';

const PaymentForm = () => {
  const { showToast, setIsPaymentOpen, addInquiry } = useStore();
  const [payData, setPayData] = useState({
    name: '',
    phone: '',
    utr: '',
    amount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payData.name || !payData.phone || !payData.utr) {
      showToast('Please fill in all required fields (Name, Phone, UTR)', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await addInquiry({
        name: payData.name,
        phone: payData.phone,
        email: '',
        company: payData.name,
        type: `Payment Verification (UTR: ${payData.utr}, Amount: ₹${payData.amount || 'N/A'})`,
        message: `Payment Receipt / UTR Verification request. UTR No: ${payData.utr}, Amount Paid: ₹${payData.amount || '0'}`,
        date: new Date().toISOString()
      });
    } catch (err: any) {
      console.warn('Payment logging warning:', err?.message);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Payment verification receipt submitted! Official Money Receipt will be sent.', 'success');
    }
  };

  const sendWhatsAppReceipt = () => {
    const text = `Hello Sarkar Enterprise,
I have submitted a payment verification request:
Name/Company: ${payData.name || 'N/A'}
Phone: ${payData.phone || 'N/A'}
UTR/Transaction No: ${payData.utr || 'N/A'}
Amount Paid: ₹${payData.amount || '0'}`;
    window.open(`https://wa.me/918670783810?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (isSubmitted) {
    return (
      <div style={{ background: '#0a1a0f', padding: '24px', borderRadius: '8px', border: '1px solid #10b981', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>✅</div>
        <h4 style={{ color: '#10b981', fontSize: '1.2rem', marginBottom: '8px', fontWeight: 700 }}>Payment Verification Logged!</h4>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.5' }}>
          Thank you <strong>{payData.name}</strong>. Your transaction UTR <strong>{payData.utr}</strong> (Amount: ₹{payData.amount || 'N/A'}) has been submitted for official verification.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            type="button"
            onClick={sendWhatsAppReceipt}
            style={{ background: '#25D366', color: '#000', fontWeight: 800, padding: '10px 18px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            💬 Confirm via WhatsApp
          </button>
          <button 
            type="button"
            onClick={() => { setIsSubmitted(false); setIsPaymentOpen(false); }}
            style={{ background: '#333', color: '#fff', fontWeight: 600, padding: '10px 18px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.88rem' }}
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row" style={{ marginBottom: '12px' }}>
        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>Full Name / Company Name *</label>
          <input 
            type="text" 
            placeholder="Full Name / Company Name" 
            required 
            value={payData.name}
            onChange={e => setPayData({ ...payData, name: e.target.value })}
            style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '10px 12px', borderRadius: '4px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>Phone Number *</label>
          <input 
            type="tel" 
            placeholder="Phone Number" 
            required 
            value={payData.phone}
            onChange={e => setPayData({ ...payData, phone: e.target.value })}
            style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '10px 12px', borderRadius: '4px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>
      </div>
      <div className="form-row" style={{ marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>Transaction / UTR Number *</label>
          <input 
            type="text" 
            placeholder="12-digit UTR Number" 
            required 
            value={payData.utr}
            onChange={e => setPayData({ ...payData, utr: e.target.value })}
            style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '10px 12px', borderRadius: '4px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 600 }}>Amount Paid (₹) *</label>
          <input 
            type="number" 
            placeholder="Amount Paid (₹)" 
            required 
            value={payData.amount}
            onChange={e => setPayData({ ...payData, amount: e.target.value })}
            style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '10px 12px', borderRadius: '4px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        style={{ width: '100%', background: isSubmitting ? '#a38716' : '#FFD700', color: '#000', fontWeight: 800, padding: '12px', border: 'none', borderRadius: '4px', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '0.9rem', letterSpacing: '0.05em', transition: 'all 0.2s' }}
      >
        {isSubmitting ? 'VERIFYING TRANSACTION...' : 'VERIFY TRANSACTION & REQUEST RECEIPT →'}
      </button>
    </form>
  );
};

export const Modals = () => {
  const { toast, showToast, zoomModal, setZoomModal, videoModal, setVideoModal, isPaymentOpen, setIsPaymentOpen } = useStore();
  const [copiedUpi, setCopiedUpi] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('kishore8670-2@okhdfcbank');
    setCopiedUpi(true);
    showToast('UPI ID copied to clipboard: kishore8670-2@okhdfcbank', 'success');
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (zoomModal && e.key === 'Escape') setZoomModal(null);
      if (isPaymentOpen && e.key === 'Escape') setIsPaymentOpen(false);
      if (zoomModal && e.key === 'ArrowLeft') handleZoomNav(-1);
      if (zoomModal && e.key === 'ArrowRight') handleZoomNav(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [zoomModal, isPaymentOpen]);

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
        const activeTitle = zoomModal.titles?.[zoomModal.start] || zoomModal.title || 'Sarkar Enterprise Catalog';
        return (
          <div className="modal open" onClick={(e) => { if(e.target === e.currentTarget) setZoomModal(null); }}>
            <div className="modal-content">
              <button className="modal-close" onClick={() => setZoomModal(null)} title="Close">✕</button>
              <div className="brochure-frame">
                <div className="brochure-img-wrap">
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
                    <span className="blabel">Sarkar Enterprise · Catalog</span>
                    <span className="btitle">{activeTitle}</span>
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

      {isPaymentOpen && (
        <div className="modal open" style={{ overflowY: 'auto', padding: '24px 16px', alignItems: 'flex-start', justifyContent: 'center' }} onClick={(e) => { if(e.target === e.currentTarget) setIsPaymentOpen(false); }}>
          <div className="modal-content" style={{ maxWidth: '700px', width: '100%', maxHeight: '90vh', background: '#111111', border: '1px solid rgba(255, 215, 0, 0.4)', borderRadius: '16px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', margin: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)' }}>
            <button className="modal-close" onClick={() => setIsPaymentOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 20 }}>✕</button>
            <div className="modal-body payment-modal-scroll" style={{ padding: '32px 24px', overflowY: 'auto', maxHeight: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ color: '#FFD700', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>OFFICIAL VERIFICATION & PAYMENT</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '1.8rem', marginTop: '6px' }}>Sarkar Enterprise QR Payment</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '4px' }}>Scan with GPay, PhonePe, Paytm, or BHIM UPI for partnership agreements.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '20px', alignItems: 'center', background: '#080808', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ background: '#ffffff', padding: '10px', borderRadius: '12px', boxShadow: '0 6px 18px rgba(0,0,0,0.5)' }}>
                    <img 
                      src="/QR.png" 
                      alt="UPI QR Code" 
                      style={{ width: '100%', maxWidth: '180px', height: 'auto', display: 'block', borderRadius: '6px' }} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/Pay.jpg";
                      }}
                    />
                  </div>
                  <div 
                    onClick={handleCopyUpi}
                    style={{ 
                      marginTop: '10px', 
                      background: 'rgba(255,215,0,0.1)', 
                      border: '1px solid rgba(255,215,0,0.3)', 
                      borderRadius: '6px', 
                      padding: '6px 12px', 
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    title="Click to copy UPI ID"
                  >
                    <span style={{ color: '#FFD700', fontSize: '0.8rem', fontWeight: 700 }}>
                      UPI ID: kishore8670-2@okhdfcbank
                    </span>
                    {copiedUpi ? <Check size={14} color="#10b981" /> : <Copy size={14} color="#ffd700" />}
                  </div>
                </div>
                <div>
                  <h4 style={{ color: '#FFD700', margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: 700 }}>Bank Account Details</h4>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', margin: '0 0 6px 0' }}><strong>Account Name:</strong> SARKAR ENTERPRISE</p>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', margin: '0 0 6px 0' }}><strong>Bank:</strong> HDFC Bank</p>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', margin: '0 0 6px 0' }}><strong>A/C No:</strong> 402918237129</p>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', margin: '0 0 6px 0' }}><strong>IFSC Code:</strong> HDFC0001234</p>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', margin: '0' }}><strong>GST Registration:</strong> 19AAAAA0000A1Z5</p>
                </div>
              </div>

              <div style={{ background: '#161616', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 215, 0, 0.25)' }}>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', margin: '0 0 14px 0', fontWeight: 700 }}>Submit Payment Receipt / UTR Verification</h4>
                <PaymentForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
