import { useNavigate, useRouteError } from "react-router-dom";
import { Frown, ArrowLeft, Home } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background decorative blobs — warna terang sesuai home */}
      <div className="absolute top-[-10%] left-[-5%] w-80 h-80 bg-cyan-100 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl pointer-events-none" />

      {/* Card — gaya bg-white shadow seperti card di HeroSection */}
      <div className="relative z-10 text-center max-w-lg w-full bg-white rounded-3xl shadow-xl border border-gray-100 px-10 py-14">
        {/* 404 number */}
        <div className="relative mb-4 select-none">
          <span className="text-[9rem] font-extrabold leading-none text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-blue-600">
            404
          </span>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm">
            <Frown className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-extrabold text-slate-800 mb-3 tracking-tight">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-2">
          URL yang kamu akses tidak terdaftar atau mungkin telah dipindahkan.
        </p>
        {error?.statusText && (
          <p className="text-red-500 text-xs mt-1 mb-4 italic">
            {error.statusText}
          </p>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-gray-100" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-slate-600 border border-gray-200 bg-white hover:bg-slate-50 transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            Kembali
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-black hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <Home className="w-4 h-4 text-white" />
            Ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
