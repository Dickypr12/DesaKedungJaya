import React, { useState } from 'react';
import { getAvatarUrl, detectGender } from '../utils/avatarHelper';

/**
 * Komponen UserAvatar
 * Menampilkan avatar kartun resmi Laki-laki (Cowo) atau Perempuan (Cewe).
 * Dilengkapi fallback elegan jika avatar gagal dimuat.
 */
export default function UserAvatar({
  user = null,
  gender = null,
  role = null,
  name = '',
  className = 'w-10 h-10',
  borderClass = 'ring-2 ring-white shadow-sm',
  alt = 'Avatar Pengguna'
}) {
  const [hasError, setHasError] = useState(false);

  const effectiveUser = user || { role, nama: name, jenisKelamin: gender };
  const avatarSrc = getAvatarUrl(effectiveUser, gender);
  const detectedGender = detectGender(gender || effectiveUser, name);

  if (hasError) {
    const initial = (name || effectiveUser.nama || (detectedGender === 'P' ? 'P' : 'L')).charAt(0).toUpperCase();
    const bgColor = detectedGender === 'P' ? 'bg-rose-500' : 'bg-emerald-600';
    return (
      <div
        className={`${className} rounded-full ${bgColor} text-white font-bold flex items-center justify-center shrink-0 ${borderClass}`}
        title={alt}
      >
        <span>{initial}</span>
      </div>
    );
  }

  return (
    <img
      src={avatarSrc}
      alt={alt || effectiveUser.nama || 'Avatar Profil'}
      onError={() => setHasError(true)}
      className={`${className} rounded-full object-cover shrink-0 ${borderClass}`}
      loading="lazy"
    />
  );
}

