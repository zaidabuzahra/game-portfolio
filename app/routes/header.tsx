import { Link, useLocation, useNavigate } from "react-router";
import { projects } from "../projects";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (pathname === "/") {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-cozy-gray/90 backdrop-blur-md border-b border-cozy-brown px-6 h-14 flex items-center justify-between">
      {/* 1. NAME (Left) */}
      <Link to="/" className="text-sm font-black uppercase tracking-tighter flex-shrink-0">
        Zaid Abuzahra
      </Link>

      {/* 2. NAVIGATION (Center) */}
      <div className="hidden md:flex items-center px-4 py-1 mx-4 overflow-x-auto no-scrollbar">
        <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 hover:text-cozy-red transition-colors">
          About
        </a>
        <span className="text-white/10">|</span>
        {projects.map((p, i) => (
          <div key={p.id} className="flex items-center">
            <a href={`#${p.id}`} onClick={(e) => handleScroll(e, p.id)} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 hover:text-cozy-red transition-colors whitespace-nowrap">
              {p.title}
            </a>
            {i !== projects.length - 1 && <span className="text-white/10">|</span>}
          </div>
        ))}
        <span className="text-white/10">|</span>
        <a href="#Other Demos" onClick={(e) => handleScroll(e, 'Other Demos')} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 hover:text-cozy-red transition-colors">
          Demos
        </a>
      </div>

      {/* 3. DOWNLOAD CV (Right) */}
      <a href="/pdfs/ZaidAbuzahraCV.pdf" download className="bg-cozy-red text-white px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-cozy-paper hover:text-cozy-gray transition-all flex-shrink-0">
        Resume ↓
      </a>
    </nav>
  );
}