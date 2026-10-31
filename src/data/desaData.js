// Data Master Desa Kedung Jaya
export const desaInfo = {
  nama: "Desa Kedung Jaya",
  semboyan: "Kedung Jaya Mandiri, Maju, Makmur & Berakhlak",
  kecamatan: "Kedungwuni",
  kabupaten: "Bekasi",
  provinsi: "Jawa Barat",
  kodePos: "17720",
  email: "kontak@kedungjaya.desa.id",
  telepon: "(021) 8912-3456",
  whatsapp: "0812-3456-7890",
  alamat: "Jl. Raya Kedung Jaya No. 01, Kec. Kedungwuni, Kab. Bekasi, Jawa Barat 17720",
  jamKerja: "Senin - Jumat: 08.00 - 15.30 WIB",
  kepalaDesa: {
    nama: "H. Ahmad Fauzi, S.Sos",
    sambutan: "Puji syukur ke hadirat Tuhan Yang Maha Kuasa atas terwujudnya Website Resmi Pemerintah Desa Kedung Jaya. Website ini merupakan wujud keterbukaan informasi publik dan digitalisasi pelayanan warga. Kami berkomitmen untuk mewujudkan Desa Kedung Jaya yang mandiri, transparan, dan sejahtera dengan mengedepankan pelayanan cepat, tepat, dan tanpa pungli bagi seluruh masyarakat.",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
  },
  statistik: {
    penduduk: 7420,
    kepalaKeluarga: 2180,
    lakiLaki: 3780,
    perempuan: 3640,
    luasWilayah: 428.5, // Hektar
    dusun: 4,
    rw: 6,
    rt: 22,
    apbdesTahun: "2026",
    realisasiAnggaran: "98.4%"
  }
};

export const visiMisi = {
  visi: "Terwujudnya Desa Kedung Jaya yang Mandiri, Sejahtera, Berbudaya, dan Terdepan dalam Pelayanan Digital Menuju Masyarakat Madani Tahun 2029.",
  misi: [
    "Meningkatkan kualitas tata kelola pemerintahan desa yang bersih, transparan, akuntabel, dan berbasis teknologi informasi.",
    "Mengembangkan potensi pertanian, perikanan darat, dan UMKM lokal guna memperkuat ketahanan ekonomi warga.",
    "Meningkatkan pembangunan infrastruktur perdesaan yang ramah lingkungan dan merata di seluruh dusun.",
    "Meningkatkan derajat kesehatan dan pendidikan masyarakat melalui posyandu terpadu dan beasiswa desa.",
    "Melestarikan nilai-nilai kearifan lokal, gotong royong, dan kerukunan antar warga."
  ]
};

export const perangkatDesa = [
  {
    nama: "H. Ahmad Fauzi, S.Sos",
    jabatan: "Kepala Desa",
    nipd: "19750812 201001 1 001",
    pendidikan: "S1 Ilmu Sosial",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
  },
  {
    nama: "Bambang Sudirman, S.AP",
    jabatan: "Sekretaris Desa",
    nipd: "19820315 201201 1 002",
    pendidikan: "S1 Administrasi Publik",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
  },
  {
    nama: "Siti Rahmawati, S.E",
    jabatan: "Kaur Keuangan (Bendahara)",
    nipd: "19890620 201502 2 003",
    pendidikan: "S1 Ekonomi Akuntansi",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
  },
  {
    nama: "Rahmat Hidayat, S.T",
    jabatan: "Kaur Perencanaan & Pembangunan",
    nipd: "19871110 201601 1 004",
    pendidikan: "S1 Teknik Sipil",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80"
  },
  {
    nama: "Dewi Lestari, S.Pd",
    jabatan: "Kasi Pelayanan Umum",
    nipd: "19910405 201701 2 005",
    pendidikan: "S1 Kependidikan",
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80"
  },
  {
    nama: "Muhammad Yusuf",
    jabatan: "Kasi Kesejahteraan Rakyat",
    nipd: "19850118 201401 1 006",
    pendidikan: "SMA / Sederajat",
    foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80"
  },
  {
    nama: "Sunarto Wijaya",
    jabatan: "Kepala Dusun I (Kedung Timur)",
    nipd: "19780214 201101 1 007",
    pendidikan: "SMA / Sederajat",
    foto: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80"
  },
  {
    nama: "Kuswanto",
    jabatan: "Kepala Dusun II (Kedung Barat)",
    nipd: "19800722 201301 1 008",
    pendidikan: "SMA / Sederajat",
    foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80"
  }
];

