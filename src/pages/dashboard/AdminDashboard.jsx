import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, Server, 
  Key, Users, ShieldCheck, Activity, Terminal, RefreshCw
} from 'lucide-react';
import { daftarRole } from '../../data/desaData';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f1faf4] text-slate-800 pb-16">
      <div className="max-w-md mx-auto px-4 pt-4 sm:pt-6 space-y-4">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between py-1">
          <Link
            to="/dashboard"
            className="w-10 h-10 rounded-full bg-white/90 shadow-sm border border-slate-200/60 flex items-center justify-center text-slate-700 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="text-center">
            <h1 className="text-base font-extrabold text-slate-900 leading-tight">
              Administrator Sistem Desa
            </h1>
            <p className="text-[11px] font-medium text-slate-500">
              Pemerintah Desa Kedung Jaya
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-sm">
            <User className="w-5 h-5" />
          </div>
        </div>

        {/* STATUS SUB-HEADER PILLS */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800">
            <Shield className="w-3.5 h-3.5 text-slate-800" />
            <span>Super Administrator</span>
          </span>

          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Server & API BSrE Online</span>
          </span>
        </div>

        {/* PROFILE CARD ADMIN */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
              alt="Tim IT Desa"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-slate-700 tracking-wider uppercase block">
              Pengelola Sistem Informasi Desa
            </span>
            <h2 className="text-sm font-extrabold text-slate-900 truncate">
              Tim IT Desa Kedung Jaya
            </h2>
            <p className="text-[11px] text-slate-400 truncate">
              Akses Root Sistem • Audit & Keamanan
            </p>
          </div>
        </div>

        {/* 2x2 STATS METRIC GRID */}
        <div className="grid grid-cols-2 gap-3">
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Role Pengguna</span>
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">6</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">role aktif</span>
            </div>
            <p className="text-[11px] font-bold text-emerald-700 mt-1">
              ✓ RBAC Terkonfigurasi
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Server Uptime</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <Server className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">99.9%</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              Operasional Prima
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">TTE Gateway</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-base font-black text-slate-900 leading-none">BSrE BSSN</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1">
              Sertifikat Terverifikasi
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Audit Aktivitas</span>
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Activity className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 leading-none">128</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">log</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              Hari ini tercatat
            </p>
          </div>

        </div>

        {/* NOTICE CARD KEAMANAN */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm space-y-2">
          <div className="flex items-start justify-between">
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-mono text-[10px]">
              SECURITY AUDIT OK
            </span>
          </div>

          <h3 className="text-xs font-extrabold text-white pt-1">
            Enkripsi Data Kependudukan & Token TTE
          </h3>
          <p className="text-[11px] text-slate-300 leading-relaxed font-light">
            Seluruh berkas dokumen warga disimpan menggunakan enkripsi AES-256. Akses hanya diberikan pada petugas berwenang sesuai matriks hak akses 6 role desa.
          </p>
        </div>

        {/* SECTION: MANAJEMEN 6 ROLE */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-slate-800"></span>
              <h3 className="text-sm font-extrabold text-slate-900">
                Matriks 6 Role Sistem Desa
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              6 Akun Role
            </span>
          </div>

          <div className="space-y-2">
            {daftarRole.map((role) => (
              <div key={role.id} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl ${role.warna} text-white flex items-center justify-center text-xs font-bold`}>
                    {role.namaRole.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{role.namaRole}</h5>
                    <p className="text-[10px] text-slate-500">{role.user}</p>
                  </div>
                </div>

                <Link
                  to={`/dashboard/${role.id}`}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors"
                >
                  Buka Dashboard →
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

