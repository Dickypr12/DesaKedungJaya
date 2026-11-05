/**
 * avatarHelper.js - Desa Kedung Jaya
 * Pengelola avatar vector untuk semua profil (Laki-laki / Cowo & Perempuan / Cewe).
 * Menghilangkan semua foto manusia asli dan menggantinya dengan avatar kartun resmi.
 */

export const AVATAR_MAP = {
  // Cowo / Pria
  kades: '/images/avatars/kades_male.svg',
  maleOfficial1: '/images/avatars/male_official_1.svg',
  maleOfficial2: '/images/avatars/male_official_2.svg',
  maleRt: '/images/avatars/male_rt.svg',
  maleWarga: '/images/avatars/male_warga.svg',
  adminTech: '/images/avatars/admin_tech.svg',
  cowoDefault: '/images/avatars/avatar_cowo_default.svg',

  // Cewe / Wanita
  femaleBendahara: '/images/avatars/female_bendahara.svg',
  femaleOperator: '/images/avatars/female_operator.svg',
  femaleWarga: '/images/avatars/female_warga.svg',
  ceweDefault: '/images/avatars/avatar_cewe_default.svg'
};

/**
 * Deteksi jenis kelamin dari user / data profile
 * @param {Object|string} userOrGender 
 * @param {string} [nameHint] 
 * @returns {'L'|'P'} 'L' = Cowo / Laki-laki, 'P' = Cewe / Perempuan
 */
export function detectGender(userOrGender, nameHint = '') {
  if (!userOrGender && !nameHint) return 'L';

  // Jika input langsung kode gender
  if (typeof userOrGender === 'string') {
    const g = userOrGender.trim().toUpperCase();
    if (g === 'P' || g === 'PEREMPUAN' || g === 'WANITA' || g === 'CEWE' || g === 'CEWEK' || g === 'FEMALE') {
      return 'P';
    }
    if (g === 'L' || g === 'LAKI-LAKI' || g === 'PRIA' || g === 'COWO' || g === 'COWOK' || g === 'MALE') {
      return 'L';
    }
  }

  // Jika berupa object user
  const user = typeof userOrGender === 'object' ? userOrGender : {};
  if (user?.jenisKelamin) {
    const g = String(user.jenisKelamin).trim().toUpperCase();
    if (g.startsWith('P') || g === 'WANITA' || g === 'CEWEK' || g === 'CEWE') return 'P';
    if (g.startsWith('L') || g === 'PRIA' || g === 'COWOK' || g === 'COWO') return 'L';
  }

  // Cek role khusus yang default-nya wanita / pria
  if (user?.role === 'bendahara' || user?.role === 'operator') return 'P';
  if (user?.role === 'kades' || user?.role === 'rtrw' || user?.role === 'admin') return 'L';

  // Analisis nama
  const fullName = (user?.nama || nameHint || '').toLowerCase();
  const femaleKeywords = [
    'siti', 'dewi', 'ibu', 'ny.', 'nyonya', 'putri', 'rahma', 'rahmawati', 'lestari',
    'ani', 'nur', 'fatimah', 'sri', 'rina', 'retno', 'dini', 'maya', 'wati', 'kartika',
    'indah', 'ayuningsih', 'sukma', 'fitri', 'zahra', 'nadia', 'amalia', 'aulia'
  ];

  for (const kw of femaleKeywords) {
    if (fullName.includes(kw)) {
      return 'P';
    }
  }

  return 'L';
}

/**
 * Mendapatkan URL avatar kartun resmi sesuai role, jenis kelamin, dan nama
 */
export function getAvatarUrl(userOrRole, genderOverride = null) {
  let role = '';
  let gender = null;
  let name = '';

  if (typeof userOrRole === 'string') {
    role = userOrRole.toLowerCase();
  } else if (userOrRole && typeof userOrRole === 'object') {
    role = (userOrRole.role || '').toLowerCase();
    name = userOrRole.nama || '';
    gender = userOrRole.jenisKelamin;
  }

  if (genderOverride) {
    gender = genderOverride;
  }

  const effectiveGender = detectGender(gender || userOrRole, name);

  // Khusus Kades
  if (role === 'kades' || name.toLowerCase().includes('johari')) {
    return AVATAR_MAP.kades;
  }

  // Khusus Bendahara (Ibu Siti Rahmawati)
  if (role === 'bendahara' || name.toLowerCase().includes('siti')) {
    return AVATAR_MAP.femaleBendahara;
  }

  // Khusus Operator Pelayanan (Ibu Dewi Lestari)
  if (role === 'operator' || name.toLowerCase().includes('dewi')) {
    return AVATAR_MAP.femaleOperator;
  }

  // Khusus Admin Desa (Tim IT)
  if (role === 'admin') {
    return AVATAR_MAP.adminTech;
  }

  // Khusus Pak RT (Bpk. Mulyono)
  if (role === 'rtrw' || name.toLowerCase().includes('mulyono')) {
    return AVATAR_MAP.maleRt;
  }

  // Untuk Warga & akun umum lainnya:
  if (effectiveGender === 'P') {
    return AVATAR_MAP.femaleWarga;
  }

  return AVATAR_MAP.maleWarga;
}

