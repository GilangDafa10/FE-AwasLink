import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isAtResult = location.pathname === "/result";

  const linkClass = ({ isActive }) =>
    isActive
      ? "border-b-2 border-cyan-400 pb-1 font-semibold text-slate-800 transition-all duration-200"
      : "text-gray-500 hover:text-slate-800 pb-1 transition-colors duration-200";

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? "pl-4 border-l-4 border-cyan-400 font-semibold text-cyan-600 transition-all duration-200 py-2 w-full block bg-cyan-50/50 rounded-r-md"
      : "pl-4 border-l-4 border-transparent text-gray-600 hover:text-slate-800 hover:border-gray-200 transition-all duration-200 py-2 w-full block";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-6 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" end className="text-2xl font-bold text-slate-800 flex items-center gap-2 cursor-pointer no-underline" onClick={closeMenu}>
          <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            AwasLink
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink
            to="/result"
            className={isAtResult ? linkClass : "text-gray-300 cursor-not-allowed pb-1 select-none pointer-events-none"}
            onClick={(e) => {
              if (!isAtResult) e.preventDefault();
            }}
            aria-disabled={!isAtResult}
            tabIndex={isAtResult ? undefined : -1}
          >
            Analisis Pesan
          </NavLink>
          <NavLink to="/history" className={linkClass}>
            Riwayat
          </NavLink>
          <NavLink to="/education" className={linkClass}>
            Edukasi
          </NavLink>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg text-gray-500 hover:text-slate-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Links Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-gray-100 ${
          isOpen ? "max-h-72 opacity-100 py-4 bg-white/95 backdrop-blur-md" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 flex flex-col space-y-3 text-base">
          <NavLink to="/" end className={mobileLinkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink
            to="/result"
            className={isAtResult ? mobileLinkClass : "pl-4 border-l-4 border-transparent text-gray-300 cursor-not-allowed py-2 w-full block select-none pointer-events-none"}
            onClick={(e) => {
              if (!isAtResult) {
                e.preventDefault();
              } else {
                closeMenu();
              }
            }}
            aria-disabled={!isAtResult}
            tabIndex={isAtResult ? undefined : -1}
          >
            Analisis Pesan
          </NavLink>
          <NavLink to="/history" className={mobileLinkClass} onClick={closeMenu}>
            Riwayat
          </NavLink>
          <NavLink to="/education" className={mobileLinkClass} onClick={closeMenu}>
            Edukasi
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

