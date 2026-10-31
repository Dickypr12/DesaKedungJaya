import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FileText, Search, CheckCircle2, Clock, AlertCircle, 
  UploadCloud, ArrowRight, ShieldCheck, Download, Copy, ExternalLink,
  ChevronDown, ChevronUp, Send, Check
} from 'lucide-react';
import { daftarLayanan, desaInfo } from '../data/desaData';

export default function LayananPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialType = searchParams.get('type') || 'sku';
  const initialTab = searchParams.get('tab') || 'form';

  const [activeTab, setActiveTab] = useState(initialTab); // 'form', 'tracking', 'syarat'
  const [selectedSuratId, setSelectedSuratId] = useState(initialType);
  
  // State Form
  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    telepon: '',
    dusun: 'Dusun I Kedung Timur',
    rt: '01',
    rw: '01',
    keperluan: '',
    berkasName: '',
  });

  // State Resi Baru Dibuat
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [copied, setCopied] = useState(false);

  // State Tracking
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingError, setTrackingError] = useState('');

  // Sample database tracking tickets
  const [ticketsDatabase, setTicketsDatabase] = useState([
    {
      kode: 'KJ-2026-1042',
      jenisSurat: 'Surat Keterangan Usaha (SKU)',
      pemohon: 'Agus Setiawan',
      nikMasked: '321601********02',
      tanggal: '30 Oktober 2026, 09:15 WIB',
      status: 'SELESAI',
      pesan: 'Surat telah ditandatangani secara elektronik oleh Kepala Desa dan siap diambil di Kantor Desa atau diunduh.',
      stepActive: 4,
    },
    {
      kode: 'KJ-2026-1043',
      jenisSurat: 'Surat Pengantar SKCK Polsek',
      pemohon: 'Dina Mariyana',
      nikMasked: '321601********18',
      tanggal: '31 Oktober 2026, 08:30 WIB',
      status: 'PROSES_VERIFIKASI',
      pesan: 'Berkas e-KTP dan KK sedang diverifikasi oleh Kasi Pelayanan.',
      stepActive: 2,
    }
  ]);

  useEffect(() => {
    if (searchParams.get('type')) {
      setSelectedSuratId(searchParams.get('type'));
    }
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab'));
    }
  }, [location.search]);

  const selectedSurat = daftarLayanan.find(s => s.id === selectedSuratId) || daftarLayanan[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, berkasName: e.target.files[0].name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nik || !formData.nama || !formData.telepon || !formData.keperluan) {
      alert('Mohon lengkapi NIK, Nama Lengkap, Nomor HP/WhatsApp, dan Keperluan Surat.');
      return;
    }

    // Generate random Ticket Number
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newTicketCode = `KJ-2026-${randomDigits}`;
    
    const newTicket = {
      kode: newTicketCode,
      jenisSurat: selectedSurat.nama,
      pemohon: formData.nama,
      nikMasked: formData.nik.substring(0, 6) + '********' + formData.nik.substring(formData.nik.length - 2),
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      status: 'MENUNGGU_VERIFIKASI',
      pesan: 'Permohonan berhasil dikirim ke loket pelayanan. Menunggu pengecekan awal petugas desa.',
      stepActive: 1,
    };

    setTicketsDatabase(prev => [newTicket, ...prev]);
    setSubmittedTicket(newTicket);
  };

  const handleSearchTracking = (e) => {
    e.preventDefault();
    setTrackingError('');
    setTrackingResult(null);

    const query = trackingInput.trim().toUpperCase();
    if (!query) {
      setTrackingError('Masukkan nomor tiket (contoh: KJ-2026-1042) atau NIK.');
      return;
    }

    const found = ticketsDatabase.find(t => 
      t.kode.toUpperCase() === query || t.nikMasked.replace(/[^0-9]/g, '') === query.replace(/[^0-9]/g, '')
    );

    if (found) {
      setTrackingResult(found);
    } else {
      setTrackingError(`Tiket dengan kode "${trackingInput}" tidak ditemukan. Pastikan format nomor tiket benar atau coba contoh: KJ-2026-1042.`);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* HEADER */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800/80 text-emerald-300 text-xs font-semibold">
              <FileText className="w-3.5 h-3.5" />
              <span>Layanan Mandiri Warga Desa</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Pelayanan Surat Online & Lacak Dokumen
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Ajukan pembuatan dokumen administrasi kependudukan dari rumah kapan saja. Cepat, transparan, dan tanpa dipungut biaya retribusi apapun.
            </p>
          </div>
        </div>
      </section>

      {/* TAB NAVIGATION */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-2 ${
              activeTab === 'form'
                ? 'border-brand-600 text-brand-700 bg-brand-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Formulir Pengajuan Surat</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-2 ${
              activeTab === 'tracking'
                ? 'border-brand-600 text-brand-700 bg-brand-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Lacak Status Dokumen</span>
          </button>

          <button
            onClick={() => setActiveTab('syarat')}
            className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-2 ${
              activeTab === 'syarat'
                ? 'border-brand-600 text-brand-700 bg-brand-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Syarat & Prosedur</span>
          </button>
        </div>
      </div>

      {/* TAB 1: FORMULIR PENGAJUAN */}
      {activeTab === 'form' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success Submission Alert */}
          {submittedTicket && (
            <div className="mb-8 p-6 bg-emerald-50 border-2 border-emerald-500 rounded-3xl shadow-lg space-y-4 animate-fadeIn">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-emerald-900">
                      Permohonan Surat Berhasil Dikirim!
                    </h3>
                    <p className="text-xs text-emerald-700">
                      Simpan Nomor Tiket Anda untuk memantau status pengerjaan dokumen.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
                >
                  ✕ Tutup
                </button>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase">Nomor Tiket Anda:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl font-black font-mono text-brand-700">
                      {submittedTicket.kode}
                    </span>
                    <button
                      onClick={() => copyToClipboard(submittedTicket.kode)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs flex items-center gap-1 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setTrackingInput(submittedTicket.kode);
                      setTrackingResult(submittedTicket);
                      setActiveTab('tracking');
                    }}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    Lacak Tiket Ini Sekarang →
                  </button>
                </div>
              </div>

              <p className="text-xs text-emerald-800">
                Notifikasi otomatis juga akan dikirimkan ke nomor WhatsApp <strong>{formData.telepon}</strong> saat surat siap diambil.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Pilihan Surat */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
                  Pilih Dokumen Surat
                </h3>
                <div className="space-y-2">
                  {daftarLayanan.map((surat) => {
                    const isSelected = surat.id === selectedSuratId;
                    return (
                      <button
                        key={surat.id}
                        type="button"
                        onClick={() => setSelectedSuratId(surat.id)}
                        className={`w-full text-left p-3 rounded-2xl text-xs font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="line-clamp-1">{surat.nama}</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {surat.kode}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Box info syarat surat yang dipilih */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 space-y-3">
                <h4 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Syarat {selectedSurat.kode}:</span>
                </h4>
                <ul className="space-y-2 text-xs text-amber-950">
                  {selectedSurat.syarat.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-amber-200/80 text-[11px] text-amber-800">
                  Biaya: <strong className="text-emerald-700 font-extrabold">{selectedSurat.biaya}</strong> • Estimasi: <strong>{selectedSurat.estimasi}</strong>
                </div>
              </div>
            </div>

            {/* Main Form Fields */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                
                <div>
                  <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
                    Formulir Permohonan
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">
                    {selectedSurat.nama}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Silakan isi identitas data kependudukan Anda secara benar sesuai Kartu Tanda Penduduk (e-KTP).
                  </p>
                </div>

                <div className="space-y-4">
                  {/* NIK */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nomor Induk Kependudukan (NIK 16 Digit) *
                    </label>
                    <input
                      type="text"
                      name="nik"
                      required
                      maxLength="16"
                      value={formData.nik}
                      onChange={handleInputChange}
                      placeholder="Contoh: 3216012304950001"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-sm"
                    />
                  </div>

                  {/* Nama Lengkap */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nama Lengkap (Sesuai KTP) *
                    </label>
                    <input
                      type="text"
                      name="nama"
                      required
                      value={formData.nama}
                      onChange={handleInputChange}
                      placeholder="Nama lengkap pemohon"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                  </div>

                  {/* No WhatsApp & Dusun */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        name="telepon"
                        required
                        value={formData.telepon}
                        onChange={handleInputChange}
                        placeholder="Contoh: 081234567890"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Dusun Domisili *
                      </label>
                      <select
                        name="dusun"
                        value={formData.dusun}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                      >
                        <option>Dusun I Kedung Timur</option>
                        <option>Dusun II Kedung Barat</option>
                        <option>Dusun III Kedung Selatan</option>
                        <option>Dusun IV Kedung Utara</option>
                      </select>
                    </div>
                  </div>

                  {/* RT / RW */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        RT *
                      </label>
                      <input
                        type="text"
                        name="rt"
                        value={formData.rt}
                        onChange={handleInputChange}
                        placeholder="01"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        RW *
                      </label>
                      <input
                        type="text"
                        name="rw"
                        value={formData.rw}
                        onChange={handleInputChange}
                        placeholder="01"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Keperluan Surat */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Keperluan / Alasan Pembuatan Surat *
                    </label>
                    <textarea
                      name="keperluan"
                      required
                      rows="3"
                      value={formData.keperluan}
                      onChange={handleInputChange}
                      placeholder="Jelaskan untuk keperluan apa surat ini diajukan (contoh: Persyaratan pengajuan kredit KUR BRI / Persyaratan beasiswa kuliah)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    ></textarea>
                  </div>

                  {/* Upload Berkas Dokumen (Simulasi) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Unggah Foto Dokumen Pendukung (KTP / KK / Surat RT)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-2xl p-6 text-center cursor-pointer transition-colors relative bg-slate-50 hover:bg-slate-100">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*,application/pdf"
                      />
                      <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      {formData.berkasName ? (
                        <p className="text-xs font-bold text-brand-700">
                          File terpilih: {formData.berkasName}
                        </p>
                      ) : (
                        <>
                          <p className="text-xs font-semibold text-slate-700">
                            Klik atau seret file foto KTP / KK ke sini
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Format JPG, PNG, atau PDF (Maksimal 5 MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-bold text-base shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Kirim Permohonan Surat Online</span>
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-3">
                    Dengan menekan tombol di atas, Anda menyatakan bahwa data yang diisikan adalah benar dan dapat dipertanggungjawabkan.
                  </p>
                </div>

              </form>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: LACAK TIKET DOKUMEN */}
      {activeTab === 'tracking' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Tracking Search Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="max-w-xl space-y-1">
              <h2 className="text-2xl font-black text-slate-900">
                Lacak Progres Surat Anda
              </h2>
              <p className="text-xs text-slate-500">
                Masukkan Nomor Resi/Tiket (contoh: <strong>KJ-2026-1042</strong>) untuk melihat status terkini.
              </p>
            </div>

            <form onSubmit={handleSearchTracking} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Masukkan Nomor Tiket (misal: KJ-2026-1042)"
                className="flex-1 px-5 py-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-mono"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Cari Status</span>
              </button>
            </form>

            {/* Quick Demo Helpers */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500">
              <span>Coba tiket demo:</span>
              <button
                type="button"
                onClick={() => {
                  setTrackingInput('KJ-2026-1042');
                  setTrackingResult(ticketsDatabase.find(t => t.kode === 'KJ-2026-1042'));
                  setTrackingError('');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-brand-700 font-mono font-semibold"
              >
                KJ-2026-1042 (Selesai)
              </button>
              <button
                type="button"
                onClick={() => {
                  setTrackingInput('KJ-2026-1043');
                  setTrackingResult(ticketsDatabase.find(t => t.kode === 'KJ-2026-1043'));
                  setTrackingError('');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-brand-700 font-mono font-semibold"
              >
                KJ-2026-1043 (Verifikasi)
              </button>
            </div>

            {trackingError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{trackingError}</span>
              </div>
            )}
          </div>

          {/* Tracking Result View */}
          {trackingResult && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card space-y-8 animate-fadeIn">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-lg border border-brand-200">
                    {trackingResult.kode}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {trackingResult.jenisSurat}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Pemohon: <strong>{trackingResult.pemohon}</strong> • Diajukan pada: {trackingResult.tanggal}
                  </p>
                </div>

                <div>
                  <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold ${
                    trackingResult.stepActive === 4
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {trackingResult.stepActive === 4 ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    <span>{trackingResult.status.replace('_', ' ')}</span>
                  </span>
                </div>
              </div>

              {/* Status Stepper Tracker */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Alur Proses Dokumen:
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  
                  {/* Step 1 */}
                  <div className={`p-4 rounded-2xl border text-center space-y-2 ${
                    trackingResult.stepActive >= 1 
                      ? 'bg-brand-50 border-brand-300 text-brand-900' 
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${
                      trackingResult.stepActive >= 1 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      1
                    </div>
                    <p className="text-xs font-bold">Pengajuan Diterima</p>
                    <p className="text-[10px] text-slate-500">Berkas masuk sistem</p>
                  </div>

                  {/* Step 2 */}
                  <div className={`p-4 rounded-2xl border text-center space-y-2 ${
                    trackingResult.stepActive >= 2 
                      ? 'bg-brand-50 border-brand-300 text-brand-900' 
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${
                      trackingResult.stepActive >= 2 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      2
                    </div>
                    <p className="text-xs font-bold">Verifikasi Berkas</p>
                    <p className="text-[10px] text-slate-500">Pemeriksaan syarat NIK & KK</p>
                  </div>

                  {/* Step 3 */}
                  <div className={`p-4 rounded-2xl border text-center space-y-2 ${
                    trackingResult.stepActive >= 3 
                      ? 'bg-brand-50 border-brand-300 text-brand-900' 
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${
                      trackingResult.stepActive >= 3 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      3
                    </div>
                    <p className="text-xs font-bold">Tanda Tangan Kades</p>
                    <p className="text-[10px] text-slate-500">Pengesahan resmi / barcode</p>
                  </div>

                  {/* Step 4 */}
                  <div className={`p-4 rounded-2xl border text-center space-y-2 ${
                    trackingResult.stepActive >= 4 
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950' 
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${
                      trackingResult.stepActive >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      4
                    </div>
                    <p className="text-xs font-bold">Selesai & Siap Ambil</p>
                    <p className="text-[10px] text-slate-500">Loket Pelayanan Desa</p>
                  </div>

                </div>
              </div>

              {/* Message from Office */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-700">Catatan Petugas Loket:</span>
                <p className="text-slate-600 leading-relaxed">{trackingResult.pesan}</p>
              </div>

              {trackingResult.stepActive === 4 && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-emerald-900">
                    <p className="font-bold">Dokumen Fisik Sudah Dicetak & Divalidasi</p>
                    <p className="text-emerald-700 mt-0.5">Silakan ambil di Kantor Balai Desa Kedung Jaya membawa KTP asli.</p>
                  </div>
                  <a
                    href={`https://wa.me/${desaInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Admin%20Desa%20Kedung%20Jaya,%20saya%20ingin%20mengonfirmasi%20tiket%20${trackingResult.kode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 shrink-0"
                  >
                    <span>Konfirmasi Pengambilan via WA</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* TAB 3: KATALOG PERSYARATAN LENGKAP */}
      {activeTab === 'syarat' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-2xl font-black text-slate-900">
              Standar Operasional Pelayanan (SOP) Desa
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Panduan lengkap berkas dokumen yang perlu disiapkan untuk setiap pengurusan surat di Kantor Desa Kedung Jaya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {daftarLayanan.map((surat) => (
              <div
                key={surat.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-mono font-bold text-xs text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg">
                      {surat.kode}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {surat.biaya}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base mt-3">
                    {surat.nama}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {surat.deskripsi}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <p className="text-xs font-bold text-slate-700">Persyaratan Wajib:</p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {surat.syarat.map((syarat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{syarat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">⏱ Estimasi: {surat.estimasi}</span>
                  <button
                    onClick={() => {
                      setSelectedSuratId(surat.id);
                      setActiveTab('form');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    Ajukan Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
