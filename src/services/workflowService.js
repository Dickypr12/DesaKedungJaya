/**
 * WorkflowService - Desa Kedung Jaya
 * Mengelola alur estafet berkas surat interaktif:
 * Warga (Ajukan) -> RT/RW (Verifikasi Pengantar) -> Operator (Validasi Berkas) -> Kades (TTE BSrE) -> Warga (Surat Terbit)
 */

const STORAGE_WORKFLOW_KEY = 'kedungjaya_surat_pipeline';

// Inisialisasi data awal jika belum ada
export function initWorkflowPipeline() {
  const existing = localStorage.getItem(STORAGE_WORKFLOW_KEY);
  if (!existing) {
    const initialPipeline = [
      {
        id: 'SRT-2025-001',
        noReg: '470/142/SKU/X/2025',
        jenis: 'Surat Keterangan Usaha (SKU)',
        pemohonNama: 'Hendra Kusuma',
        pemohonNik: '3216012804920003',
        pemohonTelepon: '081234567891',
        pemohonAlamat: 'Dusun II Kedung Barat, RT 03 / RW 02',
        wilayahRT: 'RT 03 / RW 02',
        keperluan: 'Persyaratan Pengajuan KUR BRI Usaha Toko Kelontong "Jaya Makmur"',
        detailUsaha: 'Toko Kelontong "Jaya Makmur" (Berjalan 3 Tahun)',
        tanggalPengajuan: '31 Oktober 2025, 08:30 WIB',
        status: 'MENUNGGU_TTE_KADES', // Muncul di dashboard Kades persis seperti screenshot Stitch!
        statusLabel: 'DIPERIKSA',
        rekomendasi: 'Rekomendasi Layak Usaha',
        riwayat: [
          { tahap: 'Pengajuan Warga', waktu: '31 Okt 2025, 08:30', oleh: 'Hendra Kusuma (Warga)', catatan: 'Formulir online dan foto usaha diunggah' },
          { tahap: 'Pengantar RT/RW', waktu: '31 Okt 2025, 08:45', oleh: 'Bpk. Mulyono (Ketua RT 03)', catatan: 'Domisili dan usaha faktual terverifikasi' },
          { tahap: 'Validasi Operator', waktu: '31 Okt 2025, 09:10', oleh: 'Dewi Lestari, S.Pd (Operator)', catatan: 'NIK dan KTP valid terhubung Disdukcapil' }
        ],
        tteInfo: null
      },
      {
        id: 'SRT-2025-002',
        noReg: '474/089/SKTM/X/2025',
        jenis: 'SKTM Bantuan Pendidikan',
        pemohonNama: 'Ibu Sumarni',
        pemohonNik: '3216014407880005',
        pemohonTelepon: '081299887766',
        pemohonAlamat: 'Dusun I Kedung Timur, RT 01 / RW 01',
        wilayahRT: 'RT 01 / RW 01',
        keperluan: 'Beasiswa KIP Kuliah Putra Pertama',
        detailUsaha: 'Keluarga Pra-Sejahtera Desil 2',
        tanggalPengajuan: '31 Oktober 2025, 09:00 WIB',
        status: 'MENUNGGU_TTE_KADES',
        statusLabel: 'SIAP TTE',
        rekomendasi: 'Rekomendasi: Layak',
        riwayat: [
          { tahap: 'Pengajuan Warga', waktu: '31 Okt 2025, 09:00', oleh: 'Ibu Sumarni', catatan: 'Pengajuan SKTM dan kartu KIP dilampirkan' },
          { tahap: 'Pengantar RT/RW', waktu: '31 Okt 2025, 09:15', oleh: 'Ketua RT 01', catatan: 'Kondisi ekonomi sesuai fakta lapangan' },
          { tahap: 'Validasi Operator', waktu: '31 Okt 2025, 09:30', oleh: 'Dewi Lestari, S.Pd', catatan: 'Data DTKS Terpadu Valid' }
        ],
        tteInfo: null
      },
      {
        id: 'SRT-2025-003',
        noReg: '471/021/SKD/VIII/2025',
        jenis: 'Surat Keterangan Domisili',
        pemohonNama: 'Hendra Kusuma',
        pemohonNik: '3216012804920003',
        pemohonTelepon: '081234567891',
        pemohonAlamat: 'Dusun II Kedung Barat, RT 03 / RW 02',
        wilayahRT: 'RT 03 / RW 02',
        keperluan: 'Pembukaan Rekening Bank BJB',
        detailUsaha: '-',
        tanggalPengajuan: '14 Agustus 2025, 10:00 WIB',
        status: 'SELESAI_TERBIT',
        statusLabel: '100% SAH BSrE',
        rekomendasi: 'Disetujui',
        riwayat: [
          { tahap: 'Pengajuan Warga', waktu: '14 Agu 2025, 10:00', oleh: 'Hendra Kusuma', catatan: 'Diajukan online' },
          { tahap: 'Pengantar RT/RW', waktu: '14 Agu 2025, 10:15', oleh: 'Bpk. Mulyono', catatan: 'Terverifikasi' },
          { tahap: 'Validasi Operator', waktu: '14 Agu 2025, 10:30', oleh: 'Dewi Lestari, S.Pd', catatan: 'Lengkap' },
          { tahap: 'Penandatanganan TTE', waktu: '14 Agu 2025, 11:00', oleh: 'Bpk. H. Suryono, S.Sos. (Kades)', catatan: 'Telah dibubuhi TTE BSrE BSSN' }
        ],
        tteInfo: {
          penandatangan: 'Bpk. H. Suryono, S.Sos.',
          jabatan: 'Kepala Desa Kedung Jaya',
          sertifikat: 'BSrE BSSN ID: BSRE-KJ-2025-8941',
          tanggalTTE: '14 Agu 2025, 11:00 WIB'
        }
      }
    ];

    localStorage.setItem(STORAGE_WORKFLOW_KEY, JSON.stringify(initialPipeline));
  }
}

