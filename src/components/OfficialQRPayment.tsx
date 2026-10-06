import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';

interface OfficialQRPaymentProps {
  className?: string;
  isModal?: boolean;
}

export const OfficialQRPayment: React.FC<OfficialQRPaymentProps> = ({
  className = '',
  isModal = false,
}) => {
  const { showToast, addInquiry } = useStore();
  const { t } = useLanguage();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showUtrForm, setShowUtrForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    utr: '',
    amount: '',
    notes: ''
  });

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (showToast) {
      showToast(`${label} copied to clipboard!`, 'success');
    }
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2200);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.utr || !formData.amount) {
      if (showToast) showToast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      if (addInquiry) {
        await addInquiry({
          name: formData.name,
          email: `${formData.phone}@phone.sarkarenterprise.in`,
          phone: formData.phone,
          type: 'Payment Verification',
          subject: `UTR: ${formData.utr} | ₹${formData.amount}`,
          message: `Official Payment Verification Request\nName: ${formData.name}\nPhone: ${formData.phone}\nUTR / Ref: ${formData.utr}\nAmount: ₹${formData.amount}\nNotes: ${formData.notes || 'None'}`
        });
      }
      setFormSubmitted({ ...formData });
      if (showToast) showToast('Payment verification request submitted successfully!', 'success');
    } catch (err) {
      console.error(err);
      if (showToast) showToast('Failed to submit verification. Please confirm via WhatsApp.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={`w-full text-white ${className}`} id="official-qr-payment">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Top Header Section */}
        <div className="text-center mb-8 sm:mb-10 flex flex-col items-center">
          {/* Badge: OFFICIAL VERIFICATION & PAYMENT */}
          <div className="inline-flex items-center gap-2 px-6 py-1.5 rounded-full border border-[#ca8a04] bg-[#1a1608]/80 text-[#facc15] text-xs sm:text-sm font-bold tracking-[0.14em] uppercase mb-4 shadow-[0_0_15px_rgba(250,204,21,0.15)]">
            <span>OFFICIAL VERIFICATION & PAYMENT</span>
          </div>

          {/* Title: The Sarkar Enterprise QR Payment */}
          <h2 
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 !font-sans"
            style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
          >
            The Sarkar Enterprise <span className="text-[#facc15]">QR Payment</span>
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Scan with GPay, PhonePe, Paytm, or BHIM UPI for partnership agreements.
          </p>
        </div>

        {/* Main Card Container - Exact match to uploaded reference image */}
        <div className="bg-[#0b0c10] border border-[#1f2128] rounded-2xl sm:rounded-3xl p-3.5 xs:p-5 sm:p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: QR Code & UPI ID */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              
              {/* White Box for QR Code */}
              <div className="bg-white p-3.5 sm:p-5 rounded-2xl shadow-2xl w-full max-w-[220px] sm:max-w-[280px] aspect-square flex items-center justify-center transition-transform hover:scale-[1.01] duration-300">
                <img 
                  src="/images/payments/QR.png" 
                  alt="The Sarkar Enterprise QR Code" 
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'pixelated' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/payments/qr.jpeg";
                  }}
                />
              </div>

              {/* Text under QR */}
              <div className="mt-3 sm:mt-4 text-center">
                <h3 
                  className="text-white font-bold text-lg sm:text-2xl tracking-tight leading-none mb-1 !font-sans"
                  style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
                >
                  Scan & Pay
                </h3>
                <p className="text-neutral-400 text-xs sm:text-base font-normal">
                  Using any UPI App
                </p>
              </div>

              {/* UPI ID Pill Box */}
              <div className="w-full max-w-[340px] mt-3.5 sm:mt-4 bg-[#0d0e13] border border-[#23252e] rounded-xl p-2.5 sm:p-3 px-3 sm:px-4 flex items-center justify-between gap-2.5 sm:gap-3 shadow-inner">
                {/* Dual Triangles NPCI UPI Icon */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="10,30 22,6 30,6 18,30" fill="#F59E0B" />
                    <polygon points="17,34 29,10 37,10 25,34" fill="#10B981" />
                  </svg>
                </div>

                {/* UPI Details */}
                <div className="flex flex-col text-left flex-1 min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider leading-none mb-0.5 sm:mb-1">
                    UPI ID
                  </span>
                  <span className="text-[11.5px] xs:text-xs sm:text-[13.5px] font-bold text-white tracking-tight truncate select-all">
                    Vyapar.170854583865@hdfcbank
                  </span>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={() => copyToClipboard('Vyapar.170854583865@hdfcbank', 'upi', 'UPI ID')}
                  className="p-1.5 sm:p-2 rounded-lg border border-[#ca8a04]/90 text-[#facc15] hover:bg-[#facc15]/10 hover:border-[#facc15] transition-all cursor-pointer shrink-0"
                  title="Copy UPI ID"
                  aria-label="Copy UPI ID"
                >
                  {copiedKey === 'upi' ? (
                    <Check size={15} className="text-emerald-400" />
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: Bank Account Details */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Heading */}
              <div className="mb-4 sm:mb-5">
                <h3 
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-[#facc15] tracking-tight !font-sans"
                  style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
                >
                  Bank Account Details
                </h3>
                <div className="h-[3px] w-12 sm:w-14 bg-[#facc15] rounded-full mt-1.5 sm:mt-2"></div>
              </div>

              {/* Rows List */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                
                {/* 1. Account Name */}
                <div className="bg-[#0d0e13] border border-[#1f2128] rounded-xl py-2.5 sm:py-3 px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4">
                  <span className="text-neutral-400 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
                    Account Name
                  </span>
                  <span className="text-white text-xs sm:text-sm md:text-base font-bold text-right whitespace-nowrap">
                    The Sarkar Enterprise
                  </span>
                </div>

                {/* 2. Bank */}
                <div className="bg-[#0d0e13] border border-[#1f2128] rounded-xl py-2.5 sm:py-3 px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4">
                  <span className="text-neutral-400 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
                    Bank
                  </span>
                  <span className="text-white text-xs sm:text-sm md:text-base font-bold text-right whitespace-nowrap">
                    HDFC Bank
                  </span>
                </div>

                {/* 3. Transfer Mode / Type */}
                <div className="bg-[#0d0e13] border border-[#1f2128] rounded-xl py-2.5 sm:py-3 px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4">
                  <span className="text-neutral-400 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
                    Transfer Mode / Type
                  </span>
                  <span className="text-[#facc15] text-xs sm:text-sm md:text-base font-bold text-right tracking-wide whitespace-nowrap">
                    RTGS / NEFT
                  </span>
                </div>

                {/* 4. A/C No. */}
                <div className="bg-[#0d0e13] border border-[#1f2128] rounded-xl py-2 sm:py-2.5 px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4">
                  <span className="text-neutral-400 text-xs sm:text-sm font-medium shrink-0 whitespace-nowrap">
                    A/C No.
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                    <span className="text-white font-mono font-bold text-xs sm:text-sm md:text-base tracking-wider select-all whitespace-nowrap">
                      50200102953505
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('50200102953505', 'acc', 'Account Number')}
                      className="border border-[#ca8a04]/90 hover:border-[#facc15] text-[#facc15] hover:bg-[#facc15]/10 px-2 sm:px-3 py-1 rounded-lg flex items-center gap-1 text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
                      title="Copy Account Number"
                    >
                      {copiedKey === 'acc' ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 5. IFSC Code */}
                <div className="bg-[#0d0e13] border border-[#1f2128] rounded-xl py-2 sm:py-2.5 px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4">
                  <span className="text-neutral-400 text-xs sm:text-sm font-medium shrink-0 whitespace-nowrap">
                    IFSC Code
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                    <span className="text-white font-mono font-bold text-xs sm:text-sm md:text-base tracking-wider select-all whitespace-nowrap">
                      HDFC0001257
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('HDFC0001257', 'ifsc', 'IFSC Code')}
                      className="border border-[#ca8a04]/90 hover:border-[#facc15] text-[#facc15] hover:bg-[#facc15]/10 px-2 sm:px-3 py-1 rounded-lg flex items-center gap-1 text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
                      title="Copy IFSC Code"
                    >
                      {copiedKey === 'ifsc' ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 6. GST Registration */}
                <div className="bg-[#0d0e13] border border-[#1f2128] rounded-xl py-2.5 sm:py-3 px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4">
                  <span className="text-neutral-400 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
                    GST Registration
                  </span>
                  <span className="text-white font-mono font-bold text-xs sm:text-sm md:text-base tracking-wider text-right select-all whitespace-nowrap">
                    19BZSPS5314M1ZG
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Optional Collapsible UTR Verification & Official Money Receipt Submission */}
        {!isModal && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowUtrForm(!showUtrForm)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#facc15] hover:text-white bg-[#0e1015] hover:bg-[#151720] border border-[#262832] px-5 py-2.5 rounded-full transition-all cursor-pointer"
            >
              <span>{showUtrForm ? 'Hide UTR Verification Form' : 'Submit Payment Receipt / UTR Verification for Official Receipt'}</span>
              {showUtrForm ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showUtrForm && (
              <div className="mt-4 bg-[#0d0e13] border border-[#ca8a04]/30 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-left transition-all animate-fadeIn">
                <div className="flex items-center gap-2 mb-4 text-[#facc15]">
                  <ShieldCheck size={20} />
                  <h4 className="font-bold text-base sm:text-lg text-white">Payment Receipt / UTR Verification</h4>
                </div>
                <p className="text-neutral-400 text-xs sm:text-sm mb-6">
                  After initiating RTGS/NEFT or scanning via UPI, enter your 12-digit transaction UTR number below to receive your official stamp-sealed money receipt.
                </p>

                {formSubmitted ? (
                  <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-xl p-6 text-center">
                    <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-2" />
                    <h5 className="text-emerald-400 font-bold text-base sm:text-lg mb-1">
                      Verification Request Logged!
                    </h5>
                    <p className="text-neutral-300 text-xs sm:text-sm mb-4">
                      UTR <strong className="text-white font-mono">{formSubmitted.utr}</strong> for amount <strong className="text-white">₹{formSubmitted.amount}</strong> submitted for <strong className="text-white">{formSubmitted.name}</strong>.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/918670783810?text=${encodeURIComponent(
                          `Hello Sarkar Enterprise,\nI have submitted an advance payment receipt for verification:\n\n👤 Name / Firm: ${formSubmitted.name}\n📱 Phone: ${formSubmitted.phone}\n🔢 UTR Number: ${formSubmitted.utr}\n💰 Amount Paid: ₹${formSubmitted.amount}\n\nPlease generate official money receipt.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all"
                      >
                        Confirm via WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(null);
                          setFormData({ name: '', phone: '', utr: '', amount: '', notes: '' });
                        }}
                        className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-all"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Full Name / Firm Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ramesh Kumar / ABC Traders"
                          className="w-full bg-[#14161c] border border-[#262832] focus:border-[#facc15] rounded-lg px-3.5 py-2 text-white text-sm outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-[#14161c] border border-[#262832] focus:border-[#facc15] rounded-lg px-3.5 py-2 text-white text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Transaction UTR / Ref Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.utr}
                          onChange={(e) => setFormData({ ...formData, utr: e.target.value })}
                          placeholder="12-digit UTR or UPI Ref"
                          className="w-full bg-[#14161c] border border-[#262832] focus:border-[#facc15] rounded-lg px-3.5 py-2 text-white text-sm font-mono outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                          Amount Paid (₹) *
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          placeholder="e.g. 50000"
                          className="w-full bg-[#14161c] border border-[#262832] focus:border-[#facc15] rounded-lg px-3.5 py-2 text-white text-sm font-mono outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Remarks / Sector Scheme (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. Jewellery Monopoly advance / FMCG Distributorship"
                        className="w-full bg-[#14161c] border border-[#262832] focus:border-[#facc15] rounded-lg px-3.5 py-2 text-white text-sm outline-none transition-all"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="bg-[#facc15] hover:bg-yellow-400 text-black font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
                      >
                        <Send size={15} />
                        <span>{submitting ? 'Submitting...' : 'Submit Verification Request'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
