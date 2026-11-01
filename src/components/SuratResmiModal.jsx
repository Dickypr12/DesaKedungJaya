import React from 'react';
import { Printer, Download, X, ShieldCheck, QrCode, CheckCircle2, Share2 } from 'lucide-react';
import { desaInfo } from '../data/desaData';

export default function SuratResmiModal({ surat, onClose }) {
  if (!surat) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyVerifyLink = () => {
    const url = `${window.location.origin}/#/layanan?tab=tracking&type=${surat.id}`;
    navigator.clipboard.writeText(url);
    alert('Tautan verifikasi keaslian surat berhasil disalin ke clipboard!');
  };

  // Keterangan spesifik berdasarkan jenis surat
  const renderIsiKeterangan = () => {
    if (surat.jenis.includes('SKU') || surat.jenis.includes('Usaha')) {
      return (
        <div className="space-y-2 text-justify">
          <p>
            Nama tersebut di atas adalah benar-benar warga yang bertempat tinggal dan berdomisili di Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi.
          </p>
          <p>
            Berdasarkan data kependudukan dan peninjauan faktual di lapangan oleh Ketua RT/RW setempat, yang bersangkutan benar memiliki dan menjalankan kegiatan usaha:
          </p>
          <div className="bg-slate-50 print:bg-transparent p-3 rounded-xl border border-slate-200 print:border-none print:p-0 my-2">
            <p className="font-bold text-slate-900">• Bidang Usaha: {surat.detailUsaha || 'Perdagangan & Usaha Toko Kelontong'}</p>
            <p className="font-bold text-slate-900">• Lokasi Usaha: {surat.pemohonAlamat || 'Kp Wates, Desa Kedungjaya, Kec. Babelan'}</p>
          </div>
          <p>
            Surat Keterangan Usaha ini diterbitkan atas permohonan yang bersangkutan untuk keperluan: <strong className="text-slate-900 underline">{surat.keperluan}</strong>.
          </p>
        </div>
      );
    } else if (surat.jenis.includes('SKTM') || surat.jenis.includes('Tidak Mampu')) {
      return (
        <div className="space-y-2 text-justify">
          <p>
            Nama tersebut di atas adalah benar warga Desa Kedung Jaya, Kecamatan Babelan yang menurut data terpadu kesejahteraan sosial dan verifikasi lingkungan tergolong dalam keluarga pra-sejahtera.
          </p>
          <p>
            Surat Keterangan Tidak Mampu ini dibuat untuk keperluan permohonan beasiswa atau bantuan pendidikan: <strong className="text-slate-900 underline">{surat.keperluan}</strong>.
          </p>
        </div>
      );
    } else {
      return (
        <div className="space-y-2 text-justify">
          <p>
            Nama tersebut di atas adalah benar warga yang berdomisili sah di wilayah Pemerintah Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi.
          </p>
          <p>
            Surat keterangan ini diberikan atas permohonan yang bersangkutan untuk keperluan: <strong className="text-slate-900 underline">{surat.keperluan}</strong>.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      
      {/* Container Surat */}
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[94vh] shadow-2xl border border-slate-200 my-auto overflow-y-auto animate-scaleUp print:m-0 print:p-0 print:border-none print:shadow-none print:max-w-none print:max-h-none print:rounded-none">
        
        {/* BAR TOMBOL AKSI ATAS (TIDAK DICETAK SAAT PRINT) */}
        <div className="p-3.5 sm:p-4 bg-slate-900 text-white flex items-center justify-between print:hidden sticky top-0 z-10 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-bold text-emerald-300">
              Pratinjau E-Dokumen Resmi (TTE BSrE)
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>
            <button
              onClick={copyVerifyLink}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              title="Salin Tautan Verifikasi"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* KERTAS RESMI SURAT (A4 Standard Kedinasan) */}
        <div className="p-4 sm:p-10 font-serif text-slate-900 leading-normal text-xs sm:text-sm bg-white print:p-8">
          
          {/* KOP SURAT RESMI */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pb-3 border-b-4 border-double border-slate-900 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
              <img src="/logo.svg" alt="Logo Desa" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
            </div>
            <div className="flex-1">
              <h4 className="text-[11px] sm:text-sm font-bold uppercase tracking-wider text-slate-800">
                PEMERINTAH KABUPATEN BEKASI
              </h4>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
                KECAMATAN BABELAN
              </h3>
              <h2 className="text-sm sm:text-xl font-black uppercase tracking-wider text-slate-950 font-sans">
                KANTOR KEPALA DESA KEDUNG JAYA
              </h2>
              <p className="text-[9px] sm:text-xs text-slate-600 font-sans mt-0.5 font-normal leading-tight">
                {desaInfo.alamat} • Telp: {desaInfo.telepon} • Laman: https://kedungjaya.desa.id
              </p>
            </div>
          </div>

          {/* JUDUL DAN NOMOR SURAT */}
          <div className="text-center my-4 sm:my-6 space-y-1">
            <h3 className="text-sm sm:text-base font-black underline uppercase tracking-wide font-sans">
              {surat.jenis}
            </h3>
            <p className="text-xs font-mono font-semibold text-slate-700">
              Nomor: {surat.noReg}
            </p>
          </div>

          {/* KALIMAT PEMBUKA */}
          <p className="mb-4 text-justify">
            Yang bertanda tangan di bawah ini Kepala Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi, menerangkan dengan sesungguhnya bahwa:
          </p>

          {/* TABEL BIODATA PEMOHON */}
          <div className="space-y-1.5 my-4 pl-1 sm:pl-8 font-sans text-xs">
            <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
              <span className="col-span-4 sm:col-span-3 text-slate-600 font-medium">Nama Lengkap</span>
              <span className="col-span-1 text-center">:</span>
              <span className="col-span-7 sm:col-span-8 font-bold text-slate-950">{surat.pemohonNama}</span>
            </div>
            <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
              <span className="col-span-4 sm:col-span-3 text-slate-600 font-medium">NIK (KTP-el)</span>
              <span className="col-span-1 text-center">:</span>
              <span className="col-span-7 sm:col-span-8 font-mono font-bold text-slate-950">{surat.pemohonNik}</span>
            </div>
            <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
              <span className="col-span-4 sm:col-span-3 text-slate-600 font-medium">Nomor Telepon/WA</span>
              <span className="col-span-1 text-center">:</span>
              <span className="col-span-7 sm:col-span-8 text-slate-900">{surat.pemohonTelepon}</span>
            </div>
            <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
              <span className="col-span-4 sm:col-span-3 text-slate-600 font-medium">Alamat Domisili</span>
              <span className="col-span-1 text-center">:</span>
              <span className="col-span-7 sm:col-span-8 text-slate-900">{surat.pemohonAlamat}</span>
            </div>
            <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
              <span className="col-span-4 sm:col-span-3 text-slate-600 font-medium">Wilayah RT / RW</span>
              <span className="col-span-1 text-center">:</span>
              <span className="col-span-7 sm:col-span-8 text-slate-900">{surat.wilayahRT || 'RT 03 / RW 02'}</span>
            </div>
          </div>

          {/* ISI KETERANGAN RESMI */}
          <div className="my-5">
            {renderIsiKeterangan()}
          </div>

          {/* KALIMAT PENUTUP */}
          <p className="my-5 text-justify">
            Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya oleh pihak yang berkepentingan.
          </p>

          {/* BLOK TANDA TANGAN ELEKTRONIK (TTE BSrE) */}
          <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 font-sans print:flex-row">
            
            {/* Hologram Pengesahan & QR Code BSrE */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-300/80 w-full sm:max-w-xs">
              <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-sm border border-emerald-300 flex items-center justify-center shrink-0">
                <QrCode className="w-14 h-14 text-emerald-800" />
              </div>
              <div className="space-y-0.5 text-[9px] leading-tight text-slate-700">
                <span className="font-bold text-[#0b5e42] uppercase tracking-wider block">
                  ✓ Tersertifikasi BSrE BSSN
                </span>
                <p className="font-mono text-slate-600">{surat.tteInfo?.sertifikat || 'BSrE-KJ-2025-VALID'}</p>
                <p className="text-[8px] text-slate-500 italic">
                  Pindai QR untuk verifikasi keabsahan dokumen di portal desa.
                </p>
              </div>
            </div>

            {/* Tanda Tangan Kades */}
            <div className="text-center space-y-1 w-full sm:w-auto sm:min-w-[200px]">
              <p className="text-xs text-slate-700">
                Kedung Jaya, {surat.tteInfo?.tanggalTTE?.split(',')[0] || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="text-xs font-bold text-slate-900">
                Kepala Desa Kedung Jaya,
              </p>

              {/* Stempel & Badge Digital */}
              <div className="py-2 flex items-center justify-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>DITANDATANGANI ELEKTRONIK</span>
                </div>
              </div>

              <p className="text-xs font-black underline uppercase text-slate-950 font-sans tracking-wide">
                {surat.tteInfo?.penandatangan || 'Bpk. H. SURYONO, S.Sos.'}
              </p>
              <p className="text-[10px] font-mono text-slate-600">
                NIP. 19750812 201001 1 001
              </p>
            </div>

          </div>

          {/* CATATAN LEGALITAS UU ITE */}
          <div className="mt-8 pt-3 border-t border-slate-200 text-[8px] sm:text-[9px] text-slate-400 font-sans text-center">
            Dokumen ini telah ditandatangani secara elektronik bersertifikat menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE), BSSN. Dokumen memiliki kekuatan hukum yang sah sesuai dengan UU Republik Indonesia No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik.
          </div>

        </div>

      </div>

    </div>
  );
}

