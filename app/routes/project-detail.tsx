import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { projects } from "../projects";
import Header from "./header";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  if (!project) return <div className="p-40 text-center font-sans">Project not found.</div>;

  const currentDoc = project.documents?.[activeDocIndex];

  return (
    <div className="min-h-screen bg-cozy-gray text-cozy-paper selection:bg-cozy-red/30 pb-40 font-sans">
      <Header />

      <main className="max-w-5xl mx-auto px-6">
        
        {/* 1. PURPOSEFUL HEADER */}
        <header className="pt-32 pb-16">
          <Link to="/" className="text-cozy-red text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">
            ← Back to Index
          </Link>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tightest mt-8 mb-6 leading-[0.9]">
            {project.title}
          </h1>

          {/* CLEAN METADATA ROW */}
          <div className="flex flex-wrap gap-x-12 gap-y-6 py-10 border-y border-cozy-brown/20">
            <div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-cozy-red font-bold mb-1">Role</span>
              <span className="text-lg font-medium">{project.role}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-cozy-red font-bold mb-1">Engine</span>
              <span className="text-lg font-medium">{project.stats?.find(s => s.label.toLowerCase().includes('engine'))?.value || "N/A"}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-cozy-red font-bold mb-1">Platform</span>
              <span className="text-lg font-medium">{project.stats?.find(s => s.label.toLowerCase().includes('platform'))?.value || "N/A"}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-cozy-red font-bold mb-1">Team Size</span>
              <span className="text-lg font-medium">{project.stats?.find(s => s.label.toLowerCase().includes('team'))?.value || "N/A"}</span>
            </div>
          </div>
        </header>

        {/* 2. VISUAL SUMMARY (Video) */}
        <section className="mb-32">
          <div className="bg-black shadow-2xl rounded-sm overflow-hidden border border-white/5">
            <video controls poster={project.thumbnail} className="w-full h-auto max-h-[75vh] object-contain">
              <source src={project.media} type="video/mp4" />
            </video>
          </div>
        </section>

        {/* 3. NARRATIVE FLOW (Text & Images) */}
        <article className="max-w-3xl mx-auto">
          <div className="space-y-16">
            
            {/* Split the long description into paragraphs and intersperse images */}
            {project.longDescription.split('\n\n').map((paragraph, i) => (
              <div key={i} className="space-y-16">
                <p className="text-xl md:text-2xl leading-relaxed text-cozy-paper/80 font-light">
                  {paragraph}
                </p>
                
                {/* One high-quality image from gallery per paragraph block */}
                {project.progressGallery?.[i] && (
                  <figure className="py-8">
                    <div className="bg-cozy-dark border border-cozy-brown/30 shadow-sm">
                      <img 
                        src={project.progressGallery[i].url} 
                        alt={project.progressGallery[i].caption} 
                        className="w-full h-auto" 
                      />
                    </div>
                    <figcaption className="mt-4 text-[11px] uppercase tracking-widest text-cozy-paper/40 italic">
                      {project.progressGallery[i].caption}
                    </figcaption>
                  </figure>
                )}
              </div>
            ))}
          </div>
        </article>

        {/* 4. DOCUMENTATION ARCHIVE */}
        {project.documents && project.documents.length > 0 && (
          <section id="gdd" className="mt-40 pt-24 border-t border-cozy-brown/30">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
              <h3 className="text-4xl font-black uppercase tracking-tight">Documentation</h3>
              <div className="flex flex-wrap gap-4">
                {project.documents.map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDocIndex(idx)}
                    className={`text-[11px] font-bold uppercase tracking-widest px-4 py-2 border transition-all ${
                      activeDocIndex === idx 
                        ? "bg-cozy-red border-cozy-red text-white" 
                        : "border-cozy-brown text-cozy-paper/40 hover:border-cozy-paper"
                    }`}
                  >
                    {doc.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-[850px] bg-cozy-dark border border-cozy-brown/30">
              {isMounted && currentDoc ? (
                <object
                  key={currentDoc.url}
                  data={`${currentDoc.url}#toolbar=0`}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <div className="flex items-center justify-center h-full">
                    <a href={currentDoc.url} className="text-cozy-red underline uppercase text-xs font-bold">Download PDF</a>
                  </div>
                </object>
              ) : <div className="w-full h-full bg-cozy-dark/50 animate-pulse" />}
            </div>
          </section>
        )}
      </main>

      <footer className="mt-40 py-20 border-t border-cozy-brown/10 text-center opacity-30 text-[10px] uppercase tracking-[0.4em]">
        {project.title} Case Study — {new Date().getFullYear()}
      </footer>
    </div>
  );
}