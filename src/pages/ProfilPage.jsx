import React from 'react';
import { 
  Building2, Users, MapPin, Compass, Shield, Award,
  CheckCircle2, ArrowRight, Landmark, Layers, GraduationCap, Briefcase
} from 'lucide-react';
import { desaInfo, visiMisi, perangkatDesa } from '../data/desaData';

export default function ProfilPage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* PAGE HEADER */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800/80 text-emerald-300 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Profil Wilayah & Pemerintahan</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Profil Desa Kedung Jaya
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Mengenal lebih dekat sejarah, visi misi kepemimpinan, susunan perangkat desa, dan potensi geografis kependudukan Desa Kedung Jaya.
            </p>
          </div>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visi Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-700 to-brand-900 text-white rounded-3xl p-8 shadow-card relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="px-3 py-1 rounded-full bg-white/20 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                Visi Desa 2024 - 2029
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                "{visiMisi.visi}"
              </h2>
              <p className="text-xs text-brand-200 leading-relaxed pt-2">
                Ditetapkan melalui Musyawarah Desa Perencanaan Pembangunan Jangka Menengah Desa (RPJMDes).
              </p>
            </div>
          </div>

          {/* Misi List */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
                Agenda Aksi
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                5 Misi Utama Pemerintah Desa
              </h2>
            </div>

            <div className="space-y-4">
              {visiMisi.misi.map((misi, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 hover:bg-brand-50/50 transition-colors">
                  <span className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {misi}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SEJARAH DESA KEDUNG JAYA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
              Asal Usul & Warisan Leluhur
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Sejarah Singkat Desa Kedung Jaya
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-slate-600 text-sm leading-relaxed">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <span className="text-xs font-bold text-brand-700 px-2.5 py-1 rounded-md bg-brand-100">
                Awal Abad ke-20
              </span>
              <h3 className="font-bold text-slate-900 text-base">Etimologi "Kedung"</h3>
              <p>
                Kata <em>"Kedung"</em> berasal dari bahasa Sunda dan Jawa Kuno yang berarti palung atau cekungan sungai yang dalam dan jernih. Dahulu, aliran sungai di wilayah ini memiliki kedung air melimpah yang tak pernah surut meski musim kemarau panjang, menjadi urat nadi pengairan sawah warga.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <span className="text-xs font-bold text-brand-700 px-2.5 py-1 rounded-md bg-brand-100">
                Tahun 1978
              </span>
              <h3 className="font-bold text-slate-900 text-base">Pemekaran & Penamaan "Jaya"</h3>
              <p>
                Seiring bertambahnya populasi dan pesatnya produksi pertanian pangan, para sesepuh desa bermusyawarah menambahkan kata <em>"Jaya"</em> dengan harapan desa ini senantiasa unggul, makmur, dan berdikari menjadi lumbung pangan bagi wilayah sekitarnya.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <span className="text-xs font-bold text-brand-700 px-2.5 py-1 rounded-md bg-brand-100">
                Era Digital 2026
              </span>
              <h3 className="font-bold text-slate-900 text-base">Transformasi Desa Cerdas (Smart Village)</h3>
              <p>
                Kini Desa Kedung Jaya bertransformasi menjadi desa percontohan digital modern yang mengintegrasikan layanan administrasi online, akuntabilitas APBDes terbuka, dan pemberdayaan UMKM masyarakat desa secara terpadu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STRUKTUR ORGANISASI PERANGKAT DESA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest">
            Aparatur Pemerintahan
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Struktur Organisasi Pemerintah Desa Kedung Jaya
          </h2>
          <p className="text-sm text-slate-500">
            Jajaran perangkat desa yang berdedikasi melayani seluruh kebutuhan warga masyarakat dengan profesional dan ramah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perangkatDesa.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-card transition-all group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={p.foto}
                  alt={p.nama}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 right-3 bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold py-1.5 px-3 rounded-xl text-center">
                  {p.jabatan}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-700 transition-colors">
                  {p.nama}
                </h3>
                <div className="space-y-1 text-xs text-slate-500">
                  <p className="font-mono text-[11px]">NIPD: {p.nipd}</p>
                  <p className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>{p.pendidikan}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DATA WILAYAH & GEOGRAFIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          <div>
            <span className="text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
              Data Wilayah
            </span>
            <h2 className="text-3xl font-black tracking-tight mt-1">
              Geografis & Batas Wilayah
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">Batas Utara</span>
              <p className="text-base font-bold text-white">Desa Sukajaya</p>
              <p className="text-xs text-slate-400">Dibatasi oleh Saluran Irigasi Sekunder Kali Jaya</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">Batas Selatan</span>
              <p className="text-base font-bold text-white">Desa Karangharja</p>
              <p className="text-xs text-slate-400">Dibatasi Jalan Raya Provinsi Lintas Timur</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">Batas Timur</span>
              <p className="text-base font-bold text-white">Desa Tanjungwangi</p>
              <p className="text-xs text-slate-400">Hamparan Persawahan Irigasi Teknis</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">Batas Barat</span>
              <p className="text-base font-bold text-white">Kelurahan Kebalen / Babelan Kota</p>
              <p className="text-xs text-slate-400">Kawasan Sentra Perdagangan & Pusat Kecamatan Babelan</p>
            </div>

          </div>

          {/* Penggunaan Lahan */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Pembagian Tata Guna Lahan (Total: 428,5 Hektar):
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-800">
                <p className="text-xl font-black text-emerald-400">265 Ha</p>
                <p className="text-xs text-slate-400 mt-1">Sawah Padi Irigasi</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800">
                <p className="text-xl font-black text-amber-400">112 Ha</p>
                <p className="text-xs text-slate-400 mt-1">Pemukiman Warga</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800">
                <p className="text-xl font-black text-blue-400">32 Ha</p>
                <p className="text-xs text-slate-400 mt-1">Kebun / Palawija</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800">
                <p className="text-xl font-black text-purple-400">19,5 Ha</p>
                <p className="text-xs text-slate-400 mt-1">Fasum & Jalan Desa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMOGRAFI & MATA PENCAHARIAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Kelompok Mata Pencaharian */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Mata Pencaharian Penduduk</h3>
                <p className="text-xs text-slate-500">Struktur lapangan kerja warga usia produktif</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Petani & Buruh Tani</span>
                  <span className="text-brand-700">45% (1.820 orang)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Pedagang & Pelaku UMKM</span>
                  <span className="text-brand-700">22% (890 orang)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Karyawan Swasta / Buruh Pabrik</span>
                  <span className="text-brand-700">20% (810 orang)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">PNS / TNI / POLRI / Pensiunan</span>
                  <span className="text-brand-700">8% (324 orang)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Jasa & Lain-lain</span>
                  <span className="text-brand-700">5% (200 orang)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Komposisi Usia & Dusun */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Distribusi 4 Wilayah Dusun</h3>
                <p className="text-xs text-slate-500">Penyebaran rukun warga dan rukun tetangga</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Dusun I (Kp. Wates)</h4>
                <p className="text-xs text-slate-500 mt-1">6 RT • 2 RW</p>
                <p className="text-lg font-black text-brand-700 mt-2">2.140 Jiwa</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Dusun II (Kp. Babakan)</h4>
                <p className="text-xs text-slate-500 mt-1">6 RT • 2 RW</p>
                <p className="text-lg font-black text-brand-700 mt-2">1.980 Jiwa</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Dusun III (Kp. Pengawas)</h4>
                <p className="text-xs text-slate-500 mt-1">5 RT • 1 RW</p>
                <p className="text-lg font-black text-brand-700 mt-2">1.750 Jiwa</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Dusun IV (Kp. Belendung)</h4>
                <p className="text-xs text-slate-500 mt-1">5 RT • 1 RW</p>
                <p className="text-lg font-black text-brand-700 mt-2">1.550 Jiwa</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs text-emerald-900 font-medium">
              <span>Rasio Jenis Kelamin:</span>
              <span className="font-bold">Laki-laki 51% • Perempuan 49%</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

