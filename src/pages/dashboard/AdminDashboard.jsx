import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Shield, Check, Clock, Server, 
  Key, Users, ShieldCheck, Activity, Terminal, RefreshCw, Database
} from 'lucide-react';
import { daftarRole } from '../../data/desaData';
import { getDatabaseStatus } from '../../services/dbClient';
import UserAvatar from '../../components/UserAvatar';

export default function AdminDashboard() {
  const dbStatus = getDatabaseStatus();
  return (
    <div className="min-h-screen bg-[#f1faf4] text-slate-800 pb-16">
      
      {/* Container Responsive Laptop & Mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        
        {/* HEADER BAR RESPONSIVE */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shrink-0"
              title="Kembali"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                  Administrator & Pengelola Sistem Desa
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold">
                  <Shield className="w-3 h-3 text-slate-800" />
                  <span>Super Admin IT</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Pemerintah Desa Kedung Jaya • Akses Root, Audit Keamanan & Manajemen Role
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-extrabold text-slate-900 block">Tim IT Desa</span>
              <span className="text-[11px] text-slate-500 font-semibold">Administrator Sistem</span>
            </div>
            <UserAvatar
              role="admin"
              gender="L"
              name="Tim IT Desa"
              className="w-10 h-10 ring-2 ring-slate-700 shrink-0"
              alt="Tim IT Desa"
            />
          </div>
        </div>

        {/* 4x1 STATS METRIC GRID RESPONSIVE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Role Pengguna</span>
              <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">6</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">role aktif</span>
            </div>
            <p className="text-[11px] font-bold text-emerald-700 mt-1">
              ✓ RBAC Terisolasi
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Server Uptime</span>
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <Server className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">99.9%</span>
            </div>
            <p className="text-[11px] font-bold text-[#0b5e42] mt-1">
              Operasional Prima
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">TTE Gateway</span>
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0b5e42] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-lg sm:text-xl font-black text-slate-900 leading-none">BSrE BSSN</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1">
              Sertifikat Terverifikasi
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Audit Aktivitas</span>
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">128</span>
              <span className="text-xs font-semibold text-slate-500 ml-1.5">log</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">
              Hari ini tercatat
            </p>
          </div>

        </div>

        {/* 2-COLUMN GRID ON LAPTOP / DESKTOP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: ROLE SYSTEM MATRIX & CLOUD DB STATUS */}
          <div className="lg:col-span-8 space-y-6">

            {/* SECTION: MANAJEMEN 6 ROLE */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-slate-800"></span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Matriks 6 Role Sistem Pemerintahan Desa
                  </h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  6 Role Aktif
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {daftarRole.map((role) => (
                  <div key={role.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${role.warna} text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-xs`}>
                        {role.namaRole.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900">{role.namaRole}</h5>
                        <p className="text-[11px] text-slate-500 truncate">{role.user}</p>
                      </div>
                    </div>

                    <Link
                      to={`/dashboard/${role.id}`}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors border border-slate-200 shadow-2xs shrink-0"
                    >
                      Buka →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* NOTICE CARD KEAMANAN & DATABASE READY */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-emerald-400 font-mono text-xs font-bold">
                  {dbStatus.status}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Status Penyimpanan & Database: {dbStatus.provider}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Sistem saat ini aktif menggunakan mesin reaktif lokal terenkripsi SHA-256 dengan perlindungan brute force. Skema migrasi cloud PostgreSQL / Supabase (<code className="text-emerald-300 font-mono bg-white/10 px-1 py-0.5 rounded">database_schema.sql</code>) telah siap disinkronisasikan.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: PROFIL ADMIN IT & AUDIT SYSTEM */}
          <div className="lg:col-span-4 space-y-6">

            {/* PROFILE CARD ADMIN */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-3">
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                <div className="relative">
                  <UserAvatar
                    role="admin"
                    gender="L"
                    name="Tim IT Desa"
                    className="w-14 h-14 ring-2 ring-slate-700"
                    alt="Tim IT Desa"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-slate-700 tracking-wider uppercase block">
                    Pengelola Sistem Informasi Desa
                  </span>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                    Tim IT Desa Kedung Jaya
                  </h2>
                  <p className="text-xs text-slate-400 truncate">
                    Akses Root Sistem • Audit & Keamanan
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Enkripsi Kata Sandi:</span>
                  <span className="font-mono font-bold text-emerald-700">SHA-256 Web Crypto</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Proteksi Brute-Force:</span>
                  <span className="font-bold text-slate-800">5x Gagal Kunci 5 Menit</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Sertifikasi Dokumen:</span>
                  <span className="font-bold text-[#0b5e42]">BSrE BSSN QR Certified</span>
                </div>
              </div>
            </div>

            {/* SYSTEM AUDIT LOG */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Log Keamanan & Audit Terakhir
              </h4>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                  <div>
                    <span className="font-bold text-slate-800 block">Sesi Auth Administrator</span>
                    <span className="text-[11px] text-slate-400">Koneksi aman TLS 1.3 dari IP Terdaftar</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                  <div>
                    <span className="font-bold text-slate-800 block">Pemberian TTE Digital Kades</span>
                    <span className="text-[11px] text-slate-400">Token TTE divalidasi ke Gateway BSrE</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                  <div>
                    <span className="font-bold text-slate-800 block">Isolasi Wilayah RT/RW</span>
                    <span className="text-[11px] text-slate-400">Routing antrean RT 01 s/d RT 22 aktif</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
