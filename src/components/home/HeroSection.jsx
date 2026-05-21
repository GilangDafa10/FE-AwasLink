import { useState } from "react";
import { useNavigate } from "react-router-dom";
import scans from "@/api/scans";
import { Zap, Mail, AlertTriangle, CheckCircle } from "lucide-react";

const Hero = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleScan = async () => {
    if (!text.trim()) {
      setError("Silakan masukkan teks pesan terlebih dahulu.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await scans.createScan({ message_content: text });
      
      navigate("/result", { 
        state: { 
          scanResult: response.data, 
          scannedText: text 
        } 
      });
    } catch (err) {
      console.error("Gagal melakukan scan:", err);
      setError("Gagal mendeteksi pesan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 md:py-16 px-6 md:px-14 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
      <div className="lg:col-span-7 space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-800 tracking-tight">
          Deteksi Indikasi <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Phishing</span> pada Pesan Anda.
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
          Tempelkan isi pesan dari WhatsApp, SMS, atau Email untuk dianalisis oleh
          AI kami. Lindungi diri dari penipuan digital sebelum Anda merespons atau
          mengklik tautan apapun.
        </p>
        <div className="bg-white p-5 sm:p-4 rounded-2xl shadow-xl border border-gray-100 relative transition-all hover:shadow-2xl">
          <textarea
            className="w-full h-36 p-4 bg-gray-50 rounded-xl focus:outline-none border border-transparent focus:border-cyan-500 focus:bg-white transition-all resize-none text-sm text-slate-700 placeholder-gray-400"
            placeholder="Contoh: 'Selamat! Anda memenangkan hadiah...'"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError("");
            }}
            disabled={loading}
          />
          {error && <p className="text-red-500 text-xs mt-1 mb-2">{error}</p>}
          <button 
            onClick={handleScan}
            disabled={loading}
            className={`mt-4 bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Menganalisis..." : "Analisis Pesan Sekarang"}
            <Zap size={18} fill="currentColor" className={loading ? "animate-pulse" : ""} />
          </button>
        </div>
      </div>

      {/* Ilustrasi Kartu Kanan */}
      <div className="lg:col-span-5 bg-linear-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-3xl border border-blue-50/50">
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-blue-100 space-y-4">
          {/* Peringatan Urgensi */}
          <div className="flex flex-col items-start gap-3 bg-blue-50 p-3.5 rounded-xl">
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
};

export default Hero;
