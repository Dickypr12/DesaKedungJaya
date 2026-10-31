import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, FileText, PhoneCall, ChevronRight,
  Shield, Compass, Home, Newspaper, PieChart, ShoppingBag, Send
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-700 to-brand-500 p-2 shadow-md shadow-brand-600/20 flex items-center justify-center transform group-hover:scale-105 transition-all">
                <img src="/logo.svg" alt="Logo Desa Kedung Jaya" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
                  KEDUNG JAYA
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Kec. Kedungwuni • Kab. Bekasi
                </span>
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
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/layanan"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold text-sm shadow-md shadow-brand-600/20 hover:shadow-lg hover:shadow-brand-600/30 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4" />
                <span>Layanan Mandiri</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
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

