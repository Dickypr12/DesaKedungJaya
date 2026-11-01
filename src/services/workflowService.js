/**
 * WorkflowService - Desa Kedung Jaya
 * Mengelola alur estafet berkas surat interaktif:
 * Warga (Ajukan) -> RT/RW (Verifikasi Pengantar) -> Operator (Validasi Berkas) -> Kades (TTE BSrE) -> Warga (Surat Terbit)
 */

import { sendWhatsAppNotification } from './notificationService';

const STORAGE_WORKFLOW_KEY = 'kedungjaya_surat_pipeline';

// Inisialisasi data awal (Mulai dari NOL / Zero Data)
export function initWorkflowPipeline() {
  const existing = localStorage.getItem(STORAGE_WORKFLOW_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_WORKFLOW_KEY, JSON.stringify([]));
  } else {
    try {
      const items = JSON.parse(existing);
      // Bersihkan data dummy bawaan lama jika masih tersimpan di browser
      const cleaned = Array.isArray(items) 
        ? items.filter(i => !['SRT-2025-001', 'SRT-2025-002', 'SRT-2025-003'].includes(i.id))
        : [];
      if (cleaned.length !== items.length) {
        localStorage.setItem(STORAGE_WORKFLOW_KEY, JSON.stringify(cleaned));
      }
    } catch {
      localStorage.setItem(STORAGE_WORKFLOW_KEY, JSON.stringify([]));
    }
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
    pemohonAlamat: pemohonAlamat || 'Kp Wates, Kedungjaya, Kec. Babelan',
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

  // Kirim Notifikasi WhatsApp ke Warga
  sendWhatsAppNotification({
    penerimaNama: pemohonNama,
    penerimaTelepon: pemohonTelepon,
    judul: 'Pengajuan Surat Berhasil',
    pesan: `Permohonan ${jenis} (No Reg: ${newSurat.noReg}) berhasil diajukan online dan telah masuk antrean Ketua RT untuk verifikasi pengantar.`
  });

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

  // Kirim Notifikasi WhatsApp ke Warga
  sendWhatsAppNotification({
    penerimaNama: all[index].pemohonNama,
    penerimaTelepon: all[index].pemohonTelepon,
    judul: 'Surat Pengantar RT Disetujui',
    pesan: `Pengantar RT untuk ${all[index].jenis} telah disahkan oleh ${namaRT}. Berkas saat ini sedang diproses oleh Operator Loket Desa.`
  });

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

  // Kirim Notifikasi WhatsApp ke Warga
  sendWhatsAppNotification({
    penerimaNama: all[index].pemohonNama,
    penerimaTelepon: all[index].pemohonTelepon,
    judul: 'Berkas Lengkap Menunggu TTE Kades',
    pesan: `Berkas ${all[index].jenis} telah lengkap diverifikasi Operator dan diteruskan ke Kepala Desa untuk penandatanganan elektronik (TTE BSrE).`
  });

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

  // Kirim Notifikasi WhatsApp ke Warga
  sendWhatsAppNotification({
    penerimaNama: all[index].pemohonNama,
    penerimaTelepon: all[index].pemohonTelepon,
    judul: 'Surat Resmi Terbit (Sah TTE BSrE)',
    pesan: `Selamat! Surat ${all[index].jenis} (${all[index].noReg}) telah disahkan secara digital oleh Kepala Desa (${kadesNama}) bersertifikasi BSrE BSSN. Dokumen resmi siap diunduh & dicetak!`
  });

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

  // Kirim Notifikasi WhatsApp ke Warga
  sendWhatsAppNotification({
    penerimaNama: all[index].pemohonNama,
    penerimaTelepon: all[index].pemohonTelepon,
    judul: 'Pemberitahuan Revisi Berkas',
    pesan: `Pemberitahuan: Berkas ${all[index].jenis} memerlukan perbaikan dari ${tahapNama}. Catatan: "${alasan || 'Lengkapi dokumen persyaratan'}".`
  });

  return all[index];
}

