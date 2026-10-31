import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Newspaper, Search, Calendar, User, ArrowRight, 
  Share2, X, Tag, Eye, Clock, MessageSquare
} from 'lucide-react';
import { beritaDesa } from '../data/desaData';

export default function BeritaPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialId = searchParams.get('id');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedBerita, setSelectedBerita] = useState(null);

  useEffect(() => {
    if (initialId) {
      const found = beritaDesa.find(b => b.id.toString() === initialId.toString());
      if (found) {
        setSelectedBerita(found);
      }
    }
  }, [initialId]);

  const categories = [
    'Semua',
    'Pertanian & Ekonomi',
    'Pemerintahan & Layanan',
    'Kesejahteraan Sosial',
    'Kesehatan',
    'Pembangunan',
    'UMKM & Ekonomi'
  ];

  const filteredBerita = beritaDesa.filter(b => {
    const matchCategory = selectedCategory === 'Semua' || b.kategori === selectedCategory;
    const matchQuery = b.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       b.ringkasan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       b.konten.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div className="space-y-12 pb-20">
      
      {/* HEADER */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800/80 text-emerald-300 text-xs font-semibold">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Kanal Informasi Terkini</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Warta & Pengumuman Desa Kedung Jaya
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Ikuti kabar perkembangan pembangunan, kegiatan gotong royong, agenda kesehatan posyandu, dan pengumuman resmi pemerintah desa.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kabar atau pengumuman..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Menampilkan <strong>{filteredBerita.length}</strong> artikel berita
            </p>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* BERITA GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredBerita.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="text-slate-400 text-base">Tidak ada berita yang cocok dengan kata kunci atau kategori ini.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
              className="text-brand-600 font-bold text-xs hover:underline"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBerita.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-brand-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {item.kategori}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.tanggal}</span>
                      <span>•</span>
                      <User className="w-3.5 h-3.5" />
                      <span>{item.penulis}</span>
                    </div>

                    <h2 className="font-extrabold text-slate-900 text-lg group-hover:text-brand-700 transition-colors line-clamp-2 leading-snug">
                      {item.judul}
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 2 mnt baca
                  </span>

                  <button
                    onClick={() => setSelectedBerita(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-800 transition-colors"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* DETAIL MODAL POPUP */}
      {selectedBerita && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-auto">
            
            {/* Close Button Sticky */}
            <button
              onClick={() => setSelectedBerita(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={selectedBerita.gambar}
                alt={selectedBerita.judul}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <span className="absolute bottom-4 left-6 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {selectedBerita.kategori}
              </span>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {selectedBerita.tanggal}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> {selectedBerita.penulis}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {selectedBerita.judul}
                </h1>
              </div>

              {/* Body Content */}
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-100 pt-6">
                {selectedBerita.konten}
              </div>

              {/* Share to WA */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Bagikan informasi ini ke kerabat atau grup warga:
                </span>
                
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(selectedBerita.judul + ' - Baca di Portal Desa Kedung Jaya')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Bagikan ke WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

