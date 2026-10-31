import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, Landmark, 
  Coins, FileText, CheckCircle2, ChevronRight, DollarSign,
  Receipt, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';

export default function BendaharaDashboard() {
  const [daftarSPP, setDaftarSPP] = useState([
    {
      id: 'SPP-01',
      kegiatan: 'Pembangunan Rabat Beton Jalan Usaha Tani Dusun III',
      anggaran: 45000000,
      pelaksana: 'Kaur Perencanaan / TPK',
      status: 'VERIFIKASI NOTA & KWITANSI',
      sumber: 'Dana Desa 2026'
    },
    {
      id: 'SPP-02',
      kegiatan: 'Honorarium Kader Posyandu & PMT Balita (Bulan Oktober)',
      anggaran: 12500000,
      pelaksana: 'Kader PKK / Posyandu',
      status: 'SIAP PENCAIRAN',
      sumber: 'Alokasi Dana Desa (ADD)'
    }
  ]);

  const handleDisburse = (id) => {
    setDaftarSPP(prev => prev.filter(s => s.id !== id));
    alert('SPP berhasil diverifikasi dan dana telah dicairkan ke rekening TPK melalui CMS Perbankan Desa!');
  };

  return (
    <div className="min-h-screen bg-[#f1faf4] text-slate-800 pb-16">
      <div className="max-w-md mx-auto px-4 pt-4 sm:pt-6 space-y-4">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between py-1">
          <Link
            to="/dashboard"
            className="w-10 h-10 rounded-full bg-white/90 shadow-sm border border-slate-200/60 flex items-center justify-center text-slate-700 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="text-center">
            <h1 className="text-base font-extrabold text-slate-900 leading-tight">
              Penatausahaan Kas Desa
            </h1>
            <p className="text-[11px] font-medium text-slate-500">
              Pemerintah Desa Kedung Jaya
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-sm">
            <User className="w-5 h-5" />
          </div>
        </div>

        {/* STATUS SUB-HEADER PILLS */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900">
            <Shield className="w-3.5 h-3.5 text-amber-800" />
            <span>Otoritas Kas & Bendahara APBDes</span>
          </span>

          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Siskeudes Terhubung</span>
          </span>
        </div>

        {/* PROFILE CARD BENDAHARA */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
              alt="Siti Rahmawati, S.E"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-700 text-white flex items-center justify-center text-[10px]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase block">
              Kaur Keuangan (Bendahara Desa)
            </span>
            <h2 className="text-sm font-extrabold text-slate-900 truncate">
              Siti Rahmawati, S.E
            </h2>
            <p className="text-[11px] text-slate-400 truncate">
              Pengelola Rekening Kas Desa (RKD)
            </p>
          </div>
        </div>

        {/* 2x2 STATS METRIC GRID */}
        <div className="grid grid-cols-2 gap-3">
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Saldo Kas (RKD)</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <Coins className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-lg font-black text-[#0b5e42] leading-none">Rp 342,5 Jt</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              Rekening Giro Bank Jabar
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">SPP Menunggu</span>
              <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">{daftarSPP.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">berkas</span>
            </div>
            <p className="text-[11px] font-bold text-rose-600 mt-1">
              Perlu verifikasi nota
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Serapan Anggaran</span>
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Landmark className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">98.4%</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1">
              Sesuai Target RKPDes
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Kepatuhan Pajak</span>
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Receipt className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">100%</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              PPh/PPN Terbayar
            </p>
          </div>

        </div>

        {/* NOTICE CARD BENDAHARA */}
        <div className="bg-amber-800 text-white rounded-2xl p-4 shadow-sm space-y-2">
          <div className="flex items-start justify-between">
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
              <Shield className="w-4 h-4 text-amber-200" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-900 text-white font-extrabold text-[10px]">
              AKUNTABILITAS APBDES
            </span>
          </div>

          <h3 className="text-xs font-extrabold text-white pt-1">
            Prinsip Verifikasi Pengeluaran Kas
          </h3>
          <p className="text-[11px] text-amber-100/90 leading-relaxed font-light">
            Setiap pencairan anggaran kegiatan wajib disertai Surat Permintaan Pembayaran (SPP), bukti nota/kwitansi sah bertanda tangan TPK, dan persetujuan Kepala Desa.
          </p>
        </div>

        {/* SECTION: PENGAJUAN PENCAIRAN SPP */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-amber-700"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Pengajuan Pencairan SPP
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
              {daftarSPP.length} Antrean
            </span>
          </div>

          {daftarSPP.map((spp) => (
            <div key={spp.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400">{spp.id}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  {spp.status}
                </span>
              </div>

              <h4 className="text-xs font-extrabold text-slate-900">
                {spp.kegiatan}
              </h4>

              <div className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Nominal Pencairan:</span>
                  <span className="font-bold text-slate-900">Rp {spp.anggaran.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Pelaksana:</span>
                  <span>{spp.pelaksana}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Sumber Dana:</span>
                  <span className="text-[#0b5e42] font-semibold">{spp.sumber}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleDisburse(spp.id)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verifikasi & Cairkan Dana</span>
                </button>

                <button
                  onClick={() => alert(`Klarifikasi kelengkapan nota belanja untuk ${spp.id}.`)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Klarifikasi
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

