/**
 * AduanService - Desa Kedung Jaya
 * Mengelola alur pengaduan warga, pemantauan aduan kritis, dan disposisi tindakan oleh Kepala Desa
 */

import { sendWhatsAppNotification } from './notificationService';

const STORAGE_ADUAN_KEY = 'kedungjaya_aduan_pipeline';

export function initAduanPipeline() {
  const existing = localStorage.getItem(STORAGE_ADUAN_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_ADUAN_KEY, JSON.stringify([]));
  } else {
    try {
      const items = JSON.parse(existing);
      // Bersihkan data dummy lama jika ada di browser
      const cleaned = Array.isArray(items)
        ? items.filter(a => !['ADU-2025-084', 'ADU-2025-085'].includes(a.id))
        : [];
      if (cleaned.length !== items.length) {
        localStorage.setItem(STORAGE_ADUAN_KEY, JSON.stringify(cleaned));
      }
    } catch {
      localStorage.setItem(STORAGE_ADUAN_KEY, JSON.stringify([]));
    }
  }
}

export function getAllAduan() {
  initAduanPipeline();
  try {
    const raw = localStorage.getItem(STORAGE_ADUAN_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAduanList(list) {
  localStorage.setItem(STORAGE_ADUAN_KEY, JSON.stringify(list));
}

// Ambil aduan milik warga tertentu
export function getAduanByWarga(nik) {
  const all = getAllAduan();
  return all.filter(a => a.pelaporNik === nik);
}

// Ambil aduan kritis yang belum didisposisi (untuk Kades)
export function getAduanKritis() {
  const all = getAllAduan();
  return all.filter(a => a.status === 'MENUNGGU_DISPOSISI');
}

// AKSI: Warga membuat laporan aduan baru
export function buatAduanBaru({ judul, kategori, dusun, deskripsi, pelaporNama, pelaporNik, pelaporTelepon, gambar }) {
  const all = getAllAduan();
  const randomNum = Math.floor(100 + Math.random() * 900);
  const tiket = `Tiket #ADU-2025-${randomNum}`;
  const now = new Date();
  const waktuStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' +
                   now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

  const newAduan = {
    id: `ADU-2025-${randomNum}`,
    tiket,
    prioritas: 'Prioritas 1 (Kritis)',
    judul,
    kategori: kategori || 'Infrastruktur Lingkungan',
    dusun: dusun || 'Kp. Wates, Kedungjaya',
    pelaporNama,
    pelaporNik,
    pelaporTelepon: pelaporTelepon || '081234567891',
    deskripsi,
    gambar: gambar || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=400&auto=format&fit=crop&q=80',
    status: 'MENUNGGU_DISPOSISI',
    disposisiTarget: 'Pemeriksaan Kepala Desa',
    disposisiCatatan: 'Menunggu instruksi tindak lanjut dari Kepala Desa.',
    statusMaterial: 'Verifikasi Awal Warga',
    tanggalLapor: waktuStr,
    riwayat: [
      { waktu: waktuStr, oleh: `${pelaporNama} (Warga)`, teks: 'Laporan aduan berhasil diajukan online' }
    ]
  };

  all.unshift(newAduan);
  saveAduanList(all);

  // Kirim WhatsApp konfirmasi ke Warga
  sendWhatsAppNotification({
    penerimaNama,
    penerimaTelepon: newAduan.pelaporTelepon,
    judul: 'Laporan Aduan Diterima',
    pesan: `Terima kasih Sdr/i ${pelaporNama}. Laporan "${judul}" (${tiket}) telah diterima dan diteruskan ke Kepala Desa untuk disposisi tim teknis.`
  });

  return newAduan;
}

// AKSI: Kepala Desa mendisposisikan aduan ke tim teknis
export function disposisiOlehKades(aduanId, disposisiTarget, instruksiCatatan) {
  const all = getAllAduan();
  const index = all.findIndex(a => a.id === aduanId);
  if (index === -1) return null;

  const now = new Date();
  const waktuStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) + ', ' +
                   now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  all[index].status = 'DIDISPOSISIKAN';
  all[index].disposisiTarget = disposisiTarget || 'Tim Teknis Desa (Kaur Pembangunan)';
  all[index].disposisiCatatan = instruksiCatatan || 'Instruksi Kades: Lakukan peninjauan lokasi dan penanganan darurat segera.';
  all[index].riwayat.push({
    waktu: waktuStr,
    oleh: 'Bpk. H. Johari (Kepala Desa)',
    teks: `Didisposisikan ke ${all[index].disposisiTarget}: "${all[index].disposisiCatatan}"`
  });

  saveAduanList(all);

  // Kirim WhatsApp ke Warga Pelapor
  sendWhatsAppNotification({
    penerimaNama: all[index].pelaporNama,
    penerimaTelepon: all[index].pelaporTelepon,
    judul: 'Disposisi Tindakan Kepala Desa',
    pesan: `Pemberitahuan: Laporan Anda "${all[index].judul}" telah didisposisikan oleh Kepala Desa ke ${all[index].disposisiTarget}. Catatan: "${all[index].disposisiCatatan}".`
  });

  return all[index];
}

