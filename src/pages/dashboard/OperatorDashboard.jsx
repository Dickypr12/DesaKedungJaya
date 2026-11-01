import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, FileCheck, 
  Search, CheckCircle2, ChevronRight, FileText, Send, 
  RotateCcw, Printer, Filter, Award, UserCheck, XCircle,
  AlertTriangle, Phone, MessageSquare, ShieldCheck,
  CreditCard, Eye, X, Image as ImageIcon, ZoomIn
} from 'lucide-react';
import { getSuratForOperator, forwardToKades, rejectOrReviseSurat, getAllSurat } from '../../services/workflowService';
import { 
  getPendingRegistrations, 
  approveRegistration, 
  rejectRegistration,
  getAllUsers 
} from '../../services/authService';
import SuratResmiModal from '../../components/SuratResmiModal';

export default function OperatorDashboard() {
  const [berkasLoket, setBerkasLoket] = useState(getSuratForOperator());
  const [pendingUsers, setPendingUsers] = useState(() => getPendingRegistrations());
  const [activeTab, setActiveTab] = useState('surat'); // 'surat' | 'verifikasi_akun'
  const [filterRole, setFilterRole] = useState('ALL'); // 'ALL' | 'warga' | 'rtrw'
  const [previewSurat, setPreviewSurat] = useState(null);
  const [inspectDoc, setInspectDoc] = useState(null); // { title, src, user, docType }

  const [drafKadesCount, setDrafKadesCount] = useState(() => 
    getAllSurat().filter(s => s.status === 'MENUNGGU_TTE_KADES').length
  );
  const [suratTerbitCount, setSuratTerbitCount] = useState(() => 
    getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').length
  );

  const refreshList = () => {
    setBerkasLoket(getSuratForOperator());
    setPendingUsers(getPendingRegistrations());
    setDrafKadesCount(getAllSurat().filter(s => s.status === 'MENUNGGU_TTE_KADES').length);
    setSuratTerbitCount(getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').length);
  };

  const handleForwardToKades = (id, jenisSurat) => {
    forwardToKades(id, 'Dewi Lestari, S.Pd (Operator)');
    setDrafKadesCount(prev => prev + 1);
    refreshList();
    alert(`Berkas ${jenisSurat} telah lengkap diverifikasi dan otomatis masuk ke antrean TTE Kepala Desa!`);
  };

  const handleRejectSurat = (id, jenisSurat) => {
    rejectOrReviseSurat(id, 'Berkas KTP/KK tidak jelas / belum lengkap', 'Operator Pelayanan');
    refreshList();
    alert(`Berkas ${jenisSurat} dikembalikan ke pemohon untuk revisi.`);
  };

  const handleApproveUser = (userId, namaUser, role, wilayah) => {
    const roleLabel = role === 'rtrw' ? `Ketua ${wilayah || 'RT/RW'}` : 'Warga';
    if (window.confirm(`Setujui & aktifkan akun ${roleLabel} atas nama "${namaUser}"?\n\nFoto fisik e-KTP dan Kartu Keluarga telah dinyatakan valid dan sesuai Buku Induk Desa.`)) {
      approveRegistration(userId, 'Dewi Lestari, S.Pd (Operator Pelayanan)');
      if (inspectDoc) setInspectDoc(null);
      refreshList();
      alert(`Sukses! Akun ${roleLabel} (${namaUser}) telah berhasil DISETUJUI & DIAKTIFKAN. Pemohon sekarang sudah bisa login.`);
    }
  };

  const handleRejectUser = (userId, namaUser, role) => {
    const roleLabel = role === 'rtrw' ? 'Ketua RT/RW' : 'Warga';
    const alasan = window.prompt(`Masukkan alasan penolakan pendaftaran ${roleLabel} (${namaUser}):`, 'Foto e-KTP atau Kartu Keluarga buram / tidak sesuai data kependudukan desa');
    if (alasan) {
      rejectRegistration(userId, alasan, 'Dewi Lestari, S.Pd (Operator Pelayanan)');
      if (inspectDoc) setInspectDoc(null);
      refreshList();
      alert(`Pendaftaran akun ${namaUser} telah ditolak.`);
    }
  };

  const filteredPending = pendingUsers.filter(u => {
    if (filterRole === 'ALL') return true;
    return u.role === filterRole;
  });

  const pendingWargaCount = pendingUsers.filter(u => u.role === 'warga').length;
  const pendingRtCount = pendingUsers.filter(u => u.role === 'rtrw').length;

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
              <span className="text-xs font-bold text-slate-700">Antrean Surat</span>
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
              <span className="text-xs font-bold text-slate-700">Verifikasi KTP & KK</span>
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                pendingUsers.length > 0 ? 'bg-amber-100 text-amber-700 animate-bounce' : 'bg-emerald-100 text-emerald-700'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">{pendingUsers.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">akun</span>
            </div>
            <p className={`text-[11px] font-bold mt-1 ${pendingUsers.length > 0 ? 'text-amber-700' : 'text-slate-400'}`}>
              {pendingUsers.length > 0 ? `${pendingWargaCount} Warga, ${pendingRtCount} RT` : 'Semua akun disahkan'}
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

        </div>

        {/* TAB TOGGLE: BERKAS SURAT vs VERIFIKASI AKUN (KTP & KK) */}
        <div className="grid grid-cols-2 gap-2 bg-slate-200/70 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('surat')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'surat'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Berkas Surat ({berkasLoket.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('verifikasi_akun')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 relative ${
              activeTab === 'verifikasi_akun'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verifikasi KTP/KK ({pendingUsers.length})</span>
            {pendingUsers.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute top-2 right-2"></span>
            )}
          </button>
        </div>

        {/* TAB 1: BERKAS SURAT WARGA */}
        {activeTab === 'surat' && (
          <div className="space-y-4">
            
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
            <div className="space-y-3">
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
                      <p className="text-[10px] text-slate-400">Wilayah: {item.wilayahRT || 'RT 03 / RW 02'}</p>
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
                        onClick={() => handleRejectSurat(item.id, item.jenis)}
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
        )}

        {/* TAB 2: VERIFIKASI AKUN PENDAFTARAN (WARGA & RT/RW) */}
        {activeTab === 'verifikasi_akun' && (
          <div className="space-y-4">
            
            {/* NOTICE BANNER VERIFIKASI KTP & KK */}
            <div className="bg-emerald-800 text-white rounded-2xl p-4 shadow-sm space-y-2">
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-200 font-extrabold text-[10px]">
                  VERIFIKASI FISIK DESA
                </span>
              </div>

              <h3 className="text-xs font-extrabold text-white pt-1">
                Pemeriksaan Fisik e-KTP & Kartu Keluarga (KK)
              </h3>
              <p className="text-[11px] text-emerald-100/90 leading-relaxed font-light">
                Seluruh pendaftaran akun baru (Warga maupun RT/RW) <strong>tidak dapat langsung login</strong>. Petugas Loket Desa wajib mencocokkan foto fisik e-KTP dan KK pemohon dengan buku induk kependudukan sebelum mengaktifkan akun.
              </p>
            </div>

            {/* FILTER PILLS */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                type="button"
                onClick={() => setFilterRole('ALL')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 ${
                  filterRole === 'ALL'
                    ? 'bg-[#0b5e42] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Semua ({pendingUsers.length})
              </button>

              <button
                type="button"
                onClick={() => setFilterRole('warga')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 ${
                  filterRole === 'warga'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Warga ({pendingWargaCount})
              </button>

              <button
                type="button"
                onClick={() => setFilterRole('rtrw')}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 ${
                  filterRole === 'rtrw'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Ketua RT/RW ({pendingRtCount})
              </button>
            </div>

            {/* PENDING LIST */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-emerald-700"></span>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Antrean Verifikasi Dokumen ({filteredPending.length})
                  </h3>
                </div>
                {filteredPending.length > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    Menunggu Validasi
                  </span>
                )}
              </div>

              {filteredPending.length === 0 ? (
                <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0b5e42] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">Tidak ada pendaftaran pending</p>
                  <p className="text-[11px] text-slate-400">
                    Semua akun yang mendaftar telah diperiksa dan diaktifkan.
                  </p>
                </div>
              ) : (
                filteredPending.map(user => (
                  <div key={user.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md inline-block mb-1 ${
                          user.role === 'rtrw' ? 'bg-blue-100 text-blue-900' : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {user.role === 'rtrw' ? 'PENDAFTAR KETUA RT/RW' : 'PENDAFTAR WARGA'}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900">{user.nama}</h4>
                        <p className="text-[11px] font-mono text-slate-500">NIK: {user.nik}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200 block">
                          {user.wilayahTugas || user.rtRw || 'RT 01 / RW 01'}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">{user.dusun}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400">WhatsApp:</span>
                        <a
                          href={`https://wa.me/${user.telepon.replace(/[^0-9]/g, '')}?text=Halo%20Bpk/Ibu%20${encodeURIComponent(user.nama)},%20kami%20dari%20Kantor%20Desa%20Kedung%20Jaya%20ingin%20memverifikasi%20dokumen%20KTP%20dan%20KK%20pendaftaran%20Anda`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[#0b5e42] hover:underline flex items-center gap-1 font-mono"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{user.telepon}</span>
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400">Waktu Daftar:</span>
                        <span className="font-medium text-slate-700">
                          {user.tanggalDaftar ? new Date(user.tanggalDaftar).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Hari ini'}
                        </span>
                      </div>
                    </div>

                    {/* DOKUMEN INSPECTION: FOTO KTP & FOTO KK */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-700 block">
                        Dokumen Fisik Wajib Diperiksa:
                      </span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {/* KTP BUTTON & PREVIEW */}
                        <button
                          type="button"
                          onClick={() => setInspectDoc({
                            title: `Pemeriksaan Foto Fisik e-KTP - ${user.nama}`,
                            src: user.fotoKTP,
                            user: user,
                            docType: 'e-KTP'
                          })}
                          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-left flex items-center gap-2 transition-colors group"
                        >
                          {user.fotoKTP ? (
                            <img src={user.fotoKTP} alt="KTP" className="w-9 h-9 rounded-lg object-cover border border-slate-200" />
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                              <CreditCard className="w-4 h-4" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="text-[11px] font-bold text-slate-800 block truncate group-hover:text-[#0b5e42]">
                              Foto e-KTP
                            </span>
                            <span className="text-[9px] text-[#0b5e42] font-semibold flex items-center gap-0.5">
                              <Eye className="w-2.5 h-2.5" /> Buka Foto
                            </span>
                          </div>
                        </button>

                        {/* KK BUTTON & PREVIEW */}
                        <button
                          type="button"
                          onClick={() => setInspectDoc({
                            title: `Pemeriksaan Foto Kartu Keluarga (KK) - ${user.nama}`,
                            src: user.fotoKK,
                            user: user,
                            docType: 'Kartu Keluarga'
                          })}
                          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-left flex items-center gap-2 transition-colors group"
                        >
                          {user.fotoKK ? (
                            <img src={user.fotoKK} alt="KK" className="w-9 h-9 rounded-lg object-cover border border-slate-200" />
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                              <FileText className="w-4 h-4" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="text-[11px] font-bold text-slate-800 block truncate group-hover:text-[#0b5e42]">
                              Foto KK Asli
                            </span>
                            <span className="text-[9px] text-[#0b5e42] font-semibold flex items-center gap-0.5">
                              <Eye className="w-2.5 h-2.5" /> Buka Foto
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleApproveUser(user.id, user.nama, user.role, user.wilayahTugas || user.rtRw)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>✓ Setujui & Aktifkan</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRejectUser(user.id, user.nama, user.role)}
                        className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Tolak</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* LIST OF VERIFIED ACCOUNTS */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-cyan-700"></span>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Pengguna Aktif Terverifikasi Kantor Desa
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {getAllUsers().filter(u => u.statusVerifikasi === 'TERVERIFIKASI').length} Akun
                </span>
              </div>

              <div className="space-y-2">
                {getAllUsers().filter(u => u.statusVerifikasi === 'TERVERIFIKASI').map(user => (
                  <div key={user.id} className="bg-white rounded-xl p-3 shadow-xs border border-slate-200/80 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{user.nama}</span>
                        <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                          {user.role === 'rtrw' ? 'KETUA RT' : user.role === 'warga' ? 'WARGA' : user.role.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {user.wilayahTugas || user.rtRw || user.dusun || 'Desa Kedung Jaya'} • NIK: {user.nik ? user.nik.substring(0, 6) + '********' : '-'}
                      </p>
                    </div>

                    <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Aktif</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* MODAL INSPEKSI FOTO DOKUMEN (KTP / KK) */}
      {inspectDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-extrabold text-cyan-800 uppercase tracking-wider block">
                  Pemeriksaan Keabsahan Dokumen
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 truncate">
                  {inspectDoc.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-900 text-center">
              {inspectDoc.src ? (
                <img
                  src={inspectDoc.src}
                  alt={inspectDoc.docType}
                  className="max-h-[60vh] max-w-full rounded-xl object-contain shadow-md"
                />
              ) : (
                <div className="p-8 text-white/70 space-y-2">
                  <ImageIcon className="w-12 h-12 mx-auto text-slate-500" />
                  <p className="text-xs">Foto dokumen belum terunggah oleh pemohon.</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between gap-3">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900 block">{inspectDoc.user?.nama}</span>
                <span className="text-[10px] text-slate-400 font-mono">NIK: {inspectDoc.user?.nik}</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInspectDoc(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => handleApproveUser(
                    inspectDoc.user?.id, 
                    inspectDoc.user?.nama, 
                    inspectDoc.user?.role, 
                    inspectDoc.user?.wilayahTugas || inspectDoc.user?.rtRw
                  )}
                  className="px-4 py-2 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Setujui Akun Ini</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
