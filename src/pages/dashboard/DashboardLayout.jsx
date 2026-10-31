import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Users, Home, Shield, Award, Landmark, 
  FileCheck, Compass, ArrowLeft, ArrowUpRight
} from 'lucide-react';
import KadesDashboard from './KadesDashboard';
import WargaDashboard from './WargaDashboard';
import RtRwDashboard from './RtRwDashboard';
import OperatorDashboard from './OperatorDashboard';
import AdminDashboard from './AdminDashboard';
import BendaharaDashboard from './BendaharaDashboard';

export default function DashboardLayout() {
  const { role = 'kades' } = useParams();
  const navigate = useNavigate();

  const roleList = [
    { id: 'kades', label: 'Kepala Desa', icon: Award, desc: 'Persetujuan TTE & Disposisi' },
    { id: 'warga', label: 'Warga', icon: Users, desc: 'Layanan Mandiri Warga' },
    { id: 'rtrw', label: 'Ketua RT/RW', icon: Home, desc: 'Verifikasi Pengantar Lingkungan' },
    { id: 'operator', label: 'Operator Pelayanan', icon: FileCheck, desc: 'Loket & SIPADES' },
    { id: 'admin', label: 'Admin Desa', icon: Shield, desc: 'Super Admin & Keamanan' },
    { id: 'bendahara', label: 'Bendahara', icon: Landmark, desc: 'Kas & SPP APBDes' },
  ];

  const handleRoleChange = (roleId) => {
    navigate(`/dashboard/${roleId}`);
  };

  const renderDashboard = () => {
    switch (role) {
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
        return <KadesDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f5ec]">
      
      {/* TOP ROLE SWITCHER BAR (Sticky for quick review & test) */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 py-2.5 px-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Halaman Publik</span>
            </Link>

            <span className="text-xs text-slate-400 hidden sm:inline">|</span>
            <span className="text-xs font-bold text-emerald-400 hidden sm:inline">
              Simulasi 6 Role Google Stitch:
            </span>
          </div>

          {/* 6 Role Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
            {roleList.map((r) => {
              const active = role === r.id;
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  onClick={() => handleRoleChange(r.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    active
                      ? 'bg-[#0b5e42] text-white shadow-sm ring-1 ring-emerald-400'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  title={r.desc}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* DASHBOARD CONTENT */}
      {renderDashboard()}

    </div>
  );
}