// Ambil semua surat
export function getAllSurat() {
  initWorkflowPipeline();
  try {
    const raw = localStorage.getItem(STORAGE_WORKFLOW_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSuratList(list) {
  localStorage.setItem(STORAGE_WORKFLOW_KEY, JSON.stringify(list));
}

// 1. Ambil berkas khusus milik Warga yang sedang login
export function getSuratByWarga(nik) {
  const all = getAllSurat();
  return all.filter(s => s.pemohonNik === nik);
}

// 2. Ambil antrean verifikasi untuk Ketua RT
export function getSuratForRT(wilayahRT = 'RT 03 / RW 02') {
  const all = getAllSurat();
  return all.filter(s => s.status === 'MENUNGGU_RT' && (s.wilayahRT === wilayahRT || !s.wilayahRT));
}

// 3. Ambil antrean untuk Operator Pelayanan
export function getSuratForOperator() {
  const all = getAllSurat();
  return all.filter(s => s.status === 'MENUNGGU_OPERATOR');
}

// 4. Ambil antrean untuk Kepala Desa (Menunggu TTE)
export function getSuratForKades() {
  const all = getAllSurat();
  return all.filter(s => s.status === 'MENUNGGU_TTE_KADES');
}

// AKSI 1: Warga Mengajukan Surat Baru
export function ajukanSuratBaru({ jenis, pemohonNama, pemohonNik, pemohonTelepon, pemohonAlamat, wilayahRT, keperluan, detailUsaha }) {
  const all = getAllSurat();
  const idNumber = Math.floor(100 + Math.random() * 900);
  const now = new Date();
  const waktuStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + 
                   now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

  const newSurat = {
    id: `SRT-2025-${idNumber}`,
    noReg: `470/${idNumber}/${jenis.slice(0, 3).toUpperCase()}/X/2025`,
    jenis,
    pemohonNama,
    pemohonNik,
    pemohonTelepon,
    pemohonAlamat: pemohonAlamat || 'Desa Kedung Jaya',
    wilayahRT: wilayahRT || 'RT 03 / RW 02',
    keperluan,
    detailUsaha: detailUsaha || '-',
    tanggalPengajuan: waktuStr,
    status: 'MENUNGGU_RT', // Berkas langsung masuk ke antrean Ketua RT!
    statusLabel: 'VERIFIKASI RT',
    rekomendasi: 'Menunggu Pengantar RT',
    riwayat: [
      {
        tahap: 'Pengajuan Warga',
        waktu: waktuStr,
        oleh: `${pemohonNama} (Warga)`,
        catatan: `Permohonan ${jenis} berhasil diajukan online.`
      }
    ],
    tteInfo: null
  };

  all.unshift(newSurat);
  saveSuratList(all);
  return newSurat;
}

// AKSI 2: Ketua RT Menyetujui Pengantar
export function approveByRT(suratId, namaRT = 'Bpk. Mulyono (Ketua RT 03)') {
  const all = getAllSurat();
  const index = all.findIndex(s => s.id === suratId);
  if (index === -1) return null;

  const nowStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) + ', ' + 
                 new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  all[index].status = 'MENUNGGU_OPERATOR'; // Berkas otomatis pindah ke Operator Loket!
  all[index].statusLabel = 'DIPERIKSA OPERATOR';
  all[index].riwayat.push({
    tahap: 'Pengantar RT/RW',
    waktu: nowStr,
    oleh: namaRT,
    catatan: 'Pengantar RT telah divalidasi dan ditandatangani secara digital.'
  });

  saveSuratList(all);
  return all[index];
}

// AKSI 3: Operator Pelayanan Memvalidasi Berkas & Meneruskan ke Kades
export function forwardToKades(suratId, operatorNama = 'Dewi Lestari, S.Pd (Operator)') {
  const all = getAllSurat();
  const index = all.findIndex(s => s.id === suratId);
  if (index === -1) return null;

  const nowStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) + ', ' + 
                 new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  all[index].status = 'MENUNGGU_TTE_KADES'; // Berkas otomatis muncul di HP Pak Kades!
  all[index].statusLabel = 'SIAP TTE';
  all[index].riwayat.push({
    tahap: 'Validasi Operator',
    waktu: nowStr,
    oleh: operatorNama,
    catatan: 'Berkas e-KTP dan KK telah lengkap dan siap ditandatangani Kades.'
  });

  saveSuratList(all);
  return all[index];
}

// AKSI 4: Kepala Desa Menandatangani Elektronik (TTE BSrE)
export function signByKadesTTE(suratId, kadesNama = 'Bpk. H. Suryono, S.Sos.') {
  const all = getAllSurat();
  const index = all.findIndex(s => s.id === suratId);
  if (index === -1) return null;

  const nowStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + 
                 new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

  all[index].status = 'SELESAI_TERBIT'; // Surat resmi terbit & sah!
  all[index].statusLabel = '100% SAH BSrE';
  all[index].tteInfo = {
    penandatangan: kadesNama,
    jabatan: 'Kepala Desa Kedung Jaya',
    sertifikat: `BSrE-BSSN-${Date.now().toString(36).toUpperCase()}`,
    tanggalTTE: nowStr
  };
  all[index].riwayat.push({
    tahap: 'Penandatanganan TTE',
    waktu: nowStr,
    oleh: `${kadesNama} (Kepala Desa)`,
    catatan: 'Surat resmi disahkan dengan Tanda Tangan Elektronik tersertifikasi BSrE BSSN.'
  });

  saveSuratList(all);
  return all[index];
}

// AKSI 5: Penolakan / Pengembalian Revisi
export function rejectOrReviseSurat(suratId, alasan, tahapNama) {
  const all = getAllSurat();
  const index = all.findIndex(s => s.id === suratId);
  if (index === -1) return null;

  all[index].status = 'PERLU_REVISI';
  all[index].statusLabel = 'REVISI BERKAS';
  all[index].riwayat.push({
    tahap: 'Pengembalian Berkas',
    waktu: 'Hari ini',
    oleh: tahapNama,
    catatan: alasan || 'Berkas belum lengkap / perlu perbaikan.'
  });

  saveSuratList(all);
  return all[index];
}
