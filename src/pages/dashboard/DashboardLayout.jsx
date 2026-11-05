import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, LogOut, ShieldCheck, User, Menu, X, Globe, 
  Clock, CheckCircle2, ChevronRight, Home, FileText, 
  HelpCircle, Settings, Users, Landmark, FileCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from '../../components/UserAvatar';
import KadesDashboard from './KadesDashboard';
import WargaDashboard from './WargaDashboard';
import RtRwDashboard from './RtRwDashboard';
import OperatorDashboard from './OperatorDashboard';
import AdminDashboard from './AdminDashboard';
import BendaharaDashboard from './BendaharaDashboard';

export default function DashboardLayout() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const effectiveRole = (user?.role === 'admin' && role) ? role : (user?.role || 'warga');

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      if (user.role !== 'admin' && (!role || role !== user.role)) {
        navigate(`/dashboard/${user.role}`, { replace: true });
      }
    }
  }, [role, user, isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1faf4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-[#0b5e42] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-slate-500 font-semibold">Memuat sesi pengguna...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (effectiveRole) {
      case 'kades': return <KadesDashboard />;
      case 'warga': return <WargaDashboard />;
      case 'rtrw': return <RtRwDashboard />;
      case 'operator': return <OperatorDashboard />;
      case 'admin': return <AdminDashboard />;
      case 'bendahara': return <BendaharaDashboard />;
      default: return <WargaDashboard />;
    }
  };

  const getRoleConfig = (r) => {
    switch (r) {
      case 'kades':
        return {
          title: 'Kepala Desa',
          sub: 'Pejabat Penandatangan TTE BSrE',
          color: 'bg-emerald-700 text-white',
          border: 'border-emerald-500',
          accent: 'text-emerald-400'
        };
      case 'warga':
        return {
          title: 'Warga Terdaftar',
          sub: 'Layanan Mandiri & Permohonan Surat',
          color: 'bg-teal-700 text-white',
          border: 'border-teal-500',
          accent: 'text-teal-400'
        };
      case 'rtrw':
        return {
          title: 'Ketua RT / RW',
          sub: 'Verifikator Lingkungan Warga',
          color: 'bg-blue-700 text-white',
          border: 'border-blue-500',
          accent: 'text-blue-400'
        };
      case 'operator':
        return {
          title: 'Operator Loket',
          sub: 'Pemeriksa Berkas & SIPADES',
          color: 'bg-cyan-700 text-white',
          border: 'border-cyan-500',
          accent: 'text-cyan-400'
        };
      case 'admin':
        return {
          title: 'Admin Sistem',
          sub: 'Administrator Jaringan & Audit',
          color: 'bg-slate-800 text-white',
          border: 'border-slate-500',
          accent: 'text-emerald-400'
        };
      case 'bendahara':
        return {
          title: 'Bendahara Desa',
          sub: 'Penatausahaan Kas & SPP APBDes',
          color: 'bg-amber-700 text-white',
          border: 'border-amber-500',
          accent: 'text-amber-400'
        };
      default:
        return {
          title: 'Pengguna',
          sub: 'Portal Desa Kedung Jaya',
          color: 'bg-slate-700 text-white',
          border: 'border-slate-500',
          accent: 'text-slate-400'
        };
    }
  };

  const roleInfo = getRoleConfig(effectiveRole);

  // Waktu format Indonesia
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#f1faf4] flex flex-col lg:flex-row text-slate-800">
      
      {/* ============================================================== */}
      {/* 1. DESKTOP LEFT SIDEBAR NAVIGATION (LAPTOP & PC ONLY)          */}
      {/* ============================================================== */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 border-r border-slate-800 text-white shrink-0 h-screen sticky top-0 z-40 justify-between">
        
        {/* Top: Logo & Branding */}
        <div className="p-5 space-y-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 p-1.5 flex items-center justify-center border border-slate-700 shrink-0">
              <img src="/images/logo.jpg" onError={(e) => { e.target.src = './images/logo.jpg'; }} alt="Logo Desa" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-extrabold text-white tracking-tight truncate">
                Desa Kedung Jaya
              </h2>
              <p className="text-[10px] text-slate-400 font-medium">
                Portal Pelayanan & Tata Kelola
              </p>
            </div>
          </div>

          {/* User Profile Card with Avatar */}
          <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/80 flex items-center gap-3">
            <UserAvatar
              user={user}
              role={effectiveRole}
              className="w-11 h-11 ring-2 ring-emerald-500/60"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-bold text-slate-100 truncate">
                {user.nama}
              </h3>
              <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded mt-1 ${roleInfo.color}`}>
                {roleInfo.title}
              </span>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">
                {user.wilayahTugas || user.rtRw || user.dusun || 'Desa Kedung Jaya'}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 text-xs">
          <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Menu Dashboard
          </div>

          <Link
            to={`/dashboard/${effectiveRole}`}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 font-bold border border-emerald-500/30 transition-colors"
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span>Beranda {roleInfo.title}</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4 text-slate-400" />
            <span>Lihat Portal Publik</span>
          </Link>

          {/* Khusus Admin: Switcher Peninjau Role */}
          {user.role === 'admin' && (
            <div className="pt-4 space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Akses Peninjau (Admin)
              </div>
              {[
                { r: 'kades', label: 'Dashboard Kades' },
                { r: 'warga', label: 'Dashboard Warga' },
                { r: 'rtrw', label: 'Dashboard RT/RW' },
                { r: 'operator', label: 'Dashboard Operator' },
                { r: 'bendahara', label: 'Dashboard Bendahara' },
                { r: 'admin', label: 'Dashboard Admin IT' }
              ].map(item => (
                <Link
                  key={item.r}
                  to={`/dashboard/${item.r}`}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                    effectiveRole === item.r
                      ? 'bg-slate-700 text-white font-bold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>{item.label}</span>
                  {effectiveRole === item.r && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: Status & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between px-2 text-[10px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>BSrE & Cloud Online</span>
            </span>
            <span className="font-mono text-slate-500">2026 v2.4</span>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-bold transition-colors border border-rose-800/50"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun ({user.nama.split(' ')[0]})</span>
          </button>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* 2. MOBILE TOP APP BAR & HAMBURGER (HP / TABLET ONLY)           */}
      {/* ============================================================== */}
      <div className="lg:hidden bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700"
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <UserAvatar user={user} role={effectiveRole} className="w-8 h-8" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate max-w-[130px]">
                {user.nama}
              </p>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${roleInfo.color}`}>
                {roleInfo.title}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-[11px] font-bold text-slate-200"
          >
            Web
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="p-1.5 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-800/60"
            title="Keluar"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MOBILE OFF-CANVAS DRAWER MENU                              */}
      {/* ============================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Box */}
          <div className="relative w-72 max-w-[80%] bg-slate-900 text-white h-full flex flex-col justify-between shadow-2xl p-5 z-10 animate-slideRight">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 p-1 flex items-center justify-center">
                    <img src="/images/logo.jpg" onError={(e) => { e.target.src = './images/logo.jpg'; }} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-extrabold text-sm text-white">Desa Kedung Jaya</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile in Drawer */}
              <div className="bg-slate-800 rounded-2xl p-3 border border-slate-700 flex items-center gap-3">
                <UserAvatar user={user} role={effectiveRole} className="w-10 h-10" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{user.nama}</p>
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${roleInfo.color}`}>
                    {roleInfo.title}
                  </span>
                </div>
              </div>

              {/* Navigation in Drawer */}
              <div className="space-y-1.5 text-xs">
                <Link
                  to={`/dashboard/${effectiveRole}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-emerald-600/30 text-emerald-300 font-bold"
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard {roleInfo.title}</span>
                </Link>

                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800"
                >
                  <Globe className="w-4 h-4" />
                  <span>Halaman Publik Desa</span>
                </Link>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-rose-950/80 text-rose-300 text-xs font-bold border border-rose-800"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Akun</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. MAIN WORKSPACE CONTENT (DESKTOP & MOBILE RESPONSIVE)         */}
      {/* ============================================================== */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        
        {/* Desktop Top Workspace Header (Date & Info) */}
        <header className="hidden lg:flex items-center justify-between px-8 py-3.5 bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">
                Dashboard Portal {roleInfo.title}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pemerintah Desa Kedung Jaya, Kec. Babelan, Kab. Bekasi
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-700 block">{currentDate}</span>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3 h-3" /> Sistem Digital Siap
              </span>
            </div>

            <div className="h-6 w-px bg-slate-200"></div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>Portal Publik</span>
            </Link>
          </div>
        </header>

        {/* The Role Dashboard Workspace */}
        <main className="flex-1">
          {renderDashboard()}
        </main>

      </div>

    </div>
  );
}
