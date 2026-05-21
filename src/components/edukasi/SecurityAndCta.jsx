import { Check, CircleUser } from "lucide-react";

const SecurityChecklistAndCTA = () => {
  return (
    <div className="space-y-6">
      {/* Checklist & Info Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Checklist Keamanan */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800">Checklist Keamanan Pesan</h3>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2.5} />
                Jangan pernah instal file .apk dari chat.
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2.5} />
                Verifikasi nomor pengirim di aplikasi GetContact.
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2.5} />
                Jangan kirim kode OTP ke siapapun via chat.
              </li>
            </ul>
          </div>
          <div>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md uppercase tracking-wider">
              SOP Keamanan
            </span>
          </div>
        </div>

        {/* Info Gaya Bahasa Penipu */}
        <div className="bg-[#6b7c96] text-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-center space-y-2 relative overflow-hidden">
          <h3 className="text-base font-bold text-white z-10">Gaya Bahasa Penipu</h3>
          <p className="text-xs text-slate-200/90 leading-relaxed max-w-sm z-10">
            Hati-hati dengan "Too Good To Be True" atau "Too Scary To Be Ignored". 
            Jika pesan memicu emosi kuat (panik atau senang berlebih), itu adalah tanda bahaya pertama rekayasa sosial.
          </p>
          
          {/* Ornamen Grafis Tipis di Pojok Kanan Bawah */}
          <div className="absolute right-4 bottom-4 text-slate-400/20 pointer-events-none">
            <CircleUser className="w-20 h-20" />
          </div>
        </div>

      </div>

      {/* CTA SECTION - Banner Biru Muda */}
      <div className="bg-[#dbeafe] rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-slate-800">Terima Pesan Mencurigakan?</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Jangan biarkan mereka memanipulasi Anda. Gunakan alat kami untuk mendeteksi apakah sebuah pesan atau link mengandung unsur penipuan rekayasa sosial.
          </p>
        </div>
        <button className="whitespace-nowrap w-full sm:w-auto text-center px-5 py-2.5 bg-[#006677] hover:bg-[#004d5a] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors">
          Cek Pesan / Link
        </button>
      </div>
    </div>
  );
}

export default SecurityChecklistAndCTA;