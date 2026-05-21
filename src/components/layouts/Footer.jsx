import { Globe, Share2 } from "lucide-react";

const Footer = () => (
  <footer className="w-full bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-10 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 text-center md:text-left">
      {/* Brand & Copyright */}
      <div className="space-y-2">
        <div className="font-bold text-white text-sm tracking-wide">AwasLink</div>
        <p className="max-w-xs text-[11px] sm:text-xs text-slate-500 leading-relaxed">
          © 2026 AwasLink. Vigilant digital protection for a safer web.
        </p>
      </div>

      {/* Nav Links */}
      <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 uppercase tracking-widest font-semibold text-[10px] text-slate-400">
        <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
          Digital Safety Guide
        </a>
        <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
          Report Phishing
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex gap-4 items-center">
        <a
          href="#"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 hover:text-cyan-400 transition-all duration-200"
          aria-label="Website"
        >
          <Globe size={16} />
        </a>
        <a
          href="#"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 hover:text-cyan-400 transition-all duration-200"
          aria-label="Share"
        >
          <Share2 size={16} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
