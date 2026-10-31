import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, KeyRound, User, ArrowRight, AlertCircle, 
  CheckCircle2, Clock, ShieldCheck
} from 'lucide-react';
import { requestPasswordReset } from '../../services/authService';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);
  const [resetToken, setResetToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setIsSubmitting(true);
    try {
      const res = requestPasswordReset(identifier);
      setResultMessage(res.message);
      if (res.token) {
        setResetToken(res.token);
      }
    } catch {
      setResultMessage('Permintaan diproses. Periksa pesan WhatsApp Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1faf4] text-slate-800 pb-16">
      <div className="max-w-md mx-auto px-4 pt-6 sm:pt-10 space-y-4">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between py-1">
          <Link
            to="/login"
            className="w-10 h-10 rounded-full bg-white/90 shadow-sm border border-slate-200/60 flex items-center justify-center text-slate-700 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="text-center">
            <h1 className="text-sm font-extrabold text-slate-900 leading-tight">
              Pemulihan Kata Sandi
            </h1>
          </div>

          <div className="w-10"></div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/70 space-y-5">
          
          <div className="w-14 h-14 rounded-2xl bg-[#eefaf2] text-[#0b5e42] flex items-center justify-center mx-auto">
            <KeyRound className="w-7 h-7" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-black text-slate-900">
              Lupa Kata Sandi Akun?
            </h2>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Masukkan NIK 16 digit atau nomor WhatsApp aktif Anda untuk mendapatkan instruksi pemulihan kata sandi.
            </p>
          </div>

          {resultMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2 animate-fadeIn">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Permintaan Diterima:</span>
              </p>
              <p className="leading-relaxed text-emerald-700">
                {resultMessage}
              </p>

              {resetToken && (
                <div className="pt-2">
                  <Link
                    to={`/reset-password?token=${resetToken}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0b5e42] text-white font-bold text-xs"
                  >
                    <span>Lanjut Atur Ulang Sandi Baru →</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {!resultMessage && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  NIK atau Nomor WhatsApp Terdaftar
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Contoh: 3216012804920003"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b5e42] text-xs font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Mengirim Permintaan...</span>
                ) : (
                  <>
                    <span>Kirim Tautan Pemulihan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-slate-100 text-center">
            <Link to="/login" className="text-xs text-slate-500 hover:text-[#0b5e42] font-semibold">
              ← Kembali ke Halaman Masuk
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

