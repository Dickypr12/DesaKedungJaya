import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Landmark, User, Lock, Eye, EyeOff, ArrowRight, 
  AlertCircle, ShieldCheck, CheckCircle2, KeyRound, Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cek apakah ada redirect param
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim() || !password) {
      setErrorMessage('Nomor NIK/WhatsApp dan kata sandi wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    try {
      const loggedUser = await login(identifier, password);
      
      // Arahkan ke dashboard sesuai role pengguna
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate(`/dashboard/${loggedUser.role}`);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Gagal masuk. Periksa kembali NIK dan kata sandi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper autofill untuk akun demo 6 role
  const fillDemoAccount = (nikVal, passVal = 'KedungJaya2026!') => {
    setIdentifier(nikVal);
    setPassword(passVal);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#f1faf4] text-slate-800 pb-16">
      <div className="max-w-md mx-auto px-4 pt-6 sm:pt-10 space-y-4">
        
        {/* LOGO & DESA HEADER */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0b5e42] p-2.5 mx-auto shadow-md shadow-emerald-900/20 flex items-center justify-center">
            <img src="/logo.svg" alt="Logo Desa Kedung Jaya" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">
              PORTAL DESA KEDUNG JAYA
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Sistem Informasi & Pelayanan Administrasi Warga Terpadu
            </p>
          </div>
        </div>

        {/* MAIN LOGIN CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/70 space-y-5">
          
          <div>
            <span className="text-[10px] font-bold text-[#0b5e42] uppercase tracking-wider block">
              Autentikasi Pengguna
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-0.5">
              Masuk ke Akun Anda
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-light">
              Gunakan NIK 16 digit atau nomor WhatsApp yang telah terdaftar.
            </p>
          </div>

          {/* ALERT PESAN ERROR */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* FIELD NIK / NO WHATSAPP */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                NIK atau Nomor WhatsApp
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Contoh: 3216012804920003 atau 081234567890"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b5e42] text-xs font-medium"
                />
              </div>
            </div>

            {/* FIELD KATA SANDI */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  Kata Sandi
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] text-[#0b5e42] font-bold hover:underline"
                >
                  Lupa kata sandi?
                </Link>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b5e42] text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* TOMBOL LOGIN */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70 mt-2"
            >
              {isSubmitting ? (
                <span>Memverifikasi Akun...</span>
              ) : (
                <>
                  <span>Masuk ke Portal Desa</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* LINK DAFTAR AKUN BARU */}
            <p className="text-center text-xs text-slate-500 pt-2">
              Belum memiliki akun warga?{' '}
              <Link to="/register" className="text-[#0b5e42] font-black hover:underline">
                Daftar Akun Baru
              </Link>
            </p>

          </form>

        </div>

        {/* DEMO ACCOUNTS HELPER BOX (6 ROLE) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-800">
              Uji Coba Cepat 6 Role Sistem Desa (Klik untuk Mengisi):
            </h3>
          </div>

          <p className="text-[11px] text-slate-500 font-light">
            Kata sandi default semua akun demo: <strong className="font-mono text-slate-700">KedungJaya2026!</strong>
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <button
              type="button"
              onClick={() => fillDemoAccount('3216012804920003')}
              className="p-2 rounded-xl bg-[#f2faf5] hover:bg-[#e4f6ec] text-left border border-emerald-100 transition-colors"
            >
              <strong className="text-[#0b5e42] block">👤 Warga</strong>
              <span className="text-slate-500 text-[10px]">Hendra Kusuma</span>
            </button>

            <button
              type="button"
              onClick={() => fillDemoAccount('197508122010011001')}
              className="p-2 rounded-xl bg-[#f2faf5] hover:bg-[#e4f6ec] text-left border border-emerald-100 transition-colors"
            >
              <strong className="text-[#0b5e42] block">👑 Kepala Desa</strong>
              <span className="text-slate-500 text-[10px]">Bpk. H. Suryono</span>
            </button>

            <button
              type="button"
              onClick={() => fillDemoAccount('3216011503820002')}
              className="p-2 rounded-xl bg-[#f2faf5] hover:bg-[#e4f6ec] text-left border border-emerald-100 transition-colors"
            >
              <strong className="text-blue-700 block">🏡 Ketua RT/RW</strong>
              <span className="text-slate-500 text-[10px]">Bpk. Mulyono (RT 03)</span>
            </button>

            <button
              type="button"
              onClick={() => fillDemoAccount('199104052017012005')}
              className="p-2 rounded-xl bg-[#f2faf5] hover:bg-[#e4f6ec] text-left border border-emerald-100 transition-colors"
            >
              <strong className="text-cyan-700 block">🖥️ Operator Pelayanan</strong>
              <span className="text-slate-500 text-[10px]">Dewi Lestari, S.Pd</span>
            </button>

            <button
              type="button"
              onClick={() => fillDemoAccount('3216019901010001')}
              className="p-2 rounded-xl bg-[#f2faf5] hover:bg-[#e4f6ec] text-left border border-emerald-100 transition-colors"
            >
              <strong className="text-slate-800 block">🛡️ Admin Desa</strong>
              <span className="text-slate-500 text-[10px]">Tim IT Desa</span>
            </button>

            <button
              type="button"
              onClick={() => fillDemoAccount('198906202015022003')}
              className="p-2 rounded-xl bg-[#f2faf5] hover:bg-[#e4f6ec] text-left border border-emerald-100 transition-colors"
            >
              <strong className="text-amber-800 block">💰 Bendahara</strong>
              <span className="text-slate-500 text-[10px]">Siti Rahmawati, S.E</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

