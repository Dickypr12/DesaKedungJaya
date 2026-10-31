import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, Bell, 
  FileCheck, Edit3, ChevronRight, Store, GraduationCap, 
  RotateCcw, Ban, Phone, Send, CheckCircle2, AlertTriangle,
  FileText, TrendingUp, ThumbsUp
} from 'lucide-react';
import { mockDrafSuratKades, mockAduanKritis } from '../../data/desaData';

export default function KadesDashboard() {
  const [antrean, setAntrean] = useState(mockDrafSuratKades);
  const [modalTTE, setModalTTE] = useState(null);
  const [tteSuccess, setTteSuccess] = useState(false);
  const [disposisiSent, setDisposisiSent] = useState(false);

  const handleSign = (item) => {
    setModalTTE(item);
  };

  const confirmSignTTE = () => {
    setTteSuccess(true);
    setTimeout(() => {
      setAntrean(prev => prev.filter(i => i.id !== modalTTE.id));
      setModalTTE(null);
      setTteSuccess(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f1faf4] text-slate-800 pb-16">
      
      {/* Container phone/mobile layout centered */}
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
              Persetujuan Kepala Desa
            </h1>
            <p className="text-[11px] font-medium text-slate-500">
              Pemerintah Desa Kedung Jaya
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#0b5e42] text-white flex items-center justify-center shadow-sm">
            <User className="w-5 h-5" />
          </div>
        </div>

        {/* STATUS SUB-HEADER PILLS */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d7f5e5] text-[#0b5e42]">
            <Shield className="w-3.5 h-3.5 text-[#0b5e42]" />
            <span>Hak Akses Pejabat Pengesah</span>
          </span>

          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sistem Terhubung BSrE</span>
          </span>
        </div>

        {/* PROFILE CARD KEPALA DESA */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
              alt="Bpk. H. Suryono, S.Sos."
              className="w-12 h-12 rounded-xl object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0b5e42] text-white flex items-center justify-center text-[10px]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-[#0b5e42] tracking-wider uppercase block">
              Kepala Desa Kedung Jaya
            </span>
            <h2 className="text-sm font-extrabold text-slate-900 truncate">
              Bpk. H. Suryono, S.Sos.
            </h2>
            <p className="text-[11px] text-slate-400 truncate">
              • Sesi Aktif Kades • Token TTE Siap
            </p>
          </div>
        </div>

        {/* 2x2 STATS METRIC GRID */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Card 1: Menunggu TTE */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Menunggu TTE</span>
              <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                <Edit3 className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">{antrean.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">berkas</span>
            </div>
            <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Perlu tindakan
            </p>
          </div>

          {/* Card 2: Surat Terbit */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Surat Terbit</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <FileCheck className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">28</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">minggu ini</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              ↗ 100% Sah BSrE
            </p>
          </div>

          {/* Card 3: Disposisi Aduan */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Disposisi Aduan</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <Bell className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">2</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">prioritas</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              Dusun II & Lingk. IV
            </p>
          </div>

          {/* Card 4: Kepuasan Warga */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Kepuasan Warga</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <Shield className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">96%</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">IKM</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              Sangat Memuaskan
            </p>
          </div>

        </div>

        {/* BSrE BSSN NOTICE CARD */}
        <div className="bg-[#0b5e42] text-white rounded-2xl p-4 shadow-sm space-y-2">
          <div className="flex items-start justify-between">
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-200" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1b7a5a] text-white font-extrabold text-[10px] tracking-wider">
              BSRE BSSN
            </span>
          </div>

          <h3 className="text-xs font-extrabold text-white pt-1">
            Kewenangan Penandatanganan Digital
          </h3>

          <p className="text-[11px] text-emerald-100/90 leading-relaxed font-light">
            Penandatanganan digital menggunakan sertifikat elektronik resmi tersertifikasi Balai Sertifikasi Elektronik (BSrE) BSSN. Dokumen memiliki kekuatan hukum sah.
          </p>
        </div>

        {/* SECTION: DRAF SURAT MENUNGGU PERSETUJUAN */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#0b5e42]"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Draf Surat Menunggu Persetujuan
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#d7f5e5] text-[#0b5e42]">
              {antrean.length} Antrean
            </span>
          </div>

          {antrean.length === 0 ? (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              Semua draf surat telah berhasil ditandatangani. Tidak ada antrean TTE saat ini.
            </div>
          ) : (
            antrean.map((surat) => (
              <div
                key={surat.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-3"
              >
                {/* Header No Reg */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#eefaf2] text-[#0b5e42] flex items-center justify-center">
                      {surat.iconType === 'store' ? <Store className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                    </span>
                    <span className="text-[10px] font-bold font-mono text-slate-500">
                      {surat.noReg}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${surat.statusBadgeColor}`}>
                    {surat.statusBadge}
                  </span>
                </div>

                {/* Judul Surat */}
                <h4 className="text-sm font-extrabold text-slate-900">
                  {surat.jenis}
                </h4>

                {/* Inner Profile Box */}
                <div className="p-3 rounded-xl bg-[#f2faf5] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#ccefe0] text-[#0b5e42] font-black text-xs flex items-center justify-center">
                      {surat.inisial}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <span>{surat.pemohon}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0b5e42]" />
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {surat.detailPemohon}
                      </p>
                    </div>
                  </div>

                  {surat.rekomendasi && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-1 rounded-md flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3 text-emerald-700" />
                      <span>{surat.rekomendasi}</span>
                    </span>
                  )}
                </div>

                {/* Verification Chips */}
                <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-600">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100">
                    <Check className="w-3 h-3 text-[#0b5e42]" /> {surat.verifikasiRT}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100">
                    <Check className="w-3 h-3 text-[#0b5e42]" /> {surat.verifikasiOperator}
                  </span>
                  {surat.waktu && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-400">
                      <Clock className="w-3 h-3" /> {surat.waktu}
                    </span>
                  )}
                </div>

                {/* Primary Button: TTE */}
                <button
                  type="button"
                  onClick={() => handleSign(surat)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Periksa & Tanda Tangani (TTE)</span>
                </button>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => alert(`Berkas ${surat.noReg} dikembalikan ke Operator Pelayanan untuk revisi.`)}
                    className="py-2 px-3 rounded-xl bg-[#e6f4ed] hover:bg-[#d8ece1] text-slate-700 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                    <span>Kembalikan Revisi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert(`Berkas ${surat.noReg} ditolak.`)}
                    className="py-2 px-3 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Ban className="w-3.5 h-3.5 text-rose-600" />
                    <span>Tolak Berkas</span>
                  </button>
                </div>

              </div>
            ))
          )}

          {/* Shortcut Link: 2 berkas lain */}
          <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>2 berkas lain (SK Domisili & Pengantar Nikah)</span>
            </span>
            <button
              onClick={() => alert('Menampilkan seluruh antrean berkas terdaftar.')}
              className="text-[#0b5e42] font-bold text-[11px] flex items-center"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SECTION: PENGAWASAN ADUAN KRITIS */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-rose-600"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Pengawasan Aduan Kritis
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 tracking-wider">
              DISPOSISI SEGERA
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                  *
                </span>
                <span className="text-[10px] font-bold font-mono text-slate-500">
                  {mockAduanKritis.tiket}
                </span>
              </div>
              <span className="text-[10px] font-bold text-rose-600">
                {mockAduanKritis.prioritas}
              </span>
            </div>

            <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
              {mockAduanKritis.judul}
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed">
              {mockAduanKritis.deskripsi}
            </p>

            {/* Thumbnail & Disposisi Info */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <img
                src={mockAduanKritis.gambar}
                alt="Jembatan Rusak"
                className="w-14 h-14 rounded-lg object-cover shrink-0"
              />
              <div className="text-[11px] space-y-0.5 min-w-0">
                <p className="font-bold text-slate-800">
                  • Disposisi: {mockAduanKritis.disposisi}
                </p>
                <p className="text-slate-500 truncate">
                  {mockAduanKritis.pj}
                </p>
                <p className="text-[10px] text-emerald-700 font-semibold">
                  {mockAduanKritis.statusMaterial}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:081244556677"
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span>Hubungi Tim Teknis</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setDisposisiSent(true);
                  setTimeout(() => setDisposisiSent(false), 2500);
                }}
                className="py-2.5 px-3 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{disposisiSent ? 'Terkirim ✓' : 'Instruksikan Tindakan'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* SECTION: MONITORING TREN PELAYANAN */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#0b5e42]"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Monitoring Tren Pelayanan
              </h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              Oktober 2025
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-4">
            
            {/* Target Boxes */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-[#eefaf2]">
                <p className="text-[10px] font-bold text-slate-500 uppercase">
                  Rata-rata Waktu Terbit
                </p>
                <p className="text-lg font-black text-[#0b5e42] mt-0.5">
                  1.4 <span className="text-xs font-semibold text-slate-600">Hari Kerja</span>
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50">
                <p className="text-[10px] font-bold text-slate-500 uppercase">
                  Target Standar Desa
                </p>
                <p className="text-xs font-bold text-slate-800 mt-1.5">
                  Maksimal 2.0 Hari
                </p>
              </div>
            </div>

            {/* Kecepatan Minggu Ini */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Kecepatan Penyelesaian Minggu Ini</span>
              <span className="font-extrabold text-[#0b5e42]">+18% Lebih Cepat</span>
            </div>

            {/* Weekly Bar Visualizer */}
            <div className="grid grid-cols-5 gap-2 pt-1 text-center">
              <div>
                <div className="h-14 bg-emerald-100 rounded-lg flex items-end justify-center pb-1">
                  <span className="text-[10px] font-bold text-emerald-800">8</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 mt-1 block">Sen</span>
              </div>

              <div>
                <div className="h-16 bg-emerald-100 rounded-lg flex items-end justify-center pb-1">
                  <span className="text-[10px] font-bold text-emerald-800">10</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 mt-1 block">Sel</span>
              </div>

              <div>
                <div className="h-20 bg-[#0b5e42] rounded-lg flex items-end justify-center pb-1 shadow-sm">
                  <span className="text-[10px] font-bold text-white">14</span>
                </div>
                <span className="text-[10px] font-bold text-[#0b5e42] mt-1 block">Rab</span>
              </div>

              <div>
                <div className="h-12 bg-emerald-100 rounded-lg flex items-end justify-center pb-1">
                  <span className="text-[10px] font-bold text-emerald-800">6</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 mt-1 block">Kam</span>
              </div>

              <div>
                <div className="h-10 bg-emerald-100 rounded-lg flex items-end justify-center pb-1">
                  <span className="text-[10px] font-bold text-emerald-800">4</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 mt-1 block">Jum</span>
              </div>
            </div>

            {/* Bottom Status Indicators */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-500">
              <span>• 42 Surat Diproses</span>
              <span className="text-[#0b5e42] font-semibold">• 0 Pelanggaran Batas Waktu</span>
            </div>

          </div>
        </div>

      </div>

      {/* MODAL TTE ELEKTRONIK BSrE */}
      {modalTTE && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-fadeIn">
            
            <div className="w-12 h-12 rounded-2xl bg-[#eefaf2] text-[#0b5e42] flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-slate-900">
                Konfirmasi Tanda Tangan Digital (TTE)
              </h3>
              <p className="text-xs text-slate-500">
                Sertifikat BSrE BSSN: <strong>Bpk. H. Suryono, S.Sos.</strong>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 text-xs space-y-1 border border-slate-100">
              <p className="text-slate-500 font-mono text-[10px]">{modalTTE.noReg}</p>
              <p className="font-bold text-slate-900">{modalTTE.jenis}</p>
              <p className="text-slate-600">Pemohon: {modalTTE.pemohon}</p>
            </div>

            {tteSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-100 text-[#0b5e42] text-xs font-bold text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dokumen Berhasil Ditandatangani!</span>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={confirmSignTTE}
                  className="w-full py-3 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md transition-colors"
                >
                  Sahkan & Bubuhkan TTE BSrE
                </button>
                <button
                  type="button"
                  onClick={() => setModalTTE(null)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Batal
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

