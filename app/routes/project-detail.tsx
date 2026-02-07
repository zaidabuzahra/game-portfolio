import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { projects } from "../projects";
import Header from "./header";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  // State to prevent the PDF auto-download bug
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-cozy-gray flex items-center justify-center">
        <h1 className="text-cozy-paper font-black uppercase tracking-widest">404_PROJECT_NOT_FOUND</h1>
      </div>
    );
  }

  const currentDoc = project.documents?.[activeDocIndex];

  return (
    <div className="min-h-screen bg-cozy-gray text-cozy-paper selection:bg-cozy-red/30 pb-40">
      <Header />

      <main>
        {/* SECTION 1: CINEMATIC MEDIA HERO */}
        <section className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden border-b-8 border-cozy-red">
          {/* Background Atmospheric Layer */}
          <div className="absolute inset-0 z-0">
            <img 
              src={project.art} 
              className="w-full h-full object-cover blur-3xl opacity-40 scale-110" 
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cozy-gray via-transparent to-cozy-gray opacity-90" />
            <div className="absolute inset-0 bg-cozy-dark/40" />
          </div>

          {/* Sharp Media Layer */}
          <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
            <div className="w-full max-w-5xl aspect-video bg-black border-2 border-cozy-brown shadow-[0_0_80px_rgba(0,0,0,1)]">
              <video 
                controls 
                poster={project.thumbnail}
                className="w-full h-full object-contain"
              >
                <source src={project.media} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* SECTION 2: TECHNICAL HEADER & METADATA */}
        <section className="bg-cozy-dark/30 border-b border-cozy-brown py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-cozy-red font-mono text-[10px] font-bold uppercase tracking-[0.4em] mb-4 hover:underline">
                  ← Return_to_Index
                </Link>
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tightest leading-none">
                  {project.title}
                </h1>
                <p className="text-cozy-red font-mono text-sm font-bold uppercase tracking-[0.4em] mt-2">
                  Role: {project.role}
                </p>
              </div>

              {/* EXTERNAL LINKS & RECOGNITION */}
              <div className="flex flex-wrap gap-3">
                {/* {project.storeUrl && (
                  <a href={project.storeUrl} target="_blank" className="bg-emerald-600 text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 transition-all shadow-lg">
                    Store Page ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" className="bg-white text-black px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-cozy-red hover:text-white transition-all shadow-lg">
                    Repository ↗
                  </a>
                )} */}
                <a href="#gdd" className="bg-cozy-red text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:brightness-110 transition-all shadow-lg">
                  Design Doc ↓
                </a>
              </div>
            </div>

            {/* TECHNICAL STATS GRID (High Density) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-cozy-brown/30">
              {project.stats?.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase text-cozy-paper/30 tracking-widest">{stat.label}</span>
                  <span className="text-sm font-black uppercase text-cozy-paper tracking-tight">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: TECHNICAL OVERVIEW & STATIC GALLERY */}
        <section className="container mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* MAIN COLUMN: Deep Technical Reading */}
          <div className="lg:col-span-8 space-y-16">
            <div>
              <h2 className="text-cozy-red font-mono text-xs font-bold uppercase tracking-[0.4em] mb-8 border-b border-cozy-brown pb-2">
                Technical Overview
              </h2>
              <div className="text-xl text-cozy-paper/80 font-light leading-relaxed space-y-6">
                {project.longDescription.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* STATIC PROGRESS GALLERY (Visible all at once) */}
            <div className="pt-10">
              <h2 className="text-cozy-red font-mono text-xs font-bold uppercase tracking-[0.4em] mb-10 border-b border-cozy-brown pb-2">
                Progress & Design Iterations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.progressGallery?.map((item, i) => (
                  <div key={i} className="bg-cozy-dark border border-cozy-brown p-3 group">
                    <div className="aspect-video overflow-hidden mb-4 bg-black">
                      <img 
                        src={item.url} 
                        alt={item.caption} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="flex gap-3">
                       <span className="text-cozy-red font-mono text-[10px] font-bold">FIG_0{i+1}</span>
                       <p className="text-[10px] font-mono text-cozy-paper/40 uppercase leading-tight tracking-tight">
                         {item.caption}
                       </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDE COLUMN: Skimmable Impact / Highlights */}
          <div className="lg:col-span-4 space-y-16">
            <div>
              <h2 className="text-cozy-red font-mono text-xs font-bold uppercase tracking-[0.4em] mb-8 border-b border-cozy-brown pb-2">
                Core Impact
              </h2>
              <div className="space-y-10">
                {project.process.map((phase, i) => (
                  <div key={i} className="bg-white/5 p-6 border-l-4 border-cozy-red shadow-lg">
                    <p className="text-[10px] font-mono text-cozy-red font-bold mb-2">ENTRY_0{i+1}</p>
                    <h3 className="text-sm font-black uppercase text-cozy-paper mb-3 tracking-wide">
                      {phase.step}
                    </h3>
                    <p className="text-xs text-cozy-paper/60 leading-normal font-light italic">
                      {phase.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RECOGNITION / AWARDS */}
            {/* {project.awards && project.awards.length > 0 && (
              <div className="pt-10">
                <h2 className="text-emerald-500 font-mono text-xs font-bold uppercase tracking-[0.4em] mb-8 border-b border-emerald-900/30 pb-2">
                  Recognition
                </h2>
                <ul className="space-y-4">
                  {project.awards.map((award, i) => (
                    <li key={i} className="flex gap-3 text-xs font-black uppercase text-cozy-paper/80 italic">
                      <span className="text-emerald-500">★</span> {award}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        </section>

        {/* SECTION 4: DOCUMENTATION ARCHIVE */}
        {project.documents && project.documents.length > 0 && (
          <section id="docs" className="container mx-auto px-6 py-40 border-t-8 border-cozy-brown">
            <div className="mb-12">
              <h2 className="text-cozy-red font-mono text-xs font-bold uppercase tracking-[0.5em] mb-4">
                Technical Archives
              </h2>
              <h3 className="text-5xl font-black uppercase tracking-tighter">Documentation</h3>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* DOCUMENT SELECTOR (Sidebar) */}
              <div className="lg:col-span-3 space-y-2">
                <p className="text-[10px] font-mono uppercase text-cozy-paper/30 mb-4 px-2">Select File:</p>
                {project.documents.map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDocIndex(idx)}
                    className={`w-full text-left p-4 border transition-all flex flex-col gap-1 ${
                      activeDocIndex === idx 
                        ? "bg-cozy-red border-cozy-red text-white" 
                        : "bg-white/5 border-cozy-brown text-cozy-paper/60 hover:border-cozy-paper/30"
                    }`}
                  >
                    <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">{doc.category}</span>
                    <span className="text-xs font-black uppercase leading-tight">{doc.title}</span>
                  </button>
                ))}
              </div>

              {/* DOCUMENT VIEWER (Main) */}
              <div className="lg:col-span-9">
                <div className="flex justify-between items-center mb-4 px-2">
                    <p className="text-[10px] font-mono uppercase text-cozy-red font-bold">
                        Now Viewing: {currentDoc?.title}
                    </p>
                    <a 
                      href={currentDoc?.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-black underline uppercase tracking-widest hover:text-cozy-red"
                    >
                      Open in New Tab ↗
                    </a>
                </div>

                <div className="w-full h-[900px] border-4 border-cozy-brown bg-cozy-dark">
                  {isMounted && currentDoc ? (
                    <object
                      key={currentDoc.url} // Forces re-render of PDF when URL changes
                      data={`${currentDoc.url}#toolbar=0&navpanes=0`}
                      type="application/pdf"
                      className="w-full h-full"
                    >
                      <div className="flex flex-col items-center justify-center h-full text-center p-20">
                        <p className="mb-8 font-light text-cozy-paper/60">PDF preview unavailable.</p>
                        <a href={currentDoc.url} className="bg-cozy-red px-10 py-5 text-white font-black uppercase">
                          Download {currentDoc.title}
                        </a>
                      </div>
                    </object>
                  ) : (
                    <div className="animate-pulse w-full h-full bg-cozy-dark" />
                  )}
                </div>
              </div>

            </div>
          </section>
        )}
      </main>
    </div>
  );
}