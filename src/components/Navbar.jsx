import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, FileText, PhoneCall, ChevronRight,
  Shield, Compass, Home, Newspaper, PieChart, ShoppingBag, Send,
  User, LogIn, LogOut, UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Beranda', path: '/', icon: Home },
    { name: 'Profil Desa', path: '/profil', icon: Compass },
    { name: 'Layanan Surat', path: '/layanan', icon: FileText },
    { name: 'Berita', path: '/berita', icon: Newspaper },
    { name: 'Transparansi APBDes', path: '/transparansi', icon: PieChart },
    { name: 'Potensi & UMKM', path: '/umkm', icon: ShoppingBag },
    { name: 'Kontak & Lapor', path: '/kontak', icon: PhoneCall },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Banner Information */}
      <div className="bg-brand-900 text-brand-100 text-xs py-2 px-4 border-b border-brand-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Portal Resmi Pemerintah Desa Kedung Jaya</span>
            </span>
            <span>•</span>
            <span>Jam Pelayanan: Senin - Jumat (08.00 - 15.30 WIB)</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:02189123456" className="hover:text-white transition-colors flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" /> (021) 8912-3456
            </a>
            <span>•</span>
            <span className="text-emerald-300 font-medium">Bebas Pungli & Transparan</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav className="sticky top-0 z-50 glass-nav border-b border-slate-200/80 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo / Brand */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-brand-700 to-brand-500 p-1.5 sm:p-2 shadow-md shadow-brand-600/20 flex items-center justify-center transform group-hover:scale-105 transition-all shrink-0">
                <img src="./public/images/logo.jpg" alt="Logo Desa Kedung Jaya" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      active
                        ? 'text-brand-700 bg-brand-50 shadow-sm'
                        : 'text-slate-600 hover:text-brand-700 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Call to Action Buttons */}
            <div className="hidden lg:flex items-center gap-2.5">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2 bg-slate-100/90 py-1.5 px-3 rounded-2xl border border-slate-200">
                  <div className="w-7 h-7 rounded-xl bg-[#0b5e42] text-white flex items-center justify-center text-xs font-bold">
                    {user.nama.charAt(0)}
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-bold text-slate-900 leading-tight truncate max-w-[110px]">{user.nama}</p>
                    <span className="text-[10px] font-mono text-[#0b5e42] uppercase">{user.role}</span>
                  </div>
                  <Link
                    to={`/dashboard/${user.role}`}
                    className="p-1.5 rounded-lg bg-white hover:bg-emerald-50 text-[#0b5e42] text-[11px] font-bold shadow-2xs border border-slate-200"
                    title="Buka Dashboard"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
                    title="Keluar (Logout)"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-700 hover:text-[#0b5e42] hover:bg-emerald-50 font-bold text-xs transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Masuk</span>
                  </Link>

                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs shadow-sm transition-all border border-slate-700"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Daftar Warga</span>
                  </Link>
                </>
              )}

              <Link
                to="/layanan"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold text-xs shadow-md shadow-brand-600/20 transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Layanan Mandiri</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {isAuthenticated ? (
                <Link
                  to={`/dashboard/${user.role}`}
                  className="p-2 rounded-xl bg-[#0b5e42] text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Akun</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="p-2 rounded-xl bg-[#0b5e42] text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Masuk</span>
                </Link>
              )}
              <Link
                to="/layanan"
                className="p-2 rounded-xl bg-brand-50 text-brand-700 text-xs font-bold flex items-center gap-1 border border-brand-200"
              >
                <FileText className="w-4 h-4" />
                <span>Surat</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:text-brand-700 hover:bg-slate-100 focus:outline-none transition-colors"
                aria-label="Buka Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="space-y-1.5 mb-4">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? 'bg-brand-50 text-brand-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-5 h-5 ${active ? 'text-brand-600' : 'text-slate-400'}`} />
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${active ? 'text-brand-600' : 'text-slate-300'}`} />
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              {isAuthenticated && user ? (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#0b5e42] text-white flex items-center justify-center font-bold text-xs">
                      {user.nama.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{user.nama}</p>
                      <span className="text-[10px] text-[#0b5e42] uppercase font-mono">{user.role}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate('/');
                    }}
                    className="text-xs text-rose-600 font-bold px-2 py-1 rounded bg-white border border-rose-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center border border-slate-200"
                  >
                    Masuk Akun
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl bg-[#0b5e42] text-white font-bold text-xs text-center shadow-sm"
                  >
                    Daftar Warga
                  </Link>
                </div>
              )}

              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-emerald-400 font-bold text-sm shadow-md border border-slate-700"
              >
                <Shield className="w-4 h-4" />
                <span>Buka Dashboard (6 Role)</span>
              </Link>
              <Link
                to="/layanan"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-600 text-white font-bold text-sm shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>Pengajuan Surat Mandiri (Online)</span>
              </Link>
              <Link
                to="/kontak"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                <Send className="w-4 h-4 text-brand-600" />
                <span>Lapor & Pengaduan Warga</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

