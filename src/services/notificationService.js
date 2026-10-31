/**
 * NotificationService - Desa Kedung Jaya
 * Mengelola simulasi notifikasi otomatis WhatsApp ke Warga & Perangkat Desa
 */

const STORAGE_NOTIF_KEY = 'kedungjaya_wa_notifications';

export function getNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_NOTIF_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function sendWhatsAppNotification({ penerimaNama, penerimaTelepon, judul, pesan, tipe = 'SURAT' }) {
  const all = getNotifications();
  const now = new Date();
  const waktuStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

  const newNotif = {
    id: `WA-${Date.now()}`,
    penerimaNama,
    penerimaTelepon: penerimaTelepon || '0812-3456-7890',
    judul,
    pesan,
    tipe,
    waktu: waktuStr,
    timestamp: now.toISOString(),
    dibaca: false
  };

  all.unshift(newNotif);
  // Simpan maksimal 30 notifikasi terakhir
  if (all.length > 30) all.pop();
  localStorage.setItem(STORAGE_NOTIF_KEY, JSON.stringify(all));

  // Dispatch custom window event agar floating toast WhatsApp langsung bereaksi
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('kedungjaya_wa_notif', { detail: newNotif }));
  }

  return newNotif;
}
