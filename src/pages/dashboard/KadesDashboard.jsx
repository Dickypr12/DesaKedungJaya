import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, Bell, 
  FileCheck, Edit3, ChevronRight, Store, GraduationCap, 
  RotateCcw, Ban, Phone, Send, CheckCircle2, AlertTriangle,
  FileText, TrendingUp, ThumbsUp
} from 'lucide-react';
import { mockAduanKritis } from '../../data/desaData';
import { getSuratForKades, signByKadesTTE, rejectOrReviseSurat, getAllSurat } from '../../services/workflowService';
import { getAllAduan, disposisiOlehKades } from '../../services/aduanService';
import SuratResmiModal from '../../components/SuratResmiModal';

export default function KadesDashboard() {
  const [antrean, setAntrean] = useState(getSuratForKades());
  const [suratTerbitCount, setSuratTerbitCount] = useState(() => getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').length);
  const [modalTTE, setModalTTE] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [tteSuccess, setTteSuccess] = useState(false);
  const [daftarAduan, setDaftarAduan] = useState(getAllAduan());
  const [modalDisposisi, setModalDisposisi] = useState(null);
  const [disposisiTarget, setDisposisiTarget] = useState('Tim Teknis Desa (Kaur Pembangunan)');
  const [instruksiText, setInstruksiText] = useState('Segera lakukan peninjauan lokasi darurat dan siapkan material pengamanan.');

  const refreshList = () => {
    setAntrean(getSuratForKades());
    setDaftarAduan(getAllAduan());
    setSuratTerbitCount(getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').length);
  };

  const handleSign = (item) => {
    setModalTTE(item);
  };

  const confirmSignTTE = () => {
    setTteSuccess(true);
    setTimeout(() => {
      if (modalTTE) {
        signByKadesTTE(modalTTE.id, 'Bpk. H.Johari');
      }
      setSuratTerbitCount(prev => prev + 1);
      refreshList();
      setModalTTE(null);
      setTteSuccess(false);
    }, 1000);
  };

  const handleReject = (id, noReg) => {
    rejectOrReviseSurat(id, 'Ditolak oleh Kepala Desa', 'Kepala Desa');
    refreshList();
    alert(`Berkas ${noReg} ditolak dan statusnya telah diperbarui.`);
  };

  const handleRevision = (id, noReg) => {
    rejectOrReviseSurat(id, 'Perlu perbaikan keterangan', 'Kepala Desa');
    refreshList();
    alert(`Berkas ${noReg} dikembalikan ke Operator Pelayanan untuk revisi.`);
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
                  Persetujuan & TTE Kepala Desa
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d7f5e5] text-[#0b5e42] text-[10px] font-bold">
                  <Shield className="w-3 h-3 text-[#0b5e42]" />
                  <span>BSrE BSSN Aktif</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Pemerintah Desa Kedung Jaya • Hak Akses Pejabat Pengesah Tertinggi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-extrabold text-slate-900 block">Bpk. H. Johari</span>
              <span className="text-[11px] text-slate-400">Kepala Desa Kedung Jaya</span>
            </div>
            <img
              src="./public/images/johari.jpeg"
              alt="Bpk. H. Johari"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0b5e42] shrink-0"
            />
          </div>
        </div>

        {/* 4x1 STATS METRIC GRID RESPONSIVE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: Menunggu TTE */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Menunggu TTE</span>
              <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Edit3 className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">{antrean.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">berkas</span>
            </div>
            <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Perlu tanda tangan
            </p>
          </div>

          {/* Card 2: Surat Terbit */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Surat Terbit</span>
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <FileCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">{suratTerbitCount}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">terbit</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              ↗ 100% Sah BSrE
            </p>
          </div>

          {/* Card 3: Disposisi Aduan */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Disposisi Aduan</span>
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                {daftarAduan.filter(a => a.status === 'MENUNGGU_DISPOSISI').length}
              </span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">prioritas</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              {daftarAduan.filter(a => a.status === 'MENUNGGU_DISPOSISI').length > 0 ? 'Perlu arahan Kades' : 'Semua tertangani'}
            </p>
          </div>

          {/* Card 4: Kepuasan Warga */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Kepuasan Warga</span>
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">96%</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">IKM</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              Sangat Memuaskan
            </p>
          </div>

        </div>

        {/* 2-COLUMN GRID ON LAPTOP / DESKTOP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: DRAF SURAT TTE & ADUAN KRITIS */}
          <div className="lg:col-span-8 space-y-6">

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
                      {surat.inisial || (surat.pemohonNama || surat.pemohon || 'W').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <span>{surat.pemohonNama || surat.pemohon}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0b5e42]" />
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {surat.detailUsaha || surat.detailPemohon || surat.keperluan}
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
                    <Check className="w-3 h-3 text-[#0b5e42]" /> {surat.verifikasiRT || 'RT 03/02 Terverifikasi'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100">
                    <Check className="w-3 h-3 text-[#0b5e42]" /> {surat.verifikasiOperator || 'Berkas Lengkap Operator'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-400">
                    <Clock className="w-3 h-3" /> {surat.waktu || 'Hari ini'}
                  </span>
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
                    onClick={() => handleRevision(surat.id, surat.noReg)}
                    className="py-2 px-3 rounded-xl bg-[#e6f4ed] hover:bg-[#d8ece1] text-slate-700 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                    <span>Kembalikan Revisi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReject(surat.id, surat.noReg)}
                    className="py-2 px-3 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Ban className="w-3.5 h-3.5 text-rose-600" />
                    <span>Tolak Berkas</span>
                  </button>
                </div>

              </div>
            ))
          )}

          {/* SECTION: ARSIP SURAT TERBIT TTE RESMI */}
          {getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-emerald-600"></span>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Arsip Dokumen Terbit (TTE Sah)
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').length} Dokumen
                </span>
              </div>

              {getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').map(doc => (
                <div key={doc.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/70 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">{doc.noReg}</span>
                    <h5 className="text-xs font-bold text-slate-900">{doc.jenis}</h5>
                    <p className="text-[10px] text-slate-500">Pemohon: {doc.pemohonNama}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(doc)}
                    className="px-3 py-1.5 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>PDF / Word</span>
                  </button>
                </div>
              ))}
            </div>
          )}
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

          {daftarAduan.length === 0 ? (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              Belum ada aduan warga yang masuk. Situasi wilayah aman dan terkendali.
            </div>
          ) : (
            daftarAduan.map((aduan) => (
              <div key={aduan.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                    *
                  </span>
                  <span className="text-[10px] font-bold font-mono text-slate-500">
                    {aduan.tiket}
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  aduan.status === 'DIDISPOSISIKAN' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-600'
                }`}>
                  {aduan.status === 'DIDISPOSISIKAN' ? '✓ DIDISPOSISI' : aduan.prioritas}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                {aduan.judul}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {aduan.deskripsi}
              </p>

              {/* Thumbnail & Disposisi Info */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <img
                  src={aduan.gambar}
                  alt={aduan.judul}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="text-[11px] space-y-0.5 min-w-0">
                  <p className="font-bold text-slate-800">
                    • Disposisi: {aduan.disposisiTarget}
                  </p>
                  <p className="text-slate-500 truncate">
                    {aduan.disposisiCatatan}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold">
                    Pelapor: {aduan.pelaporNama} ({aduan.dusun})
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${aduan.pelaporTelepon}`}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>Hubungi Pelapor</span>
                </a>

                <button
                  type="button"
                  onClick={() => setModalDisposisi(aduan)}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors ${
                    aduan.status === 'DIDISPOSISIKAN'
                      ? 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'
                      : 'bg-[#0b5e42] hover:bg-[#084832] text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{aduan.status === 'DIDISPOSISIKAN' ? 'Ubah Disposisi' : 'Instruksikan Tindakan'}</span>
                </button>
              </div>

            </div>
          )))}
        </div>

          </div>

          {/* RIGHT COLUMN: PROFIL KADES, BSRE BSSN, TREN PELAYANAN */}
          <div className="lg:col-span-4 space-y-6">

            {/* PROFILE CARD KEPALA DESA */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <img
                  src="./public/images/johari.jpeg"
                  alt="Bpk. H. Johari"
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#0b5e42]"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-[#0b5e42] tracking-wider uppercase block">
                    Kepala Desa Kedung Jaya
                  </span>
                  <h2 className="text-base font-extrabold text-slate-900 truncate">
                    Bpk. H. Johari
                  </h2>
                  <p className="text-xs text-slate-400">
                    Sesi Aktif Pejabat • Token TTE Siap
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Jabatan:</span>
                  <span className="font-bold text-slate-800">Kepala Desa Kedung Jaya</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Status BSrE:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Terhubung Aktif
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Wewenang:</span>
                  <span className="font-semibold text-slate-700">Tanda Tangan Elektronik & Disposisi</span>
                </div>
              </div>
            </div>

            {/* BSrE BSSN NOTICE CARD */}
            <div className="bg-[#0b5e42] text-white rounded-2xl p-5 shadow-sm space-y-2.5">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-emerald-200" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1b7a5a] text-white font-extrabold text-[10px] tracking-wider">
                  BSRE BSSN
                </span>
              </div>

              <h3 className="text-xs font-extrabold text-white pt-1">
                Kewenangan Penandatanganan Digital
              </h3>

              <p className="text-xs text-emerald-100/90 leading-relaxed font-light">
                Penandatanganan digital menggunakan sertifikat elektronik resmi tersertifikasi Balai Sertifikasi Elektronik (BSrE) BSSN. Dokumen yang terbit memiliki kekuatan hukum sah di seluruh instansi RI.
              </p>
            </div>

            {/* SECTION: MONITORING TREN PELAYANAN */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-[#0b5e42]"></span>
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Monitoring Tren Pelayanan
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-slate-400">
                  Bulan Berjalan
                </span>
              </div>
              
              {/* Target Boxes */}
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
                <div className="p-3 rounded-xl bg-[#eefaf2]">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    Rata-rata Waktu Terbit
                  </p>
                  <p className="text-xl font-black text-[#0b5e42] mt-0.5">
                    1.4 <span className="text-xs font-semibold text-slate-600">Hari Kerja</span>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    Target Standar Desa
                  </p>
                  <p className="text-xs font-bold text-slate-800 mt-2">
                    Maksimal 2.0 Hari
                  </p>
                </div>
              </div>

              {/* Kecepatan Minggu Ini */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Kecepatan Penyelesaian</span>
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
                <span className="text-[#0b5e42] font-semibold">• 0 Keterlambatan SOP</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MODAL TTE ELEKTRONIK BSrE */}
      {modalTTE && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-fadeIn max-h-[92vh] overflow-y-auto">
            
            <div className="w-12 h-12 rounded-2xl bg-[#eefaf2] text-[#0b5e42] flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-slate-900">
                Konfirmasi Tanda Tangan Digital (TTE)
              </h3>
              <p className="text-xs text-slate-500">
                Sertifikat BSrE BSSN: <strong>Bpk. H. Johari</strong>
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

      {/* MODAL DISPOSISI ADUAN KRITIS OLEH KEPALA DESA */}
      {modalDisposisi && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                  Disposisi Kepala Desa
                </span>
                <h3 className="text-sm font-black text-slate-900 mt-0.5">
                  Instruksikan Penanganan
                </h3>
              </div>
              <button
                onClick={() => setModalDisposisi(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="text-[10px] font-mono text-slate-500 font-bold">{modalDisposisi.tiket}</span>
              <p className="font-bold text-slate-900">{modalDisposisi.judul}</p>
              <p className="text-slate-600">Pelapor: {modalDisposisi.pelaporNama} ({modalDisposisi.dusun})</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                disposisiOlehKades(modalDisposisi.id, disposisiTarget, instruksiText);
                refreshList();
                setModalDisposisi(null);
                alert(`Disposisi berhasil dikirim ke ${disposisiTarget}! Notifikasi WhatsApp otomatis terkirim ke HP warga pelapor.`);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tujuan Disposisi (Pejabat / Tim Teknis)
                </label>
                <select
                  value={disposisiTarget}
                  onChange={(e) => setDisposisiTarget(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option>Tim Teknis Desa (Kaur Pembangunan)</option>
                  <option>Kepala Dusun I (Kp. Wates)</option>
                  <option>Kepala Dusun II (Kp. Babakan)</option>
                  <option>Kepala Dusun III (Kp. Pengawas)</option>
                  <option>Kepala Dusun IV (Kp. Belendung)</option>
                  <option>Satgas Linmas & Trantibum</option>
                  <option>Bhabinkamtibmas & Babinsa Desa</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Instruksi & Catatan Khusus Kades *
                </label>
                <textarea
                  required
                  rows={3}
                  value={instruksiText}
                  onChange={(e) => setInstruksiText(e.target.value)}
                  placeholder="Tuliskan arahan Kepala Desa..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setModalDisposisi(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md"
                >
                  Kirim Disposisi →
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL PRATINJAU & UNDUH SURAT (PDF / WORD) */}
      {previewDoc && (
        <SuratResmiModal
          surat={previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      )}

    </div>
  );
}