export const daftarLayanan = [
  {
    id: "sku",
    kode: "SKU",
    nama: "Surat Keterangan Usaha (SKU)",
    kategori: "Usaha & Ekonomi",
    deskripsi: "Untuk keperluan pengajuan modal usaha, izin perbankan, KUR, atau verifikasi legalitas usaha warga.",
    estimasi: "1 Hari Kerja (Maks 24 Jam)",
    biaya: "GRATIS / Rp 0",
    syarat: [
      "Foto KTP Pemohon Asli (e-KTP)",
      "Foto Kartu Keluarga (KK)",
      "Foto lokasi tempat usaha / produk usaha",
      "Surat Pengantar RT/RW setempat"
    ]
  },
  {
    id: "domisili",
    kode: "SKD",
    nama: "Surat Keterangan Domisili",
    kategori: "Kependudukan",
    deskripsi: "Keterangan tempat tinggal resmi bagi warga tetap maupun warga pendatang yang berdomisili di Kedung Jaya.",
    estimasi: "Langsung Jadi (30 Menit)",
    biaya: "GRATIS / Rp 0",
    syarat: [
      "Foto e-KTP Pemohon",
      "Foto Kartu Keluarga (KK)",
      "Surat Pengantar RT/RW",
      "Bagi pendatang: Surat Pindah dari daerah asal"
    ]
  },
  {
    id: "skck",
    kode: "SKCK",
    nama: "Surat Pengantar SKCK Polsek",
    kategori: "Hukum & Kepolisian",
    deskripsi: "Pengantar resmi dari pemerintah desa untuk pembuatan SKCK di Polsek/Polres (melamar pekerjaan/kuliah).",
    estimasi: "1 Jam Kerja",
    biaya: "GRATIS / Rp 0",
    syarat: [
      "Foto e-KTP Asli",
      "Foto Kartu Keluarga (KK)",
      "Foto Akta Kelahiran / Ijazah Terakhir",
      "Pasfoto formal 4x6 latar belakang merah (2 lembar)"
    ]
  },
  {
    id: "sktm",
    kode: "SKTM",
    nama: "Surat Keterangan Tidak Mampu (SKTM)",
    kategori: "Bansos & Pendidikan",
    deskripsi: "Digunakan untuk pengajuan beasiswa, KIP Kuliah, keringanan biaya rumah sakit, atau program bansos.",
    estimasi: "1 Hari Kerja",
    biaya: "GRATIS / Rp 0",
    syarat: [
      "Foto e-KTP & Kartu Keluarga",
      "Surat Pengantar RT/RW yang menerangkan kondisi ekonomi",
      "Foto rumah tampak depan",
      "Surat pernyataan bermaterai (tersedia di kantor desa)"
    ]
  },
  {
    id: "kelahiran",
    kode: "SKL",
    nama: "Surat Keterangan Kelahiran",
    kategori: "Kependudukan",
    deskripsi: "Pengantar pembuatan Akta Kelahiran dan penambahan anggota keluarga pada Kartu Keluarga (KK).",
    estimasi: "1 Hari Kerja",
    biaya: "GRATIS / Rp 0",
    syarat: [
      "Surat Keterangan Lahir dari Bidan / Rumah Sakit",
      "Foto Buku Nikah orang tua (legalisir)",
      "Foto KTP kedua orang tua",
      "Kartu Keluarga (KK) asli"
    ]
  },
  {
    id: "kematian",
    kode: "SKM",
    nama: "Surat Keterangan Kematian",
    kategori: "Kependudukan",
    deskripsi: "Untuk pengurusan akta kematian, klaim asuransi / BPJS, waris, dan pembaruan data kependudukan.",
    estimasi: "Langsung Jadi (30 Menit)",
    biaya: "GRATIS / Rp 0",
    syarat: [
      "KTP & KK jenazah almarhum/ah",
      "Surat Keterangan Kematian dari RS / Dokter / RT setempat",
      "KTP Saksi / Pelapor (Ahli Waris)"
    ]
  },
  {
    id: "pindah",
    kode: "SKPWNI",
    nama: "Surat Pengantar Pindah Domisili (SKPWNI)",
    kategori: "Kependudukan",
    deskripsi: "Pengantar kepindahan warga ke luar desa/kecamatan/kabupaten.",
    estimasi: "1 - 2 Hari Kerja",
    biaya: "GRATIS / Rp 0",
    syarat: [
      "e-KTP Asli seluruh anggota yang pindah",
      "Kartu Keluarga Asli",
      "Alamat tujuan pindah lengkap (RT, RW, Desa, Kecamatan, Kab/Kota)",
      "Pengantar RT/RW setempat"
    ]
  },
  {
    id: "keramaian",
    kode: "SIK",
    nama: "Surat Izin / Pengantar Keramaian",
    kategori: "Ketertiban Umum",
    deskripsi: "Pengantar izin acara hajatan, resepsi pernikahan, pentas seni, atau kegiatan massal warga ke Polsek.",
    estimasi: "1 Hari Kerja",
    biaya: "GRATIS / Rp 0",
    syarat: [
      "KTP Penanggung Jawab Acara",
      "Pernyataan kesanggupan menjaga ketertiban umum",
      "Izin tertulis dari tetangga sekitar lokasi acara",
      "Pengantar Ketua RT dan RW"
    ]
  }
];

