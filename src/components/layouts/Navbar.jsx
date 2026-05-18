import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="sticky top-0 z-10 flex justify-between items-center py-6 px-14 bg-white">
    <div className="text-2xl font-bold text-slate-800">AwasLink</div>
    <div className="space-x-6 text-sm text-gray-600">
      <Link to="/" className="border-b-2 border-cyan-400 pb-1">
        Home
      </Link>
      <Link to="/">Analisis Pesan</Link>
      <Link to="/">History</Link>
      <Link to="/">Resources</Link>
    </div>
  </nav>
);

export default Navbar;
