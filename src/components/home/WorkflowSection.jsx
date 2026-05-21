const Workflow = () => (
  <section className="py-10 md:py-20 px-6 md:px-14 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
    <div className="lg:col-span-7 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Cara Kerja Analisis Pesan</h2>
      <h3 className="text-gray-500 font-normal text-sm md:text-base leading-relaxed mb-6">
        Hanya dalam 3 langkah mudah, Anda dapat memverifikasi keaslian pesan
        apapun yang Anda terima.
      </h3>
      <div className="space-y-4">
        {[
          {
            step: 1,
            title: "Copy & Paste Pesan",
            desc: "Salin teks lengkap dari WhatsApp, SMS, atau Email yang menurut Anda mencurigakan dan tempel di kotak analisis kami.",
          },
          {
            step: 2,
            title: "Analisis Konteks AI",
            desc: "Sistem kami akan membedah struktur kalimat, mencari kata kunci berbahaya, dan mengevaluasi kredibilitas pengirim.",
          },
          {
            step: 3,
            title: "Hasil Deteksi Instan",
            desc: "Dapatkan skor indikasi phishing secara real-time beserta penjelasan detail mengenai risiko keamanan yang ditemukan.",
          },
        ].map((item) => (
          <div key={item.step} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-200">
            <div className="w-10 h-10 shrink-0 bg-blue-50 border border-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-base shadow-sm">
              {item.step}
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">{item.title}</h4>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="lg:col-span-5 bg-linear-to-br from-cyan-500/5 to-blue-500/5 bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-100 relative flex flex-col justify-center min-h-[280px]">
      {/* Kartu Laporan Deteksi Mockup */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-gray-100/80 space-y-4 relative z-10 transition-transform hover:scale-[1.02] duration-300">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="font-bold text-slate-800 text-sm sm:text-base">Laporan Deteksi</span>
          <span className="bg-red-50 text-red-600 text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-bold border border-red-100">
            HIGH RISK
          </span>
        </div>
        <div className="p-3 bg-red-50/50 border border-red-100/50 rounded-xl">
          <div className="text-[11px] sm:text-xs text-red-500 font-semibold mb-1 flex items-center gap-1">
            ⚠ Teks Pesan Berbahaya:
          </div>
          <div className="text-xs sm:text-sm italic text-gray-500 font-medium leading-relaxed">
            "Segera verifikasi data anda agar rekening tidak diblokir..."
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] text-gray-400">
            <span>Indikasi Phishing</span>
            <span className="font-bold text-red-500">92%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full w-[92%] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Workflow;
