import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, Users, 
  FileCheck, CheckCircle2, ChevronRight, Home, Phone,
  ThumbsUp, XCircle, AlertCircle
} from 'lucide-react';
import { getSuratForRT, approveByRT, rejectOrReviseSurat, getAllSurat } from '../../services/workflowService';

export default function RtRwDashboard() {
  const [antreanRT, setAntreanRT] = useState(getSuratForRT('RT 03 / RW 02'));
  const [disetujuiCount, setDisetujuiCount] = useState(() => 
    getAllSurat().filter(s => s.status !== 'MENUNGGU_RT' && (s.wilayahRT === 'RT 03 / RW 02' || !s.wilayahRT)).length
  );

  const refreshList = () => {
    setAntreanRT(getSuratForRT('RT 03 / RW 02'));
    setDisetujuiCount(getAllSurat().filter(s => s.status !== 'MENUNGGU_RT' && (s.wilayahRT === 'RT 03 / RW 02' || !s.wilayahRT)).length);
  };

  const handleApprove = (id, pemohonNama) => {
    approveByRT(id, 'Bpk. Mulyono (Ketua RT 03)');
    setDisetujuiCount(prev => prev + 1);
    refreshList();
    alert(`Pengantar RT untuk ${pemohonNama} berhasil disahkan! Berkas otomatis diteruskan ke loket Operator Pelayanan.`);
  };

  const handleReject = (id, pemohonNama) => {
    rejectOrReviseSurat(id, 'Syarat pengantar RT belum lengkap', 'Ketua RT 03');
    refreshList();
    alert(`Berkas ${pemohonNama} dikembalikan untuk melengkapi berkas.`);
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
              Verifikasi Ketua RT / RW
            </h1>
            <p className="text-[11px] font-medium text-slate-500">
              Pemerintah Desa Kedung Jaya
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-sm">
            <User className="w-5 h-5" />
          </div>
        </div>

        {/* STATUS SUB-HEADER PILLS */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800">
            <Shield className="w-3.5 h-3.5 text-blue-800" />
            <span>Verifikator Lingkungan RT/RW</span>
          </span>

          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>RT 03 / RW 02 Terhubung</span>
          </span>
        </div>

        {/* PROFILE CARD RT */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80"
              alt="Bpk. Mulyono"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-blue-800 tracking-wider uppercase block">
              Ketua Rukun Tetangga (RT 03)
            </span>
            <h2 className="text-sm font-extrabold text-slate-900 truncate">
              Bpk. Mulyono
            </h2>
            <p className="text-[11px] text-slate-400 truncate">
              Kp. Wates, RT 03 / RW 02, Kedungjaya • Masa Bakti 2024-2029
            </p>
          </div>
        </div>

        {/* 2x2 STATS METRIC GRID */}
        <div className="grid grid-cols-2 gap-3">
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Perlu Pengantar</span>
              <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">{antreanRT.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">warga</span>
            </div>
            <p className="text-[11px] font-bold text-rose-600 mt-1">
              Perlu pengesahan
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Pengantar Terbit</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <FileCheck className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">{disetujuiCount}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">bulan ini</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              100% Valid Warga
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Warga Terdata</span>
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">142</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">jiwa</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              42 Kepala Keluarga
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Aduan Wilayah</span>
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertCircle className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">1</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">kasus</span>
            </div>
            <p className="text-[11px] font-semibold text-amber-700 mt-1">
              Jembatan Dusun II
            </p>
          </div>

        </div>

        {/* NOTICE CARD WEWENANG RT */}
        <div className="bg-blue-800 text-white rounded-2xl p-4 shadow-sm space-y-2">
          <div className="flex items-start justify-between">
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
              <Shield className="w-4 h-4 text-blue-200" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-900 text-white font-extrabold text-[10px]">
              LEVEL RUKUN TETANGGA
            </span>
          </div>

          <h3 className="text-xs font-extrabold text-white pt-1">
            Validasi Faktual Domisili & Usaha Warga
          </h3>
          <p className="text-[11px] text-blue-100/90 leading-relaxed font-light">
            Pengantar RT/RW menjadi jaminan kebenaran fisik bahwa pemohon benar merupakan warga yang berdomisili dan memiliki usaha aktif di wilayah Anda.
          </p>
        </div>

        {/* SECTION: ANTREAN PERMOHONAN PENGANTAR */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-blue-700"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Permohonan Pengantar Warga
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {antreanRT.length} Menunggu
            </span>
          </div>

          {antreanRT.length === 0 ? (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              Tidak ada antrean permohonan pengantar warga saat ini.
            </div>
          ) : (
            antreanRT.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900">{item.pemohonNama || item.nama}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">NIK: {item.pemohonNik || '321601xxxxxxxx'}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    {item.jenis || item.keperluan}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                  <p><strong>Keperluan:</strong> {item.keperluan}</p>
                  <p className="text-[11px] text-slate-500">Alamat: {item.pemohonAlamat || item.alamat}</p>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleApprove(item.id, item.pemohonNama || item.nama)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Setujui Pengantar RT</span>
                  </button>

                  <button
                    onClick={() => handleReject(item.id, item.pemohonNama || item.nama)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                  >
                    Tinjau
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

