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
              alt={citizenNama}
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
              {citizenNama}
            </h2>
            <p className="text-[11px] text-slate-400 truncate">
              NIK: {user?.nikMasked || citizenNik} • RT 03/02
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
              <span className="text-2xl font-black text-slate-900 leading-none">{suratBerjalan.length}</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">berkas</span>
            </div>
            <p className="text-[11px] font-bold text-amber-700 mt-1">
              Dalam Proses Alur Desa
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
              <span className="text-2xl font-black text-slate-900 leading-none">{suratTerbit.length}</span>
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
        <button
          type="button"
          onClick={() => setModalAjukan(true)}
          className="w-full py-3 px-4 rounded-2xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Buat Pengajuan Surat Mandiri Baru</span>
        </button>

        {/* STATUS DOKUMEN AKTIF BERJALAN (ESTAFET REALTIME) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#0b5e42]"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Pengajuan Surat Sedang Berjalan
              </h3>
            </div>
            <span className="text-[11px] font-bold text-amber-700">
              {suratBerjalan.length} Berkas
            </span>
          </div>

          {suratBerjalan.length === 0 ? (
            <div className="p-5 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              Tidak ada surat yang sedang diproses. Tekan tombol di atas untuk membuat surat baru.
            </div>
          ) : (
            suratBerjalan.map((surat) => {
              const isRT = surat.status === 'MENUNGGU_RT';
              const isOperator = surat.status === 'MENUNGGU_OPERATOR';
              const isKades = surat.status === 'MENUNGGU_TTE_KADES';

              return (
                <div key={surat.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-slate-500">
                      NO REG: {surat.noReg}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isKades ? 'bg-amber-100 text-amber-800 animate-pulse' :
                      isOperator ? 'bg-cyan-100 text-cyan-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {isKades ? 'PROSES TTE KADES' : isOperator ? 'LOKET OPERATOR' : 'VERIFIKASI RT'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {surat.jenis}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {surat.keperluan}
                    </p>
                  </div>

                  {/* Stepper Status 4 Tahap */}
                  <div className="grid grid-cols-4 gap-1 pt-1 text-center text-[10px]">
                    <div className="p-1.5 rounded-lg bg-[#eefaf2] text-[#0b5e42] font-bold border border-emerald-200">
                      ✓ Diajukan
                    </div>
                    <div className={`p-1.5 rounded-lg font-bold border ${
                      !isRT ? 'bg-[#eefaf2] text-[#0b5e42] border-emerald-200' : 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse'
                    }`}>
                      {!isRT ? `✓ ${surat.wilayahRT || 'RT'}` : `⌛ ${surat.wilayahRT || 'RT'}`}
                    </div>
                    <div className={`p-1.5 rounded-lg font-bold border ${
                      isKades ? 'bg-[#eefaf2] text-[#0b5e42] border-emerald-200' :
                      isOperator ? 'bg-cyan-100 text-cyan-800 border-cyan-300 animate-pulse' : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}>
                      {isKades ? '✓ Operator' : isOperator ? '⌛ Operator' : '3. Operator'}
                    </div>
                    <div className={`p-1.5 rounded-lg font-bold border ${
                      isKades ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}>
                      {isKades ? '⌛ TTE Kades' : '4. TTE Kades'}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Posisi saat ini: <strong className="text-slate-700">
                      {isRT ? `Menunggu verifikasi faktual Ketua ${surat.wilayahRT || 'RT'}` :
                       isOperator ? 'Pemeriksaan berkas e-KTP oleh Operator Desa' :
                       'Menunggu pengesahan tanda tangan elektronik Kepala Desa'}
                    </strong>
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* RIWAYAT SURAT TERBIT & ARSIP DOKUMEN DIGITAL (TTE SAH) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-teal-600"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Dokumen Resmi Terbit (E-Dokumen)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-teal-700">{suratTerbit.length} Dokumen</span>
          </div>

          {suratTerbit.length === 0 ? (
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
              Belum ada dokumen surat yang terbit.
            </div>
          ) : (
            suratTerbit.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/70 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400">{doc.noReg}</span>
                  <h5 className="text-xs font-bold text-slate-900">{doc.jenis}</h5>
                  <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Sah TTE BSrE • {doc.tteInfo?.tanggalTTE || 'Terbit'}
                  </p>
                </div>

                <button
                  onClick={() => setModalPreview(doc)}
                  className="px-3 py-1.5 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat & Cetak Surat</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* SECTION: LAPORAN & ADUAN WARGA (DUSUN & LINGKUNGAN) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-rose-600"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Aspirasi & Laporan Lingkungan
              </h3>
            </div>
            <button
              onClick={() => setModalAduan(true)}
              className="text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-xl transition-colors border border-rose-200"
            >
              + Lapor Aduan Baru
            </button>
          </div>

          {aduanList.length === 0 ? (
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
              Belum ada aduan yang Anda laporkan.
            </div>
          ) : (
            aduanList.map((adu) => (
              <div key={adu.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{adu.tiket}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    adu.status === 'DIDISPOSISIKAN' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {adu.status === 'DIDISPOSISIKAN' ? '✓ DITINDAKLANJUTI KADES' : '⌛ MENUNGGU DISPOSISI'}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-900">{adu.judul}</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{adu.deskripsi}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1">
                  <p className="text-slate-700"><strong>Wilayah:</strong> {adu.dusun}</p>
                  <p className="text-slate-700"><strong>Status Tindakan:</strong> {adu.disposisiCatatan}</p>
                  {adu.status === 'DIDISPOSISIKAN' && (
                    <p className="text-emerald-700 font-bold text-[10px]">
                      • Ditugaskan kepada: {adu.disposisiTarget}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* MODAL FORM PENGAJUAN SURAT BARU */}
      {modalAjukan && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">
                Pengajuan Surat Mandiri Baru
              </h3>
              <button onClick={() => setModalAjukan(false)} className="text-slate-400 hover:text-slate-600">
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
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp">
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
