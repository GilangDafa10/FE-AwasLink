import { Package, Mail, Landmark } from "lucide-react";

const ModusDeepDive = () => {
  const modusList = [
    {
      icon: Package,
      title: 'Modus Kurir & APK',
      text: 'Naskah: "Halo Kak, saya kurir J&T. Ada paket gagal kirim karena alamat kurang jelas. Tolong instal aplikasi pelacak ini untuk update alamat."',
      warning: 'Bahaya: File APK ini akan mencuri SMS OTP perbankan Anda secara otomatis.',
    },
    {
      icon: Mail,
      title: 'Undangan Pernikahan',
      text: 'Naskah: "Kami mengundang Bapak/Ibu ke pernikahan kami. Mohon kehadirannya. Untuk detail lokasi dan kartu undangan silakan buka lampiran ini."',
      warning: 'Bahaya: Manipulasi rasa hormat dan pertemanan agar Anda merasa sungkan untuk menolak mengklik.',
    },
    {
      icon: Landmark,
      title: 'Hadiah & Perubahan Tarif',
      text: 'Naskah: "Nasabah Yth, ada perubahan biaya transaksi menjadi Rp150.000/bulan. Klik LINK jika SETUJU atau TIDAK SETUJU."',
      warning: 'Bahaya: Menakut-nakuti nasabah dengan kerugian finansial agar mereka masuk ke website phishing.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          Modus Penipuan Via Pesan Tekstual (Deep Dive)
        </h2>
        <span className="w-fit text-[10px] sm:text-[11px] font-bold tracking-wide bg-slate-500 text-white px-2.5 py-1 rounded-md uppercase">
          Wajib Tahu
        </span>
      </div>

      {/* Grid Modus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modusList.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="bg-slate-50/80 rounded-xl p-5 border border-slate-100/50 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
              </div>
              <p className="text-[11px] text-rose-600 font-bold leading-relaxed pt-2 border-t border-slate-200/50">
                {item.warning}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ModusDeepDive;