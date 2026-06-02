import React, { useState, useEffect } from "react";
import { X, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import scans from "@/api/scans";

export default function ScanDetailModal({ isOpen, onClose, scanId }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && scanId) {
      fetchDetail();
    } else {
      setData(null);
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, scanId]);

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await scans.getScanById(scanId);
      setData(response.data.data);
    } catch (err) {
      console.error("Gagal mengambil detail:", err);
      setError("Gagal memuat detail pesan.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="mb-5 flex justify-between items-center border-b border-slate-100 bg-[#f8fafc]">
          <h2 className="text-lg font-bold text-slate-800">Detail Pesan</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
              <p className="text-slate-500 mt-3 text-sm">Memuat detail...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-rose-500">
              <p>{error}</p>
            </div>
          ) : data ? (
            <div className="space-y-6">
              {/* Status Section */}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full shrink-0 ${isDangerous(data.finalStatus) ? 'bg-rose-100 text-rose-500' : 'bg-emerald-100 text-emerald-500'}`}>
                  {isDangerous(data.finalStatus) ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Status Keamanan</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-md text-sm font-bold ${isDangerous(data.finalStatus) ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {data.finalStatus?.toUpperCase() || "UNKNOWN"}
                    </span>
                    <span className="text-sm font-medium text-slate-600">
                      Skor Risiko: {data.messageRiskScore?.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Content Section */}
              <div className="bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-2">Isi Pesan:</p>
                <p className="text-slate-800 text-sm leading-relaxed wrap-break-word">
                  {data.messageContent}
                </p>
              </div>
              
              {/* Info Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Waktu Scan</p>
                  <p className="text-xs font-medium text-slate-700">
                    {new Date(data.createdAt).toLocaleString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p>Data tidak ditemukan.</p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-3 border-t border-slate-100 flex justify-end bg-[#f8fafc]">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
