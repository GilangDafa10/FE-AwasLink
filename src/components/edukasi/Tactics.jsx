import { TriangleAlert, AlarmClock, Gift, Building2, ShieldAlert, FileText, ExternalLink } from "lucide-react";

const HeaderAndTactics = () => {
  return (
    <div className="space-y-6">
      {/* Badge & Title */}
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e0f7fc] text-[#00b0ff]">
          <ShieldAlert className="w-3.5 h-3.5" strokeWidth={2.5} />
          Waspada Rekayasa Sosial
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
          Melawan Manipulasi Psikologis Digital
        </h1>
        <p className="text-slate-500 text-sm mt-2 max-w-3xl leading-relaxed">
          Penipu modern tidak hanya meretas sistem, mereka meretas pikiran Anda. Pelajari teknik
          rekayasa sosial dalam pesan teks agar Anda tidak menjadi korban berikutnya.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KARTU KIRI: Bagaimana Penipu Mempengaruhi Anda */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col md:flex-row gap-6 justify-between">
          <div className="flex-1 space-y-4">
            <div>
              <span className="text-xs font-semibold text-rose-600 tracking-wide flex items-center gap-1">
                <TriangleAlert size={16}/> Taktik Manipulasi Pesan
              </span>
              <h2 className="text-xl font-bold text-slate-800 mt-1">
                Bagaimana Penipu Mempengaruhi Anda
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rekayasa sosial menggunakan emosi untuk memicu reaksi cepat tanpa berpikir panjang.
            </p>
            
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <AlarmClock size={16}/>
                <div>
                  <strong className="text-slate-900">Mendesak:</strong> "Akun akan diblokir dalam 30 menit jika tidak dikonfirmasi."
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Gift size={16}/>
                <div>
                  <strong className="text-slate-900">Godaan:</strong> "Selamat! Anda memenangkan undian Rp100 Juta, klik di sini."
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Building2 size={16}/>
                <div>
                  <strong className="text-slate-900">Otoritas Palsu:</strong> Menyamar sebagai petugas bank atau kurir ekspedisi resmi.
                </div>
              </li>
            </ul>
          </div>

          {/* Pratinjau Ilustrasi Chat di dalam Kartu Kiri */}
          <div className="w-full md:w-64 bg-slate-50 rounded-xl p-4 flex flex-col justify-center items-center border border-slate-100">
            <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-100 w-full space-y-3">
              <p className="text-[11px] text-slate-700 leading-relaxed">
                "Paket Anda gagal dikirim. Silakan cek detail pada file di bawah ini:"
              </p>
              <div className="flex items-center gap-2 p-2 bg-sky-50 rounded-lg border border-sky-100">
                <div className="p-1.5 bg-white rounded-md text-sky-500 shadow-xs">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-[10px]">
                  <p className="font-bold text-slate-800">Lacak_Paket.apk</p>
                  <p className="text-slate-400">4.2 MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KARTU KANAN: Ciri Bahasa Penipu */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-800">Ciri Bahasa Penipu</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Penipu sering menggunakan bahasa yang kurang formal atau tata bahasa yang aneh. 
              Perhatikan penggunaan huruf kapital berlebih dan tanda seru yang memaksa.
            </p>
            <div className="bg-rose-50/70 border border-rose-100 p-3 rounded-xl text-[11px] text-rose-700 font-medium italic">
              "!!!KONFIRMASI SEGERA!!! Hadiah anda akan HANGUS jika tidak di proses sekarang juga lewat link ini..."
            </div>
          </div>

          <a href="#analisis" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 mt-4 flex items-center gap-1.5 transition-colors">
            Analisis Teks Lainnya
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}

export default HeaderAndTactics;