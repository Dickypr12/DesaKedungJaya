import React, { useEffect } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, LogOut, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
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

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      // Jika URL role tidak sesuai dengan role asli akun yang login, arahkan ke role aslinya
      if (!role || role !== user.role) {
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

  // Jika belum login, wajib masuk lewat halaman login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'kades':
        return <KadesDashboard />;
      case 'warga':
        return <WargaDashboard />;
      case 'rtrw':
        return <RtRwDashboard />;
      case 'operator':
        return <OperatorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'bendahara':
        return <BendaharaDashboard />;
      default:
        return <WargaDashboard />;
    }
  };

  const getRoleBadge = (roleName) => {
    switch (roleName) {
      case 'kades': return { title: 'Kepala Desa', color: 'bg-emerald-700 text-white' };
      case 'warga': return { title: 'Warga Terdaftar', color: 'bg-teal-700 text-white' };
      case 'rtrw': return { title: 'Ketua RT / RW', color: 'bg-blue-700 text-white' };
      case 'operator': return { title: 'Operator Loket', color: 'bg-cyan-700 text-white' };
      case 'admin': return { title: 'Admin Sistem', color: 'bg-slate-800 text-white' };
      case 'bendahara': return { title: 'Bendahara Desa', color: 'bg-amber-700 text-white' };
      default: return { title: 'Pengguna', color: 'bg-slate-700 text-white' };
    }
  };

  const roleInfo = getRoleBadge(user.role);

  return (
    <div className="min-h-screen bg-[#e8f5ec]">
      
      {/* TOP USER SESSION BAR (Clean & Isolated per Account) */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 py-2.5 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Halaman Publik Portal Desa</span>
            <span className="sm:hidden">Web</span>
          </Link>

          {/* User Authenticated Profile Info */}
          <div className="flex items-center gap-2.5">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${roleInfo.color}`}>
              {roleInfo.title}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-200 truncate max-w-[150px] sm:max-w-xs">
              {user.nama}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs font-bold transition-colors border border-rose-800/60"
            title="Keluar dari akun ini"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar Akun</span>
          </button>

        </div>
      </div>

      {/* RENDER DASHBOARD KHUSUS ROLE YANG LOGIN */}
      {renderDashboard()}

    </div>
  );
}
