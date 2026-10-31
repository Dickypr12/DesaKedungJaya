import React, { useState } from 'react';
import { 
  PhoneCall, Mail, MapPin, Clock, MessageSquare, 
  Send, AlertCircle, CheckCircle2, ShieldAlert, HeartHandshake,
  Check, Copy, PhoneForwarded
} from 'lucide-react';
import { desaInfo } from '../data/desaData';

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    dusun: 'Dusun I Kedung Timur',
    kategori: 'Infrastruktur & Jalan Rusak',
    lokasi: '',
    laporan: '',
    anonim: false
  });

  const [submittedReport, setSubmittedReport] = useState(null);
  const [copied, setCopied] = useState(false);

  // Data mock riwayat pengaduan yang telah ditangani pemerintah desa
  const [riwayatLaporan, setRiwayatLaporan] = useState([
    {
      id: 'LPR-2026-081',
      kategori: 'Infrastruktur',
      lokasi: 'Jl. Melati RT 03 RW 02, Dusun II',
      judul: 'Lampu Penerangan Jalan Umum (PJU) Mati',
      status: 'SELESAI DITANGANI',
      tindakLanjut: 'Petugas PLN bersama Kaur Pembangunan telah mengganti bohlam LED solar cell pada 29 Oktober 2026.',
      tanggal: '28 Okt 2026'
    },
    {
      id: 'LPR-2026-082',
      kategori: 'Pelayanan Publik',
      lokasi: 'Loket Pelayanan Desa',
      judul: 'Permintaan Percepatan Legalisir Dokumen KTP',
      status: 'SELESAI DITANGANI',
      tindakLanjut: 'Dokumen pemohon telah divalidasi dan diambil langsung di loket pelayanan pada 30 Oktober 2026.',
      tanggal: '29 Okt 2026'
    },
    {
      id: 'LPR-2026-083',
      kategori: 'Lingkungan',
      lokasi: 'Saluran Irigasi Tersier Dusun I',
      judul: 'Sampah Menumpuk di Pintu Air',
      status: 'DALAM PENGERJAAN',
      tindakLanjut: 'Jadwal kerja bakti Karang Taruna dan Satgas Lingkungan diagendakan Minggu pagi ini.',
      tanggal: '30 Okt 2026'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.telepon || !formData.laporan) {
      alert('Mohon lengkapi nomor WhatsApp dan uraian laporan Anda.');
      return;
    }

    const randomId = `LPR-2026-0${Math.floor(84 + Math.random() * 900)}`;
    const newReport = {
      id: randomId,
      kategori: formData.kategori,
      lokasi: formData.lokasi || formData.dusun,
      judul: formData.laporan.slice(0, 45) + (formData.laporan.length > 45 ? '...' : ''),
      status: 'MENUNGGU VERIFIKASI',
      tindakLanjut: 'Laporan baru diterima oleh Admin Lapor Desa. Segera dikoordinasikan dengan kepala dusun setempat.',
      tanggal: 'Hari ini'
    };

    setRiwayatLaporan([newReport, ...riwayatLaporan]);
    setSubmittedReport(newReport);
    setFormData({
      nama: '',
      telepon: '',
      dusun: 'Dusun I Kedung Timur',
      kategori: 'Infrastruktur & Jalan Rusak',
      lokasi: '',
      laporan: '',
      anonim: false
    });
  };

  return (
    <div className="space-y-14 pb-20">
      
      {/* HEADER */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800/80 text-emerald-300 text-xs font-semibold">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Pusat Komunikasi & Layanan Aduan</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Kontak Kantor & Kanal Lapor Warga
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Hubungi petugas perangkat desa, layanan nomor darurat 24 jam, atau sampaikan aspirasi dan pengaduan pembangunan secara transparan.
            </p>
          </div>
        </div>
      </section>

      {/* INFORMASI KANTOR & NOMOR DARURAT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Kantor Info */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
                Kantor Pelayanan
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Pemerintah Desa Kedung Jaya
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Alamat Kantor Desa:</strong>
                  <span>{desaInfo.alamat}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Jam Kerja Pelayanan:</strong>
                  <span>{desaInfo.jamKerja} (Sabtu, Minggu & Hari Libur Nasional Tutup)</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <PhoneCall className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Telepon Resmi:</strong>
                  <a href={`tel:${desaInfo.telepon}`} className="text-brand-700 hover:underline">{desaInfo.telepon}</a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Surat Elektronik (Email):</strong>
                  <a href={`mailto:${desaInfo.email}`} className="text-brand-700 hover:underline">{desaInfo.email}</a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`https://wa.me/${desaInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                <PhoneForwarded className="w-4 h-4" />
                <span>Chat Langsung WhatsApp Layanan ({desaInfo.whatsapp})</span>
              </a>
            </div>
          </div>

          {/* Hotline Darurat 24 Jam */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
            <div>
              <span className="text-rose-400 text-xs font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Tanggap Darurat Desa
              </span>
              <h2 className="text-2xl font-black tracking-tight mt-1">
                Nomor Kontak Darurat 24 Jam
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Layanan cepat tanggap medis, keamanan lingkungan, dan koordinasi muspika.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-xs font-bold text-rose-400">🚑 Ambulans Siaga Desa</span>
                <p className="text-lg font-black text-white font-mono">0812-9988-7711</p>
                <p className="text-[11px] text-slate-400">Siap antar warga sakit/rujukan RS</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-xs font-bold text-blue-400">👮 Bhabinkamtibmas Polsek</span>
                <p className="text-lg font-black text-white font-mono">0813-2233-4455</p>
                <p className="text-[11px] text-slate-400">Aipda Hendra (Keamanan Desa)</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-xs font-bold text-emerald-400">🎖️ Babinsa Koramil</span>
                <p className="text-lg font-black text-white font-mono">0812-4455-6677</p>
                <p className="text-[11px] text-slate-400">Serda Wahyudi (Ketertiban)</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-xs font-bold text-amber-400">⚡ Tim Siaga Bencana (Tagana)</span>
                <p className="text-lg font-black text-white font-mono">0858-7766-5544</p>
                <p className="text-[11px] text-slate-400">Posko Evakuasi Balai Desa</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FORM PENGADUAN WARGA (LAPOR KEDUNG JAYA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
                Kanal LAPOR KEDUNG
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Sampaikan Aspirasi & Pengaduan
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Laporan Anda akan langsung diteruskan ke Kepala Seksi terkait untuk ditinjau dan ditindaklanjuti.
              </p>
            </div>

            {submittedReport && (
              <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs space-y-2">
                <p className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Laporan Anda Berhasil Terkirim dengan Nomor: {submittedReport.id}</span>
                </p>
                <p className="text-emerald-800 leading-relaxed">
                  Terima kasih atas kepedulian Anda terhadap kemajuan Desa Kedung Jaya. Petugas akan segera memverifikasi laporan ini.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nama Pelapor
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder={formData.anonim ? "Disembunyikan (Anonim)" : "Nama Anda"}
                    disabled={formData.anonim}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telepon}
                    onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                    placeholder="Untuk konfirmasi tindak lanjut"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kategori Pengaduan *
                  </label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option>Infrastruktur & Jalan Rusak</option>
                    <option>Pelayanan Publik / Aparat</option>
                    <option>Bantuan Sosial & Kemiskinan</option>
                    <option>Ketertiban Lingkungan & Sampah</option>
                    <option>Saran & Aspirasi Pembangunan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Dusun Terkait
                  </label>
                  <select
                    value={formData.dusun}
                    onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option>Dusun I Kedung Timur</option>
                    <option>Dusun II Kedung Barat</option>
                    <option>Dusun III Kedung Selatan</option>
                    <option>Dusun IV Kedung Utara</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Lokasi Spesifik (Nama Jalan / Patokan / RT / RW)
                </label>
                <input
                  type="text"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  placeholder="Contoh: Depan Masjid Al-Ikhlas RT 02 RW 01"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Uraian Laporan / Pengaduan *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.laporan}
                  onChange={(e) => setFormData({ ...formData, laporan: e.target.value })}
                  placeholder="Tuliskan detail kejadian atau kondisi yang dilaporkan..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonimCheck"
                  checked={formData.anonim}
                  onChange={(e) => setFormData({ ...formData, anonim: e.target.checked })}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="anonimCheck" className="text-xs text-slate-600 cursor-pointer">
                  Kirim sebagai laporan anonim (identitas Anda dirahasiakan kepada publik)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Laporan Pengaduan</span>
              </button>
            </form>
          </div>

          {/* Transparansi Tindak Lanjut Pengaduan */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-4">
              <div>
                <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
                  Transparansi Respon
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Status Pengaduan Terkini Warga
                </h3>
                <p className="text-xs text-slate-500">
                  Bukti nyata komitmen pemerintah desa dalam merespon aduan warga secara terbuka.
                </p>
              </div>

              <div className="space-y-3">
                {riwayatLaporan.map((lpr) => (
                  <div
                    key={lpr.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-slate-400">
                        {lpr.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lpr.status === 'SELESAI DITANGANI'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {lpr.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900">
                      {lpr.judul}
                    </h4>

                    <p className="text-[11px] text-slate-500">
                      📍 {lpr.lokasi} • {lpr.tanggal}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-700 border border-slate-100 leading-snug">
                      <strong className="text-brand-700 block">Tindak Lanjut Pemdes:</strong>
                      {lpr.tindakLanjut}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
