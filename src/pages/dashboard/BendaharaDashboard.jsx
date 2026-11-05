import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, Coins, 
  Landmark, Receipt, CheckCircle2, ChevronRight, FileText
} from 'lucide-react';

export default function BendaharaDashboard() {
  const [daftarSPP, setDaftarSPP] = useState([
    {
      id: 'SPP-01',
      kegiatan: 'Pembangunan Saluran Drainase Dusun I (Tahap II)',
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
      
      {/* Container Responsive Laptop & Mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        
        {/* HEADER BAR RESPONSIVE */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shrink-0"
              title="Kembali"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                  Penatausahaan Keuangan & Kas Desa
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                  <Shield className="w-3 h-3 text-amber-800" />
                  <span>Siskeudes Terhubung</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Pemerintah Desa Kedung Jaya • Otoritas Kas & Bendahara Pengeluaran APBDes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-extrabold text-slate-900 block">Siti Rahmawati, S.E</span>
              <span className="text-[11px] text-amber-800 font-semibold">Kaur Keuangan / Bendahara Desa</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 4x1 STATS METRIC GRID RESPONSIVE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Saldo Kas (RKD)</span>
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <Coins className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-[#0b5e42] leading-none">Rp 342,5 Jt</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              Rekening Giro Kas Desa
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">SPP Menunggu</span>
              <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">{daftarSPP.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">berkas</span>
            </div>
            <p className="text-[11px] font-bold text-rose-600 mt-1">
              Perlu verifikasi nota & SPP
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Serapan Anggaran</span>
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Landmark className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">98.4%</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1">
              Sesuai Target RKPDes
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Kepatuhan Pajak</span>
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">100%</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              PPh/PPN Terbayar
            </p>
          </div>

        </div>

        {/* 2-COLUMN GRID ON LAPTOP / DESKTOP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: PENGAJUAN PENCAIRAN SPP */}
          <div className="lg:col-span-8 space-y-6">

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-amber-700"></span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Pengajuan Pencairan SPP Kegiatan
                  </h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                  {daftarSPP.length} Antrean Pencairan
                </span>
              </div>

              {daftarSPP.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  Semua SPP telah diverifikasi dan dicairkan. Kas desa tertib dan seimbang.
                </div>
              ) : (
                <div className="space-y-4">
                  {daftarSPP.map((spp) => (
                    <div key={spp.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-500">{spp.id}</span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                          {spp.status}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        {spp.kegiatan}
                      </h4>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Nominal Pencairan:</span>
                          <span className="font-extrabold text-base text-slate-900">Rp {spp.anggaran.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500">
                          <span>Pelaksana Lapangan:</span>
                          <span className="font-semibold text-slate-800">{spp.pelaksana}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500">
                          <span>Sumber Dana:</span>
                          <span className="text-[#0b5e42] font-bold">{spp.sumber}</span>
                        </div>
                      </div>

                      <div className="flex gap-2.5 pt-1">
                        <button
                          onClick={() => handleDisburse(spp.id)}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verifikasi & Cairkan Dana</span>
                        </button>

                        <button
                          onClick={() => alert(`Klarifikasi kelengkapan nota belanja untuk ${spp.id}.`)}
                          className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                        >
                          Klarifikasi
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: PROFIL BENDAHARA & SOP APBDES */}
          <div className="lg:col-span-4 space-y-6">

            {/* PROFILE CARD BENDAHARA */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-3">
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                    alt="Siti Rahmawati, S.E"
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-700 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase block">
                    Kaur Keuangan (Bendahara Desa)
                  </span>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                    Siti Rahmawati, S.E
                  </h2>
                  <p className="text-xs text-slate-400 truncate">
                    Pengelola Rekening Kas Desa (RKD)
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Status Siskeudes:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Terhubung Realtime
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">CMS Perbankan:</span>
                  <span className="font-bold text-slate-800">Bank Jabar Banten (BJB)</span>
                </div>
              </div>
            </div>

            {/* NOTICE CARD BENDAHARA */}
            <div className="bg-amber-800 text-white rounded-2xl p-5 shadow-sm space-y-2.5">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-amber-200" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-900 text-white font-extrabold text-[10px]">
                  AKUNTABILITAS APBDES
                </span>
              </div>

              <h3 className="text-xs font-extrabold text-white pt-1">
                Prinsip Verifikasi Pengeluaran Kas
              </h3>
              <p className="text-xs text-amber-100/90 leading-relaxed font-light">
                Setiap pencairan anggaran kegiatan wajib disertai Surat Permintaan Pembayaran (SPP), bukti nota/kwitansi sah bertanda tangan TPK, dan persetujuan Kepala Desa.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
