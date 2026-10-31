# Website Resmi Desa Kedung Jaya

Portal web informasi dan pelayanan publik modern terpadu Pemerintah Desa Kedung Jaya, Kecamatan Kedungwuni, Kabupaten Bekasi, Jawa Barat.

Dibangun dengan standar desain modern **Google Stitch / Material 3**, antarmuka yang bersih, responsif di perangkat seluler (HP) maupun desktop komputer.

---

## 🌟 Fitur Utama Website

1. **Beranda Interaktif (Home)**
   - Hero banner dengan navigasi cepat ke layanan surat mandiri dan profil desa.
   - Counter statistik kependudukan (Total Penduduk, Kepala Keluarga, Luas Wilayah, Realisasi APBDes).
   - Akses kilat 8 jenis surat administrasi warga.
   - Sambutan resmi Kepala Desa Kedung Jaya.
   - Ringkasan transparansi APBDes tahun berjalan dengan progress bar interaktif.
   - Kabar & pengumuman berita terkini.
   - Etalase produk unggulan UMKM lokal.
   - Galeri foto kegiatan & gotong royong warga desa.

2. **Profil Desa (`/profil`)**
   - Visi & 5 Misi Kepemimpinan Desa 2024–2029.
   - Sejarah asal-usul penamaan Desa Kedung Jaya dari awal abad ke-20 hingga era Smart Village.
   - Bagan struktur organisasi dan jajaran perangkat desa lengkap (Foto, Jabatan, NIPD, Pendidikan).
   - Batas geografis wilayah (Utara, Selatan, Timur, Barat) dan data tata guna lahan.
   - Demografi statistik pekerjaan warga dan persebaran di 4 dusun.

3. **Layanan Mandiri Surat Online (`/layanan`)**
   - Formulir permohonan surat kependudukan secara mandiri (SKU, SK Domisili, SKCK, SKTM, SK Kelahiran, SK Kematian, Surat Pindah, Surat Izin Keramaian).
   - **Nomor Resi / Tiket Otomatis** saat permohonan berhasil dikirim.
   - **Fitur Lacak Status Dokumen (Tracking)**: Memantau 4 tahapan pengerjaan (Pengajuan Diterima → Verifikasi Berkas → Tanda Tangan Kades → Siap Ambil di Loket).
   - Katalog SOP dan syarat dokumen lengkap untuk setiap jenis permohonan.

4. **Kanal Berita & Pengumuman (`/berita`)**
   - Pencarian artikel langsung (live search).
   - Filter berdasarkan kategori (Pertanian & Ekonomi, Pemerintahan & Layanan, Kesejahteraan Sosial, Kesehatan, Pembangunan, UMKM).
   - Modal popup membaca artikel lengkap tanpa reload halaman.
   - Fitur bagikan langsung ke WhatsApp warga.

5. **Transparansi APBDes (`/transparansi`)**
   - Ringkasan keuangan desa (Total Pendapatan, Total Belanja, Surplus SILPA, Persentase Serapan 98.4%).
   - Rincian belanja pada 5 bidang utama pemerintahan desa.
   - Breakdown sumber pendapatan (Dana Desa APBN, ADD Kabupaten, PADes, Bagi Hasil Pajak).
   - Pusat unduhan dokumen publik (Perdes APBDes, RKPDes, LPJ Dana Desa).

6. **Sentra Potensi & Pasar UMKM (`/umkm`)**
   - Etalase produk khas desa: Beras Organik Kedung, Keripik Singkong Balado, Keranjang Anyaman Bambu, Madu Klanceng Murni, dsb.
   - Filter produk berdasarkan kategori (Pertanian, Kuliner, Kerajinan, Kesehatan, Fashion).
   - Tombol pemesanan langsung terhubung ke WhatsApp produsen lokal.
   - Formulir pendaftaran produk UMKM baru gratis untuk warga desa.

7. **Kontak & Kanal LAPOR KEDUNG (`/kontak`)**
   - Alamat kantor balai desa dan jam pelayanan loket.
   - Daftar kontak darurat 24 Jam (Ambulans Siaga Desa, Bhabinkamtibmas Polsek, Babinsa Koramil, Tim Tagana).
   - Formulir pengaduan & aspirasi warga (dengan opsi laporan rahasia/anonim).
   - Transparansi tindak lanjut respon aparat desa terhadap aduan masyarakat.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/) (menggunakan `HashRouter` untuk kompatibilitas penuh di semua environment hosting & preview lokal tanpa error 404)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) dengan palet warna Google Stitch modern (Emerald Green `#059669`, Forest Green `#047857`, Slate, Amber)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Tipografi**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

---

## 🚀 Cara Menjalankan Project

1. **Jalankan Mode Development (Hot Reload):**
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:3000`

2. **Build Versi Produksi:**
   ```bash
   npm run build
   ```

3. **Pratinjau Hasil Build Produksi:**
   ```bash
   npm run preview
   ```

