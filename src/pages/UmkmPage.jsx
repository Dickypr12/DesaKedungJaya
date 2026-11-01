import React, { useState } from 'react';
import { 
  ShoppingBag, Search, PhoneCall, PlusCircle, CheckCircle2, 
  Sparkles, ExternalLink, Tag, Store, X, Send
} from 'lucide-react';
import { umkmProduk, desaInfo } from '../data/desaData';

export default function UmkmPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedRegister, setSubmittedRegister] = useState(false);

  // Form State Pendaftaran UMKM Baru
  const [registerData, setRegisterData] = useState({
    namaUsaha: '',
    pemilik: '',
    dusun: 'Kp. Wates (Dusun I)',
    kategori: 'Kuliner',
    whatsapp: '',
    deskripsi: ''
  });

  const categories = ['Semua', 'Pertanian', 'Kuliner', 'Kerajinan', 'Kesehatan', 'Fashion'];

  const filteredProducts = umkmProduk.filter(p => {
    const matchCat = selectedCategory === 'Semua' || p.kategori === selectedCategory;
    const matchQuery = p.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       p.produsen.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       p.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setSubmittedRegister(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmittedRegister(false);
      setRegisterData({
        namaUsaha: '',
        pemilik: '',
        dusun: 'Kp. Wates (Dusun I)',
        kategori: 'Kuliner',
        whatsapp: '',
        deskripsi: ''
      });
      alert('Pendaftaran berhasil! Tim BUMDes Kedung Mandiri akan menghubungi nomor WhatsApp Anda untuk kurasi foto dan listing produk.');
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* HEADER */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800/80 text-emerald-300 text-xs font-semibold">
                <Store className="w-3.5 h-3.5" />
                <span>Pemberdayaan Ekonomi Kerakyatan</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Etalase UMKM & Potensi Desa
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Katalog ragam produk unggulan asli karya warga Desa Kedung Jaya. Mulai dari beras organik, anyaman bambu, camilan tradisional, hingga kerajinan batik lokal.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all shrink-0 self-start md:self-end"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Daftarkan Usaha Anda Gratis</span>
            </button>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama produk atau produsen..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="text-slate-400 text-base">Tidak ada produk yang cocok dengan pencarian.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
              className="text-brand-600 font-bold text-xs hover:underline"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={p.gambar}
                      alt={p.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-800 font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                      {p.kategori}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h2 className="font-extrabold text-slate-900 text-lg group-hover:text-brand-700 transition-colors leading-snug">
                        {p.nama}
                      </h2>
                      <p className="text-xs text-brand-700 font-medium mt-1">
                        {p.produsen}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {p.deskripsi}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Harga</span>
                    <span className="text-lg font-black text-slate-900">
                      Rp {p.harga.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${p.kontakWA}?text=Halo%20${encodeURIComponent(p.produsen)},%20saya%20tertarik%20dengan%20produk%20"${encodeURIComponent(p.nama)}"%20yang%20tertera%20di%20Website%20Resmi%20Desa%20Kedung%20Jaya.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Pesan via WA</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MODAL PENDAFTARAN UMKM WARGA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-auto space-y-6">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
                Dukungan BUMDes
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Daftarkan Produk UMKM Anda
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Layanan promosi produk gratis untuk seluruh warga ber-KTP Desa Kedung Jaya.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Produk / Usaha *
                </label>
                <input
                  type="text"
                  required
                  value={registerData.namaUsaha}
                  onChange={(e) => setRegisterData({ ...registerData, namaUsaha: e.target.value })}
                  placeholder="Contoh: Kripik Pisang Manis Bu Rini"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Pemilik Usaha *
                </label>
                <input
                  type="text"
                  required
                  value={registerData.pemilik}
                  onChange={(e) => setRegisterData({ ...registerData, pemilik: e.target.value })}
                  placeholder="Nama pemilik usaha"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kategori *
                  </label>
                  <select
                    value={registerData.kategori}
                    onChange={(e) => setRegisterData({ ...registerData, kategori: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option>Kuliner</option>
                    <option>Pertanian</option>
                    <option>Kerajinan</option>
                    <option>Kesehatan</option>
                    <option>Fashion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={registerData.whatsapp}
                    onChange={(e) => setRegisterData({ ...registerData, whatsapp: e.target.value })}
                    placeholder="08123456789"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Deskripsi Produk & Kisaran Harga *
                </label>
                <textarea
                  rows="3"
                  required
                  value={registerData.deskripsi}
                  onChange={(e) => setRegisterData({ ...registerData, deskripsi: e.target.value })}
                  placeholder="Ceritakan keunggulan produk dan harga jualnya..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submittedRegister}
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {submittedRegister ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-spin" />
                    <span>Memproses Pendaftaran...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Formulir Pendaftaran</span>
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

