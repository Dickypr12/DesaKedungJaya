import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, ExternalLink,
  ShieldCheck, Heart, ArrowUpRight
} from 'lucide-react';
import { desaInfo } from '../data/desaData';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Kolom 1: Profil Desa */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 p-1.5 flex items-center justify-center">
                <img src="/logo.svg" alt="Logo Desa Kedung Jaya" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg tracking-tight">DESA KEDUNG JAYA</h3>
                <p className="text-xs text-brand-400 font-medium">Kec. Babelan, Kabupaten Bekasi</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Mewujudkan tata kelola pemerintahan desa yang partisipatif, transparan, dan inovatif demi kesejahteraan masyarakat berbasis kearifan lokal dan teknologi.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-emerald-400 border border-brand-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Pelayanan Publik 100% Bebas Pungli
              </span>
            </div>
          </div>

          {/* Kolom 2: Layanan Surat Terpopuler */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Layanan Surat Cepat
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/layanan" className="hover:text-emerald-400 transition-colors flex items-center justify-between group">
                  <span>Surat Keterangan Usaha (SKU)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-emerald-400 transition-colors flex items-center justify-between group">
                  <span>Surat Keterangan Domisili</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-emerald-400 transition-colors flex items-center justify-between group">
                  <span>Pengantar SKCK Polsek</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-emerald-400 transition-colors flex items-center justify-between group">
                  <span>Surat Keterangan Tidak Mampu</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-emerald-400 transition-colors flex items-center justify-between group">
                  <span>Surat Pindah (SKPWNI)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Tautan Cepat */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Menu Informasi
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/profil" className="hover:text-emerald-400 transition-colors">Visi Misi & Struktur Desa</Link>
              </li>
              <li>
                <Link to="/transparansi" className="hover:text-emerald-400 transition-colors">Transparansi Anggaran APBDes</Link>
              </li>
              <li>
                <Link to="/berita" className="hover:text-emerald-400 transition-colors">Warta & Pengumuman Desa</Link>
              </li>
              <li>
                <Link to="/umkm" className="hover:text-emerald-400 transition-colors">Sentra Produk Unggulan UMKM</Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-emerald-400 transition-colors">Pengaduan & Aspirasi Warga</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak & Alamat Kantor */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Kantor Pemerintah Desa
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{desaInfo.alamat}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{desaInfo.jamKerja}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${desaInfo.telepon}`} className="hover:text-white">{desaInfo.telepon}</a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${desaInfo.email}`} className="hover:text-white">{desaInfo.email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © 2026 Pemerintah Desa Kedung Jaya. Seluruh hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Dibuat dengan dedikasi untuk warga Desa Kedung Jaya <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

