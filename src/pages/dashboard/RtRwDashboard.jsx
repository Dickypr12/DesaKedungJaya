import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, Users, 
  FileCheck, CheckCircle2, ChevronRight, Home, Phone,
  ThumbsUp, XCircle, AlertCircle, MapPin, Settings, Eye, X, Image, FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { updateUserWilayahRT } from '../../services/authService';
import { getSuratForRT, approveByRT, rejectOrReviseSurat, getAllSurat } from '../../services/workflowService';

export default function RtRwDashboard() {
  const { user } = useAuth();
  
  // Ambil wilayah RT awal dari profil akun (default: RT 03 / RW 02)
  const userTerritory = user?.wilayahTugas || user?.wilayah_rt || user?.rtRw || 'RT 03 / RW 02';
  
  // Ekstrak nomor RT & RW awal
  const parsedRT = userTerritory.match(/RT\s*(\d+)/i)?.[1]?.padStart(2, '0') || '03';
  const parsedRW = userTerritory.match(/RW\s*(\d+)/i)?.[1]?.padStart(2, '0') || '02';

  const [selectedRT, setSelectedRT] = useState(parsedRT);
  const [selectedRW, setSelectedRW] = useState(parsedRW);
  const [modalFotoKK, setModalFotoKK] = useState(null);

  const activeWilayah = `RT ${selectedRT} / RW ${selectedRW}`;

  const [antreanRT, setAntreanRT] = useState([]);
  const [disetujuiCount, setDisetujuiCount] = useState(0);

  const refreshList = (wilayah = activeWilayah) => {
    setAntreanRT(getSuratForRT(wilayah));
    setDisetujuiCount(getAllSurat().filter(s => s.status !== 'MENUNGGU_RT' && (s.wilayahRT === wilayah)).length);
  };

  useEffect(() => {
    refreshList(activeWilayah);
  }, [selectedRT, selectedRW]);

  // Handler saat Pak RT mengganti wilayah tugas yang diawasi
  const handleWilayahChange = (newRT, newRW) => {
    setSelectedRT(newRT);
    setSelectedRW(newRW);
    const newWilayah = `RT ${newRT} / RW ${newRW}`;
    if (user?.id) {
      updateUserWilayahRT(user.id, newWilayah);
    }
  };

  const handleApprove = (id, pemohonNama) => {
    const penandatangan = `${user?.nama || 'Ketua RT'} (Ketua ${activeWilayah})`;
    approveByRT(id, penandatangan);
    refreshList();
    alert(`Pengantar untuk ${pemohonNama} berhasil disahkan oleh Ketua ${activeWilayah}! Berkas otomatis diteruskan ke loket Operator Pelayanan.`);
  };

  const handleReject = (id, pemohonNama) => {
    rejectOrReviseSurat(id, `Syarat pengantar belum lengkap menurut catatan Ketua ${activeWilayah}`, `Ketua ${activeWilayah}`);
    refreshList();
    alert(`Berkas ${pemohonNama} dikembalikan untuk melengkapi berkas.`);
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
                  Verifikasi Surat & Pengantar RT / RW
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                  <Shield className="w-3 h-3 text-blue-800" />
                  <span>{activeWilayah} Aktif</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Pemerintah Desa Kedung Jaya • Hak Akses Verifikator Lingkungan Warga
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-extrabold text-slate-900 block">{user?.nama || 'Ketua RT'}</span>
              <span className="text-[11px] text-blue-700 font-bold">Ketua {activeWilayah}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 4x1 STATS METRIC GRID RESPONSIVE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Perlu Pengantar</span>
              <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">{antreanRT.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">warga</span>
            </div>
            <p className="text-[11px] font-bold text-rose-600 mt-1">
              Khusus wilayah {activeWilayah}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Pengantar Terbit</span>
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <FileCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">{disetujuiCount}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">berkas</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              {disetujuiCount > 0 ? 'Telah Disahkan RT' : 'Mulai dari 0'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Wilayah Tugas</span>
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl font-black text-blue-900 leading-none">{activeWilayah}</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              Fokus Verifikasi
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Status Akun RT</span>
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-lg sm:text-xl font-black text-slate-900 leading-none">Aktif Resmi</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1">
              SK Terdaftar Pemdes
            </p>
          </div>

        </div>

        {/* 2-COLUMN GRID ON LAPTOP / DESKTOP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: ANTREAN PERMOHONAN PENGANTAR */}
          <div className="lg:col-span-8 space-y-6">

        {/* SECTION: ANTREAN PERMOHONAN PENGANTAR */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-blue-700"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Permohonan Pengantar {activeWilayah}
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {antreanRT.length} Menunggu
            </span>
          </div>

          {antreanRT.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-700">Tidak ada antrean surat untuk {activeWilayah}</p>
              <p className="text-[11px] text-slate-400">
                Surat yang diajukan oleh warga yang memilih {activeWilayah} akan otomatis muncul di sini.
              </p>
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
                  <p className="text-[10px] font-semibold text-blue-700">Wilayah Pemohon: {item.wilayahRT || activeWilayah}</p>
                </div>

                {/* TOMBOL LIHAT FOTO KARTU KELUARGA (KK) */}
                <div>
                  {item.fotoKK ? (
                    <button
                      type="button"
                      onClick={() => setModalFotoKK(item)}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-[#0b5e42] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs"
                    >
                      <Eye className="w-4 h-4 text-emerald-700" />
                      <span>Periksa Foto Kartu Keluarga (KK)</span>
                    </button>
                  ) : (
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Foto KK belum dilampirkan pemohon.</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleApprove(item.id, item.pemohonNama || item.nama)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sahkan Pengantar RT</span>
                  </button>

                  <button
                    onClick={() => handleReject(item.id, item.pemohonNama || item.nama)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                  >
                    Tolak / Revisi
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

          </div>

          {/* RIGHT COLUMN: PROFIL RT, WILAYAH SELECTOR, & PANDUAN */}
          <div className="lg:col-span-4 space-y-6">

            {/* PROFILE CARD RT & WILAYAH SELECTOR */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-4">
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80"
                    alt={user?.nama || 'Ketua RT'}
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-blue-800 tracking-wider uppercase block">
                    Ketua Rukun Tetangga
                  </span>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                    {user?.nama || 'Bpk. Mulyono'}
                  </h2>
                  <p className="text-xs text-slate-500 truncate">
                    {activeWilayah} • {user?.dusun || 'Desa Kedungjaya'}
                  </p>
                </div>
              </div>

              {/* KONTROL GANTI / PILIH WILAYAH RT RW */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                  <MapPin className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Ganti Wilayah Pengawasan:</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-semibold block mb-1">Rukun Tetangga (RT)</label>
                    <select
                      value={selectedRT}
                      onChange={(e) => handleWilayahChange(e.target.value, selectedRW)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-blue-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Pilih RT yang diverifikasi"
                    >
                      {Array.from({ length: 22 }, (_, i) => String(i + 1).padStart(2, '0')).map(num => (
                        <option key={num} value={num}>RT {num}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 font-semibold block mb-1">Rukun Warga (RW)</label>
                    <select
                      value={selectedRW}
                      onChange={(e) => handleWilayahChange(selectedRT, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-blue-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Pilih RW yang diverifikasi"
                    >
                      {Array.from({ length: 6 }, (_, i) => String(i + 1).padStart(2, '0')).map(num => (
                        <option key={num} value={num}>RW {num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  Mengubah wilayah akan menyaring otomatis antrean warga di RT/RW tersebut.
                </p>
              </div>
            </div>

            {/* NOTICE CARD WEWENANG RT */}
            <div className="bg-blue-800 text-white rounded-2xl p-5 shadow-sm space-y-2.5">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-200" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-900 text-white font-extrabold text-[10px]">
                  LEVEL {activeWilayah}
                </span>
              </div>

              <h3 className="text-xs font-extrabold text-white pt-1">
                Isolasi Berkas Lingkungan {activeWilayah}
              </h3>
              <p className="text-xs text-blue-100/90 leading-relaxed font-light">
                Sistem secara ketat hanya menampilkan permohonan surat dari warga yang memilih pengesahan di wilayah {activeWilayah}. Berkas dari RT/RW lain tidak akan tercampur di akun Anda.
              </p>
            </div>

            {/* PANDUAN RINGKAS PEMERIKSAAN RT */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900">
                Langkah Verifikasi Pak RT:
              </h4>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                  <span>Tekan tombol <strong>"Periksa Foto Kartu Keluarga"</strong> untuk mengecek kesesuaian identitas pemohon.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                  <span>Jika pemohon benar warga {activeWilayah}, klik <strong>"Sahkan Pengantar RT"</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                  <span>Berkas otomatis terkirim ke loket kantor desa tanpa perlu tanda tangan basah di kertas.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* MODAL VERIFIKASI FOTO KARTU KELUARGA (KK) UNTUK PAK RT */}
      {modalFotoKK && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                  Verifikasi Faktual Warga Lingkungan
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  Foto Kartu Keluarga (KK) Pemohon
                </h3>
              </div>
              <button
                onClick={() => setModalFotoKK(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* INFO PEMOHON */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Pemohon:</span>
                <strong className="text-slate-900">{modalFotoKK.pemohonNama}</strong>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500 font-sans">NIK:</span>
                <span className="font-bold text-slate-800">{modalFotoKK.pemohonNik}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Wilayah Pengesahan:</span>
                <span className="font-bold text-blue-800">{modalFotoKK.wilayahRT}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jenis Surat:</span>
                <span className="text-slate-800 font-semibold">{modalFotoKK.jenis}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Keperluan:</span>
                <span className="text-slate-700 italic">{modalFotoKK.keperluan}</span>
              </div>
            </div>

            {/* HASIL FOTO KARTU KELUARGA */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700 block">
                Foto Dokumen Kartu Keluarga (KK):
              </span>
              <div className="bg-slate-900 rounded-2xl p-2 border border-slate-300 flex items-center justify-center overflow-hidden max-h-80">
                <img
                  src={modalFotoKK.fotoKK}
                  alt="Kartu Keluarga Pemohon"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <p className="text-[10px] text-slate-400 text-center italic">
                Periksa apakah nama dan NIK pemohon tercantum dalam Kartu Keluarga di atas dan benar warga {activeWilayah}.
              </p>
            </div>

            {/* TOMBOL TINDAKAN PAK RT */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  handleApprove(modalFotoKK.id, modalFotoKK.pemohonNama);
                  setModalFotoKK(null);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>✓ Benar Warga Saya (Sahkan Pengantar RT)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleReject(modalFotoKK.id, modalFotoKK.pemohonNama);
                  setModalFotoKK(null);
                }}
                className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors"
              >
                ✕ Bukan Warga / Foto Tidak Sesuai (Tolak)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