export const beritaDesa = [
  {
    id: 1,
    slug: "panen-raya-padi-organik-kedung-jaya",
    judul: "Panen Raya Padi Organik Dusun Kedung Timur Capai Rekor 8,5 Ton per Hektar",
    ringkasan: "Kelompok Tani Subur Makmur bersama PPL Pertanian berhasil membudidayakan padi organik dengan hasil memuaskan dan harga jual lebih tinggi.",
    kategori: "Pertanian & Ekonomi",
    tanggal: "28 Oktober 2026",
    penulis: "Humas Pemdes Kedung Jaya",
    gambar: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
    konten: `Pemerintah Desa Kedung Jaya bersama Kelompok Tani Subur Makmur menggelar syukuran Panen Raya Padi Organik di hamparan persawahan Dusun Kedung Timur seluas 45 hektar pada Selasa (28/10/2026).
    
    Kepala Desa Kedung Jaya, H. Ahmad Fauzi, S.Sos didampingi petugas PPL Kecamatan menyampaikan bahwa rata-rata produktivitas padi organik tahun ini mencapai 8,5 ton gabah kering panen (GKP) per hektar, meningkat dari tahun sebelumnya yang hanya 6,8 ton.
    
    "Keberhasilan ini membuktikan bahwa penggunaan pupuk hayati mandiri dan pengurangan pestisida kimia tidak hanya menyuburkan tanah desa kita, tetapi juga meningkatkan pendapatan riil para petani," ungkap Kepala Desa. Hasil panen ini langsung diserap oleh BUMDes Kedung Mandiri untuk dikemas menjadi Beras Premium Kedung Jaya yang dipasarkan ke pasar modern.`
  },
  {
    id: 2,
    slug: "peluncuran-portal-layanan-digital-desa",
    judul: "Resmi Diluncurkan: Layanan Mandiri Surat Online Desa Kedung Jaya",
    ringkasan: "Kini warga tak perlu lagi antre di kantor desa. Permohonan SKU, Domisili, hingga Pengantar SKCK bisa diajukan lewat HP dengan sistem tracking tiket.",
    kategori: "Pemerintahan & Layanan",
    tanggal: "25 Oktober 2026",
    penulis: "Tim IT Desa Kedung Jaya",
    gambar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    konten: `Dalam rangka akselerasi transformasi digital desa, Pemerintah Desa Kedung Jaya meresmikan Portal Layanan Mandiri Digital terintegrasi.
    
    Melalui platform ini, warga desa dapat mengajukan permohonan berbagai jenis dokumen administrasi kependudukan seperti SKU, SKTM, Surat Domisili, dan Pengantar SKCK kapan saja dan di mana saja.
    
    Sekretaris Desa Kedung Jaya menjelaskan bahwa setiap permohonan yang masuk akan otomatis diberikan Nomor Tiket Lacak untuk memantau status verifikasi hingga surat selesai ditandatangani secara digital atau siap diambil di loket pelayanan.`
  },
  {
    id: 3,
    slug: "penyaluran-blt-dana-desa-tahap-iv",
    judul: "Transparansi Penyaluran BLT Dana Desa Tahap IV kepada 120 KPM",
    ringkasan: "Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa berlangsung tertib di Balai Pertemuan Desa dengan pengawasan langsung dari BPD dan Bhabinkamtibmas.",
    kategori: "Kesejahteraan Sosial",
    tanggal: "20 Oktober 2026",
    penulis: "Kaur Keuangan",
    gambar: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&auto=format&fit=crop&q=80",
    konten: `Pemerintah Desa Kedung Jaya telah menyalurkan Bantuan Langsung Tunai Dana Desa (BLT-DD) Tahap IV Tahun Anggaran 2026 kepada 120 Keluarga Penerima Manfaat (KPM) bertempat di Aula Kantor Balai Desa Kedung Jaya.
    
    Kaur Keuangan Desa, Siti Rahmawati, S.E, menegaskan bahwa penetapan penerima BLT telah melalui proses Musyawarah Desa Khusus (Musdesus) yang valid dan memprioritaskan warga lansia tunggal, penyandang disabilitas berat, dan keluarga rentan miskin ekstrem.`
  },
  {
    id: 4,
    slug: "posyandu-balita-dan-cegah-stunting",
    judul: "Posyandu Mawar III Dusun Kedung Barat Gelar Skrining Tumbuh Kembang & PMT Balita",
    ringkasan: "Upaya zero stunting Desa Kedung Jaya terus digencarkan lewat pemberian makanan tambahan kaya protein hewani dan pemeriksaan berkala gratis.",
    kategori: "Kesehatan",
    tanggal: "15 Oktober 2026",
    penulis: "Kader PKK Desa",
    gambar: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80",
    konten: `Kader Posyandu bersama Tim Penggerak PKK Desa Kedung Jaya menggelar kegiatan rutin pemeriksaan kesehatan balita dan ibu hamil di Posyandu Mawar III.
    
    Selain penimbangan berat badan dan pengukuran tinggi badan anak, kegiatan ini juga membagikan Paket Makanan Tambahan (PMT) berbasis pangan lokal seperti olahan telur puyuh, puding kacang hijau, dan susu pertumbuhan anak.`
  },
  {
    id: 5,
    slug: "pembangunan-jalan-lingkungan-dusun-3",
    judul: "Realisasi Pembangunan Rabat Beton Jalan Usaha Tani Dusun Kedung Selatan Tuntas",
    ringkasan: "Akses jalan sepanjang 650 meter kini mulus dan mempermudah mobilisasi pengangkutan hasil panen palawija dan padi petani ke pasar.",
    kategori: "Pembangunan",
    tanggal: "10 Oktober 2026",
    penulis: "TPK Desa Kedung Jaya",
    gambar: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=800&auto=format&fit=crop&q=80",
    konten: `Proyek pembangunan jalan rabat beton usaha tani di Dusun Kedung Selatan dengan alokasi Dana Desa 2026 sebesar Rp 145.000.000,- telah rampung 100% dan dapat dilintasi kendaraan roda empat.
    
    Ketua TPK Desa menyampaikan apresiasi tinggi atas partisipasi gotong royong warga sekitar yang turut membantu proses pengecoran sehingga pekerjaan selesai lebih cepat dari target.`
  },
  {
    id: 6,
    slug: "pelatihan-digital-marketing-umkm",
    judul: "BUMDes Kedung Mandiri Selenggarakan Workshop Foto Produk & Jualan Online untuk 40 UMKM",
    ringkasan: "Mendorong perajin anyaman bambu dan produsen camilan desa agar mahir berjualan di e-commerce dan sosial media secara profesional.",
    kategori: "UMKM & Ekonomi",
    tanggal: "04 Oktober 2026",
    penulis: "BUMDes Kedung Mandiri",
    gambar: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    konten: `BUMDes Kedung Mandiri bekerja sama dengan dinas terkait menggelar lokakarya digital marketing bagi pelaku UMKM se-Desa Kedung Jaya.
    
    Peserta dibekali teknik fotografi produk bermodal smartphone, pembuatan copywriting promosi menarik, serta tata cara pendaftaran toko di platform digital nasional.`
  }
];

