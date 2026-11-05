import React from 'react';
import { Printer, Download, X, ShieldCheck, QrCode, CheckCircle2, Share2, FileText } from 'lucide-react';
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

  // Logika Keterangan Resmi berdasarkan Jenis Surat
  const getIsiKeterangan = () => {
    const j = (surat.jenis || '').toLowerCase();

    if (j.includes('sku') || j.includes('usaha')) {
      return {
        teksHtml: (
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
        ),
        teksWord: `
          <p>Nama tersebut di atas adalah benar-benar warga yang bertempat tinggal dan berdomisili di Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi.</p>
          <p>Berdasarkan data kependudukan dan peninjauan faktual di lapangan oleh Ketua RT/RW setempat, yang bersangkutan benar memiliki dan menjalankan kegiatan usaha:</p>
          <table style="width: 100%; margin: 8px 0; border: 1px solid #ccc; padding: 8px;">
            <tr><td style="width: 25%;"><b>Bidang Usaha</b></td><td>: ${surat.detailUsaha || 'Perdagangan & Usaha Toko Kelontong'}</td></tr>
            <tr><td><b>Lokasi Usaha</b></td><td>: ${surat.pemohonAlamat || 'Kp Wates, Desa Kedungjaya, Kec. Babelan'}</td></tr>
          </table>
          <p>Surat Keterangan Usaha ini diterbitkan atas permohonan yang bersangkutan untuk keperluan: <b><u>${surat.keperluan}</u></b>.</p>
        `
      };
    } else if (j.includes('sktm') || j.includes('tidak mampu')) {
      return {
        teksHtml: (
          <div className="space-y-2 text-justify">
            <p>
              Nama tersebut di atas adalah benar warga Desa Kedung Jaya, Kecamatan Babelan yang menurut data terpadu kesejahteraan sosial dan verifikasi lingkungan tergolong dalam keluarga pra-sejahtera.
            </p>
            <p>
              Surat Keterangan Tidak Mampu ini dibuat untuk keperluan permohonan beasiswa atau bantuan pendidikan: <strong className="text-slate-900 underline">{surat.keperluan}</strong>.
            </p>
          </div>
        ),
        teksWord: `
          <p>Nama tersebut di atas adalah benar warga Desa Kedung Jaya, Kecamatan Babelan yang menurut data terpadu kesejahteraan sosial dan verifikasi lingkungan tergolong dalam keluarga pra-sejahtera.</p>
          <p>Surat Keterangan Tidak Mampu ini dibuat untuk keperluan permohonan beasiswa atau bantuan pendidikan: <b><u>${surat.keperluan}</u></b>.</p>
        `
      };
    } else if (j.includes('skck') || j.includes('polsek') || j.includes('kepolisian')) {
      return {
        teksHtml: (
          <div className="space-y-2 text-justify">
            <p>
              Nama tersebut di atas adalah benar warga Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi yang berdomisili pada alamat tersebut di atas.
            </p>
            <p>
              Sepanjang pengamatan dan catatan yang ada pada kami, yang bersangkutan memiliki catatan perikelakuan baik di lingkungan masyarakat, tidak sedang terlibat perkara pidana atau perdata, dan tidak pernah terlibat aksi kriminalitas apapun.
            </p>
            <p>
              Surat Pengantar ini diberikan sebagai kelengkapan pengurusan Surat Keterangan Catatan Kepolisian (SKCK) di Polsek Babelan / Polres Metro Bekasi untuk keperluan: <strong className="text-slate-900 underline">{surat.keperluan}</strong>.
            </p>
          </div>
        ),
        teksWord: `
          <p>Nama tersebut di atas adalah benar warga Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi yang berdomisili pada alamat tersebut di atas.</p>
          <p>Sepanjang pengamatan dan catatan yang ada pada kami, yang bersangkutan memiliki catatan perikelakuan baik di lingkungan masyarakat, tidak sedang terlibat perkara pidana atau perdata, dan tidak pernah terlibat aksi kriminalitas apapun.</p>
          <p>Surat Pengantar ini diberikan sebagai kelengkapan pengurusan Surat Keterangan Catatan Kepolisian (SKCK) di Polsek Babelan / Polres Metro Bekasi untuk keperluan: <b><u>${surat.keperluan}</u></b>.</p>
        `
      };
    } else if (j.includes('kelahiran') || j.includes('lahir') || j.includes('skl')) {
      return {
        teksHtml: (
          <div className="space-y-2 text-justify">
            <p>
              Menerangkan dengan sebenarnya bahwa telah lahir seorang anak dari pasangan orang tua yang berdomisili sah di Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi.
            </p>
            <p>
              Surat keterangan kelahiran ini diterbitkan berdasarkan surat pengantar bidan/rumah sakit dan verifikasi RT/RW setempat, untuk dipergunakan sebagai persyaratan: <strong className="text-slate-900 underline">{surat.keperluan}</strong>.
            </p>
          </div>
        ),
        teksWord: `
          <p>Menerangkan dengan sebenarnya bahwa telah lahir seorang anak dari pasangan orang tua yang berdomisili sah di Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi.</p>
          <p>Surat keterangan kelahiran ini diterbitkan berdasarkan surat pengantar bidan/rumah sakit dan verifikasi RT/RW setempat, untuk dipergunakan sebagai persyaratan: <b><u>${surat.keperluan}</u></b>.</p>
        `
      };
    } else if (j.includes('kematian') || j.includes('skm') || j.includes('meninggal')) {
      return {
        teksHtml: (
          <div className="space-y-2 text-justify">
            <p>
              Menerangkan dengan sesungguhnya bahwa yang bersangkutan adalah benar warga Desa Kedung Jaya yang telah dilaporkan meninggal dunia di lingkungan setempat.
            </p>
            <p>
              Surat Keterangan Kematian ini diterbitkan atas permohonan ahli waris/keluarga untuk memenuhi kelengkapan administrasi: <strong className="text-slate-900 underline">{surat.keperluan}</strong>.
            </p>
          </div>
        ),
        teksWord: `
          <p>Menerangkan dengan sesungguhnya bahwa yang bersangkutan adalah benar warga Desa Kedung Jaya yang telah dilaporkan meninggal dunia di lingkungan setempat.</p>
          <p>Surat Keterangan Kematian ini diterbitkan atas permohonan ahli waris/keluarga untuk memenuhi kelengkapan administrasi: <b><u>${surat.keperluan}</u></b>.</p>
        `
      };
    } else if (j.includes('pindah') || j.includes('skpwni')) {
      return {
        teksHtml: (
          <div className="space-y-2 text-justify">
            <p>
              Nama tersebut di atas adalah benar warga Desa Kedung Jaya yang mengajukan permohonan pindah domisili kependudukan ke alamat tujuan baru.
            </p>
            <p>
              Surat Pengantar Pindah Domisili ini diterbitkan sebagai kelengkapan penerbitan SKPWNI di Kantor Kecamatan Babelan dan Disdukcapil Kabupaten Bekasi untuk keperluan: <strong className="text-slate-900 underline">{surat.keperluan}</strong>.
            </p>
          </div>
        ),
        teksWord: `
          <p>Nama tersebut di atas adalah benar warga Desa Kedung Jaya yang mengajukan permohonan pindah domisili kependudukan ke alamat tujuan baru.</p>
          <p>Surat Pengantar Pindah Domisili ini diterbitkan sebagai kelengkapan penerbitan SKPWNI di Kantor Kecamatan Babelan dan Disdukcapil Kabupaten Bekasi untuk keperluan: <b><u>${surat.keperluan}</u></b>.</p>
        `
      };
    } else if (j.includes('keramaian') || j.includes('hajat') || j.includes('izin')) {
      return {
        teksHtml: (
          <div className="space-y-2 text-justify">
            <p>
              Nama tersebut di atas adalah penanggung jawab kegiatan keramaian / acara hajat kemasyarakatan di wilayah Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi.
            </p>
            <p>
              Pemerintah Desa memberikan rekomendasi dan izin pengantar dengan ketentuan wajib menjaga keamanan, ketertiban umum, dan kebersihan lingkungan.
            </p>
            <p>
              Surat pengantar ini ditujukan kepada Polsek Babelan dan Koramil Babelan untuk keperluan: <strong className="text-slate-900 underline">{surat.keperluan}</strong>.
            </p>
          </div>
        ),
        teksWord: `
          <p>Nama tersebut di atas adalah penanggung jawab kegiatan keramaian / acara hajat kemasyarakatan di wilayah Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi.</p>
          <p>Pemerintah Desa memberikan rekomendasi dan izin pengantar dengan ketentuan wajib menjaga keamanan, ketertiban umum, dan kebersihan lingkungan.</p>
          <p>Surat pengantar ini ditujukan kepada Polsek Babelan dan Koramil Babelan untuk keperluan: <b><u>${surat.keperluan}</u></b>.</p>
        `
      };
    } else if (j.includes('belum menikah') || j.includes('lajang')) {
      return {
        teksHtml: (
          <div className="space-y-2 text-justify">
            <p>
              Nama tersebut di atas adalah benar warga yang berdomisili sah di Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi.
            </p>
            <p>
              Berdasarkan data kependudukan dan surat pernyataan yang bersangkutan dengan diperkuat keterangan RT/RW setempat, sampai dengan tanggal dikeluarkannya surat ini yang bersangkutan berstatus <strong>BELUM PERNAH MENIKAH (LAJANG)</strong>.
            </p>
            <p>
              Surat keterangan ini diberikan atas permohonan yang bersangkutan untuk keperluan: <strong className="text-slate-900 underline">{surat.keperluan}</strong>.
            </p>
          </div>
        ),
        teksWord: `
          <p>Nama tersebut di atas adalah benar warga yang berdomisili sah di Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi.</p>
          <p>Berdasarkan data kependudukan dan surat pernyataan yang bersangkutan dengan diperkuat keterangan RT/RW setempat, sampai dengan tanggal dikeluarkannya surat ini yang bersangkutan berstatus <b>BELUM PERNAH MENIKAH (LAJANG)</b>.</p>
          <p>Surat keterangan ini diberikan atas permohonan yang bersangkutan untuk keperluan: <b><u>${surat.keperluan}</u></b>.</p>
        `
      };
    } else {
      // Default: Surat Keterangan Domisili / Umum
      return {
        teksHtml: (
          <div className="space-y-2 text-justify">
            <p>
              Nama tersebut di atas adalah benar warga yang berdomisili sah di wilayah Pemerintah Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi.
            </p>
            <p>
              Surat keterangan ini diberikan atas permohonan yang bersangkutan untuk keperluan: <strong className="text-slate-900 underline">{surat.keperluan}</strong>.
            </p>
          </div>
        ),
        teksWord: `
          <p>Nama tersebut di atas adalah benar warga yang berdomisili sah di wilayah Pemerintah Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi.</p>
          <p>Surat keterangan ini diberikan atas permohonan yang bersangkutan untuk keperluan: <b><u>${surat.keperluan}</u></b>.</p>
        `
      };
    }
  };

  const keterangan = getIsiKeterangan();

  // FUNGSI EKSPOR KE MICROSOFT WORD (.DOC)
  const handleExportWord = () => {
    const tanggalSurat = surat.tteInfo?.tanggalTTE?.split(',')[0] || 
                         new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const namaKades = surat.tteInfo?.penandatangan || 'Bpk. H. Johari.';
    const sertifikatId = surat.tteInfo?.sertifikat || 'BSrE-KJ-2025-VALID';

    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${surat.jenis} - ${surat.pemohonNama}</title>
        <style>
          body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #000;
            margin: 2cm 2cm 2cm 2cm;
          }
          .kop {
            text-align: center;
            border-bottom: 3px double #000;
            padding-bottom: 10px;
            margin-bottom: 16px;
          }
          .kop h4 { margin: 2px 0; font-size: 12pt; font-weight: bold; text-transform: uppercase; }
          .kop h3 { margin: 2px 0; font-size: 13pt; font-weight: bold; text-transform: uppercase; }
          .kop h2 { margin: 2px 0; font-size: 16pt; font-weight: bold; text-transform: uppercase; font-family: Arial, sans-serif; }
          .kop p { margin: 3px 0; font-size: 9pt; font-family: Arial, sans-serif; }
          .judul-surat {
            text-align: center;
            margin: 18px 0;
          }
          .judul-surat h3 {
            text-decoration: underline;
            text-transform: uppercase;
            font-size: 13pt;
            margin-bottom: 2px;
          }
          .nomor-surat {
            font-family: 'Courier New', Courier, monospace;
            font-size: 11pt;
            font-weight: bold;
          }
          table.biodata {
            width: 100%;
            margin: 14px 0;
            border-collapse: collapse;
          }
          table.biodata td {
            padding: 3px 6px;
            vertical-align: top;
            font-size: 11.5pt;
          }
          .tte-section {
            margin-top: 30px;
            width: 100%;
          }
          .tte-box {
            float: right;
            width: 280px;
            text-align: center;
          }
          .tte-stamp {
            border: 2px solid #0b5e42;
            background-color: #f1faf4;
            color: #0b5e42;
            padding: 8px;
            margin: 10px auto;
            border-radius: 8px;
            font-size: 9.5pt;
            font-weight: bold;
            font-family: Arial, sans-serif;
          }
          .footer-legal {
            margin-top: 50px;
            padding-top: 8px;
            border-top: 1px solid #ccc;
            font-size: 8pt;
            color: #666;
            text-align: center;
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <!-- KOP SURAT -->
        <div class="kop">
          <h4>PEMERINTAH KABUPATEN BEKASI</h4>
          <h3>KECAMATAN BABELAN</h3>
          <h2>KANTOR KEPALA DESA KEDUNG JAYA</h2>
          <p>${desaInfo.alamat} • Telp: ${desaInfo.telepon} • Laman: https://kedungjaya.desa.id</p>
        </div>

        <!-- JUDUL & NOMOR SURAT -->
        <div class="judul-surat">
          <h3>${surat.jenis}</h3>
          <span class="nomor-surat">Nomor: ${surat.noReg}</span>
        </div>

        <!-- KALIMAT PEMBUKA -->
        <p>Yang bertanda tangan di bawah ini Kepala Desa Kedung Jaya, Kecamatan Babelan, Kabupaten Bekasi, menerangkan dengan sesungguhnya bahwa:</p>

        <!-- BIODATA PEMOHON -->
        <table class="biodata">
          <tr>
            <td style="width: 28%;">Nama Lengkap</td>
            <td style="width: 3%;">:</td>
            <td><b>${surat.pemohonNama}</b></td>
          </tr>
          <tr>
            <td>NIK (KTP-el)</td>
            <td>:</td>
            <td>${surat.pemohonNik}</td>
          </tr>
          <tr>
            <td>Nomor Telepon/WA</td>
            <td>:</td>
            <td>${surat.pemohonTelepon}</td>
          </tr>
          <tr>
            <td>Alamat Domisili</td>
            <td>:</td>
            <td>${surat.pemohonAlamat}</td>
          </tr>
          <tr>
            <td>Wilayah RT / RW</td>
            <td>:</td>
            <td>${surat.wilayahRT || 'RT 03 / RW 02'}</td>
          </tr>
        </table>

        <!-- ISI KETERANGAN -->
        ${keterangan.teksWord}

        <!-- PENUTUP -->
        <p>Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya oleh pihak yang berkepentingan.</p>

        <!-- TANDA TANGAN ELEKTRONIK (TTE) -->
        <div class="tte-section">
          <div class="tte-box">
            <p>Kedung Jaya, ${tanggalSurat}</p>
            <p><b>Kepala Desa Kedung Jaya,</b></p>
            
            <div class="tte-stamp">
              ✓ DITANDATANGANI SECARA ELEKTRONIK<br>
              <span style="font-size: 8pt; font-weight: normal;">Sertifikat BSrE BSSN: ${sertifikatId}</span>
            </div>

            <p style="margin-top: 15px;"><b><u>${namaKades}</u></b><br>
            <span style="font-size: 9.5pt;">NIP. 19750812 201001 1 001</span></p>
          </div>
          <div style="clear: both;"></div>
        </div>

        <!-- LEGAL FOOTER -->
        <div class="footer-legal">
          Dokumen ini telah ditandatangani secara elektronik bersertifikat menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE), BSSN. Dokumen memiliki kekuatan hukum yang sah sesuai dengan UU RI No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik.
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', wordContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    const cleanFileName = `${surat.jenis.replace(/[^a-zA-Z0-9]/g, '_')}_${surat.pemohonNama.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    downloadLink.href = url;
    downloadLink.download = cleanFileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      
      {/* Container Surat */}
      <div className="print-area bg-white rounded-3xl max-w-2xl w-full max-h-[94vh] shadow-2xl border border-slate-200 my-auto overflow-y-auto animate-scaleUp print:m-0 print:p-0 print:border-none print:shadow-none print:max-w-none print:max-h-none print:rounded-none">
        
        {/* BAR TOMBOL AKSI ATAS (TIDAK DICETAK SAAT PRINT / PDF) */}
        <div className="print:hidden p-3.5 sm:p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2 sticky top-0 z-10 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-bold text-emerald-300">
              E-Dokumen Resmi (TTE BSrE Sah)
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            {/* Tombol Cetak / PDF */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b5e42] hover:bg-[#084832] text-white text-xs font-bold transition-all shadow-md active:scale-95"
              title="Cetak langsung atau simpan sebagai PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>

            {/* Tombol Unduh Word (.doc) */}
            <button
              onClick={handleExportWord}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              title="Unduh file dokumen Word untuk diedit atau diarsipkan"
            >
              <FileText className="w-4 h-4" />
              <span>Unduh Word (.doc)</span>
            </button>

            {/* Tombol Salin Link Verifikasi */}
            <button
              onClick={copyVerifyLink}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              title="Salin Tautan Verifikasi"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            {/* Tombol Tutup */}
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
              <img src="./public/images/logo.jpg" alt="Logo Desa" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
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
            {keterangan.teksHtml}
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
                {surat.tteInfo?.penandatangan || 'Bpk. H.Johari.'}
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
