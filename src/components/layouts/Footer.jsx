import { Globe, Share2 } from "lucide-react";

const Footer = () => (
  <footer className="px-14 py-10 border-t border-gray-100 flex justify-between items-center bg-slate-900 text-gray-400 text-xs">
    <div>
      <div className="font-bold text-white mb-2">AwasLink</div>
      <p>© 2024 AwasLink. Vigilant digital protection for a safer web.</p>
    </div>
    <div className="flex gap-6 uppercase tracking-widest">
      <a href="#">Privacy Policy</a>
      <a href="#">Digital Safety Guide</a>
      <a href="#">Report Phishing</a>
    </div>
    <div className="flex gap-4">
      <Globe size={18} />
      <Share2 size={18} />
    </div>
  </footer>
);

export default Footer;
