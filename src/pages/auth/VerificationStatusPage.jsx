import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Clock, ShieldCheck, ArrowRight, 
  Home, Phone, FileText, Landmark
} from 'lucide-react';

export default function VerificationStatusPage() {
  return (
    <div className="min-h-screen bg-[#f1faf4] text-slate-800 pb-16">
      <div className="max-w-md mx-auto px-4 pt-8 sm:pt-12 space-y-4">
        
        {/* LOGO */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-[#0b5e42] p-2 mx-auto flex items-center justify-center shadow-md">
            <img src="/logo.svg" alt="Logo Desa" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xs font-black text-slate-900 uppercase tracking-widest">
            Pemerintah Desa Kedung Jaya
          </h1>
        </div>

        {/* MAIN STATUS CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/70 space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0b5e42] flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 inline-block uppercase">
              Status: Menunggu Pemeriksaan Petugas
            </span>
            <h2 className="text-xl font-black text-slate-900">
              Pendaftaran Akun Berhasil Dikirim
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Terima kasih telah mendaftar di Portal Digital Desa Kedung Jaya. Kontak WhatsApp Anda telah berhasil terverifikasi.
            </p>
          </div>

          {/* STEPPER STATUS PROSES */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-3">
            <span className="text-[11px] font-bold text-slate-700 block">
              Tahapan Pemeriksaan Identitas Kependudukan:
            </span>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5 text-[#0b5e42] font-semibold">
                <span className="w-5 h-5 rounded-full bg-[#0b5e42] text-white text-[10px] flex items-center justify-center font-bold">✓</span>
                <span>Data Pemohon & NIK Masuk Sistem</span>
              </div>

              <div className="flex items-center gap-2.5 text-[#0b5e42] font-semibold">
                <span className="w-5 h-5 rounded-full bg-[#0b5e42] text-white text-[10px] flex items-center justify-center font-bold">✓</span>
                <span>Verifikasi Kontak WhatsApp Berhasil</span>
              </div>

              <div className="flex items-center gap-2.5 text-amber-800 font-bold bg-amber-50 p-2 rounded-xl border border-amber-200">
                <Clock className="w-4 h-4 text-amber-600 animate-pulse shrink-0" />
                <span>Pencocokan NIK dengan Buku Induk Desa (Maks. 24 Jam Kerja)</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-400">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 text-[10px] flex items-center justify-center font-bold">4</span>
                <span>Aktivasi Penuh Permohonan Surat Online</span>
              </div>
            </div>
          </div>

          {/* NOTICE BOX */}
          <div className="p-3.5 rounded-2xl bg-[#f2faf5] border border-emerald-100 text-left text-[11px] text-slate-600 space-y-1">
            <p className="font-bold text-[#0b5e42] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pemberitahuan Otomatis:</span>
            </p>
            <p className="text-slate-500 leading-relaxed font-light">
              Setelah petugas operator desa memvalidasi domisili Anda, Anda akan menerima pesan konfirmasi WhatsApp dan dapat langsung mengajukan seluruh jenis surat.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-2 pt-1">
            <Link
              to="/login"
              className="w-full py-3.5 px-4 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <span>Masuk ke Akun Warga</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Beranda</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

