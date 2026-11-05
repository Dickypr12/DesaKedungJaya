import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Landmark, User, Lock, Eye, EyeOff, ArrowRight, 
  AlertCircle, ShieldCheck, CheckCircle2
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

  return (
    <div className="min-h-screen bg-[#f1faf4] text-slate-800 pb-16">
      <div className="max-w-md mx-auto px-4 pt-6 sm:pt-10 space-y-4">
        
        {/* LOGO & DESA HEADER */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0b5e42] p-2.5 mx-auto shadow-md shadow-emerald-900/20 flex items-center justify-center">
            <img src="./public/images/logo.jpg" alt="Logo Desa Kedung Jaya" className="w-full h-full object-contain" />
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

        {/* SECURITY NOTICE FOOTER */}
        <div className="text-center text-[11px] text-slate-400 max-w-xs mx-auto pt-2 space-y-1">
          <p>🔒 Sistem Informasi Terenkripsi Desa Kedung Jaya</p>
          <p>Akses akun dibatasi sesuai wewenang dan jabatan masing-masing.</p>
        </div>

      </div>
    </div>
  );
}

