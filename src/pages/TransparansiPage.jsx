import React, { useState } from 'react';
import { 
  PieChart, TrendingUp, Landmark, ShieldCheck, Download, 
  Coins, FileSpreadsheet, ArrowUpRight, CheckCircle2, ChevronRight,
  AlertCircle, DollarSign
} from 'lucide-react';
import { apbdesData } from '../data/desaData';

export default function TransparansiPage() {
  const [activeTab, setActiveTab] = useState('belanja'); // 'belanja', 'pendapatan', 'dokumen'

  return (
    <div className="space-y-14 pb-20">
      
      {/* HEADER */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800/80 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Keterbukaan Informasi Publik (UU No. 14 Tahun 2008)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Transparansi APBDes Tahun {apbdesData.tahun}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Infografis resmi Anggaran Pendapatan dan Belanja Desa Kedung Jaya. Pengelolaan keuangan desa yang terbuka, akuntabel, dan dapat diawasi bersama oleh seluruh warga.
            </p>
          </div>
        </div>
      </section>

      {/* METRIC SUMMARY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Pendapatan Desa
            </span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600">
              Rp {apbdesData.totalPendapatan.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-slate-500">
              Transfer APBN, ADD Kab & PADes
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Belanja Desa
            </span>
            <p className="text-2xl sm:text-3xl font-black text-amber-600">
              Rp {apbdesData.totalBelanja.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-slate-500">
              Pembangunan fisik & pemberdayaan
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Surplus / Sisa Anggaran
            </span>
            <p className="text-2xl sm:text-3xl font-black text-blue-600">
              Rp {apbdesData.surplusDefisit.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-slate-500">
              Cadangan kas SILPA desa
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tingkat Realisasi Serapan
            </span>
            <p className="text-2xl sm:text-3xl font-black text-purple-600">
              98.4%
            </p>
            <p className="text-xs text-emerald-600 font-bold">
              ✓ Kategori Sangat Efektif
            </p>
          </div>

        </div>
      </section>

      {/* TAB SELECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('belanja')}
            className={`py-4 px-6 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'belanja'
                ? 'border-brand-600 text-brand-700 bg-brand-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Rincian Belanja Desa (5 Bidang)
          </button>
          
          <button
            onClick={() => setActiveTab('pendapatan')}
            className={`py-4 px-6 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'pendapatan'
                ? 'border-brand-600 text-brand-700 bg-brand-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sumber Pendapatan Desa
          </button>

          <button
            onClick={() => setActiveTab('dokumen')}
            className={`py-4 px-6 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'dokumen'
                ? 'border-brand-600 text-brand-700 bg-brand-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Unduh Laporan & Regulasi
          </button>
        </div>
      </section>

      {/* TAB 1: RINCIAN BELANJA */}
      {activeTab === 'belanja' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* List 5 Bidang Belanja */}
            <div className="lg:col-span-8 space-y-4">
              {apbdesData.belanja.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700">
                        0{idx + 1}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base">
                        {item.bidang}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-black text-slate-900">
                        Rp {item.jumlah.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs text-brand-700 font-bold ml-2">
                        ({item.persen}%)
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.warna} rounded-full`}
                      style={{ width: `${item.persen}%` }}
                    ></div>
                  </div>

                  <p className="text-xs text-slate-600 pt-1">
                    <strong>Alokasi Kegiatan:</strong> {item.deskripsi}
                  </p>
                </div>
              ))}
            </div>

            {/* Sticky Summary Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    Struktur Belanja
                  </span>
                  <h3 className="text-xl font-black mt-1">
                    Fokus Utama: Pembangunan Fisik & Infrastruktur
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Sebesar 46.1% (Rp 980 Juta) difokuskan langsung untuk jalan usaha tani, drainase lingkungan, dan penerangan jalan umum demi konektivitas antar-dusun.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Alokasi Belanja:</span>
                    <span className="font-bold text-white">Rp 2.125.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dasar Hukum:</span>
                    <span className="font-bold text-emerald-400">Perdes No. 04 Th 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status Audit BPKP:</span>
                    <span className="font-bold text-emerald-400">WTP (Wajar Tanpa Pengecualian)</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200 text-xs text-amber-900 space-y-2">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Pengawasan Partisipatif:</span>
                </p>
                <p className="leading-relaxed">
                  Apabila menemukan indikasi penyimpangan pembangunan desa, warga berhak melaporkan ke BPD atau melalui menu <strong>Kontak & Lapor</strong>.
                </p>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* TAB 2: SUMBER PENDAPATAN */}
      {activeTab === 'pendapatan' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apbdesData.pendapatan.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-xl">
                      Sumber #{idx + 1}
                    </span>
                    <span className="text-xs font-extrabold text-slate-800">
                      {item.persen}% dari Total
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base mt-3">
                    {item.sumber}
                  </h3>

                  <p className="text-2xl font-black text-brand-700 mt-2">
                    Rp {item.jumlah.toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-4">
                  <div
                    className="h-full bg-brand-600 rounded-full"
                    style={{ width: `${item.persen}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: DOKUMEN PUBLIK / UNDUH LPJ */}
      {activeTab === 'dokumen' && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Arsip Dokumen Perencanaan & Laporan Keuangan
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Silakan unduh dokumen resmi peraturan desa dan pertanggungjawaban dalam format PDF terbuka.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { judul: "Perdes APBDes Kedung Jaya Tahun Anggaran 2026 (Lembaran Resmi)", size: "2.4 MB", tanggal: "05 Januari 2026" },
                { judul: "Laporan Realisasi Semester I Pelaksanaan APBDes 2026", size: "1.8 MB", tanggal: "15 Juli 2026" },
                { judul: "Rencana Kerja Pemerintah Desa (RKPDes) Tahun 2026", size: "3.2 MB", tanggal: "20 Desember 2025" },
                { judul: "Laporan Pertanggungjawaban (LPJ) Realisasi Dana Desa 2025", size: "4.1 MB", tanggal: "10 Februari 2026" },
                { judul: "Infografis Ringkas Transparansi Keuangan Desa Kedung Jaya", size: "850 KB", tanggal: "12 Januari 2026" }
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{doc.judul}</h4>
                      <p className="text-xs text-slate-400">PDF • {doc.size} • Diunggah {doc.tanggal}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Simulasi unduh file: "${doc.judul}". Dokumen publik tersedia di kantor desa.`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
