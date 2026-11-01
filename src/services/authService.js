/**
 * AuthService - Desa Kedung Jaya
 * Layanan manajemen autentikasi, enkripsi SHA-256, validasi NIK, dan kontrol akses 6 role.
 */

const STORAGE_USERS_KEY = 'kedungjaya_users_db';
const STORAGE_SESSION_KEY = 'kedungjaya_auth_session';
const STORAGE_RATE_LIMIT_KEY = 'kedungjaya_login_attempts';

// Helper: Hash password menggunakan Web Crypto API (SHA-256)
export async function hashPassword(password, salt = 'kedung_jaya_salt_2026') {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Inisialisasi Data Pengguna Awal (Seed Data)
export async function initSeedUsers() {
  const existing = localStorage.getItem(STORAGE_USERS_KEY);
  if (!existing) {
    const defaultPasswordHash = await hashPassword('KedungJaya2026!');
    
    const seedUsers = [
      {
        id: 'usr_kades',
        nik: '197508122010011001',
        nama: 'Bpk. H. Suryono, S.Sos.',
        telepon: '081234567890',
        email: 'kades@kedungjaya.desa.id',
        role: 'kades',
        statusVerifikasi: 'TERVERIFIKASI',
        passwordHash: defaultPasswordHash,
        tanggalDaftar: '2025-01-01'
      },
      {
        id: 'usr_warga_1',
        nik: '3216012804920003',
        nama: 'Hendra Kusuma',
        telepon: '081234567891',
        email: 'hendra.kusuma@kedungjaya.id',
        role: 'warga',
        statusVerifikasi: 'TERVERIFIKASI',
        dusun: 'Kp. Wates (Dusun I)',
        rtRw: 'RT 03 / RW 02',
        passwordHash: defaultPasswordHash,
        tanggalDaftar: '2025-02-15'
      },
      {
        id: 'usr_rtrw',
        nik: '3216011503820002',
        nama: 'Bpk. Mulyono',
        telepon: '081234567892',
        email: 'rt03.rw02@kedungjaya.desa.id',
        role: 'rtrw',
        statusVerifikasi: 'TERVERIFIKASI',
        wilayahTugas: 'RT 03 / RW 02',
        passwordHash: defaultPasswordHash,
        tanggalDaftar: '2025-01-10'
      },
      {
        id: 'usr_operator',
        nik: '199104052017012005',
        nama: 'Dewi Lestari, S.Pd',
        telepon: '081234567893',
        email: 'pelayanan@kedungjaya.desa.id',
        role: 'operator',
        statusVerifikasi: 'TERVERIFIKASI',
        passwordHash: defaultPasswordHash,
        tanggalDaftar: '2025-01-05'
      },
      {
        id: 'usr_admin',
        nik: '3216019901010001',
        nama: 'Tim IT Desa Kedung Jaya',
        telepon: '081234567894',
        email: 'admin@kedungjaya.desa.id',
        role: 'admin',
        statusVerifikasi: 'TERVERIFIKASI',
        passwordHash: defaultPasswordHash,
        tanggalDaftar: '2025-01-01'
      },
      {
        id: 'usr_bendahara',
        nik: '198906202015022003',
        nama: 'Siti Rahmawati, S.E',
        telepon: '081234567895',
        email: 'keuangan@kedungjaya.desa.id',
        role: 'bendahara',
        statusVerifikasi: 'TERVERIFIKASI',
        passwordHash: defaultPasswordHash,
        tanggalDaftar: '2025-01-05'
      }
    ];

    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(seedUsers));
  }
}

