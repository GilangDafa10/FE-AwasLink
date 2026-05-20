import React from "react";

export default function HistoryScan() {
  // Data statis untuk tabel sesuai gambar
  const dataPesan = [
    {
      id: 1,
      status: "SCAM",
      statusType: "danger",
      media: "SMS",
      cuplikan: '"Selamat! No. Anda mendapatkan hadiah Rp 50jt dr..."',
      keterangan: "Pesan penipuan modus hadiah",
      waktu: "12 Des 2024, 14:30",
    },
    {
      id: 2,
      status: "SAFE",
      statusType: "success",
      media: "Email",
      cuplikan: '"Konfirmasi pesanan Tokopedia #INV/2024/001..."',
      keterangan: "Email transaksi resmi",
      waktu: "12 Des 2024, 12:15",
    },
    {
      id: 3,
      status: "SAFE",
      statusType: "success",
      media: "WhatsApp",
      cuplikan: '"Halo, ini kode verifikasi GitHub Anda: 123456..."',
      keterangan: "Pesan OTP resmi",
      waktu: "11 Des 2024, 18:45",
    },
    {
      id: 4,
      status: "PHISHING",
      statusType: "danger",
      media: "WhatsApp",
      cuplikan: '"Segera unduh WhatsApp Gold versi terbaru di sini..."',
      keterangan: "Penyebaran malware/link palsu",
      waktu: "11 Des 2024, 09:12",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- HEADER --- */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0f172a]">
            Riwayat Keamanan Pesan
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Pantau dan kelola semua cuplikan teks yang telah Anda periksa.
          </p>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Pemeriksaan */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#e0f2fe] text-[#0ea5e9] flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Pemeriksaan
              </p>
              <p className="text-2xl font-bold text-slate-800 mt-0.5">1,284</p>
            </div>
          </div>

          {/* Pesan Berbahaya */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fee2e2] text-[#ef4444] flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                Pesan Berbahaya
              </p>
              <p className="text-2xl font-bold text-slate-800 mt-0.5">42</p>
            </div>
          </div>

          {/* Pesan Aman */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#dcfce7] text-[#22c55e] flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Pesan Aman</p>
              <p className="text-2xl font-bold text-slate-800 mt-0.5">1,242</p>
            </div>
          </div>
        </div>

        {/* --- CONTAINER UTAMA TABEL --- */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          {/* FILTER BAR */}
          <div className="p-5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border-b border-slate-100">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Cari isi pesan atau status..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[#f1f5f9] text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400 border border-transparent transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export
              </button>
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#eff6ff] text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Media</th>
                  <th className="py-4 px-6">Cuplikan Pesan</th>
                  <th className="py-4 px-6">Waktu</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {dataPesan.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Status Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {/* Bar Indikator Vertikal */}
                        <div
                          className={`w-1 h-5 rounded-full ${
                            item.statusType === "danger"
                              ? "bg-red-500"
                              : "bg-emerald-500"
                          }`}
                        />
                        <span
                          className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${
                            item.statusType === "danger"
                              ? "bg-rose-50 text-rose-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </td>

                    {/* Media Type */}
                    <td className="py-4 px-6 whitespace-nowrap font-medium text-slate-600">
                      <div className="flex items-center gap-2">
                        {item.media === "SMS" && (
                          <svg
                            className="w-4 h-4 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                        {item.media === "Email" && (
                          <svg
                            className="w-4 h-4 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                        {item.media === "WhatsApp" && (
                          <svg
                            className="w-4 h-4 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        )}
                        {item.media}
                      </div>
                    </td>

                    {/* Snippet / Content */}
                    <td className="py-4 px-6 max-w-md">
                      <p className="text-slate-800 font-medium truncate">
                        {item.cuplikan}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.keterangan}
                      </p>
                    </td>

                    {/* Date/Time */}
                    <td className="py-4 px-6 whitespace-nowrap text-slate-500 text-xs">
                      {item.waktu}
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-6 whitespace-nowrap text-center">
                      <button className="px-4 py-1.5 bg-[#40c4ff] hover:bg-[#00b0ff] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer">
                        Pindai Ulang
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER / PAGINATION */}
          <div className="p-4 bg-[#eff6ff] border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
            <div>
              Menampilkan <span className="text-slate-700">4</span> dari{" "}
              <span className="text-slate-700">1,284</span> hasil
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="w-8 h-8 rounded-lg bg-[#0f172a] text-white flex items-center justify-center font-bold shadow-xs">
                1
              </button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">
                2
              </button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">
                3
              </button>
              <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
