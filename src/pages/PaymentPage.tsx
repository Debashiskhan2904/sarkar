import React, { useEffect } from 'react';
import { OfficialQRPayment } from '../components/OfficialQRPayment';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PaymentPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "The Sarkar Enterprise QR Payment | Official Verification & Bank Details";
  }, []);

  return (
    <div className="min-h-screen bg-[#050608] text-white pt-28 pb-20 selection:bg-yellow-500 selection:text-black">
      {/* Subtle back navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-400 hover:text-[#facc15] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Payment Section matching reference image */}
      <OfficialQRPayment />

      {/* Security & Verification trust footer note */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 text-center">
        <div className="inline-flex items-center gap-2 text-neutral-500 text-xs sm:text-sm">
          <Shield size={16} className="text-[#facc15]" />
          <span>Official Corporate Account of The Sarkar Enterprise • HDFC Bank RTGS / NEFT & UPI Validated</span>
        </div>
      </div>
    </div>
  );
};
