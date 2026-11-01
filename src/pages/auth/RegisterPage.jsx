import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, HelpCircle, Landmark, CreditCard, User, 
  Lock, Eye, EyeOff, RotateCcw, ShieldCheck, ArrowRight,
  MessageCircle, Info, Check, AlertCircle, Headphones
} from 'lucide-react';
import { validateNIK, validatePassword, registerWarga } from '../../services/authService';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    telepon: '',
    email: '',
    role: 'warga', // 'warga' atau 'rtrw'
    dusun: 'Kp. Wates (Dusun I)',
    rt: '01',
    rw: '01',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status validasi realtime
  const passwordStats = validatePassword(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const nikStats = validateNIK(formData.nik);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!nikStats.valid) {
      setErrorMsg(nikStats.message);
      return;
    }

    if (!formData.nama.trim()) {
      setErrorMsg('Nama lengkap pemohon wajib diisi sesuai e-KTP/KK.');
      return;
    }

    if (!formData.telepon.trim()) {
      setErrorMsg('Nomor WhatsApp aktif wajib diisi untuk verifikasi OTP.');
      return;
    }

    if (!passwordStats.isValid) {
      setErrorMsg('Kata sandi belum memenuhi standar kekuatan minimal.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok. Mohon ketik ulang.');
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMsg('Anda wajib menyetujui Ketentuan Layanan & Kebijakan Privasi.');
      return;
    }

    setIsSubmitting(true);
    try {
      await registerWarga({
        nik: formData.nik,
        nama: formData.nama,
        telepon: formData.telepon,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        rt: formData.rt,
        rw: formData.rw,
        dusun: formData.dusun
      });

      // Lanjut ke langkah 2: Verifikasi OTP
      navigate('/verify-otp');
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat pendaftaran.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1faf4] text-slate-800 pb-16">
      
      {/* Centered Mobile/Desktop Container matching Stitch UI */}
      <div className="max-w-md mx-auto px-4 pt-4 sm:pt-6 space-y-4">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between py-1">
          <Link
            to="/login"
            className="w-10 h-10 rounded-full bg-white/90 shadow-sm border border-slate-200/60 flex items-center justify-center text-slate-700 hover:bg-white transition-colors"
            aria-label="Kembali ke Login"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="text-center">
            <h1 className="text-sm font-extrabold text-slate-900 leading-tight">
              Pendaftaran Akun Warga Baru
            </h1>
          </div>

          <button
            type="button"
            onClick={() => alert('Bantuan Pendaftaran: Siapkan e-KTP Desa Kedung Jaya dan nomor WhatsApp yang aktif untuk menerima OTP.')}
            className="w-10 h-10 rounded-full bg-white/90 shadow-sm border border-slate-200/60 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Bantuan"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-slate-800">
              <span className="w-5 h-5 rounded-full bg-[#0b5e42] text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <span>Langkah 1 dari 2: Data Pemohon</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#d7f5e5] text-[#0b5e42]">
              50% Selesai
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#d7f5e5] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#0b5e42] h-full rounded-full transition-all duration-300" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* BANNER HEADER CARD */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eefaf2] text-[#0b5e42] flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                Pemerintah Desa • Kedung Jaya
              </span>
              <h2 className="text-base font-black text-slate-900 leading-tight">
                Daftar Akun Warga
              </h2>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed font-light pt-1">
            Nikmati kemudahan permohonan surat pengantar, pemantauan status kependudukan, pengaduan lingkungan, dan informasi bansos resmi langsung dari gawai Anda.
          </p>
        </div>

        {/* ERROR ALERT NOTIFICATION */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* MAIN REGISTRATION FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* FIELD 1: NIK */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800">
                Nomor Induk Kependudukan (NIK) <span className="text-rose-500">*</span>
              </label>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                formData.nik.length === 16 ? 'bg-emerald-100 text-emerald-800' : 'bg-[#eefaf2] text-slate-600'
              }`}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${formData.nik.length === 16 ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                {formData.nik.length}/16 Digit
              </span>
            </div>

            <div className="relative">
              <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="nik"
                required
                maxLength="16"
                value={formData.nik}
                onChange={handleChange}
                placeholder="3201xxxxxxxxxxxx"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b5e42] text-xs font-mono font-semibold"
              />
            </div>

            <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-0.5">
              <Info className="w-3 h-3 text-[#0b5e42]" />
              <span>Wajib 16 digit sesuai e-KTP Desa Kedung Jaya</span>
            </p>
          </div>

          {/* FIELD 2: NAMA LENGKAP */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Nama Lengkap Pemohon <span className="text-rose-500">*</span>
            </label>

            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="nama"
                required
                value={formData.nama}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b5e42] text-xs font-medium"
              />
            </div>

            <p className="text-[11px] text-slate-400 pt-0.5">
              Pastikan nama sesuai e-KTP atau Kartu Keluarga (KK).
            </p>
          </div>

          {/* FIELD 3: NOMOR WHATSAPP */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
            </label>

            <div className="flex items-center gap-2">
              <div className="px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
                <span>🇮🇩</span>
                <span>+62</span>
              </div>
              <input
                type="tel"
                name="telepon"
                required
                value={formData.telepon}
                onChange={handleChange}
                placeholder="812-3456-7890"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b5e42] text-xs font-mono font-medium"
              />
            </div>

            <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-0.5">
              <MessageCircle className="w-3 h-3 text-[#0b5e42]" />
              <span>Kode verifikasi OTP 6 digit akan dikirimkan ke nomor ini.</span>
            </p>
          </div>

          {/* FIELD 4: EMAIL AKTIF (OPSIONAL) */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800">
                Email Aktif
              </label>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                Opsional
              </span>
            </div>

            <div className="relative">
              <span className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-xs flex items-center justify-center">@</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama.warga@kedungjaya.id"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b5e42] text-xs"
              />
            </div>

            <p className="text-[11px] text-slate-400 pt-0.5">
              Untuk penerimaan tembusan surat ber-barcode dan arsip digital.
            </p>
          </div>

          {/* FIELD PILIHAN TIPE AKUN: WARGA ATAU KETUA RT/RW */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-800">
                Tipe Akun Pendaftaran <span className="text-rose-500">*</span>
              </label>
              <p className="text-[11px] text-slate-400">
                Pilih apakah Anda mendaftar sebagai warga pemohon atau pengurus RT/RW pengesah surat.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'warga' }))}
                className={`p-3 rounded-xl border text-left transition-all ${
                  formData.role === 'warga'
                    ? 'border-[#0b5e42] bg-[#f1faf4] text-[#0b5e42] font-bold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>Warga Masyarakat</span>
                  {formData.role === 'warga' && <Check className="w-3.5 h-3.5 text-[#0b5e42]" />}
                </div>
                <p className="text-[10px] text-slate-400 font-normal mt-0.5">Pemohon surat mandiri</p>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'rtrw' }))}
                className={`p-3 rounded-xl border text-left transition-all ${
                  formData.role === 'rtrw'
                    ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>Ketua RT / RW</span>
                  {formData.role === 'rtrw' && <Check className="w-3.5 h-3.5 text-blue-700" />}
                </div>
                <p className="text-[10px] text-slate-400 font-normal mt-0.5">Verifikator pengantar</p>
              </button>
            </div>

            {/* FIELD WILAYAH RT DAN RW */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <label className="block text-xs font-bold text-slate-800">
                {formData.role === 'rtrw' ? 'Wilayah Tugas RT / RW Anda' : 'Domisili Tempat Tinggal (RT / RW)'}
              </label>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-slate-600 block mb-1">Rukun Tetangga (RT)</span>
                  <select
                    name="rt"
                    value={formData.rt}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b5e42]"
                  >
                    {Array.from({ length: 22 }, (_, i) => String(i + 1).padStart(2, '0')).map(num => (
                      <option key={num} value={num}>RT {num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-600 block mb-1">Rukun Warga (RW)</span>
                  <select
                    name="rw"
                    value={formData.rw}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b5e42]"
                  >
                    {Array.from({ length: 6 }, (_, i) => String(i + 1).padStart(2, '0')).map(num => (
                      <option key={num} value={num}>RW {num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">Dusun / Lingkungan</span>
                <select
                  name="dusun"
                  value={formData.dusun}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b5e42]"
                >
                  <option value="Kp. Wates (Dusun I)">Dusun I (Kp. Wates)</option>
                  <option value="Dusun II (Kedung Barat)">Dusun II (Kedung Barat)</option>
                  <option value="Dusun III (Kp. Pengawas)">Dusun III (Kp. Pengawas)</option>
                  <option value="Dusun IV (Lingkungan IV)">Dusun IV (Lingkungan IV)</option>
                </select>
              </div>

              {formData.role === 'rtrw' && (
                <div className="p-3 rounded-xl bg-amber-50 text-[11px] text-amber-950 border border-amber-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>Wajib Verifikasi Kantor Desa:</span>
                  </div>
                  <p className="leading-relaxed text-amber-800">
                    Akun ini akan bertugas memverifikasi surat pengantar warga di <strong>RT {formData.rt} / RW {formData.rw}</strong>. Sesuai aturan desa, akun Ketua RT/RW <strong>wajib disahkan oleh Petugas Kantor Desa</strong> sebelum dapat digunakan untuk login.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FIELD 5: KATA SANDI BARU & STRENGTH CHECKER */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-2.5">
            <label className="block text-xs font-bold text-slate-800">
              Kata Sandi Baru <span className="text-rose-500">*</span>
            </label>

            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Kombinasi huruf & angka"
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

            {/* Password Strength Box */}
            <div className="p-3 rounded-xl bg-[#f2faf5] space-y-1.5 border border-emerald-100">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Kekuatan Sandi:
              </span>
              <ul className="space-y-1 text-[11px]">
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

          {/* FIELD 6: ULANGI KATA SANDI */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Ulangi Kata Sandi <span className="text-rose-500">*</span>
            </label>

            <div className="relative">
              <RotateCcw className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ketik ulang kata sandi Anda"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0b5e42] text-xs"
              />
            </div>

            {formData.confirmPassword && (
              <p className={`text-[11px] pt-0.5 ${passwordsMatch ? 'text-[#0b5e42] font-semibold' : 'text-rose-600'}`}>
                {passwordsMatch ? '✓ Kata sandi cocok' : '✕ Kata sandi belum cocok'}
              </p>
            )}
          </div>

          {/* CHECKBOX PERSETUJUAN */}
          <div className="flex items-start gap-2.5 px-1">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-0.5 w-4 h-4 rounded text-[#0b5e42] focus:ring-[#0b5e42] cursor-pointer"
            />
            <label htmlFor="agreeTerms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
              Saya menyetujui <span className="text-[#0b5e42] font-bold">Ketentuan Penggunaan Layanan</span> dan <span className="text-[#0b5e42] font-bold">Kebijakan Privasi Perlindungan Data</span> Kependudukan Desa Kedung Jaya.
            </label>
          </div>

          {/* SECURITY ASSURANCE BOX */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0b5e42] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-[11px] leading-relaxed">
              <strong className="text-slate-900 block font-bold">Data NIK Dijamin Aman:</strong>
              <span className="text-slate-500">
                Informasi kependudukan Anda dienkripsi secara aman dan hanya dipakai untuk verifikasi administrasi di pangkalan data kelurahan.
              </span>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span>Memproses Data...</span>
            ) : (
              <>
                <span>Lanjut ke Verifikasi OTP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* LINK SUDAH PUNYA AKUN */}
          <p className="text-center text-xs text-slate-500 pt-1">
            Sudah punya akun warga?{' '}
            <Link to="/login" className="text-[#0b5e42] font-extrabold hover:underline">
              Masuk di sini
            </Link>
          </p>

        </form>

        {/* BOTTOM ASSISTANCE CARD: NIK BELUM TERDAFTAR */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#0b5e42] flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold text-slate-900">
                NIK Belum Terdaftar di Desa?
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                Bagi warga pindahan baru atau pemilik KTP belum tercatat dalam sensus digital Kedung Jaya, hubungi Sekretariat Desa atau WhatsApp Pelayanan Mandiri RT/RW.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/6281234567890?text=Halo%20Posko%20RT/RW%20Desa%20Kedung%20Jaya,%20NIK%20saya%20belum%20tercatat%20di%20sistem"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#eefaf2] hover:bg-[#d8ece1] text-[#0b5e42] font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-200/60"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Hubungi Posko RT/RW</span>
          </a>
        </div>

      </div>
    </div>
  );
}

