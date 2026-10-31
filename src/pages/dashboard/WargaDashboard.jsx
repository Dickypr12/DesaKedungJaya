import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, FileText, 
  Download, PlusCircle, AlertCircle, CheckCircle2, ChevronRight,
  QrCode, ExternalLink, Send, X, Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getSuratByWarga, ajukanSuratBaru } from '../../services/workflowService';

export default function WargaDashboard() {
  const { user } = useAuth();
  const citizenNik = user?.nik || '3216012804920003';
  const citizenNama = user?.nama || 'Hendra Kusuma';

  const [suratList, setSuratList] = useState([]);
  const [modalAjukan, setModalAjukan] = useState(false);
  const [modalPreview, setModalPreview] = useState(null);

  // Form input pengajuan baru
  const [jenisSurat, setJenisSurat] = useState('Surat Keterangan Usaha (SKU)');
  const [keperluan, setKeperluan] = useState('');
  const [detailUsaha, setDetailUsaha] = useState('');

  const loadData = () => {
    setSuratList(getSuratByWarga(citizenNik));
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

    ajukanSuratBaru({
      jenis: jenisSurat,
      pemohonNama: citizenNama,
      pemohonNik: citizenNik,
      pemohonTelepon: user?.telepon || '081234567891',
      pemohonAlamat: user?.dusun || 'Dusun II Kedung Barat, RT 03 / RW 02',
      wilayahRT: 'RT 03 / RW 02',
      keperluan,
      detailUsaha
    });

    setKeperluan('');
    setDetailUsaha('');
    setModalAjukan(false);
    loadData();
    alert('Permohonan surat berhasil diajukan! Berkas otomatis diteruskan ke Ketua RT 03 untuk pengesahan pengantar.');
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
                      {!isRT ? '✓ RT 03/02' : '⌛ RT 03/02'}
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
                      {isRT ? 'Menunggu verifikasi faktual Ketua RT 03' :
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

          {suratTerbit.map((doc) => (
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
                className="px-3 py-1.5 rounded-xl bg-[#eefaf2] hover:bg-[#d8ece1] text-[#0b5e42] font-bold text-xs flex items-center gap-1.5 transition-colors border border-emerald-200"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Lihat & Barcode</span>
              </button>
            </div>
          ))}
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

      {/* MODAL SALINAN RESMI SURAT TTE BER-BARCODE */}
      {modalPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#0b5e42] uppercase tracking-wider">
                Dokumen Sah Elektronik
              </span>
              <button onClick={() => setModalPreview(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <div className="w-16 h-16 rounded-xl bg-white p-2 mx-auto shadow-sm border border-slate-200 flex items-center justify-center">
                <QrCode className="w-12 h-12 text-[#0b5e42]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">{modalPreview.jenis}</h4>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">{modalPreview.noReg}</p>
              </div>
              <div className="text-[11px] text-slate-600 space-y-1 pt-2 border-t border-slate-200 text-left">
                <p><strong>Nama Pemohon:</strong> {modalPreview.pemohonNama}</p>
                <p><strong>Penandatangan:</strong> {modalPreview.tteInfo?.penandatangan || 'Kepala Desa'}</p>
                <p><strong>Sertifikasi:</strong> BSrE BSSN Indonesia</p>
                <p className="text-[10px] text-emerald-700 font-bold">✓ Dokumen berkekuatan hukum sah sesuai UU ITE</p>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Mengunduh berkas resmi ${modalPreview.jenis} format PDF ber-barcode.`);
                setModalPreview(null);
              }}
              className="w-full py-2.5 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white font-bold text-xs shadow-md"
            >
              Unduh Salinan PDF
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
