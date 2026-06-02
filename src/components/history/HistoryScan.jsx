import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Search,
  Loader2,
  Smartphone,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import scans from "@/api/scans";
import ScanDetailModal from "./ScanDetailModal";

export default function HistoryScan() {
  const navigate = useNavigate();
  const [scansList, setScansList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescanLoadingId, setRescanLoadingId] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 20;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScanId, setSelectedScanId] = useState(null);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await scans.getScan(currentPage, itemsPerPage);
        const raw = response.data.data;
        const list = Array.isArray(raw?.history) ? raw.history : [];
        const pages = raw?.pagination?.totalPages ?? 1;
        const items = raw?.pagination?.total ?? list.length;

        setScansList(list);
        setTotalPages(pages);
        setTotalItems(items);
      } catch (err) {
        console.error("Gagal mengambil riwayat scan:", err);
        setError("Gagal memuat data riwayat keamanan.");
      } finally {
        setLoading(false);
      }
    };
    fetchScans();
  }, [currentPage]);

  const isDangerous = (status) => {
    if (!status) return false;
    const lower = status.toLowerCase();
    return (
      lower.includes("phishing") ||
      lower.includes("scam") ||
      lower.includes("danger") ||
      lower.includes("spammer") ||
      lower.includes("spam")
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  const handleRescan = async (messageContent) => {
    try {
      setLoading(true);
      const response = await scans.createScan({
        message_content: messageContent,
      });
      navigate("/result", {
        state: {
          scanResult: response.data,
          scannedText: messageContent,
        },
      });
    } catch (err) {
      console.error("Gagal melakukan scan ulang:", err);
      alert("Gagal memproses pindaian ulang.");
    } finally {
      setLoading(false);
    }
  };

  const pesanBerbahaya = scansList.filter((item) =>
    isDangerous(item.finalStatus),
  ).length;
  const pesanAman = scansList.filter(
    (item) => !isDangerous(item.finalStatus),
  ).length;

  // Filter Data based on Search (client-side filter pada data halaman saat ini)
  const filteredData = scansList.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const content = item.messageContent?.toLowerCase() || "";
    const status = item.finalStatus?.toLowerCase() || "";
    return content.includes(searchLower) || status.includes(searchLower);
  });

  // Pagination sekarang dikelola server, currentItems = data dari server
  const activePage = currentPage;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + filteredData.length, totalItems);
  const currentItems = filteredData;

  return (
    <div className="min-h-screen bg-slate-100 text-[#0f172a] p-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pesan Berbahaya */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fee2e2] text-[#ef4444] flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                Pesan Berbahaya
              </p>
              <p className="text-2xl font-bold text-slate-800 mt-0.5">
                {loading ? "..." : pesanBerbahaya.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Pesan Aman */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#dcfce7] text-[#22c55e] flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Pesan Aman</p>
              <p className="text-2xl font-bold text-slate-800 mt-0.5">
                {loading ? "..." : pesanAman.toLocaleString("id-ID")}
              </p>
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
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Cari isi pesan atau status..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[#f1f5f9] text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400 border border-transparent transition-all"
              />
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#eff6ff] text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Cuplikan Pesan</th>
                  <th className="py-4 px-6">Waktu</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {loading ? (
                  Array.from({ length: itemsPerPage }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="py-4 px-6">
                        <div className="h-6 bg-slate-200 rounded w-20"></div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-4 bg-slate-200 rounded w-16"></div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-4 bg-slate-200 rounded w-48 mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-32"></div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="h-3 bg-slate-200 rounded w-24"></div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="h-8 bg-slate-200 rounded w-24 mx-auto"></div>
                      </td>
                    </tr>
                  ))
                ) : error ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-8 text-center text-rose-500 font-medium"
                    >
                      {error}
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-8 text-center text-slate-400 font-medium"
                    >
                      Tidak ada riwayat scan ditemukan.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => {
                    const dangerous = isDangerous(item.finalStatus);

                    return (
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
                                dangerous ? "bg-red-500" : "bg-emerald-500"
                              }`}
                            />
                            <span
                              className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${
                                dangerous
                                  ? "bg-rose-50 text-rose-600"
                                  : "bg-emerald-50 text-emerald-600"
                              }`}
                            >
                              {item.finalStatus
                                ? item.finalStatus.toUpperCase()
                                : "UNKNOWN"}
                            </span>
                          </div>
                        </td>

                        {/* Snippet / Content */}
                        <td className="py-4 px-6 max-w-md">
                          <p className="text-slate-800 font-medium truncate">
                            {item.messageContent}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Skor Risiko: {item.messageRiskScore?.toFixed(2)}%
                          </p>
                        </td>

                        {/* Date/Time */}
                        <td className="py-4 px-6 whitespace-nowrap text-slate-500 text-xs">
                          {formatDate(item.createdAt)}
                        </td>

                        {/* Action Button */}
                        <td className="py-4 px-6 whitespace-nowrap flex justify-center items-center">
                          <button
                            onClick={() => {
                              setSelectedScanId(item.id);
                              setIsModalOpen(true);
                            }}
                            className={`px-4 py-1.5 bg-[#40c4ff] hover:bg-[#00b0ff] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2`}
                          >
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER / PAGINATION */}
          <div className="p-4 bg-[#eff6ff] border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
            <div>
              Menampilkan{" "}
              <span className="text-slate-700">
                {totalItems > 0 ? startIndex + 1 : 0} - {endIndex}
              </span>{" "}
              dari{" "}
              <span className="text-slate-700">
                {totalItems.toLocaleString("id-ID")}
              </span>{" "}
              hasil
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button
                disabled={activePage === 1 || loading}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors ${
                  activePage === 1 || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Tampilkan max 5 halaman di sekitar halaman aktif */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  if (totalPages <= 7) return true;
                  return (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - activePage) <= 2
                  );
                })
                .reduce((acc, page, idx, arr) => {
                  if (idx > 0 && page - arr[idx - 1] > 1) {
                    acc.push("...");
                  }
                  acc.push(page);
                  return acc;
                }, [])
                .map((page, idx) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-1 text-slate-400"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors cursor-pointer ${
                        activePage === page
                          ? "bg-[#0f172a] text-white shadow-xs"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

              <button
                disabled={activePage === totalPages || loading}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={`p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors ${
                  activePage === totalPages || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ScanDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scanId={selectedScanId}
      />
    </div>
  );
}
