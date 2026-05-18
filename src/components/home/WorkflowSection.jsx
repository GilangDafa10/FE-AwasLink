const Workflow = () => (
  <section className="py-16 px-14 grid grid-cols-1 md:grid-cols-2 gap-16">
    <div>
      <h2 className="text-3xl mb-3">Cara Kerja Analisis Pesan</h2>
      <h3 className="mb-6">
        Hanya dalam 3 langkah mudah, Anda dapat memverifikasi keaslian pesan
        apapun yang Anda terima.
      </h3>
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
        <div key={item.step} className="flex gap-4 mb-6">
          <div className="w-10 h-10 p-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
            {item.step}
          </div>
          <div>
            <h4 className="font-bold">{item.title}</h4>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="bg-blue-100/30 rounded-3xl p-10 relative">
      {/* Kartu Laporan Deteksi Mockup */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold">Laporan Deteksi</span>
          <span className="bg-red-100 text-red-600 text-[10px] px-2 py-1 rounded-full font-bold">
            HIGH RISK
          </span>
        </div>
        <div className="text-sm italic text-gray-400">
          "Segera verifikasi data anda agar rekening tidak diblokir..."
        </div>
      </div>
    </div>
  </section>
);

export default Workflow;
