import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "border-b-2 border-cyan-400 pb-1 font-semibold text-slate-800 transition-all"
      : "text-gray-500 hover:text-slate-800 pb-1 transition-colors";

  return (
    <nav className="sticky top-0 z-10 flex justify-between items-center py-6 px-14 bg-white">
      <div className="text-2xl font-bold text-slate-800">AwasLink</div>
      <div className="space-x-6 text-sm">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/result" className={linkClass}>
          Analisis Pesan
        </NavLink>
        <NavLink to="/history" className={linkClass}>
          History
        </NavLink>
        <NavLink to="/education" className={linkClass}>
          Resources
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
