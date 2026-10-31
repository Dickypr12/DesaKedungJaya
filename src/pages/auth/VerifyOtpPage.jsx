import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, MessageSquare, ShieldCheck, Clock, ArrowRight,
  AlertCircle, CheckCircle2, RotateCcw, Info
} from 'lucide-react';
import { verifyOTP } from '../../services/authService';

export default function VerifyOtpPage() {
  const navigate = useNavigate();

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempReg, setTempReg] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('kedungjaya_temp_reg');
      if (raw) {
        setTempReg(JSON.parse(raw));
      } else {
        // Jika tidak ada data pendaftaran pending, redirect ke register
        navigate('/register');
      }
    } catch {
      navigate('/register');
    }
  }, [navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    setErrorMessage('');

    // Auto-focus ke input berikutnya jika diisi
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setCountdown(60);
    setCanResend(false);
    setOtpDigits(['', '', '', '', '', '']);
    setErrorMessage('');
    alert('Kode verifikasi OTP baru telah disimulasikan terkirim ke WhatsApp Anda.');
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setErrorMessage('Harap masukkan 6 digit kode OTP secara lengkap.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (!tempReg || !tempReg.userId) {
        throw new Error('Sesi pendaftaran tidak ditemukan.');
      }
      
      verifyOTP(tempReg.userId, fullOtp);
      navigate('/verification-status');
    } catch (err) {
      setErrorMessage(err.message || 'Kode OTP tidak valid atau kadaluarsa.');
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
            to="/register"
            className="w-10 h-10 rounded-full bg-white/90 shadow-sm border border-slate-200/60 flex items-center justify-center text-slate-700 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="text-center">
            <h1 className="text-sm font-extrabold text-slate-900 leading-tight">
              Verifikasi Akses Kontak
            </h1>
          </div>

          <div className="w-10"></div>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-slate-800">
              <span className="w-5 h-5 rounded-full bg-[#0b5e42] text-white text-[11px] font-bold flex items-center justify-center">
                2
              </span>
              <span>Langkah 2 dari 2: Verifikasi OTP</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0b5e42]">
              100% Selesai
            </span>
          </div>

          <div className="w-full bg-[#d7f5e5] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#0b5e42] h-full rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* CARD UTAMA VERIFIKASI */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/70 space-y-5 text-center">
          
          <div className="w-14 h-14 rounded-2xl bg-[#eefaf2] text-[#0b5e42] flex items-center justify-center mx-auto">
            <MessageSquare className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900">
              Masukkan Kode OTP 6-Digit
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Kode verifikasi telah dikirimkan melalui pesan WhatsApp ke nomor: <br />
              <strong className="text-slate-800 font-mono font-bold">{tempReg?.telepon || '+62 812-xxxx-xxxx'}</strong>
            </p>
          </div>

          {/* ALERT ERROR */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-fadeIn text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 6 OTP INPUT BOXES */}
          <form onSubmit={handleVerify} className="space-y-5">
            <div className="flex justify-center gap-2 sm:gap-2.5">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-12 sm:w-12 sm:h-14 text-center font-mono font-black text-lg sm:text-xl rounded-2xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b5e42] focus:border-transparent transition-all"
                />
              ))}
            </div>

            {/* COUNTDOWN TIMER / RESEND */}
            <div className="text-xs text-slate-500 pt-1">
              {!canResend ? (
                <p className="flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Kirim ulang kode dalam <strong>{countdown} detik</strong></span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[#0b5e42] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Kirim Ulang Kode OTP</span>
                </button>
              )}
            </div>

            {/* BUTTON VERIFIKASI */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Memvalidasi Kode...</span>
              ) : (
                <>
                  <span>Verifikasi & Selesaikan Pendaftaran</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* SECURITY EXPLANATION CALLOUT */}
          <div className="p-3.5 rounded-2xl bg-[#f2faf5] border border-emerald-100 text-left text-[11px] text-slate-600 space-y-1">
            <p className="font-bold text-[#0b5e42] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pemisahan Verifikasi Kontak & Identitas:</span>
            </p>
            <p className="leading-relaxed text-slate-500 font-light">
              Verifikasi OTP membuktikan Anda memiliki akses aktif ke nomor WhatsApp tersebut. Sesuai regulasi kependudukan desa, berkas e-KTP dan NIK Anda akan diverifikasi secara teliti oleh operator desa sebelum layanan surat dapat diterbitkan.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

