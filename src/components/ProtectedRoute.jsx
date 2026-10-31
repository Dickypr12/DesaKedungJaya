import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1faf4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-slate-500 font-semibold">Memverifikasi sesi...</span>
        </div>
      </div>
    );
  }

  // Jika belum login, arahkan ke halaman Login
  if (!isAuthenticated || !user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Jika role dibatasi dan role user tidak ada di daftar yang diizinkan
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-[#f1faf4] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-lg border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900">
              Akses Terbatas (Hak Akses Ditolak)
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Akun Anda login sebagai <strong>{user.role.toUpperCase()}</strong> dan tidak memiliki wewenang untuk membuka halaman ini.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 text-left space-y-1">
            <p><strong>Nama:</strong> {user.nama}</p>
            <p><strong>NIK:</strong> {user.nikMasked}</p>
            <p><strong>Role Aktif:</strong> {user.role}</p>
          </div>

          <div className="pt-2">
            <Navigate to={`/dashboard/${user.role}`} replace />
          </div>
        </div>
      </div>
    );
  }

  return children;
}

