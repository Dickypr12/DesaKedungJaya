import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  ArrowLeft, Lock, Eye, EyeOff, RotateCcw, 
  CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Check
} from 'lucide-react';
import { validatePassword, resetPasswordWithToken } from '../../services/authService';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStats = validatePassword(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!token) {
      setErrorMessage('Token pemulihan kata sandi tidak ditemukan.');
      return;
    }

    if (!passwordStats.isValid) {
      setErrorMessage('Kata sandi baru belum memenuhi standar keamanan minimal.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await resetPasswordWithToken(token, password);
      setSuccessMessage(res.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal mengatur ulang kata sandi.');
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
              Atur Ulang Kata Sandi
            </h1>
          </div>

          <div className="w-10"></div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/70 space-y-5">
          
          <div className="space-y-1 text-center">
            <h2 className="text-xl font-black text-slate-900">
              Buat Kata Sandi Baru
            </h2>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Pastikan kata sandi baru Anda kuat dan belum pernah dipakai sebelumnya.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage} Mengalihkan ke halaman masuk...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* KATA SANDI BARU */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Kata Sandi Baru
              </label>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kombinasi huruf & angka"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b5e42] text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Box */}
              <div className="p-3 rounded-xl bg-[#f2faf5] space-y-1 border border-emerald-100 text-[11px]">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                  Kekuatan Sandi:
                </span>
                <ul className="space-y-1">
                  <li className={`flex items-center gap-1.5 ${passwordStats.minLength ? 'text-[#0b5e42] font-semibold' : 'text-slate-500'}`}>
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                      passwordStats.minLength ? 'bg-[#0b5e42] text-white' : 'border border-slate-400'
                    }`}>
                      {passwordStats.minLength && <Check className="w-2.5 h-2.5" />}
                    </span>
                    <span>Minimal 8 karakter</span>
                  </li>
                  <li className={`flex items-center gap-1.5 ${passwordStats.hasNumber ? 'text-[#0b5e42] font-semibold' : 'text-slate-500'}`}>
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                      passwordStats.hasNumber ? 'bg-[#0b5e42] text-white' : 'border border-slate-400'
                    }`}>
                      {passwordStats.hasNumber && <Check className="w-2.5 h-2.5" />}
                    </span>
                    <span>Mengandung angka (0–9)</span>
                  </li>
                  <li className={`flex items-center gap-1.5 ${passwordStats.hasCapital ? 'text-[#0b5e42] font-semibold' : 'text-slate-500'}`}>
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                      passwordStats.hasCapital ? 'bg-[#0b5e42] text-white' : 'border border-slate-400'
                    }`}>
                      {passwordStats.hasCapital && <Check className="w-2.5 h-2.5" />}
                    </span>
                    <span>Mengandung minimal 1 huruf kapital</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ULANGI KATA SANDI */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Ulangi Kata Sandi Baru
              </label>

              <div className="relative">
                <RotateCcw className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ketik ulang kata sandi baru"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b5e42] text-xs"
                />
              </div>

              {confirmPassword && (
                <p className={`text-[11px] pt-0.5 ${passwordsMatch ? 'text-[#0b5e42] font-semibold' : 'text-rose-600'}`}>
                  {passwordsMatch ? '✓ Kata sandi cocok' : '✕ Kata sandi belum cocok'}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Menyimpan Sandi Baru...</span>
              ) : (
                <>
                  <span>Perbarui Kata Sandi</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

