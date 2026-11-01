import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, FileCheck, 
  Search, CheckCircle2, ChevronRight, FileText, Send, 
  RotateCcw, Printer, Filter, Award, UserCheck, XCircle,
  AlertTriangle, Phone, MessageSquare, ShieldCheck
} from 'lucide-react';
import { getSuratForOperator, forwardToKades, rejectOrReviseSurat, getAllSurat } from '../../services/workflowService';
import { 
  getPendingRtRegistrations, 
  approveRtRegistration, 
  rejectRtRegistration,
  getAllRtAccounts 
} from '../../services/authService';
import SuratResmiModal from '../../components/SuratResmiModal';

export default function OperatorDashboard() {
  const [berkasLoket, setBerkasLoket] = useState(getSuratForOperator());
  const [pendingRts, setPendingRts] = useState(() => getPendingRtRegistrations());
  const [allRts, setAllRts] = useState(() => getAllRtAccounts());
  const [activeTab, setActiveTab] = useState('surat'); // 'surat' | 'verifikasi_rt'
  const [previewSurat, setPreviewSurat] = useState(null);
  
  const [drafKadesCount, setDrafKadesCount] = useState(() => 
    getAllSurat().filter(s => s.status === 'MENUNGGU_TTE_KADES').length
  );
  const [suratTerbitCount, setSuratTerbitCount] = useState(() => 
    getAllSurat().filter(s => s.status === 'SELESAI_TERBIT').length
  );

  const refreshList = () => {
    setBerkasLoket(getSuratForOperator());
    setPendingRts(getPendingRtRegistrations());
    setAllRts(getAllRtAccounts());
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

  const handleApproveRt = (userId, namaRt, wilayah) => {
    if (window.confirm(`Setujui pendaftaran akun Ketua ${wilayah} atas nama ${namaRt}?\nAkun akan langsung aktif dan memiliki wewenang mengesahkan surat pengantar warga.`)) {
      approveRtRegistration(userId, 'Dewi Lestari, S.Pd (Operator Pelayanan)');
      refreshList();
      alert(`Sukses! Akun Ketua ${wilayah} (${namaRt}) telah berhasil diaktifkan.`);
    }
  };

  const handleRejectRt = (userId, namaRt, wilayah) => {
    const alasan = window.prompt(`Masukkan alasan penolakan akun ${namaRt} (${wilayah}):`, 'SK Pengangkatan tidak sesuai dengan pangkalan data desa');
    if (alasan) {
      rejectRtRegistration(userId, alasan, 'Dewi Lestari, S.Pd (Operator Pelayanan)');
      refreshList();
      alert(`Pendaftaran akun ${namaRt} telah ditolak.`);
    }
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
              <span className="text-xs font-bold text-slate-700">Verifikasi RT/RW</span>
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                pendingRts.length > 0 ? 'bg-amber-100 text-amber-700 animate-bounce' : 'bg-blue-100 text-blue-700'
              }`}>
                <Award className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">{pendingRts.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">akun</span>
            </div>
            <p className={`text-[11px] font-bold mt-1 ${pendingRts.length > 0 ? 'text-amber-700' : 'text-slate-400'}`}>
              {pendingRts.length > 0 ? 'Menunggu SK Desa' : 'Semua RT disahkan'}
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

        {/* TAB TOGGLE: BERKAS SURAT vs VERIFIKASI RT/RW */}
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
            onClick={() => setActiveTab('verifikasi_rt')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 relative ${
              activeTab === 'verifikasi_rt'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Verifikasi RT ({pendingRts.length})</span>
            {pendingRts.length > 0 && (
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

        {/* TAB 2: VERIFIKASI AKUN PENDAFTARAN KETUA RT/RW */}
        {activeTab === 'verifikasi_rt' && (
          <div className="space-y-4">
            
            {/* NOTICE BANNER SK VERIFIKASI */}
            <div className="bg-amber-600 text-white rounded-2xl p-4 shadow-sm space-y-2">
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-100" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-800 text-amber-100 font-extrabold text-[10px]">
                  PENGESAHAN SK DESA
                </span>
              </div>

              <h3 className="text-xs font-extrabold text-white pt-1">
                Wewenang Verifikasi Akun RT/RW
              </h3>
              <p className="text-[11px] text-amber-50 leading-relaxed font-light">
                Calon pengurus yang mendaftar sebagai RT/RW <strong>tidak bisa langsung login</strong> sampai identitas dan SK Pengangkatan disahkan oleh staf Kantor Desa di sini.
              </p>
            </div>

            {/* PENDING LIST */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-amber-600"></span>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Menunggu Verifikasi & SK ({pendingRts.length})
                  </h3>
                </div>
                {pendingRts.length > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    Perlu Ditindaklanjuti
                  </span>
                )}
              </div>

              {pendingRts.length === 0 ? (
                <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0b5e42] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">Tidak ada pendaftaran RT/RW pending</p>
                  <p className="text-[11px] text-slate-400">
                    Semua akun Ketua RT/RW yang mendaftar telah terverifikasi atau disahkan.
                  </p>
                </div>
              ) : (
                pendingRts.map(rtUser => (
                  <div key={rtUser.id} className="bg-white rounded-2xl p-4 shadow-sm border border-amber-200 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 inline-block mb-1">
                          PENDAFTAR BARU
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900">{rtUser.nama}</h4>
                        <p className="text-[11px] font-mono text-slate-500">NIK: {rtUser.nik}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200 block">
                          {rtUser.wilayahTugas || rtUser.rtRw || 'RT 01 / RW 01'}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">{rtUser.dusun}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400">WhatsApp:</span>
                        <a
                          href={`https://wa.me/${rtUser.telepon.replace(/[^0-9]/g, '')}?text=Halo%20Bpk/Ibu%20${encodeURIComponent(rtUser.nama)},%20kami%20dari%20Kantor%20Desa%20Kedung%20Jaya%20ingin%20memverifikasi%20SK%20pendaftaran%20Ketua%20${encodeURIComponent(rtUser.wilayahTugas)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[#0b5e42] hover:underline flex items-center gap-1 font-mono"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{rtUser.telepon}</span>
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400">Waktu Daftar:</span>
                        <span className="font-medium text-slate-700">
                          {rtUser.tanggalDaftar ? new Date(rtUser.tanggalDaftar).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Hari ini'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleApproveRt(rtUser.id, rtUser.nama, rtUser.wilayahTugas || rtUser.rtRw)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>✓ Setujui & Aktifkan</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRejectRt(rtUser.id, rtUser.nama, rtUser.wilayahTugas || rtUser.rtRw)}
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

            {/* LIST OF CURRENTLY REGISTERED RT/RW ACCOUNTS */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-cyan-700"></span>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Daftar Akun Ketua RT/RW Terdaftar
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {allRts.length} Akun
                </span>
              </div>

              <div className="space-y-2">
                {allRts.map(rt => (
                  <div key={rt.id} className="bg-white rounded-xl p-3 shadow-xs border border-slate-200/80 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{rt.nama}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full ${
                          rt.statusVerifikasi === 'TERVERIFIKASI'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rt.statusVerifikasi === 'DITOLAK'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {rt.statusVerifikasi === 'TERVERIFIKASI' ? 'AKTIF' : rt.statusVerifikasi}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {rt.wilayahTugas || rt.rtRw} • {rt.telepon}
                      </p>
                    </div>

                    {rt.statusVerifikasi === 'TERVERIFIKASI' && (
                      <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Sah</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

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
