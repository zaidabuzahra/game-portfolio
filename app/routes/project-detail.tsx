import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { projects } from "../projects";
import Header from "./header";
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  let ie = 0;
  let iee = 0;
  const getVideoPlayer = (url: string, isAutoplay: boolean = false, poster?: string) => {
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

  if (isYouTube) {
    const videoId = url.includes("v=") 
      ? url.split("v=")[1]?.split("&")[0] 
      : url.split("/").pop()?.split("?")[0];
    
    const params = isAutoplay 
      ? `?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1` 
      : `?rel=0&modestbranding=1`;
    
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}${params}`}
        className="w-full h-full border-none"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    );
  }}
  
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
        <section className="mb-10">
          <div className="bg-black shadow-2xl rounded-sm overflow-hidden border border-white/5">
            <div className="bg-black border border-cozy-brown aspect-video flex items-center justify-center overflow-hidden relative" key={project.media}>
              {getVideoPlayer(project.media, false, project.thumbnail)}
            </div>
          </div>
        </section>

        {/* 3. NARRATIVE FLOW (Text & Images) */}
        <article className="max-w-4xl mx-auto">
          <div className="space-y-8">
            
            {/* Split the long description into paragraphs and intersperse images */}
            {project.longDescription.split('\n\n').map((paragraph, i) => (
              <div key={i} className="">
                {paragraph.startsWith('?') && (
                  <figure>
                  <CodeSnippet title={paragraph.substring(1)} code={project.responsibilities?.[iee] || "No responsibilities defined"} />
                  <div className="hidden">{iee++}</div>
                  </figure>
                )}
                {!paragraph.startsWith('?') && (
                  <p className="md:text-base leading-relaxed text-cozy-paper/80 font-light">
                    {paragraph.startsWith('!') ? paragraph.substring(1) : paragraph}
                  </p>
                )}
                
                {/* One high-quality image from gallery per paragraph block */}
                {!paragraph.startsWith('!') && !paragraph.startsWith('?') && project.progressGallery?.[ie] && (
                  <figure className="py-5">
                    <div className="bg-cozy-dark border border-cozy-brown/30 shadow-sm">
                      <img 
                        src={project.progressGallery[ie].url} 
                        alt={project.progressGallery[ie].caption} 
                        className="w-full h-auto" 
                      />
                    </div>
                    <figcaption className="mt-4 text-[11px] uppercase tracking-widest text-cozy-paper/40 italic">
                      {project.progressGallery[ie].caption}
                    </figcaption>
                    <div className="hidden">
                      {ie++}
                    </div>
                  </figure>
                )}
              </div>
            ))}
          </div>
        </article>

        {/* 4. DOCUMENTATION ARCHIVE */}
        {project.documents && project.documents.length > 0 && (
          <section id="gdd" className="mt-10 pt-24 border-t border-cozy-brown/30">
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

function CodeSnippet({ title, code, lang }: { title?: string, code: string, lang?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // This ensures the highlighter only loads once the page is in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-30 my-12 border border-cozy-brown/30 bg-[#1e1e1e] shadow-2xl">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-6 py-4 bg-cozy-dark border-b border-cozy-brown/30 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono text-cozy-red font-black px-2 py-0.5 border border-cozy-red/30 uppercase">
            {lang || 'SOURCE'}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-cozy-paper/80">
            {title || 'Implementation_Log'}
          </span>
        </div>
        <span className="text-cozy-paper/20 text-lg font-light">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="text-sm font-mono overflow-x-auto no-scrollbar bg-[#0c0c0c]">
          {/* Only render the highlighter if we are on the client side */}
          {isClient ? (
            <SyntaxHighlighter
              language={lang?.toLowerCase() || 'csharp'}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '2rem',
                background: 'transparent',
                fontSize: '13px',
                lineHeight: '1.7',
              }}
            >
              {code}
            </SyntaxHighlighter>
          ) : (
            /* Fallback while loading */
            <pre className="p-8 text-cozy-paper/40 italic">Initializing_Source_Viewer...</pre>
          )}
          
          {isClient && (
             <div className="px-6 pb-4 flex justify-end">
               <button 
                onClick={handleCopy}
                className="text-[9px] font-black uppercase text-cozy-paper/20 hover:text-cozy-red transition-colors"
               >
                {copied ? 'Copied!' : 'Copy_Raw_Data'}
               </button>
             </div>
          )}
        </div>
      )}
    </div>
  );
}