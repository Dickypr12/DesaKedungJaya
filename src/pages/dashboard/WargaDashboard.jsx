import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, FileText, 
  Download, PlusCircle, AlertCircle, CheckCircle2, ChevronRight,
  QrCode, ExternalLink, Send, X, Eye, UploadCloud, Camera, Image
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getSuratByWarga, ajukanSuratBaru } from '../../services/workflowService';
import { getAduanByWarga, buatAduanBaru } from '../../services/aduanService';
import SuratResmiModal from '../../components/SuratResmiModal';

export default function WargaDashboard() {
  const { user } = useAuth();
  const citizenNik = user?.nik || '3216012804920003';
  const citizenNama = user?.nama || 'Hendra Kusuma';

  const [suratList, setSuratList] = useState([]);
  const [aduanList, setAduanList] = useState([]);
  const [modalAjukan, setModalAjukan] = useState(false);
  const [modalPreview, setModalPreview] = useState(null);
  const [modalAduan, setModalAduan] = useState(false);

  // Form input pengajuan baru
  const [jenisSurat, setJenisSurat] = useState('Surat Keterangan Usaha (SKU)');
  const [targetRT, setTargetRT] = useState('03');
  const [targetRW, setTargetRW] = useState('02');
  const [targetDusun, setTargetDusun] = useState('Kp. Wates (Dusun I)');
  const [keperluan, setKeperluan] = useState('');
  const [detailUsaha, setDetailUsaha] = useState('');
  const [fotoKK, setFotoKK] = useState(null);
  const [berkasNameKK, setBerkasNameKK] = useState('');

  const handleFileKKChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFotoKK(reader.result);
        setBerkasNameKK(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form input aduan baru
  const [judulAduan, setJudulAduan] = useState('');
  const [kategoriAduan, setKategoriAduan] = useState('Infrastruktur Jalan & Jembatan');
  const [dusunAduan, setDusunAduan] = useState('Kp. Wates (Dusun I)');
  const [deskripsiAduan, setDeskripsiAduan] = useState('');

  const loadData = () => {
    setSuratList(getSuratByWarga(citizenNik));
    setAduanList(getAduanByWarga(citizenNik));
  };

  useEffect(() => {
    loadData();
  }, [citizenNik]);

  // Pisahkan yang sedang berjalan dan yang sudah selesai
  const suratBerjalan = suratList.filter(s => s.status !== 'SELESAI_TERBIT');
  const suratTerbit = suratList.filter(s => s.status === 'SELESAI_TERBIT');

  const handleAjukan = (e) => {
    e.preventDefault();
    if (!keperluan.trim()) {
      alert('Mohon isi keperluan permohonan surat.');
      return;
    }

    if (!fotoKK) {
      alert('Foto Kartu Keluarga (KK) wajib dilampirkan agar Ketua RT dapat memeriksa apakah Anda benar warga di wilayahnya.');
      return;
    }

    const selectedWilayahRT = `RT ${targetRT} / RW ${targetRW}`;
    ajukanSuratBaru({
      jenis: jenisSurat,
      pemohonNama: citizenNama,
      pemohonNik: citizenNik,
      pemohonTelepon: user?.telepon || '081234567891',
      pemohonAlamat: `${targetDusun}, ${selectedWilayahRT}, Kedungjaya, Kec. Babelan`,
      wilayahRT: selectedWilayahRT,
      keperluan,
      detailUsaha,
      fotoKK
    });

    setKeperluan('');
    setDetailUsaha('');
    setFotoKK(null);
    setBerkasNameKK('');
    setModalAjukan(false);
    loadData();
    alert(`Permohonan surat berhasil diajukan! Berkas otomatis diteruskan khusus ke Ketua ${selectedWilayahRT} untuk verifikasi.`);
  };

  const handleBuatAduan = (e) => {
    e.preventDefault();
    if (!judulAduan.trim() || !deskripsiAduan.trim()) {
      alert('Mohon lengkapi judul dan deskripsi aduan.');
      return;
    }

    buatAduanBaru({
      judul: judulAduan,
      kategori: kategoriAduan,
      dusun: dusunAduan,
      deskripsi: deskripsiAduan,
      pelaporNama: citizenNama,
      pelaporNik: citizenNik,
      pelaporTelepon: user?.telepon || '081234567891'
    });

    setJudulAduan('');
    setDeskripsiAduan('');
    setModalAduan(false);
    loadData();
    alert('Laporan aduan berhasil diajukan! Notifikasi WhatsApp konfirmasi telah dikirim dan berkas langsung masuk ke antrean disposisi Kepala Desa.');
  };

  return (
    <div className="min-h-screen bg-[#f1faf4] text-slate-800 pb-16">
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
                  Portal Layanan Mandiri Warga
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d7f5e5] text-[#0b5e42] text-[10px] font-bold">
                  <Shield className="w-3 h-3 text-[#0b5e42]" />
                  <span>Dukcapil Aktif</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Pemerintah Desa Kedung Jaya • Pelayanan Administrasi & Aduan Digital
              </p>
            </div>
          </div>

          {/* Quick User Identity Badge */}
          <div className="flex items-center gap-3 bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-extrabold text-slate-900 block">{citizenNama}</span>
              <span className="text-[11px] text-slate-400 font-mono">NIK: {user?.nikMasked || citizenNik}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 4x1 METRIC STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Surat Aktif</span>
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">{suratBerjalan.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">berkas</span>
            </div>
            <p className="text-[11px] font-bold text-amber-700 mt-1">
              Dalam Proses Alur Desa
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Surat Terbit</span>
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">{suratTerbit.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">dokumen</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              TTE Sah & Ber-QR BSrE
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Status DTKS Bansos</span>
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-lg sm:text-xl font-black text-slate-900 leading-none">Terpadu Valid</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1">
              Desil 3 (Penerima PKH/Bansos)
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Aduan Warga</span>
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">{aduanList.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">laporan</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              Aspirasi Lingkungan
            </p>
          </div>

        </div>

        {/* 2-COLUMN LAYOUT ON LAPTOP / DESKTOP (8 COLS LEFT, 4 COLS RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: SURAT AKTIF, DOKUMEN TERBIT, ADUAN */}
          <div className="lg:col-span-8 space-y-6">

            {/* QUICK ACTION BANNER */}
            <div className="bg-gradient-to-r from-[#0b5e42] to-emerald-800 text-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
                  Layanan Mandiri 24 Jam
                </span>
                <h3 className="text-base font-extrabold text-white">
                  Butuh Surat Keterangan atau Pengantar Desa?
                </h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed max-w-lg">
                  Ajukan surat langsung dari ponsel atau laptop. Otomatis diteruskan ke Ketua RT Anda untuk verifikasi, lalu ke loket desa dan TTE Kades.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalAjukan(true)}
                className="py-3 px-5 rounded-xl bg-white text-[#0b5e42] hover:bg-emerald-50 font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-transform transform active:scale-95 shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Ajukan Surat Baru</span>
              </button>
            </div>

            {/* STATUS DOKUMEN AKTIF BERJALAN (ESTAFET REALTIME) */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-[#0b5e42]"></span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Pengajuan Surat Sedang Berjalan
                  </h3>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {suratBerjalan.length} Berkas Aktif
                </span>
              </div>

              {suratBerjalan.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Clock className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-700">Tidak ada permohonan surat yang sedang diproses.</p>
                  <p className="text-xs text-slate-400">Tekan tombol "Ajukan Surat Baru" untuk membuat permohonan pertama Anda.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {suratBerjalan.map((surat) => {
                    const isRT = surat.status === 'MENUNGGU_RT';
                    const isOperator = surat.status === 'MENUNGGU_OPERATOR';
                    const isKades = surat.status === 'MENUNGGU_TTE_KADES';

                    return (
                      <div key={surat.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3 hover:bg-slate-50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <span className="text-xs font-bold font-mono text-slate-500">
                            NO REG: {surat.noReg}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block self-start sm:self-auto ${
                            isKades ? 'bg-amber-100 text-amber-800 animate-pulse' :
                            isOperator ? 'bg-cyan-100 text-cyan-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {isKades ? 'PROSES TTE KEPALA DESA' : isOperator ? 'LOKET OPERATOR DESA' : 'MENUNGGU VERIFIKASI RT'}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-extrabold text-slate-900">
                            {surat.jenis}
                          </h4>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Keperluan: {surat.keperluan}
                          </p>
                        </div>

                        {/* Stepper Status 4 Tahap Responsive */}
                        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 pt-1 text-center text-[10px] sm:text-xs">
                          <div className="p-2 rounded-xl bg-[#eefaf2] text-[#0b5e42] font-bold border border-emerald-200">
                            ✓ 1. Diajukan
                          </div>
                          <div className={`p-2 rounded-xl font-bold border ${
                            !isRT ? 'bg-[#eefaf2] text-[#0b5e42] border-emerald-200' : 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse'
                          }`}>
                            {!isRT ? `✓ 2. ${surat.wilayahRT || 'RT'}` : `⌛ 2. ${surat.wilayahRT || 'RT'}`}
                          </div>
                          <div className={`p-2 rounded-xl font-bold border ${
                            isKades ? 'bg-[#eefaf2] text-[#0b5e42] border-emerald-200' :
                            isOperator ? 'bg-cyan-100 text-cyan-800 border-cyan-300 animate-pulse' : 'bg-slate-100 text-slate-400 border-slate-200'
                          }`}>
                            {isKades ? '✓ 3. Operator' : isOperator ? '⌛ 3. Operator' : '3. Operator'}
                          </div>
                          <div className={`p-2 rounded-xl font-bold border ${
                            isKades ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' : 'bg-slate-100 text-slate-400 border-slate-200'
                          }`}>
                            {isKades ? '⌛ 4. TTE Kades' : '4. TTE Kades'}
                          </div>
                        </div>

                        <p className="text-xs text-slate-500">
                          Posisi berkas saat ini: <strong className="text-slate-800">
                            {isRT ? `Menunggu pemeriksaan & persetujuan faktual Ketua ${surat.wilayahRT || 'RT'}` :
                             isOperator ? 'Pemeriksaan berkas e-KTP & pengantar oleh Petugas Operator Kantor Desa' :
                             'Menunggu pengesahan tanda tangan elektronik (TTE BSrE) Kepala Desa'}
                          </strong>
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIWAYAT SURAT TERBIT & ARSIP DOKUMEN DIGITAL (TTE SAH) */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-teal-600"></span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Dokumen Resmi Terbit (E-Dokumen TTE Sah)
                  </h3>
                </div>
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  {suratTerbit.length} Dokumen Siap Unduh
                </span>
              </div>

              {suratTerbit.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  Belum ada dokumen surat yang selesai terbit. Surat yang disahkan Pak Kades akan otomatis muncul di sini.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suratTerbit.map((doc) => (
                    <div key={doc.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-3 hover:bg-slate-50 transition-colors">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block">{doc.noReg}</span>
                        <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">{doc.jenis}</h5>
                        <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>TTE Sah BSrE • {doc.tteInfo?.tanggalTTE || 'Terbit'}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => setModalPreview(doc)}
                        className="w-full py-2 px-3 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat, Cetak PDF & Word</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION: LAPORAN & ADUAN WARGA (DUSUN & LINGKUNGAN) */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-rose-600"></span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Aspirasi & Laporan Lingkungan Warga
                  </h3>
                </div>
                <button
                  onClick={() => setModalAduan(true)}
                  className="text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-colors border border-rose-200"
                >
                  + Buat Laporan Baru
                </button>
              </div>

              {aduanList.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  Belum ada laporan pengaduan lingkungan yang diajukan.
                </div>
              ) : (
                <div className="space-y-3">
                  {aduanList.map((adu) => (
                    <div key={adu.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-500 font-bold">{adu.tiket}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          adu.status === 'DIDISPOSISIKAN' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {adu.status === 'DIDISPOSISIKAN' ? '✓ DITINDAKLANJUTI KADES' : '⌛ MENUNGGU DISPOSISI'}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">{adu.judul}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{adu.deskripsi}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                        <p className="text-slate-700"><strong>Wilayah Kejadian:</strong> {adu.dusun}</p>
                        <p className="text-slate-700"><strong>Status Tindakan:</strong> {adu.disposisiCatatan}</p>
                        {adu.status === 'DIDISPOSISIKAN' && (
                          <p className="text-emerald-700 font-bold text-xs pt-1">
                            • Ditugaskan kepada: {adu.disposisiTarget}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: PROFIL LENGKAP, PANDUAN ALUR & KONTAK RT */}
          <div className="lg:col-span-4 space-y-6">

            {/* KARTU IDENTITAS DIGITAL WARGA */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80"
                  alt={citizenNama}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">
                    Profil Warga Terverifikasi
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 truncate">
                    {citizenNama}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    NIK: {user?.nikMasked || citizenNik}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Dusun:</span>
                  <span className="font-semibold text-slate-800">{user?.dusun || 'Kp. Wates (Dusun I)'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Wilayah RT / RW:</span>
                  <span className="font-bold text-[#0b5e42]">{user?.rtRw || user?.wilayahTugas || 'RT 03 / RW 02'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Status Identitas:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Terverifikasi
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Nomor WhatsApp:</span>
                  <span className="font-mono text-slate-700">{user?.telepon || '0812-3456-7891'}</span>
                </div>
              </div>
            </div>

            {/* INFOGRAFIS ALUR 4 TAHAP */}
            <div className="bg-[#f0faf4] rounded-2xl p-5 border border-emerald-100 space-y-3">
              <h4 className="text-xs font-extrabold text-[#0b5e42] uppercase tracking-wider">
                Alur Pengurusan Surat Online:
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0b5e42] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                  <p className="text-slate-700">Warga mengisi formulir dan melampirkan foto Kartu Keluarga.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                  <p className="text-slate-700">Ketua RT memverifikasi foto KK & identitas pemohon di wilayahnya.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                  <p className="text-slate-700">Operator Loket Desa memeriksa kelengkapan draf surat resmi.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                  <p className="text-slate-700">Kepala Desa menandatangani secara digital (TTE BSrE) & terbit seketika.</p>
                </div>
              </div>
            </div>

            {/* KONTAK BANTUAN WHATSAPP POSKO */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900">
                Butuh Bantuan Layanan?
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Jika ada kendala permohonan surat atau ingin konsultasi dengan petugas loket, hubungi kontak resmi desa.
              </p>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Pelayanan%20Desa%20Kedung%20Jaya,%20saya%20butuh%20bantuan%20layanan%20surat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#eefaf2] hover:bg-[#d8ece1] text-[#0b5e42] font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Pelayanan Desa</span>
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* MODAL FORM PENGAJUAN SURAT BARU */}
      {modalAjukan && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#0b5e42] uppercase tracking-wider block">Formulir Mandiri</span>
                <h3 className="text-base font-black text-slate-900">
                  Pengajuan Surat Mandiri Baru
                </h3>
              </div>
              <button onClick={() => setModalAjukan(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAjukan} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Jenis Surat</label>
                <select
                  value={jenisSurat}
                  onChange={(e) => setJenisSurat(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option>Surat Keterangan Usaha (SKU)</option>
                  <option>Surat Keterangan Domisili</option>
                  <option>Surat Pengantar SKCK Polsek</option>
                  <option>SKTM Bantuan Pendidikan</option>
                  <option>Surat Keterangan Kelahiran</option>
                  <option>Surat Pengantar Pindah (SKPWNI)</option>
                </select>
              </div>

              {/* PILIHAN RT / RW TUJUAN PENGANTAR */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block text-[11px]">
                  Tujuan Pengesahan RT / RW Pemohon *
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Rukun Tetangga</label>
                    <select
                      value={targetRT}
                      onChange={(e) => setTargetRT(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white font-bold"
                    >
                      {Array.from({ length: 22 }, (_, i) => String(i + 1).padStart(2, '0')).map(num => (
                        <option key={num} value={num}>RT {num}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Rukun Warga</label>
                    <select
                      value={targetRW}
                      onChange={(e) => setTargetRW(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-300 bg-white font-bold"
                    >
                      {Array.from({ length: 6 }, (_, i) => String(i + 1).padStart(2, '0')).map(num => (
                        <option key={num} value={num}>RW {num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Dusun</label>
                  <select
                    value={targetDusun}
                    onChange={(e) => setTargetDusun(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-300 bg-white text-xs"
                  >
                    <option value="Kp. Wates (Dusun I)">Dusun I (Kp. Wates)</option>
                    <option value="Dusun II (Kedung Barat)">Dusun II (Kedung Barat)</option>
                    <option value="Dusun III (Kp. Pengawas)">Dusun III (Kp. Pengawas)</option>
                    <option value="Dusun IV (Lingkungan IV)">Dusun IV (Lingkungan IV)</option>
                  </select>
                </div>

                <p className="text-[10px] text-[#0b5e42] font-semibold">
                  ✓ Berkas HANYA akan masuk ke antrean Ketua RT {targetRT} / RW {targetRW}.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Keperluan Surat *</label>
                <input
                  type="text"
                  required
                  value={keperluan}
                  onChange={(e) => setKeperluan(e.target.value)}
                  placeholder="Contoh: Pengajuan Kredit Usaha / Syarat Beasiswa"
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detail Keterangan Tambahan</label>
                <input
                  type="text"
                  value={detailUsaha}
                  onChange={(e) => setDetailUsaha(e.target.value)}
                  placeholder="Contoh: Usaha Toko Kelontong RT 03"
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              {/* UPLOAD FOTO KARTU KELUARGA (WAJIB UNTUK PAK RT) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-700 text-[11px]">
                    Foto Kartu Keluarga (KK) Asli <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    Wajib untuk Pak RT
                  </span>
                </div>

                <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer transition-colors relative bg-slate-50 hover:bg-slate-100">
                  <input
                    type="file"
                    required
                    onChange={handleFileKKChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  {fotoKK ? (
                    <div className="space-y-1.5">
                      <img
                        src={fotoKK}
                        alt="Pratinjau KK"
                        className="max-h-28 mx-auto rounded-xl shadow-xs border border-slate-200 object-contain"
                      />
                      <p className="text-[11px] font-bold text-emerald-700 flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" /> KK Terunggah: {berkasNameKK}
                      </p>
                      <span className="text-[9px] text-slate-400">Klik untuk mengganti foto</span>
                    </div>
                  ) : (
                    <>
                      <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <p className="text-xs font-semibold text-slate-700">
                        Foto atau Upload Kartu Keluarga (KK)
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Pak RT akan memeriksa foto KK ini untuk memastikan Anda warganya
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md transition-colors"
                >
                  Kirim ke Ketua RT untuk Verifikasi →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL LAPORKAN ADUAN LINGKUNGAN / ASPIRASI BARU */}
      {modalAduan && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                  Lapor Warga Terpadu
                </span>
                <h3 className="text-sm font-black text-slate-900 mt-0.5">
                  Aspirasi / Masalah Lingkungan
                </h3>
              </div>
              <button onClick={() => setModalAduan(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBuatAduan} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Laporan *</label>
                <input
                  type="text"
                  required
                  value={judulAduan}
                  onChange={(e) => setJudulAduan(e.target.value)}
                  placeholder="Contoh: Jalan Dusun II Rusak / Lampu Mati"
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategori Masalah</label>
                <select
                  value={kategoriAduan}
                  onChange={(e) => setKategoriAduan(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option>Infrastruktur Jalan & Jembatan</option>
                  <option>Fasilitas Umum & Penerangan (PJU)</option>
                  <option>Kebersihan & Sampah Liar</option>
                  <option>Bencana Alam & Saluran Air (Drainase)</option>
                  <option>Ketertiban & Keamanan Lingkungan</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Wilayah Dusun</label>
                <select
                  value={dusunAduan}
                  onChange={(e) => setDusunAduan(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option>Dusun I (Kp. Wates)</option>
                  <option>Dusun II (Kp. Babakan)</option>
                  <option>Dusun III (Kp. Pengawas)</option>
                  <option>Dusun IV (Kp. Belendung)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Lengkap *</label>
                <textarea
                  required
                  rows={3}
                  value={deskripsiAduan}
                  onChange={(e) => setDeskripsiAduan(e.target.value)}
                  placeholder="Jelaskan kondisi dan titik lokasi kejadian secara detail..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setModalAduan(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md"
                >
                  Kirim Aduan →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SALINAN RESMI SURAT TTE SIAP CETAK / PDF */}
      {modalPreview && (
        <SuratResmiModal
          surat={modalPreview}
          onClose={() => setModalPreview(null)}
        />
      )}

    </div>
  );
}
