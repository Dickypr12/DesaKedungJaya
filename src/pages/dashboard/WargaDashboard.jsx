import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, FileText, 
  Download, PlusCircle, AlertCircle, CheckCircle2, ChevronRight,
  QrCode, ExternalLink, Send
} from 'lucide-react';

export default function WargaDashboard() {
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
              Portal Layanan Warga
            </h1>
            <p className="text-[11px] font-medium text-slate-500">
              Desa Kedung Jaya Mandiri
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-sm">
            <User className="w-5 h-5" />
          </div>
        </div>

        {/* STATUS SUB-HEADER PILLS */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d7f5e5] text-[#0b5e42]">
            <Shield className="w-3.5 h-3.5 text-[#0b5e42]" />
            <span>Identitas Kependudukan Aktif</span>
          </span>

          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Data Terhubung Dukcapil</span>
          </span>
        </div>

        {/* PROFILE CARD WARGA */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80"
              alt="Hendra Kusuma"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-teal-700 tracking-wider uppercase block">
              Warga Desa Terverifikasi
            </span>
            <h2 className="text-sm font-extrabold text-slate-900 truncate">
              Hendra Kusuma
            </h2>
            <p className="text-[11px] text-slate-400 truncate">
              NIK: 3216012804920003 • Dusun II RT 03/02
            </p>
          </div>
        </div>

        {/* 2x2 STATS METRIC GRID */}
        <div className="grid grid-cols-2 gap-3">
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Surat Aktif</span>
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">1</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">berkas</span>
            </div>
            <p className="text-[11px] font-bold text-amber-700 mt-1">
              Di Meja Kepala Desa
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Surat Terbit</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">3</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">dokumen</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              TTE Sah & Ber-QR
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Status DTKS</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <Shield className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-base font-black text-slate-900 leading-none">Terpadu Valid</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1">
              Desil 3 (Penerima PKH)
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Aduan Warga</span>
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">1</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">laporan</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              Jembatan Dusun II
            </p>
          </div>

        </div>

        {/* QUICK ACTION BUTTON */}
        <Link
          to="/layanan"
          className="w-full py-3 px-4 rounded-2xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Buat Pengajuan Surat Mandiri Baru</span>
        </Link>

        {/* STATUS DOKUMEN AKTIF BERJALAN */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-[#0b5e42]"></span>
            <h3 className="text-sm font-extrabold text-slate-900">
              Pengajuan Surat Sedang Berjalan
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold font-mono text-slate-500">
                NO REG: 470/142/SKU/X/2025
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                PROSES TTE KADES
              </span>
            </div>

            <h4 className="text-sm font-extrabold text-slate-900">
              Surat Keterangan Usaha (SKU)
            </h4>
            <p className="text-xs text-slate-500">
              Usaha: Toko Kelontong "Jaya Makmur" • Dusun II RT 03/02
            </p>

            {/* Stepper Status */}
            <div className="grid grid-cols-4 gap-1 pt-2 text-center text-[10px]">
              <div className="p-1.5 rounded-lg bg-[#eefaf2] text-[#0b5e42] font-bold border border-emerald-200">
                ✓ Diajukan
              </div>
              <div className="p-1.5 rounded-lg bg-[#eefaf2] text-[#0b5e42] font-bold border border-emerald-200">
                ✓ RT 03/02
              </div>
              <div className="p-1.5 rounded-lg bg-[#eefaf2] text-[#0b5e42] font-bold border border-emerald-200">
                ✓ Operator
              </div>
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 font-bold animate-pulse border border-amber-300">
                ⌛ TTE Kades
              </div>
            </div>

            <p className="text-[11px] text-slate-500 pt-1">
              Estimasi selesai: Hari ini (Maks. 2 jam kerja). Anda akan menerima notifikasi WhatsApp begitu siap diunduh.
            </p>
          </div>
        </div>

        {/* RIWAYAT SURAT TERBIT & ARSIP DOKUMEN DIGITAL */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-teal-600"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Dokumen Resmi Terbit (E-Dokumen)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-teal-700">3 Dokumen</span>
          </div>

          {[
            { jenis: "Surat Keterangan Domisili", no: "471/021/SKD/VIII/2025", tgl: "14 Agu 2025" },
            { jenis: "Surat Pengantar SKCK Polsek", no: "331/095/SKCK/V/2025", tgl: "22 Mei 2025" }
          ].map((doc, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/70 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400">{doc.no}</span>
                <h5 className="text-xs font-bold text-slate-900">{doc.jenis}</h5>
                <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> TTE BSrE Sah • {doc.tgl}
                </p>
              </div>

              <button
                onClick={() => alert(`Mengunduh salinan resmi ${doc.jenis} dengan tanda tangan barcode BSrE.`)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-[#eefaf2] text-[#0b5e42] transition-colors"
                title="Unduh E-Surat PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

