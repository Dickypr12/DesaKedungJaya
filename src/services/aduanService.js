/**
 * AduanService - Desa Kedung Jaya
 * Mengelola alur pengaduan warga, pemantauan aduan kritis, dan disposisi tindakan oleh Kepala Desa
 */

import { sendWhatsAppNotification } from './notificationService';

const STORAGE_ADUAN_KEY = 'kedungjaya_aduan_pipeline';

export function initAduanPipeline() {
  const existing = localStorage.getItem(STORAGE_ADUAN_KEY);
  if (!existing) {
    const initialAduan = [
      {
        id: 'ADU-2025-084',
        tiket: 'Tiket #ADU-2025-084',
        prioritas: 'Prioritas 1 (Kritis)',
        judul: 'Jembatan Penghubung Dusun II Butuh Perbaikan',
        kategori: 'Infrastruktur Jalan & Jembatan',
        dusun: 'Dusun II Kedung Barat',
        pelaporNama: 'Hendra Kusuma',
        pelaporNik: '3216012804920003',
        pelaporTelepon: '081234567891',
        deskripsi: 'Pondasi kayu sisi timur amblas setelah hujan deras semalam. Rawan dilewati anak sekolah dan kendaraan muatan hasil tani.',
        gambar: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=400&auto=format&fit=crop&q=80',
        status: 'MENUNGGU_DISPOSISI', // Perlu tindakan Kades
        disposisiTarget: 'Tim Teknis Desa (Kaur Pembangunan)',
        disposisiCatatan: 'PJ: Kaur Pembangunan • Estimasi Tinjauan 2 Jam',
        statusMaterial: 'Material Siaga • 32 Warga Mendukung',
        tanggalLapor: '31 Oktober 2025, 07:15 WIB',
        riwayat: [
          { waktu: '31 Okt 2025, 07:15', oleh: 'Hendra Kusuma (Warga)', teks: 'Laporan aduan diunggah lewat Portal Desa' }
        ]
      },
      {
        id: 'ADU-2025-085',
        tiket: 'Tiket #ADU-2025-085',
        prioritas: 'Prioritas 2',
        judul: 'Penerangan Jalan Umum (PJU) Lingkungan RT 04 Padam',
        kategori: 'Fasilitas Umum & Lingkungan',
        dusun: 'Dusun IV Lingkungan IV',
        pelaporNama: 'Bambang Irawan',
        pelaporNik: '3216012804920088',
        pelaporTelepon: '081299112233',
        deskripsi: 'Dua tiang lampu penerangan jalan di perempatan RT 04 padam sejak 2 malam lalu, mohon bantuan penggantian bohlam / sambungan listrik.',
        gambar: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=400&auto=format&fit=crop&q=80',
        status: 'DIDISPOSISIKAN',
        disposisiTarget: 'Kepala Dusun IV & Petugas PJU',
        disposisiCatatan: 'Instruksi Kades: Koordinasikan dengan PLN Rayon Babelan hari ini.',
        statusMaterial: 'Dalam Penanganan',
        tanggalLapor: '30 Oktober 2025, 19:40 WIB',
        riwayat: [
          { waktu: '30 Okt 2025, 19:40', oleh: 'Bambang Irawan', teks: 'Laporan aduan didaftarkan' },
          { waktu: '31 Okt 2025, 08:00', oleh: 'Bpk. H. Suryono, S.Sos. (Kades)', teks: 'Didisposisikan ke Kadus IV & Teknisi Listrik Desa' }
        ]
      }
    ];

    localStorage.setItem(STORAGE_ADUAN_KEY, JSON.stringify(initialAduan));
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
    dusun: dusun || 'Dusun II Kedung Barat',
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
    oleh: 'Bpk. H. Suryono, S.Sos. (Kepala Desa)',
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
