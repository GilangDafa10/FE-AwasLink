import { useLocation, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  BarChart2,
  Clock,
  Lock,
  MessageSquare,
  Link2Off,
  ShieldAlert,
  Ban,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';

const ResultTeks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scanResult = location.state?.scanResult;
  
  // Ambil teks pesan
  const scannedText = location.state?.scannedText 
    || scanResult?.data?.messageContent 
    || scanResult?.messageContent 
    || scanResult?.text 
    || scanResult?.content 
    || "Tidak ada pesan yang dianalisis.";

  // Ambil risk score
  const rawScore = scanResult?.data?.messageRiskScore 
    ?? scanResult?.messageRiskScore 
    ?? scanResult?.riskScore 
    ?? scanResult?.risk_score 
    ?? scanResult?.score 
    ?? scanResult?.risk;

  const hasResult = !!scanResult;
  const riskPercent = hasResult 
    ? (typeof rawScore === 'number' ? (rawScore <= 1 ? Math.round(rawScore * 100) : Math.round(rawScore)) : 50)
    : 92;

  // Ambil finalStatus / verdict dari API
  const verdict = (scanResult?.data?.finalStatus ?? scanResult?.finalStatus ?? "").toLowerCase();

  // Tentukan status risiko
  let status = "danger"; 
  if (verdict.includes("safe") || verdict.includes("aman") || verdict.includes("legitimate")) {
    status = "safe";
  } else if (verdict.includes("warning") || verdict.includes("waspada") || verdict.includes("mencurigakan") || verdict.includes("suspect")) {
    status = "warning";
  } else if (verdict.includes("danger") || verdict.includes("phishing") || verdict.includes("bahaya")) {
    status = "danger";
  } else {
    // Fallback berdasarkan persentase jika tidak ada verdict string yang cocok
    if (riskPercent < 30) {
      status = "safe";
    } else if (riskPercent < 70) {
      status = "warning";
    } else {
      status = "danger";
    }
  }

  // Konfigurasi visual berdasarkan status
  const config = {
    danger: {
      colorClass: "red",
      barColor: "bg-red-600",
      accentBg: "bg-red-50",
      accentText: "text-red-500",
      badgeText: "Hasil Analisis: Konten Berbahaya",
      badgeClass: "bg-red-50 text-red-600 border-red-100",
      title: "Waspada! Pesan Ini Sangat Mencurigakan",
      description: "AI kami mendeteksi pola manipulatif kuat dan indikasi penipuan dalam teks pesan ini. Hindari berinteraksi lebih jauh.",
      leftBarColor: "bg-red-600",
      lineIndicatorColor: "bg-red-300",
      icon: <AlertTriangle className="w-10 h-10" />,
      riskBadgeBg: "bg-red-600 text-white",
      detailIconColor: "text-red-700"
    },
    warning: {
      colorClass: "amber",
      barColor: "bg-amber-500",
      accentBg: "bg-amber-50",
      accentText: "text-amber-500",
      badgeText: "Hasil Analisis: Konten Mencurigakan",
      badgeClass: "bg-amber-50 text-amber-600 border-amber-100",
      title: "Perhatian! Pesan Ini Berpotensi Phishing",
      description: "AI kami menemukan beberapa indikasi rekayasa sosial atau tautan yang mencurigakan. Harap berhati-hati sebelum menindaklanjuti.",
      leftBarColor: "bg-amber-500",
      lineIndicatorColor: "bg-amber-300",
      icon: <AlertTriangle className="w-10 h-10 text-amber-500" />,
      riskBadgeBg: "bg-amber-500 text-white",
      detailIconColor: "text-amber-700"
    },
    safe: {
      colorClass: "green",
      barColor: "bg-green-600",
      accentBg: "bg-green-50",
      accentText: "text-green-600",
      badgeText: "Hasil Analisis: Konten Aman",
      badgeClass: "bg-green-50 text-green-600 border-green-100",
      title: "Tenang! Pesan Ini Terlihat Aman",
      description: "AI kami tidak menemukan adanya pola penipuan, manipulasi psikologis, atau link berbahaya pada teks ini.",
      leftBarColor: "bg-green-600",
      lineIndicatorColor: "bg-green-300",
      icon: <ShieldCheck className="w-10 h-10" />,
      riskBadgeBg: "bg-green-600 text-white",
      detailIconColor: "text-green-700"
    }
  }[status];

  // Detail analisis risiko
  const defaultDetails = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Urgensi Buatan",
      description: "Pesan memaksa Anda bertindak cepat dengan ancaman waktu agar Anda tidak sempat berpikir jernih."
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Permintaan Data Sensitif",
      description: "Terdapat ajakan untuk melakukan tindakan/verifikasi yang biasanya merupakan cara untuk mencuri kredensial."
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Bahasa yang Manipulatif",
      description: "Penggunaan kata-kata formal yang dipadukan dengan ancaman adalah taktik rekayasa sosial klasik."
    },
    {
      icon: <Link2Off className="w-5 h-5" />,
      title: "Link Pendek (Shortened URL)",
      description: "Penggunaan link pendek menyembunyikan tujuan asli situs untuk mengelabui filter keamanan."
    }
  ];

  const apiDetails = scanResult?.details || scanResult?.indicators;
  const displayDetails = Array.isArray(apiDetails) && apiDetails.length > 0 
    ? apiDetails.map((detail, idx) => {
        const icons = [<Clock className="w-5 h-5" />, <Lock className="w-5 h-5" />, <MessageSquare className="w-5 h-5" />, <Link2Off className="w-5 h-5" />];
        return {
          icon: icons[idx % icons.length],
          title: detail.title ?? detail.name ?? "Analisis Indikator",
          description: detail.description ?? detail.reason ?? ""
        };
      })
    : defaultDetails;

  // Konfigurasi langkah selanjutnya
  const stepsConfig = {
    danger: {
      steps: [
        {
          num: 1,
          bold: "Jangan membalas pesan ini atau mengklik tautan apapun yang ada di dalamnya.",
          text: ""
        },
        {
          num: 2,
          bold: "Blokir nomor pengirim segera",
          text: " untuk menghindari gangguan atau percobaan penipuan berikutnya."
        },
        {
          num: 3,
          bold: "Laporkan sebagai spam",
          text: " melalui fitur pelaporan di aplikasi pesan Anda."
        }
      ],
      buttonText: "Laporkan & Blokir Sekarang",
      buttonIcon: <Ban className="w-5 h-5" />,
      buttonClass: "bg-[#d32f2f] hover:bg-red-700 shadow-red-600/20 hover:shadow-red-600/40",
      action: () => alert("Melaporkan pesan phishing berbahaya...")
    },
    warning: {
      steps: [
        {
          num: 1,
          bold: "Berhati-hatilah dengan tautan atau instruksi di dalam pesan ini.",
          text: " Pastikan Anda mengetahui siapa pengirimnya."
        },
        {
          num: 2,
          bold: "Jangan memberikan informasi pribadi,",
          text: " PIN, atau password apa pun jika diminta."
        },
        {
          num: 3,
          bold: "Konfirmasi ke saluran resmi",
          text: " instansi terkait untuk memverifikasi kebenaran pesan tersebut."
        }
      ],
      buttonText: "Waspada & Laporkan Pesan",
      buttonIcon: <ShieldAlert className="w-5 h-5" />,
      buttonClass: "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20 hover:shadow-amber-600/40",
      action: () => alert("Melaporkan pesan mencurigakan...")
    },
    safe: {
      steps: [
        {
          num: 1,
          bold: "Teks ini terlihat aman untuk dibaca,",
          text: " namun tetap pastikan nomor pengirim adalah nomor resmi atau terpercaya."
        },
        {
          num: 2,
          bold: "Selalu waspada jika ada perubahan instruksi",
          text: " yang tiba-tiba meminta data sensitif Anda."
        },
        {
          num: 3,
          bold: "Jangan pernah membagikan OTP,",
          text: " PIN, atau password Anda kepada siapa pun, termasuk pihak resmi."
        }
      ],
      buttonText: "Kembali ke Beranda",
      buttonIcon: <ArrowLeft className="w-5 h-5" />,
      buttonClass: "bg-green-600 hover:bg-green-700 shadow-green-600/20 hover:shadow-green-600/40",
      action: () => navigate("/")
    }
  }[status];

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 bg-gray-50 min-h-screen font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Top Analysis Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${config.barColor}`}></div>
            
            {/* Warning Icon and Badge */}
            <div className="flex flex-col items-center shrink-0">
              <div className={`w-20 h-20 ${config.accentBg} ${config.accentText} rounded-full flex items-center justify-center mb-3 shadow-inner`}>
                {config.icon}
              </div>
              <div className={`${config.riskBadgeBg} text-xs font-bold px-3 py-1.5 rounded-full shadow-md`}>
                {riskPercent}% RISK
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <div className={`inline-block ${config.badgeClass} text-xs font-bold px-3 py-1.5 rounded-md mb-4 uppercase tracking-wider border`}>
                {config.badgeText}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.title}</h2>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                {config.description}
              </p>

              <div className="bg-[#f8f9fc] border border-blue-100/50 rounded-xl p-6 relative">
                <div className={`absolute left-0 top-6 bottom-6 w-1 ${config.lineIndicatorColor} rounded-r-md`}></div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Teks Pesan Yang Dianalisis</h3>
                <p className="text-gray-700 leading-relaxed font-medium">
                  "{scannedText}"
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Analysis Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-5">
              <BarChart2 className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-800">Detail Analisis Risiko</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayDetails.map((detail, index) => (
                <div key={index} className="bg-[#f8f9fc] border border-blue-100/60 p-5 rounded-xl hover:shadow-md transition-shadow">
                  <div className={`flex items-center gap-3 mb-3 ${config.detailIconColor} font-semibold`}>
                    {detail.icon}
                    <h4 className="text-base">{detail.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Next Steps Card */}
          <div className="bg-[#111827] text-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <ShieldAlert className="w-6 h-6 text-gray-300" />
              <h2 className="text-lg font-medium text-gray-100">Langkah Selanjutnya</h2>
            </div>

            <ul className="space-y-6 flex-1 mb-8">
              {stepsConfig.steps.map((step) => (
                <li key={step.num} className="flex gap-4">
                  <div className={`w-7 h-7 ${status === 'safe' ? 'bg-green-600/90 shadow-green-600/20' : 'bg-red-600/90 shadow-red-600/20'} rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 shadow-lg`}>
                    {step.num}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    <strong className="text-white font-semibold">{step.bold}</strong>
                    {step.text}
                  </p>
                </li>
              ))}
            </ul>

            <button 
              onClick={stepsConfig.action}
              className={`w-full text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg transform hover:-translate-y-0.5 cursor-pointer ${stepsConfig.buttonClass}`}
            >
              {stepsConfig.buttonIcon}
              {stepsConfig.buttonText}
            </button>
          </div>

          {/* Promotion/Guard Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
            <div className="relative h-48 overflow-hidden bg-gray-900">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" 
                alt="AwasLink Guard" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {status === 'safe' ? (
                  <ShieldCheck className="w-16 h-16 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                ) : (
                  <AlertTriangle className="w-16 h-16 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                )}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-gray-800 mb-2 text-lg">AwasLink Guard</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Deteksi bahasa berbasis NLP kami mengenali pola penipuan dalam berbagai bahasa secara instan.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ResultTeks;
