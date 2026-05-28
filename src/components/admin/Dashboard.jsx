import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "@/api/admin";
import {
  LayoutDashboard,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Trash2,
  LogOut,
  RefreshCw,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  Loader2,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingAll, setDeletingAll] = useState(false);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [toast, setToast] = useState(null);
  const limit = 20;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchLogs = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getLogs(page, limit);

      const raw = response.data?.data;
      
      const logsList = raw?.history || raw?.logs || raw?.data || (Array.isArray(raw) ? raw : []);
      setLogs(Array.isArray(logsList) ? logsList : []);
      
      const totalScanned = raw.summary.total_scanned;
      const dangerousCount = raw.summary.total_phishing;
      const safeCount = raw.summary.total_aman;

      setStats({
        total_scanned: totalScanned,
        dangerous: dangerousCount,
        safe: safeCount,
      });
      
      setTotalPages(raw?.pagination?.totalPages ?? raw?.totalPages ?? 1);
      setTotalItems(raw?.pagination?.total ?? totalScanned);
    } catch (err) {
      console.error("Error fetching admin logs:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Gagal memuat data log.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchLogs(currentPage);
  }, [currentPage, fetchLogs, navigate]);

  const handleDeleteSingle = async (id) => {
    setDeletingId(id);
    try {
      await adminService.deleteLog(id);
      showToast("Log berhasil dihapus.");
      fetchLogs(currentPage);
    } catch {
      showToast("Gagal menghapus log.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteAll = async () => {
    setDeletingAll(true);
    setConfirmDeleteAll(false);
    try {
      await adminService.deleteAllLogs();
      showToast("Semua log berhasil dihapus.");
      setCurrentPage(1);
      fetchLogs(1);
    } catch {
      showToast("Gagal menghapus semua log.", "error");
    } finally {
      setDeletingAll(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isDangerous = (status) => {
    if (!status) return false;
    const lower = status.toLowerCase();
    return lower.includes("phishing") || lower.includes("scam") || lower.includes("spam") || lower.includes("danger");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  const statCards = [
    {
      label: "Total Pemindaian",
      value: stats?.total_scanned ?? 0,
      icon: Activity,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/20",
    },
    {
      label: "Pesan Berbahaya",
      value: stats?.dangerous ?? 0,
      icon: ShieldAlert,
      color: "text-rose-400",
      bg: "bg-rose-400/10",
      border: "border-rose-400/20",
    },
    {
      label: "Pesan Aman",
      value: stats?.safe ?? 0,
      icon: ShieldCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200 font-sans flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium transition-all duration-300 ${
          toast.type === "error"
            ? "bg-rose-950 border-rose-700/50 text-rose-300"
            : "bg-emerald-950 border-emerald-700/50 text-emerald-300"
        }`}>
          {toast.type === "error"
            ? <AlertTriangle className="w-4 h-4 shrink-0" />
            : <CheckCircle className="w-4 h-4 shrink-0" />}
          {toast.message}
        </div>
      )}

      {/* Confirm Delete All Modal */}
      {confirmDeleteAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#161b22] border border-slate-700/60 rounded-2xl p-7 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/10 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-center text-lg font-bold text-white mb-2">Hapus Semua Log?</h3>
            <p className="text-center text-sm text-slate-400 mb-6">
              Tindakan ini tidak bisa dibatalkan. Semua data log pemindaian akan dihapus permanen dari sistem.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteAll(false)}
                className="flex-1 py-2 rounded-xl border border-slate-600 text-slate-300 text-sm font-semibold hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteAll}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold transition-colors cursor-pointer"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#161b22]/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-cyan-400" />
            <span className="text-base font-bold tracking-tight text-white">
              Awas<span className="text-cyan-400">Link</span>
              <span className="ml-2 text-xs font-medium text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">Admin</span>
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-700/50 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-5 md:px-10 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Dashboard Admin</h1>
            <p className="text-sm text-slate-500 mt-1">Kelola dan pantau semua log pemindaian pesan.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchLogs(currentPage)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 border border-slate-700 hover:border-cyan-700/50 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={() => setConfirmDeleteAll(true)}
              disabled={deletingAll || loading || logs.length === 0}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-700/40 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              {deletingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Hapus Semua Log
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {statCards.map((card) => (
            <div key={card.label} className={`bg-[#161b22] border ${card.border} rounded-2xl p-5 flex items-center gap-4`}>
              <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center shrink-0`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{card.label}</p>
                <p className={`text-2xl font-extrabold mt-0.5 ${card.color}`}>
                  {loading ? "..." : (card.value ?? 0).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Logs Table */}
        <div className="bg-[#161b22] border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Log Pemindaian</h2>
            <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              {totalItems.toLocaleString("id-ID")} total log
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-700/50">
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Cuplikan Pesan</th>
                  <th className="py-3 px-6">Skor Risiko</th>
                  <th className="py-3 px-6">Waktu</th>
                  <th className="py-3 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-4 px-6"><div className="h-6 bg-slate-800 rounded-lg w-24" /></td>
                      <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded-lg w-52" /></td>
                      <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded-lg w-16" /></td>
                      <td className="py-4 px-6"><div className="h-4 bg-slate-800 rounded-lg w-28" /></td>
                      <td className="py-4 px-6"><div className="h-8 bg-slate-800 rounded-lg w-20 mx-auto" /></td>
                    </tr>
                  ))
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-rose-400 font-medium">
                      <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                      {error}
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      Belum ada log pemindaian.
                    </td>
                  </tr>
                ) : (
                  logs.map((item) => {
                    const dangerous = isDangerous(item.finalStatus);
                    return (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        {/* Status */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${
                            dangerous
                              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${dangerous ? "bg-rose-400" : "bg-emerald-400"}`} />
                            {item.finalStatus?.toUpperCase() ?? "UNKNOWN"}
                          </span>
                        </td>
                        {/* Message */}
                        <td className="py-4 px-6 max-w-xs">
                          <p className="text-slate-200 truncate">{item.messageContent ?? "-"}</p>
                        </td>
                        {/* Risk Score */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`text-sm font-bold ${
                            (item.messageRiskScore ?? 0) >= 0.7 ? "text-rose-400" : "text-emerald-400"
                          }`}>
                            {item.messageRiskScore != null
                              ? `${item.messageRiskScore}%`
                              : "-"}
                          </span>
                        </td>
                        {/* Date */}
                        <td className="py-4 px-6 whitespace-nowrap text-slate-500 text-xs">
                          {formatDate(item.createdAt)}
                        </td>
                        {/* Action */}
                        <td className="py-4 px-6 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleDeleteSingle(item.id)}
                            disabled={deletingId === item.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-600 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                          >
                            {deletingId === item.id
                              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              : <X className="w-3.5 h-3.5" />}
                            Hapus
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && !error && (
            <div className="px-6 py-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <p>
                Halaman<span className="text-slate-300 font-semibold mx-1.5">{currentPage}</span>
                dari<span className="text-slate-300 font-semibold mx-1.5">{totalPages}</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => totalPages <= 7 || p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, idx) =>
                    p === "..." ? (
                      <span key={`e-${idx}`} className="px-1 text-slate-600">...</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          currentPage === p
                            ? "bg-cyan-500 text-slate-900 border border-cyan-400"
                            : "border border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
