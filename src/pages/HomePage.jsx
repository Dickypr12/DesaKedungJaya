import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Home as HomeIcon, MapPin, Landmark, ArrowRight, 
  FileText, ShieldCheck, CheckCircle2, ChevronRight, Sparkles,
  PhoneCall, Calendar, MessageSquare, TrendingUp, ShoppingBag, Eye
} from 'lucide-react';
import { desaInfo, visiMisi, beritaDesa, daftarLayanan, apbdesData, umkmProduk, galeriKegiatan } from '../data/desaData';

export default function HomePage() {
  const [selectedKategoriBerita, setSelectedKategoriBerita] = useState('Semua');

  const filteredBerita = selectedKategoriBerita === 'Semua' 
    ? beritaDesa.slice(0, 3) 
    : beritaDesa.filter(b => b.kategori.includes(selectedKategoriBerita)).slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-slate-900 text-white pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/80 border border-brand-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Portal Digital Desa Mandiri & Transparan</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Selamat Datang di <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                  Desa Kedung Jaya
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Pusat layanan kependudukan mandiri, transparansi anggaran desa, serta etalase potensi ekonomi dan kebudayaan masyarakat Desa Kedung Jaya.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/layanan"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-base shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  <FileText className="w-5 h-5" />
                  <span>Buat Surat Online</span>
                </Link>

                <Link
                  to="/profil"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/20 backdrop-blur-md transition-all"
                >
                  <span>Profil & Struktur Desa</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-brand-800/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pelayanan 100% Gratis
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tracking Dokumen Real-time
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Akses 24/7 Ramah HP
                </span>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-teal-400 rounded-3xl transform rotate-2 scale-102 opacity-40 blur-lg"></div>
                
                {/* Main Card */}
                <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
                  
                  {/* Card Header: Quick Notice */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-emerald-400 flex items-center justify-center">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-white">Layanan Mandiri Warga</h2>
                        <p className="text-xs text-slate-400">Pilih kebutuhan dokumen Anda</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                      Online
                    </span>
                  </div>

                  {/* 3 Quick action services */}
                  <div className="space-y-3">
                    {daftarLayanan.slice(0, 3).map((item) => (
                      <Link
                        key={item.id}
                        to={`/layanan?type=${item.id}`}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-brand-500/40 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-brand-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                            {item.kode}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                              {item.nama}
                            </p>
                            <p className="text-xs text-slate-400">{item.estimasi}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                      </Link>
                    ))}
                  </div>

                  {/* Tracking Shortcut */}
                  <div className="pt-2">
                    <Link
                      to="/layanan?tab=tracking"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600 transition-colors"
                    >
                      <span>Sudah mengajukan? Lacak Resi Dokumen</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK STATS COUNTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-slate-100 flex items-center gap-4 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{desaInfo.statistik.penduduk.toLocaleString('id-ID')}</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Penduduk (Jiwa)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-slate-100 flex items-center gap-4 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <HomeIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{desaInfo.statistik.kepalaKeluarga.toLocaleString('id-ID')}</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Kepala Keluarga</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-slate-100 flex items-center gap-4 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{desaInfo.statistik.luasWilayah} Ha</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Luas Wilayah (4 Dusun)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-slate-100 flex items-center gap-4 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{desaInfo.statistik.realisasiAnggaran}</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Serapan APBDes 2026</p>
            </div>
          </div>

        </div>
      </section>

      {/* SAMBUTAN KEPALA DESA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white rounded-3xl p-6 sm:p-10 border border-emerald-100/80 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Foto Kades */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden shadow-md border-4 border-white bg-emerald-950 flex items-center justify-center p-2">
                  <img
                    src={desaInfo.kepalaDesa.foto}
                    alt={desaInfo.kepalaDesa.nama}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="absolute -bottom-3 bg-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                  Kepala Desa
                </span>
              </div>
              <h3 className="mt-6 font-extrabold text-slate-900 text-lg">{desaInfo.kepalaDesa.nama}</h3>
              <p className="text-xs text-slate-500">Masa Bakti 2024 - 2029</p>
            </div>

            {/* Kutipan Sambutan */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-brand-600 text-xs font-bold uppercase tracking-wider">
                Kata Sambutan Pemimpin Desa
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                "Bersama Membangun Desa Kedung Jaya yang Mandiri, Sejahtera & Bermartabat"
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base italic">
                "{desaInfo.kepalaDesa.sambutan}"
              </p>
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Link
                  to="/profil"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800"
                >
                  <span>Kenali Visi, Misi & Struktur Pemerintahan Desa</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* LAYANAN CEPAT & MANDIRI (8 JENIS SURAT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
            Pelayanan Publik Terpadu
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Layanan Administrasi Surat Online
          </h2>
          <p className="text-sm text-slate-600">
            Pilih jenis surat yang Anda butuhkan, isi formulir secara online, dan pantau proses verifikasinya tanpa harus bolak-balik ke kantor desa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {daftarLayanan.map((surat) => (
            <div
              key={surat.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-card hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-xs border border-brand-200">
                    {surat.kode}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {surat.biaya}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-700 transition-colors">
                  {surat.nama}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {surat.deskripsi}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  ⏱ {surat.estimasi}
                </span>
                <Link
                  to={`/layanan?type=${surat.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-800"
                >
                  <span>Ajukan</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/layanan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
          >
            <span>Buka Portal Layanan & Tracking Lengkap</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>
      </section>

      {/* TRANSPARANSI APBDES SNAPSHOT */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> Keterbukaan Informasi Publik
              </span>
              <h2 className="text-3xl font-black tracking-tight">
                Transparansi Anggaran Pendapatan & Belanja Desa (APBDes) {apbdesData.tahun}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Pemerintah Desa Kedung Jaya menjunjung tinggi akuntabilitas. Setiap rupiah dana desa dikelola untuk kemaslahatan warga dan dapat dipantau bersama secara terbuka.
              </p>
              
              <div className="pt-2">
                <Link
                  to="/transparansi"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>Lihat Rincian APBDes Selengkapnya</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-700">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700">
                    <p className="text-xs text-slate-400 font-medium">Total Pendapatan Desa</p>
                    <p className="text-2xl font-black text-emerald-400 mt-1">
                      Rp {(apbdesData.totalPendapatan / 1000000000).toFixed(2)} Miliar
                    </p>
                    <span className="text-[11px] text-slate-400">Dana Desa, ADD & PADes</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700">
                    <p className="text-xs text-slate-400 font-medium">Total Belanja Desa</p>
                    <p className="text-2xl font-black text-amber-400 mt-1">
                      Rp {(apbdesData.totalBelanja / 1000000000).toFixed(2)} Miliar
                    </p>
                    <span className="text-[11px] text-slate-400">Pembangunan & Pemberdayaan</span>
                  </div>
                </div>

                {/* Progress breakdown */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Alokasi Bidang Belanja Utama:
                  </p>
                  {apbdesData.belanja.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">{item.bidang}</span>
                        <span className="font-bold text-white">{item.persen}%</span>
                      </div>
                      <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.warna} rounded-full`}
                          style={{ width: `${item.persen}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BERITA & KABAR TERKINI DESA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
              Warta Kedung Jaya
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Berita & Pengumuman Terbaru
            </h2>
          </div>
          <Link
            to="/berita"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800"
          >
            <span>Semua Kabar Desa</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBerita.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-brand-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {item.kategori}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.tanggal}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-brand-700 transition-colors line-clamp-2">
                    {item.judul}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.ringkasan}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{item.penulis}</span>
                  <Link
                    to={`/berita?id=${item.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:text-brand-700"
                  >
                    <span>Baca</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* POTENSI DESA & PRODUK UMKM */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
                Ekonomi Kreatif Warga
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Produk Unggulan UMKM Desa
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Dukung perputaran ekonomi lokal dengan berbelanja produk asli karya warga Kedung Jaya.
              </p>
            </div>
            <Link
              to="/umkm"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800"
            >
              <span>Katalog Lengkap UMKM</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {umkmProduk.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-card transition-all group flex flex-col justify-between"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 font-bold text-xs px-2.5 py-1 rounded-full shadow-sm">
                    {item.kategori}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-700 transition-colors">
                      {item.nama}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{item.produsen}</p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Harga Produk</span>
                      <span className="text-base font-extrabold text-brand-700">
                        Rp {item.harga.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/${item.kontakWA}?text=Halo%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(item.nama)}%20di%20Website%20Desa%20Kedung%20Jaya`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Pesan (WA)</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI KEGIATAN DESA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
            Dokumentasi Desa
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Galeri Kegiatan & Guyub Warga
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galeriKegiatan.map((item) => (
            <div
              key={item.id}
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm border border-slate-200"
            >
              <img
                src={item.gambar}
                alt={item.judul}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                  {item.kategori}
                </span>
                <p className="text-xs sm:text-sm font-bold text-white mt-0.5 leading-snug">
                  {item.judul}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA LAPOR & PENGADUAN WARGA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-brand-500/30 text-emerald-300 text-xs font-bold border border-brand-400/30">
              Kanal Aspirasi & Pengaduan
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Punya Masukan atau Ingin Melaporkan Fasilitas Rusak?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Pemerintah Desa Kedung Jaya membuka ruang seluas-luasnya untuk aspirasi, laporan jalan rusak, lampu PJU mati, atau saran pelayanan dari seluruh warga.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/kontak"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Kirim Laporan / Aspirasi</span>
              </Link>
              <a
                href={`https://wa.me/${desaInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Hotline WhatsApp Desa</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

