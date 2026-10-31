import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import ProfilPage from './pages/ProfilPage';
import LayananPage from './pages/LayananPage';
import BeritaPage from './pages/BeritaPage';
import TransparansiPage from './pages/TransparansiPage';
import UmkmPage from './pages/UmkmPage';
import KontakPage from './pages/KontakPage';

// Dashboards (6 Role)
import DashboardLayout from './pages/dashboard/DashboardLayout';

// Floating WhatsApp Button
import { MessageCircle } from 'lucide-react';
import { desaInfo } from './data/desaData';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-brand-500 selection:text-white">
      <ScrollToTop />
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/layanan" element={<LayananPage />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/transparansi" element={<TransparansiPage />} />
          <Route path="/umkm" element={<UmkmPage />} />
          <Route path="/kontak" element={<KontakPage />} />
          
          {/* Dashboard 6 Role (Stitch Design) */}
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/dashboard/:role" element={<DashboardLayout />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${desaInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Pemerintah%20Desa%20Kedung%20Jaya,%20saya%20ingin%20bertanya%20informasi%20layanan%20desa`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transform hover:scale-105 active:scale-95 transition-all duration-200 group border-2 border-white/40"
        aria-label="Hubungi WhatsApp Desa"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="hidden sm:inline font-bold text-xs tracking-wide">
          Bantuan WhatsApp
        </span>
      </a>

      {/* Footer */}
      <Footer />
    </div>
  );
}

