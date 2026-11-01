import React, { useState, useEffect } from 'react';
import { MessageSquare, X, CheckCheck, Bell } from 'lucide-react';

export default function WhatsAppToast() {
  const [activeToast, setActiveToast] = useState(null);

  useEffect(() => {
    const handleNotification = (e) => {
      setActiveToast(e.detail);
      // Hilang otomatis setelah 6 detik
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('kedungjaya_wa_notif', handleNotification);
    return () => {
      window.removeEventListener('kedungjaya_wa_notif', handleNotification);
    };
  }, []);

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-5 sm:bottom-5 z-[9999] max-w-sm mx-auto sm:mx-0 animate-slideUp">
      <div className="bg-[#128C7E] text-white rounded-2xl p-4 shadow-2xl border border-emerald-400/30 flex items-start gap-3 backdrop-blur-md">
        
        {/* WhatsApp Icon Circle */}
        <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
          <MessageSquare className="w-5 h-5 fill-white stroke-none" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wide uppercase text-emerald-100 flex items-center gap-1">
              <span>WhatsApp Desa Kedung Jaya</span>
              <CheckCheck className="w-3.5 h-3.5 text-emerald-200" />
            </span>
            <span className="text-[10px] text-emerald-200">{activeToast.waktu}</span>
          </div>

          <h4 className="text-xs font-black text-white truncate">
            Kepada: {activeToast.penerimaNama} ({activeToast.penerimaTelepon})
          </h4>

          <p className="text-xs text-emerald-50 leading-relaxed bg-[#0b665b]/60 p-2 rounded-xl border border-emerald-500/30">
            {activeToast.pesan}
          </p>

          <p className="text-[9px] text-emerald-200/80 italic pt-0.5">
            🔔 Simulasi pengiriman notifikasi otomatis WhatsApp Gateway Desa
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setActiveToast(null)}
          className="text-emerald-200 hover:text-white p-1 rounded-lg transition-colors shrink-0"
          title="Tutup Notifikasi"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}