export const apbdesData = {
  tahun: "2026",
  totalPendapatan: 2150000000, // Rp 2.15 Miliar
  totalBelanja: 2125000000,    // Rp 2.125 Miliar
  surplusDefisit: 25000000,
  pembiayaanNetto: 0,
  pendapatan: [
    { sumber: "Dana Desa (APBN)", jumlah: 1050000000, persen: 48.8, icon: "Landmark" },
    { sumber: "Alokasi Dana Desa (ADD Kab)", jumlah: 650000000, persen: 30.2, icon: "Building2" },
    { sumber: "Bagi Hasil Pajak & Retribusi Daerah", jumlah: 240000000, persen: 11.2, icon: "Receipt" },
    { sumber: "Pendapatan Asli Desa (PADes & BUMDes)", jumlah: 160000000, persen: 7.4, icon: "Coins" },
    { sumber: "Bantuan Keuangan Provinsi", jumlah: 50000000, persen: 2.4, icon: "Sparkles" }
  ],
  belanja: [
    { bidang: "Pelaksanaan Pembangunan Desa", jumlah: 980000000, persen: 46.1, warna: "bg-emerald-500", deskripsi: "Rabat beton jalan, drainase pemukiman, pavingisasi balai warga, PJU solar cell." },
    { bidang: "Penyelenggaraan Pemerintahan Desa", jumlah: 610000000, persen: 28.7, warna: "bg-blue-500", deskripsi: "Siltap perangkat, operasional kantor BPD/RT/RW, digitalisasi sistem informasi desa." },
    { bidang: "Pembinaan Kemasyarakatan Desa", jumlah: 235000000, persen: 11.1, warna: "bg-amber-500", deskripsi: "Kegiatan Karang Taruna, PKK, pembinaan posyandu, keagamaan, dan turnamen olahraga desa." },
    { bidang: "Pemberdayaan Masyarakat Desa", jumlah: 210000000, persen: 9.9, warna: "bg-purple-500", deskripsi: "Penyertaan modal BUMDes, pelatihan UMKM, bibit tani unggul, alsintan kelompok tani." },
    { bidang: "Penanggulangan Bencana & Darurat", jumlah: 90000000, persen: 4.2, warna: "bg-rose-500", deskripsi: "Dana cadangan tanggap darurat banjir/kekeringan, santunan warga sakit darurat." }
  ]
};

