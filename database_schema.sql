-- ====================================================================
-- SKEMA DATABASE RESMI PORTAL DIGITAL DESA KEDUNG JAYA
-- Dialek: PostgreSQL / Supabase
-- Versi: 1.0 (Oktober 2026)
-- Mendukung 6 Role: Warga, RT/RW, Operator, Kades, Admin, Bendahara
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABEL PENGGUNA & AKUN DESA (USERS)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nik VARCHAR(16) UNIQUE NOT NULL,
    nama VARCHAR(150) NOT NULL,
    telepon VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(30) NOT NULL CHECK (role IN ('warga', 'rtrw', 'operator', 'kades', 'admin', 'bendahara')),
    jabatan VARCHAR(100),
    dusun VARCHAR(100) DEFAULT 'Dusun II Kedung Barat',
    wilayah_rt VARCHAR(50) DEFAULT 'RT 03 / RW 02',
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indeks untuk pencarian cepat NIK dan No WhatsApp
CREATE INDEX IF NOT EXISTS idx_users_nik ON users(nik);
CREATE INDEX IF NOT EXISTS idx_users_telepon ON users(telepon);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 3. TABEL SURAT & PIPELINE WORKFLOW (SURAT_PENGAJUAN)
CREATE TABLE IF NOT EXISTS surat_pengajuan (
    id VARCHAR(50) PRIMARY KEY,
    no_reg VARCHAR(100) UNIQUE NOT NULL,
    jenis VARCHAR(150) NOT NULL,
    pemohon_nik VARCHAR(16) NOT NULL REFERENCES users(nik) ON DELETE CASCADE,
    pemohon_nama VARCHAR(150) NOT NULL,
    pemohon_telepon VARCHAR(20) NOT NULL,
    pemohon_alamat TEXT NOT NULL,
    wilayah_rt VARCHAR(50) DEFAULT 'RT 03 / RW 02',
    keperluan TEXT NOT NULL,
    detail_usaha TEXT DEFAULT '-',
    status VARCHAR(50) NOT NULL DEFAULT 'MENUNGGU_RT' 
        CHECK (status IN ('MENUNGGU_RT', 'MENUNGGU_OPERATOR', 'MENUNGGU_TTE_KADES', 'SELESAI_TERBIT', 'PERLU_REVISI')),
    status_label VARCHAR(50) DEFAULT 'VERIFIKASI RT',
    rekomendasi TEXT DEFAULT 'Menunggu Pengantar RT',
    tte_info JSONB DEFAULT NULL,
    riwayat JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_surat_pemohon_nik ON surat_pengajuan(pemohon_nik);
CREATE INDEX IF NOT EXISTS idx_surat_status ON surat_pengajuan(status);
CREATE INDEX IF NOT EXISTS idx_surat_no_reg ON surat_pengajuan(no_reg);

-- 4. TABEL ADUAN & ASPIRASI WARGA (ADUAN_WARGA)
CREATE TABLE IF NOT EXISTS aduan_warga (
    id VARCHAR(50) PRIMARY KEY,
    tiket VARCHAR(50) UNIQUE NOT NULL,
    prioritas VARCHAR(50) DEFAULT 'Prioritas 1 (Kritis)',
    judul VARCHAR(200) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    dusun VARCHAR(100) NOT NULL,
    pelapor_nik VARCHAR(16) NOT NULL REFERENCES users(nik) ON DELETE CASCADE,
    pelapor_nama VARCHAR(150) NOT NULL,
    pelapor_telepon VARCHAR(20) NOT NULL,
    deskripsi TEXT NOT NULL,
    gambar_url TEXT,
    status VARCHAR(50) DEFAULT 'MENUNGGU_DISPOSISI' 
        CHECK (status IN ('MENUNGGU_DISPOSISI', 'DIDISPOSISIKAN', 'SELESAI')),
    disposisi_target VARCHAR(150) DEFAULT 'Tim Teknis Desa',
    disposisi_catatan TEXT DEFAULT 'Menunggu arahan Kepala Desa',
    riwayat JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_aduan_pelapor_nik ON aduan_warga(pelapor_nik);
CREATE INDEX IF NOT EXISTS idx_aduan_status ON aduan_warga(status);

-- 5. TABEL LOG NOTIFIKASI WHATSAPP
CREATE TABLE IF NOT EXISTS notifikasi_wa (
    id VARCHAR(50) PRIMARY KEY,
    penerima_nama VARCHAR(150) NOT NULL,
    penerima_telepon VARCHAR(20) NOT NULL,
    judul VARCHAR(150) NOT NULL,
    pesan TEXT NOT NULL,
    tipe VARCHAR(50) DEFAULT 'SURAT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE surat_pengajuan ENABLE ROW LEVEL SECURITY;
ALTER TABLE aduan_warga ENABLE ROW LEVEL SECURITY;

-- Warga hanya dapat membaca berkas miliknya sendiri
CREATE POLICY "Warga Baca Berkas Sendiri" ON surat_pengajuan
    FOR SELECT USING (auth.uid()::text = pemohon_nik OR auth.jwt() ->> 'role' IN ('operator', 'kades', 'admin', 'rtrw'));

-- 7. SEED INITIAL USERS (6 ROLES)
-- Password Default: 'KedungJaya2026!' (SHA-256 Hash: 95536be3c6756fdcb0e91f1ad6822c6eeb4bb3cb447957cefd121e7fcff5b3f1)
INSERT INTO users (nik, nama, telepon, email, password_hash, role, jabatan, dusun, wilayah_rt)
VALUES
('3216012804920003', 'Hendra Kusuma', '081234567891', 'hendra.kusuma@kedungjaya.id', '95536be3c6756fdcb0e91f1ad6822c6eeb4bb3cb447957cefd121e7fcff5b3f1', 'warga', 'Warga Dusun II', 'Dusun II Kedung Barat', 'RT 03 / RW 02'),
('3216011503820002', 'Bpk. Mulyono', '081234567892', 'rt03.rw02@kedungjaya.id', '95536be3c6756fdcb0e91f1ad6822c6eeb4bb3cb447957cefd121e7fcff5b3f1', 'rtrw', 'Ketua RT 03', 'Dusun II Kedung Barat', 'RT 03 / RW 02'),
('199104052017012005', 'Dewi Lestari, S.Pd', '081234567893', 'pelayanan@kedungjaya.id', '95536be3c6756fdcb0e91f1ad6822c6eeb4bb3cb447957cefd121e7fcff5b3f1', 'operator', 'Operator Loket Pelayanan', 'Dusun I Kedung Timur', 'RT 01 / RW 01'),
('197508122010011001', 'Bpk. H. Suryono, S.Sos.', '081234567890', 'kades@kedungjaya.id', '95536be3c6756fdcb0e91f1ad6822c6eeb4bb3cb447957cefd121e7fcff5b3f1', 'kades', 'Kepala Desa Kedung Jaya', 'Dusun I Kedung Timur', 'RT 01 / RW 01'),
('3216019901010001', 'Tim IT Desa', '081234567894', 'admin@kedungjaya.id', '95536be3c6756fdcb0e91f1ad6822c6eeb4bb3cb447957cefd121e7fcff5b3f1', 'admin', 'Administrator Sistem', 'Dusun I Kedung Timur', 'RT 01 / RW 01'),
('198906202015022003', 'Siti Rahmawati, S.E', '081234567895', 'keuangan@kedungjaya.id', '95536be3c6756fdcb0e91f1ad6822c6eeb4bb3cb447957cefd121e7fcff5b3f1', 'bendahara', 'Kaur Keuangan (Bendahara)', 'Dusun III Kedung Selatan', 'RT 02 / RW 03')
ON CONFLICT (nik) DO NOTHING;

