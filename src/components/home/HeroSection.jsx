import React, { useState } from "react";
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
      // Mengirimkan API lewat scans.js dengan field 'message_content' sesuai kebutuhan backend
      const response = await scans.createScan({ message_content: text });
      
      // Redirect ke /result dengan membawa hasil API di state
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
    <section className="py-12 px-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-5xl font-bold leading-tight text-slate-800">
          Deteksi Indikasi <span className="text-cyan-600">Phishing</span> pada
          Pesan Anda.
        </h1>
        <p className="mt-4 text-gray-500 max-w-lg">
          Tempelkan isi pesan dari WhatsApp, SMS, atau Email untuk dianalisis oleh
          AI kami. Lindungi diri dari penipuan digital sebelum Anda merespons atau
          mengklik tautan apapun.
        </p>
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 relative">
          <textarea
            className="w-full h-40 p-4 bg-gray-50 rounded-lg focus:outline-none border border-transparent focus:border-cyan-500 transition-all resize-none"
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
    <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 space-y-4">
        {/* Peringatan Urgensi */}
        <div className="flex flex-col items-start gap-3 bg-blue-50 p-3 rounded-lg">
          {/* Header Preview */}
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
            <Mail size={18} /> Pratinjau Analisis Pesan
          </div>
          <p className="text-sm text-gray-700 mb-2 p-2 bg-gray-50 rounded">
            "Selamat! Nomor Anda terpilih mendapatkan subsidi Rp 5jt. Hubungi
            bit.ly/subsidi-id segera..."
          </p>
          <div className="text-red-500 text-xs font-semibold flex items-center gap-1">
            ⚠ Pola Urgensi & Janji Palsu Terdeteksi
          </div>
        </div>

        {/* Ancaman Phishing */}
        <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
          <AlertTriangle size={20} className="text-red-500 shrink-0 mt-1" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-800 text-sm">
                Ancaman Phishing
              </h3>
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
                BAHAYA
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Teks mengandung pola manipulasi psikologis.
            </p>
          </div>
        </div>

        {/* Pesan Aman */}
        <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-100">
          <CheckCircle size={20} className="text-green-500 shrink-0 mt-1" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-800 text-sm">
                Pesan Aman
              </h3>
              <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded">
                AMAN
              </span>
            </div>
            <p className="text-xs text-gray-600">
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
