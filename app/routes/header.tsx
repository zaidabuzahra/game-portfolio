import { Link, useLocation, useNavigate } from "react-router";
import { projects } from "../projects";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Filter projects for the dropdowns
  const profProjects = projects.filter(p => p.category === 'professional');
  const pubProjects = projects.filter(p => p.category === 'published');

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${id}`);
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[110] bg-cozy-gray text-cozy-paper h-14 px-6 flex items-center justify-between border-b-4 border-cozy-red shadow-2xl">
      {/* 1. NAME (Left) */}
      <Link to="/" className="text-sm font-black uppercase tracking-tighter flex-shrink-0">
        Zaid Abuzahra
      </Link>

      {/* 2. SECTION NAVIGATION (Center) */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[50%] md:max-w-none">
        
        {/* ABOUT */}
        <button onClick={(e) => handleScroll(e, 'about')} className="text-[11px] font-black uppercase tracking-widest px-3 py-1 hover:bg-cozy-red hover:text-white transition-colors cursor-pointer h-full">
          About
        </button>
        <span className="font-light opacity-20">/</span>

        {/* PROFESSIONAL + DROPDOWN */}
        <div className="relative group h-full flex items-center">
          <button 
            onClick={(e) => handleScroll(e, 'professional')} 
            className="text-[11px] font-black uppercase tracking-widest px-3 py-1 group-hover:bg-cozy-red group-hover:text-white transition-colors cursor-pointer"
          >
            Professional
          </button>
          {/* THE DROPDOWN WINDOW */}
          <div className="absolute top-[52px] left-0 hidden group-hover:flex flex-col bg-cozy-paper border-2 border-cozy-gray min-w-[200px] shadow-[10px_10px_0px_rgba(163,91,91,1)]">
             {profProjects.map((p) => (
               <button
                 key={p.id}
                 onClick={(e) => handleScroll(e, p.id)}
                 className="text-[10px] font-bold text-black uppercase text-left px-4 py-3 border-b border-cozy-gray/10 hover:bg-cozy-red hover:text-white transition-all whitespace-nowrap"
               >
                 {p.title}
               </button>
             ))}
          </div>
        </div>
        <span className="font-light opacity-20">/</span>

        {/* PUBLISHED + DROPDOWN */}
        <div className="relative group h-full flex items-center">
          <button 
            onClick={(e) => handleScroll(e, 'published')} 
            className="text-[11px] font-black uppercase tracking-widest px-3 py-1 group-hover:bg-cozy-red group-hover:text-white transition-colors cursor-pointer"
          >
            Self-Published
          </button>
          {/* THE DROPDOWN WINDOW */}
          <div className="absolute top-[52px] left-0 hidden group-hover:flex flex-col bg-cozy-paper border-2 border-cozy-gray min-w-[200px] shadow-[10px_10px_0px_rgba(163,91,91,1)]">
             {pubProjects.map((p) => (
               <button
                 key={p.id}
                 onClick={(e) => handleScroll(e, p.id)}
                 className="text-[10px] text-black font-bold uppercase text-left px-4 py-3 border-b border-cozy-gray/10 hover:bg-cozy-red hover:text-white transition-all whitespace-nowrap"
               >
                 {p.title}
               </button>
             ))}
          </div>
        </div>
        <span className="font-light opacity-20">/</span>

        {/* DEMOS */}
        <button onClick={(e) => handleScroll(e, 'demo')} className="text-[11px] font-black uppercase tracking-widest px-3 py-1 hover:bg-cozy-red hover:text-white transition-colors cursor-pointer h-full">
          Personal Work
        </button>
        <span className="font-light opacity-20">/</span>

        {/* CONTACT */}
        <button onClick={(e) => handleScroll(e, 'contact')} className="text-[11px] font-black uppercase tracking-widest px-3 py-1 hover:bg-cozy-red hover:text-white transition-colors cursor-pointer h-full">
          Contact
        </button>
      </div>

      {/* 3. DOWNLOAD CV (Right) */}
      <a 
        href="/pdfs/Zaid Abuzahra CV- Game Designer.pdf" 
        download 
        className="bg-cozy-gray text-cozy-paper px-4 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-cozy-red transition-all flex-shrink-0"
      >
        Resume ↓
      </a>
    </nav>
  );
}