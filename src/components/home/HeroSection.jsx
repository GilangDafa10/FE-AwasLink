import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import scans from "@/api/scans";
import ilustrasi from "@/assets/right-ilustrasion.png"
import { Zap, Mail, AlertTriangle, CheckCircle } from "lucide-react";

const Hero = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const textareaRef = useRef(null);

  useEffect(() => {
    const handler = () => {
      textareaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      textareaRef.current?.focus();
      // Efek highlight singkat
      textareaRef.current?.classList.add("ring-2", "ring-cyan-400");
      setTimeout(() => {
        textareaRef.current?.classList.remove("ring-2", "ring-cyan-400");
      }, 800);
    };

    // Listen to the custom event (for clicks from the same page, e.g. CtaSection)
    window.addEventListener("scrollToHeroTextarea", handler);

    // If navigated from Education Page with scroll state
    if (location.state?.scrollToHero) {
      // Delay sedikit agar rendering halaman selesai sepenuhnya
      const timer = setTimeout(() => {
        handler();
        // Bersihkan state agar tidak scroll ulang saat di-refresh
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("scrollToHeroTextarea", handler);
      };
    }

    return () => window.removeEventListener("scrollToHeroTextarea", handler);
  }, [location.state, navigate, location.pathname]);

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
          scannedText: text,
        },
      });
    } catch (err) {
      console.error("Gagal melakukan scan:", err);
      setError("Gagal mendeteksi pesan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-linear-to-b from-slate-50 via-slate-100 to-white">
      {/* Background Blurry Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.25)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <section className="relative py-8 md:py-16 px-6 md:px-14 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-800 tracking-tight">
            Deteksi Indikasi{" "}
            <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Phishing
            </span>{" "}
            pada Pesan Anda.
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
            Tempelkan isi pesan dari WhatsApp, SMS, atau Email untuk dianalisis
            oleh AI kami. Lindungi diri dari penipuan digital sebelum Anda
            merespons atau mengklik tautan apapun.
          </p>
          <div className="bg-white/80 backdrop-blur-md p-5 sm:p-4 rounded-2xl shadow-xl border border-gray-100 relative transition-all hover:shadow-2xl">
            <textarea
              ref={textareaRef}
              className="w-full h-36 p-4 bg-gray-50/50 rounded-xl focus:outline-none border border-transparent focus:border-cyan-500 focus:bg-white transition-all resize-none text-sm text-slate-700 placeholder-gray-400"
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
              <Zap
                size={18}
                fill="currentColor"
                className={loading ? "animate-pulse" : ""}
              />
            </button>
          </div>
        </div>

        {/* Ilustrasi Kartu Kanan */}
        <div className="hidden lg:block lg:col-span-5">
          <img src={ilustrasi} alt="Ilustrasi" className="w-full h-full object-cover" />
        </div>
      </section>
    </div>
  );
};

export default Hero;