export const umkmProduk = [
  {
    id: 1,
    nama: "Beras Organik Kedung Subur (5 Kg)",
    kategori: "Pertanian",
    harga: 85000,
    produsen: "Poktan Subur Makmur - Dusun I",
    gambar: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    deskripsi: "Padi varietas mentik wangi tanpa pestisida kimia. Nasi pulen, harum alami, dan aman untuk penderita diabetes.",
    kontakWA: "6281234567890"
  },
  {
    id: 2,
    nama: "Keripik Singkong Balado 'Kedung Gurih'",
    kategori: "Kuliner",
    harga: 18000,
    produsen: "Ibu Nurhayati - Dusun Kedung Barat",
    gambar: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    deskripsi: "Keripik singkong renyah dari hasil panen kebun lokal dengan cabai asli racikan rempah khas desa.",
    kontakWA: "6281298765432"
  },
  {
    id: 3,
    nama: "Bakul & Keranjang Anyaman Bambu Tradisional",
    kategori: "Kerajinan",
    harga: 45000,
    produsen: "Paguyuban Pengrajin Bambu Dusun II",
    gambar: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=600&auto=format&fit=crop&q=80",
    deskripsi: "Anyaman bambu halus awet dan tahan rayap. Cocok untuk wadah hampers, buah, dan dekorasi estetik rumah.",
    kontakWA: "6281311223344"
  },
  {
    id: 4,
    nama: "Madu Murni Lebah Klanceng / Trigona (250 ml)",
    kategori: "Kesehatan",
    harga: 95000,
    produsen: "Kelompok Tani Hutan Kedung Lestari",
    gambar: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
    deskripsi: "Madu mentah alami tanpa pemanasan dengan rasa asam manis segar khas lebah tanpa sengat. Kaya propolis & antioksidan.",
    kontakWA: "6281288990011"
  },
  {
    id: 5,
    nama: "Sambal Terasi Roa & Cumi 'Dapur Bu Kades'",
    kategori: "Kuliner",
    harga: 28000,
    produsen: "UMKM Dapur Berkah - Dusun III",
    gambar: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80",
    deskripsi: "Sambal rumahan pedas nikmat tanpa pengawet sintetis. Dikemas dalam botol steril tahan hingga 3 bulan.",
    kontakWA: "6285712344321"
  },
  {
    id: 6,
    nama: "Kain Batik Tulis Motif 'Bunga Teratai Kedung'",
    kategori: "Fashion",
    harga: 220000,
    produsen: "Sanggar Batik Kedung Kencana",
    gambar: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80",
    deskripsi: "Batik tulis pewarna alam khas motif sungai kedung dan teratai keemasan karya perajin perempuan desa.",
    kontakWA: "6287899887766"
  }
];

export const galeriKegiatan = [
  {
    id: 1,
    judul: "Gotong Royong Bersih Saluran Irigasi",
    kategori: "Kegiatan Warga",
    gambar: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    judul: "Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes)",
    kategori: "Pemerintahan",
    gambar: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    judul: "Pelatihan Keterampilan Menjahit PKK",
    kategori: "Pemberdayaan",
    gambar: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    judul: "Turnamen Sepak Bola Antar-Dusun Piala Kades",
    kategori: "Olahraga & Seni",
    gambar: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80"
  }
];
