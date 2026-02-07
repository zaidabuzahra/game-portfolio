import { useState } from "react";
import { Link } from "react-router";
import { projects, type Project } from "../projects";
import Header from "./header";
import ImageDivider from "../components/ImageDivider";

const getVideoPlayer = (url: string, isAutoplay: boolean = false, poster?: string) => {
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

  if (isYouTube) {
    // Extract ID and add parameters for mute, autoplay, and hiding clutter
    const videoId = url.includes("v=") ? url.split("v=")[1]?.split("&")[0] : url.split("/").pop();
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
  }

  // Fallback to standard local video tag
  return (
    <video 
      controls={!isAutoplay} 
      autoPlay={isAutoplay} 
      loop={isAutoplay} 
      muted={isAutoplay} 
      playsInline 
      poster={poster}
      className="w-full h-full object-contain"
    >
      <source src={url} type="video/mp4" />
    </video>
  );
};

export default function Home() {
  const profProjects = projects.filter(p => p.category === 'professional');
  const pubProjects = projects.filter(p => p.category === 'published');
  const demoProjects = projects.filter(p => p.category === 'demo');

  return (
    <div className="min-h-screen bg-cozy-gray pt-14">
      <Header />
      
      <main>
        {/* 1. AUTO-PLAYING WORK REEL (The Hook) */}
        <section className="w-full bg-black h-[50vh] md:h-[65vh] relative overflow-hidden border-b-8 border-cozy-red">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-70 grayscale-[20%]"
          >
            {/* Replace with your specific Reel file path */}
            <source src="/game footage/Projects.mp4" type="video/mp4" />
          </video>
        </section>

        {/* 2. BOLD ABOUT ME SECTION (Directly Under Reel) */}
        <section id="about" className="container mx-auto px-6 py-12 scroll-mt-24">
          <div className="lg:grid-cols-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-cozy-paper mb-8 text-center">
                About Me
              </h1>
              <p className="text-lg text-white/70 font-light leading-relaxed max-w-8xl mx-auto">
                Hi! My name is Zaid Abuzahra, and I am a game designer and developer based in Turkey. I graduated from Istanbul Bilgi University studying Digital Game Design. 
                I have a passion for creating impactful experiences that leaves the players with a lasting emotional connection.
              </p>
              <p className="text-lg text-white/70 font-light leading-relaxed max-w-8xl mx-auto mt-2">
                Here you will find the projects I have contributed to and the work that I am most proud of. I specilalize in desiging narrative-driven 
                mechanics and immersive worlds that invites players to explore and engage with the story on a deeper level.
                I am always eager to take on new challenges and collaborate with other talented individuals in the industry. 
              </p>
              <p className="text-lg text-white/70 font-light leading-relaxed max-w-8xl mx-auto mt-2">
                I love talking about games as much as I enjoy making them, so if you want to chat about games or just want to say hi, please feel free to reach out!
              </p>
            </div>
          </div>
        </section>

        {/* PROJECT CATEGORIES (Professional, Published, Demo) */}
        <CategorySection title="Professional Projects" id="professional" list={profProjects} />
        <CategorySection title="Self-Published Works" id="published" list={pubProjects} />
        <CategorySection title="Design Demos & Jams" id="demo" list={demoProjects} />
      </main>
    </div>
  );
}
// BOLD SECTION COMPONENT
function CategorySection({ title, id, list }: { title: string, id: string, list: Project[] }) {
  if (list.length === 0) return null;
  return (
    <section id={id} className="pb-32 scroll-mt-14">
      {/* STRONG SECTION HEADER */}
      <div className="w-full bg-cozy-red py-6 px-6 md shadow-2xl">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-cozy-paper leading-none">
          {title}
        </h2>
      </div>

      <div className="container mx-auto px-6 space-y-40">
        {list.map((project, index) => (
          <div key={project.id}>
            <ImageDivider project={project} id={project.id} />
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [activeMedia, setActiveMedia] = useState<number>(0);

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start border-b border-white/5 pb-20">
      {/* 1. MEDIA SECTION: VISIBLE GALLERY */}
      <div className="w-full lg:w-[55%] flex flex-col gap-4">
        {/* Main Display Window */}
        <div className="bg-black border border-cozy-brown aspect-video flex items-center justify-center overflow-hidden">
          {getVideoPlayer(project.media, false, project.thumbnail)}
        </div>

        {/* THUMBNAIL STRIP: NOTHING IS HIDDEN */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {/* Video Thumbnail */}
          <button 
            onClick={() => setActiveMedia(0)}
            className={`relative flex-shrink-0 w-24 h-16 border-2 transition-all ${activeMedia === 0 ? 'border-cozy-red opacity-100' : 'border-cozy-brown opacity-40 hover:opacity-80'}`}
          >
            <img src={project.thumbnail} className="w-full h-full object-cover" alt="Video preview" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-[10px] font-bold text-white uppercase">Video</div>
          </button>

          {/* Image Thumbnails */}
          {project.images.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setActiveMedia(i + 1)}
              className={`flex-shrink-0 w-24 h-16 border-2 transition-all ${activeMedia === i + 1 ? 'border-cozy-red opacity-100' : 'border-cozy-brown opacity-40 hover:opacity-80'}`}
            >
              <img src={img} className="w-full h-full object-cover" alt={`Screenshot ${i + 1}`} />
            </button>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-[45%] flex flex-col">
        {/* Header Block */}
        <div className="border-b-4 border-cozy-red pb-4 mb-4">
          <h3 className="text-4xl font-black uppercase tracking-tighter text-cozy-paper leading-none">
            {project.title}
          </h3>
          <p className="font-mono text-xs font-bold text-cozy-red mt-2 uppercase tracking-widest">
            ROLE: {project.role}
          </p>
        </div>

        {/* Description Block with Platform Icon */}
        <div className="mb-6 flex gap-6 items-start">
          <div className="flex-grow">
            <p className="text-[10px] font-black text-cozy-paper/30 uppercase mb-2 font-mono">Overview:</p>
            <p className="text-lg text-cozy-paper font-light leading-snug">
              {project.description}
            </p>
          </div>

          {/* STORE LINK ICON BLOCK */}
          {project.storeUrl && project.storeType && (
            <a 
              href={project.storeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="rounded-md mt-6 flex-shrink-0 w-14 h-14 bg-cozy-paper text-cozy-gray flex items-center justify-center"
              title={`View on ${project.storeType}`}
            >
              <img src={`/icons/${project.storeType}.png`} alt={`${project.storeType} icon`} className="rounded-sm" />
              {/* Tooltip HUD */}
              <div className="absolute -top-8 right-0 bg-cozy-red text-white text-[8px] font-black px-2 py-1 uppercase opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">
                Go to {project.storeType}
              </div>
            </a>
          )}
        </div>

      {/* FACT SHEET INFO */}
        {/* HIGH DENSITY HIGHLIGHTS */}
        <div className="bg-white/5 p-6 border-t-4 border-cozy-red">
          <p className="text-[11px] font-black uppercase text-cozy-red tracking-widest mb-4">Highlight:</p>
          <ul className="space-y-4">
            {project.process.map((p, i) => (
              <li key={i} className="flex gap-2 items-start ">
                <span className="text-cozy-red font-black">▸</span>
                <p>
                  <span className="text-base tracking-tighter">{p.detail}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <Link to={`/project/${project.id}`} className="text-cozy-paper h-14 w-50 flex items-center justify-center rounded-sm font-black uppercase tracking-widest text-xs hover:text-cozy-red transition-all">
          Read More... →
        </Link>
      </div>
    </div>
  );
}