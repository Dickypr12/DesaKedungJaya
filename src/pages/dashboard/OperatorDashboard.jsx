import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, FileCheck, 
  Search, CheckCircle2, ChevronRight, FileText, Send, 
  RotateCcw, Printer, Filter
} from 'lucide-react';
import { getSuratForOperator, forwardToKades, rejectOrReviseSurat, getAllSurat } from '../../services/workflowService';
import SuratResmiModal from '../../components/SuratResmiModal';

export default function OperatorDashboard() {
  const [berkasLoket, setBerkasLoket] = useState(getSuratForOperator());
  const [previewSurat, setPreviewSurat] = useState(null);
  const [drafKadesCount, setDrafKadesCount] = useState(() => 
    getAllSurat().filter(s => s.status === 'MENUNGGU_TTE_KADES').length
  );
  const [suratTerbitCount, setSuratTerbitCount] = useState(() => 
    getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').length
  );

  const refreshList = () => {
    setBerkasLoket(getSuratForOperator());
    setDrafKadesCount(getAllSurat().filter(s => s.status === 'MENUNGGU_TTE_KADES').length);
    setSuratTerbitCount(getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').length);
  };

  const handleForwardToKades = (id, jenisSurat) => {
    forwardToKades(id, 'Dewi Lestari, S.Pd (Operator)');
    setDrafKadesCount(prev => prev + 1);
    refreshList();
    alert(`Berkas ${jenisSurat} telah lengkap diverifikasi dan otomatis masuk ke antrean TTE Kepala Desa!`);
  };

  const handleReject = (id, jenisSurat) => {
    rejectOrReviseSurat(id, 'Berkas KTP/KK tidak jelas / belum lengkap', 'Operator Pelayanan');
    refreshList();
    alert(`Berkas ${jenisSurat} dikembalikan ke pemohon untuk revisi.`);
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
              Loket Pelayanan Desa
            </h1>
            <p className="text-[11px] font-medium text-slate-500">
              Pemerintah Desa Kedung Jaya
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-cyan-700 text-white flex items-center justify-center shadow-sm">
            <User className="w-5 h-5" />
          </div>
        </div>

        {/* STATUS SUB-HEADER PILLS */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900">
            <Shield className="w-3.5 h-3.5 text-cyan-800" />
            <span>Operator Sipades & Loket</span>
          </span>

          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <span>Disdukcapil & DTKS Aktif</span>
          </span>
        </div>

        {/* PROFILE CARD OPERATOR */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80"
              alt="Dewi Lestari, S.Pd"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-700 text-white flex items-center justify-center text-[10px]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-cyan-800 tracking-wider uppercase block">
              Kasi Pelayanan Umum
            </span>
            <h2 className="text-sm font-extrabold text-slate-900 truncate">
              Dewi Lestari, S.Pd
            </h2>
            <p className="text-[11px] text-slate-400 truncate">
              Loket Pelayanan Terpadu Mandiri
            </p>
          </div>
        </div>

        {/* 2x2 STATS METRIC GRID */}
        <div className="grid grid-cols-2 gap-3">
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Antrean Masuk</span>
              <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">{berkasLoket.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">berkas</span>
            </div>
            <p className="text-[11px] font-bold text-rose-600 mt-1">
              Perlu dicek syaratnya
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Draf ke Kades</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <FileCheck className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">{drafKadesCount}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">berkas</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              Menunggu TTE Kades
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Surat Terbit</span>
              <span className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">{suratTerbitCount}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">terbit</span>
            </div>
            <p className="text-[11px] font-semibold text-cyan-800 mt-1">
              {suratTerbitCount > 0 ? '100% Selesai Tepat' : 'Belum ada terbit'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Rata-rata Waktu</span>
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">15</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">menit</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              Standar SOP Desa
            </p>
          </div>

        </div>

        {/* NOTICE CARD SOP OPERATOR */}
        <div className="bg-cyan-800 text-white rounded-2xl p-4 shadow-sm space-y-2">
          <div className="flex items-start justify-between">
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
              <Shield className="w-4 h-4 text-cyan-200" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-900 text-white font-extrabold text-[10px]">
              VERIFIKASI SYARAT
            </span>
          </div>

          <h3 className="text-xs font-extrabold text-white pt-1">
            Standar Pemeriksaan Berkas & NIK
          </h3>
          <p className="text-[11px] text-cyan-100/90 leading-relaxed font-light">
            Pastikan NIK terdaftar di database Disdukcapil dan syarat pengantar RT telah terverifikasi sebelum draf diteruskan ke penandatanganan TTE Kepala Desa.
          </p>
        </div>

        {/* SECTION: ANTREAN PERMOHONAN */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-cyan-700"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Berkas Masuk ke Loket
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-900">
              {berkasLoket.length} Berkas
            </span>
          </div>

          {berkasLoket.length === 0 ? (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              Tidak ada antrean berkas yang menunggu verifikasi loket saat ini.
            </div>
          ) : (
            berkasLoket.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900">{item.pemohonNama || item.nama}</span>
                    <p className="text-[10px] font-mono text-slate-400">NIK: {item.pemohonNik || item.nik}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    {item.statusLabel || 'PENGANTAR RT SAH'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800">{item.jenis}</p>
                  <p className="text-[11px] text-slate-500">Keperluan: {item.keperluan || item.detailUsaha}</p>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleForwardToKades(item.id, item.jenis)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim ke TTE Kades</span>
                  </button>

                  <button
                    onClick={() => handleReject(item.id, item.jenis)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                  >
                    Revisi
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SECTION: SURAT TERBIT SIAP CETAK LOKET */}
        {getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-cyan-700"></span>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Surat Terbit Siap Cetak (TTE Sah)
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                {getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').length} Dokumen
              </span>
            </div>

            {getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').map(doc => (
              <div key={doc.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/70 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">{doc.noReg}</span>
                  <h5 className="text-xs font-bold text-slate-900">{doc.jenis}</h5>
                  <p className="text-[10px] text-slate-500">Pemohon: {doc.pemohonNama} ({doc.wilayahRT || 'RT 03/02'})</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewSurat(doc)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / PDF / Word</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* MODAL PRATINJAU SURAT (PDF & WORD) */}
      {previewSurat && (
        <SuratResmiModal
          surat={previewSurat}
          onClose={() => setPreviewSurat(null)}
        />
      )}

    </div>
  );
}

