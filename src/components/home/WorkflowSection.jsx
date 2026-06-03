import { Mail, AlertTriangle, CheckCircle } from "lucide-react";

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
                <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-lg border border-blue-100 space-y-4">
            {/* Peringatan Urgensi */}
            <div className="flex flex-col items-start gap-3 bg-blue-50/80 p-3.5 rounded-xl">
              {/* Header Preview */}
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                <Mail size={16} /> Pratinjau Analisis Pesan
              </div>
              <p className="text-xs sm:text-sm text-gray-700 p-2.5 bg-gray-50/80 border border-gray-100 rounded-lg w-full italic">
                "Selamat! Nomor Anda terpilih mendapatkan subsidi Rp 5jt. Hubungi
                bit.ly/subsidi-id segera..."
              </p>
              <div className="text-red-500 text-[11px] sm:text-xs font-semibold flex items-center gap-1">
                ⚠ Pola Urgensi & Janji Palsu Terdeteksi
              </div>
            </div>

            {/* Ancaman Phishing */}
            <div className="flex gap-3.5 p-3.5 bg-red-50/70 rounded-xl border border-red-100">
              <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">
                    Ancaman Phishing
                  </h3>
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    BAHAYA
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-600 leading-normal">
                  Teks mengandung pola manipulasi psikologis.
                </p>
              </div>
            </div>

            {/* Pesan Aman */}
            <div className="flex gap-3.5 p-3.5 bg-green-50/70 rounded-xl border border-green-100">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">
                    Pesan Aman
                  </h3>
                  <span className="bg-green-100 text-green-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    AMAN
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-600 leading-normal">
                  Terverifikasi sebagai komunikasi resmi.
                </p>
              </div>
            </div>
          </div>
    </div>
  </section>
);

export default Workflow;