// Ambil semua pengguna dari database lokal
export function getAllUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Simpan pengguna
function saveUsers(users) {
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

// Validasi Format NIK (16 Digit Angka)
export function validateNIK(nik) {
  if (!nik) return { valid: false, message: 'NIK wajib diisi' };
  const cleaned = nik.trim();
  if (!/^\d{16}$/.test(cleaned)) {
    return { valid: false, message: 'NIK harus tepat 16 digit angka' };
  }
  // Cek kode provinsi Jawa Barat (dimulai dengan 32)
  if (!cleaned.startsWith('32')) {
    return { valid: false, message: 'NIK harus berawalan kode Provinsi Jawa Barat (32)' };
  }
  return { valid: true, message: 'Format NIK valid' };
}

// Validasi Kekuatan Kata Sandi
export function validatePassword(password) {
  const minLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasCapital = /[A-Z]/.test(password);

  return {
    minLength,
    hasNumber,
    hasCapital,
    isValid: minLength && hasNumber && hasCapital
  };
}

// Cek Percobaan Login (Brute Force Protection)
function checkLoginRateLimit(identifier) {
  try {
    const raw = localStorage.getItem(STORAGE_RATE_LIMIT_KEY);
    const limits = raw ? JSON.parse(raw) : {};
    const record = limits[identifier];
    
    if (record) {
      const now = Date.now();
      if (record.lockedUntil && record.lockedUntil > now) {
        const remainingMinutes = Math.ceil((record.lockedUntil - now) / 60000);
        return { 
          allowed: false, 
          message: `Terlalu banyak percobaan gagal. Silakan coba kembali dalam ${remainingMinutes} menit.` 
        };
      }
      if (record.lockedUntil && record.lockedUntil <= now) {
        // Reset lock
        delete limits[identifier];
        localStorage.setItem(STORAGE_RATE_LIMIT_KEY, JSON.stringify(limits));
      }
    }
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

// Catat Percobaan Gagal
function recordFailedAttempt(identifier) {
  try {
    const raw = localStorage.getItem(STORAGE_RATE_LIMIT_KEY);
    const limits = raw ? JSON.parse(raw) : {};
    const record = limits[identifier] || { attempts: 0 };
    record.attempts += 1;
    
    if (record.attempts >= 5) {
      // Kunci selama 5 menit
      record.lockedUntil = Date.now() + 5 * 60 * 1000;
    }
    limits[identifier] = record;
    localStorage.setItem(STORAGE_RATE_LIMIT_KEY, JSON.stringify(limits));
  } catch {
    // Ignore storage issues
  }
}

// Reset Percobaan Login jika Sukses
function resetFailedAttempts(identifier) {
  try {
    const raw = localStorage.getItem(STORAGE_RATE_LIMIT_KEY);
    if (!raw) return;
    const limits = JSON.parse(raw);
    delete limits[identifier];
    localStorage.setItem(STORAGE_RATE_LIMIT_KEY, JSON.stringify(limits));
  } catch {
    // Ignore
  }
}

// Pendaftaran Warga Baru
export async function registerWarga({ nik, nama, telepon, email, password }) {
  await initSeedUsers();
  
  // Validasi NIK
  const nikCheck = validateNIK(nik);
  if (!nikCheck.valid) {
    throw new Error(nikCheck.message);
  }

  // Validasi Kata Sandi
  const pwCheck = validatePassword(password);
  if (!pwCheck.isValid) {
    throw new Error('Kata sandi belum memenuhi kriteria keamanan (min. 8 karakter, ada angka & huruf kapital).');
  }

  const users = getAllUsers();
  const cleanNik = nik.trim();
  const cleanPhone = telepon.trim().replace(/^0/, '+62').replace(/[^0-9+]/g, '');

  // Cegah Pendaftaran Ganda
  const nikExists = users.some(u => u.nik === cleanNik);
  if (nikExists) {
    throw new Error('NIK ini sudah terdaftar dalam sistem Desa Kedung Jaya. Silakan gunakan menu Masuk atau hubungi posko pelayanan.');
  }

  const phoneExists = users.some(u => u.telepon.replace(/^0/, '+62') === cleanPhone);
  if (phoneExists) {
    throw new Error('Nomor WhatsApp ini sudah digunakan oleh akun lain. Silakan periksa kembali.');
  }

  const passwordHash = await hashPassword(password);

  const newWarga = {
    id: `usr_${Date.now()}`,
    nik: cleanNik,
    nama: nama.trim(),
    telepon: cleanPhone,
    email: email ? email.trim() : '',
    role: 'warga', // Publik hanya bisa mendaftar sebagai WARGA
    statusVerifikasi: 'MENUNGGU_VERIFIKASI_PETUGAS', // Status verifikasi identitas resmi
    otpVerified: false,
    tanggalDaftar: new Date().toISOString()
  };

  // Simpan password hash
  users.push({ ...newWarga, passwordHash });
  saveUsers(users);

  // Buat sesi sementara untuk verifikasi OTP
  const tempToken = {
    userId: newWarga.id,
    nikMasked: cleanNik.substring(0, 4) + '********' + cleanNik.substring(cleanNik.length - 2),
    telepon: cleanPhone,
    step: 'OTP_PENDING',
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 menit
  };
  sessionStorage.setItem('kedungjaya_temp_reg', JSON.stringify(tempToken));

  return newWarga;
}

// Verifikasi Kode OTP (Simulasi Terintegrasi)
export function verifyOTP(userId, otpInput) {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error('Sesi pendaftaran tidak ditemukan atau sudah kadaluarsa.');
  }

  // Kode OTP demo / standard validasi
  const cleanOtp = otpInput.trim();
  if (cleanOtp.length !== 6 || !/^\d{6}$/.test(cleanOtp)) {
    throw new Error('Kode OTP harus terdiri dari 6 digit angka.');
  }

  // Tandai nomor telepon telah terverifikasi via OTP
  users[userIndex].otpVerified = true;
  saveUsers(users);

  // Bersihkan temporary registration
  sessionStorage.removeItem('kedungjaya_temp_reg');

  return users[userIndex];
}

// Login Pengguna (Bisa menggunakan NIK atau Nomor HP)
export async function loginUser(identifier, password) {
  await initSeedUsers();

  const cleanIdent = identifier.trim();
  const rateLimit = checkLoginRateLimit(cleanIdent);
  if (!rateLimit.allowed) {
    throw new Error(rateLimit.message);
  }

  const users = getAllUsers();
  const passwordHash = await hashPassword(password);

  // Normalisasi pencarian: NIK atau Nomor HP (support format 08xx atau +62xx)
  const user = users.find(u => {
    const matchNik = u.nik === cleanIdent;
    const matchPhone = u.telepon === cleanIdent || 
                       u.telepon.replace(/^0/, '+62') === cleanIdent.replace(/^0/, '+62');
    return matchNik || matchPhone;
  });

  if (!user || user.passwordHash !== passwordHash) {
    recordFailedAttempt(cleanIdent);
    // Pesan aman yang tidak membocorkan apakah identitas ada di database
    throw new Error('Nomor NIK/WhatsApp atau kata sandi yang Anda masukkan tidak sesuai.');
  }

  // Berhasil login: reset gagal
  resetFailedAttempts(cleanIdent);

  // Buat sesi login
  const session = {
    token: `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    user: {
      id: user.id,
      nikMasked: user.nik.substring(0, 6) + '********' + user.nik.substring(user.nik.length - 2),
      nama: user.nama,
      role: user.role,
      statusVerifikasi: user.statusVerifikasi,
      telepon: user.telepon,
      email: user.email,
      dusun: user.dusun || '',
      wilayahTugas: user.wilayahTugas || ''
    },
    loginAt: Date.now()
  };

  localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  return session.user;
}

// Ambil Sesi Pengguna Aktif
export function getCurrentSession() {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Logout Pengguna
export function logoutUser() {
  localStorage.removeItem(STORAGE_SESSION_KEY);
}

// Permintaan Lupa Password
export function requestPasswordReset(identifier) {
  const users = getAllUsers();
  const clean = identifier.trim();
  const user = users.find(u => u.nik === clean || u.telepon.includes(clean));

  if (!user) {
    // Pesan aman: tidak membocorkan apakah NIK terdaftar
    return {
      success: true,
      message: 'Jika NIK atau nomor WhatsApp terdaftar, tautan verifikasi pemulihan telah dikirimkan.'
    };
  }

  const resetToken = {
    userId: user.id,
    token: `reset_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    expiresAt: Date.now() + 15 * 60 * 1000 // 15 menit
  };
  sessionStorage.setItem('kedungjaya_reset_token', JSON.stringify(resetToken));

  return {
    success: true,
    token: resetToken.token,
    message: 'Tautan atau kode pemulihan akun berhasil dibuat (Berlaku 15 menit).'
  };
}

// Reset Password Baru
export async function resetPasswordWithToken(token, newPassword) {
  const raw = sessionStorage.getItem('kedungjaya_reset_token');
  if (!raw) {
    throw new Error('Sesi pemulihan kata sandi tidak ditemukan atau telah kedaluwarsa.');
  }

  const resetData = JSON.parse(raw);
  if (resetData.token !== token || resetData.expiresAt < Date.now()) {
    throw new Error('Token pemulihan tidak valid atau sudah kedaluwarsa.');
  }

  const pwCheck = validatePassword(newPassword);
  if (!pwCheck.isValid) {
    throw new Error('Kata sandi baru belum memenuhi kriteria keamanan minimal.');
  }

  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === resetData.userId);
  if (userIndex === -1) {
    throw new Error('Akun pengguna tidak ditemukan.');
  }

  users[userIndex].passwordHash = await hashPassword(newPassword);
  saveUsers(users);

  sessionStorage.removeItem('kedungjaya_reset_token');
  logoutUser(); // Hapus sesi lama

  return { success: true, message: 'Kata sandi berhasil diperbarui. Silakan login kembali.' };
}

