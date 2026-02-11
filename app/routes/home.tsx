import { useState } from "react";
import { Link } from "react-router";
import { projects, type Project } from "../projects";
import Header from "./header";
import ImageDivider from "../components/ImageDivider";
import { Check, Mail, Linkedin, Instagram, Phone } from "lucide-react";

// FIXED: Repaired the YouTube URL logic and extraction
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
  }

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
        {/* 1. AUTO-PLAYING WORK REEL */}
        <section className="w-full bg-black h-[50vh] md:h-[65vh] relative overflow-hidden border-b-8 border-cozy-red">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-70 grayscale-[20%]">
            <source src="/game footage/Projects.mp4" type="video/mp4" />
          </video>
        </section>

        {/* 2. ABOUT ME SECTION */}
        <section id="about" className="container mx-auto px-6 py-12 scroll-mt-24">
          <div className="lg:grid-cols-12">
            <h1 className="text-center text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-cozy-paper mb-8">
              About Me
            </h1>
            <div>
              <p className="text-lg text-white/80 font-light leading-relaxed max-w-8xl mx-auto">
                Hi! My name is Zaid Abuzahra, and I am a game designer and developer based in Turkey. I graduated from Istanbul Bilgi University studying Digital Game Design. 
                I have a passion for creating impactful experiences that leaves the players with a lasting emotional connection.
              </p>
              <p className="text-lg text-white/80 font-light leading-relaxed max-w-8xl mx-auto mt-2">
                Here you will find the projects I have contributed to and the work that I am most proud of. I specilalize in desiging narrative-driven 
                mechanics and immersive worlds that invites players to explore and engage with the story on a deeper level.
                I am always eager to take on new challenges and collaborate with other talented individuals in the industry. 
              </p>
              <p className="text-lg text-white/80 font-light leading-relaxed max-w-8xl mx-auto mt-2">
                I love talking about games as much as I enjoy making them, so if you want to chat about games or just want to say hi, please feel free to reach out!
              </p>
            </div>
          </div>
        </section>

        <CategorySection title="Professional Projects" id="professional" list={profProjects} layout="list" />
        <CategorySection title="Self-Published Works" id="published" list={pubProjects} layout="list" />
        
        <CategorySection title="Personal Work" id="demo" list={demoProjects} layout="grid" />

        {/* NEW: CONTACT SECTION */}
        <ContactSection />
      </main>
    </div>
  );
}

function CategorySection({ title, id, list, layout }: { title: string, id: string, list: Project[], layout: 'list' | 'grid' }) {
  if (list.length === 0) return null;
  return (
    <section id={id} className="pb-32 scroll-mt-14">
      <div className="w-full bg-cozy-red py-8 px-6 md:px-20 mb-20 shadow-2xl">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-cozy-paper leading-none">{title}</h2>
      </div>

      <div className="container mx-auto px-6">
        {layout === 'list' ? (
          <div className="space-y-40">
            {list.map((project, index) => (
              <div key={project.id}>
                <ImageDivider project={project} id={project.id} />
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-8">
            {list.map((project) => (
              <DemoCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// NEW: COMPACT DEMO CARD (Matches your screenshot)
function DemoCard({ project }: { project: Project }) {
  return (
    <div className="bg-cozy-dark border border-cozy-brown flex flex-col h-full group hover:border-cozy-red transition-colors duration-300">
      {/* 1. Image with Overlay Title */}
      <div className="aspect-video bg-black border-b border-cozy-brown relative">
        {getVideoPlayer(project.media || "", false, project.thumbnail)}
      </div>
      <div className="relative bg-black/80 backdrop-blur-md p-4 border-t border-white/5">
          <h3 className="text-2xl font-black uppercase tracking-tight text-center">{project.title}</h3>
      </div>
      {/* 2. Tags & Description */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap ">
        </div>

        <p className="text-s text-cozy-paper/60 font-light mb-3 leading-relaxed">
          {project.description}
        </p>

        {/* 3. Highlights with Checkmarks */}
        <div className="space-y-3 mt-auto">
          <p className="text-[10px] font-black uppercase text-cozy-paper/30 tracking-widest">Key Takeaways:</p>
          <ul className="space-y-2">
            {project.process.slice(0, 3).map((p, i) => (
              <li key={i} className="flex gap-3 items-start">
                <Check size={14} className="text-cozy-red flex-shrink-0 mt-0.5" />
                <span className="text-s text-cozy-paper/90 leading-tight">{p.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [activeMedia, setActiveMedia] = useState<number>(0);

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start border-b border-white/5 pb-20">
      <div className="w-full lg:w-[55%] flex flex-col gap-4">
        {/* FIXED: Added conditional rendering here to switch between video and images */}
        <div className="bg-black border border-cozy-brown aspect-video flex items-center justify-center overflow-hidden relative">
          {activeMedia === 0 ? (
            <div className="w-full h-full" key={project.media}>
              {getVideoPlayer(project.media, false, project.thumbnail)}
            </div>
          ) : (
            <img 
              src={project.images[activeMedia - 1]} 
              className="w-full h-full object-contain animate-in fade-in duration-500" 
              alt="Gallery screenshot" 
            />
          )}
        </div>

        {/* THUMBNAIL STRIP */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button 
            onClick={() => setActiveMedia(0)}
            className={`relative flex-shrink-0 w-24 h-16 border-2 transition-all ${activeMedia === 0 ? 'border-cozy-red opacity-100' : 'border-cozy-brown opacity-40 hover:opacity-80'}`}
          >
            <img src={project.thumbnail} className="w-full h-full object-cover" alt="Video preview" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-[10px] font-bold text-white uppercase">Video</div>
          </button>

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
        <div className="border-b-4 border-cozy-red pb-4 mb-4">
          <h3 className="text-4xl font-black uppercase tracking-tighter text-cozy-paper leading-none">{project.title}</h3>
          <p className="font-mono text-xs font-bold text-cozy-red mt-2 uppercase tracking-widest">ROLE: {project.role}</p>
        </div>

        <div className="mb-6 flex gap-6 items-start">
          <div className="flex-grow">
            <p className="text-[10px] font-black text-cozy-paper/30 uppercase mb-2 font-mono">Overview:</p>
            <p className="font-sans text-md text-cozy-paper  leading-snug">{project.description}</p>
          </div>

          {project.storeUrl && project.storeType && (
            <a href={project.storeUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg mt-6 flex-shrink-0 w-14 bg-cozy-paper h-14 text-cozy-gray flex items-center justify-center">
              <img src={`/icons/${project.storeType}.png`} alt="icon" className="w-full h-full object-contain rounded-md" />
              <div className="absolute -top-8 right-0 bg-cozy-red text-white text-[8px] font-bold px-2 py-1 uppercase opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">Go to {project.storeType}</div>
            </a>
          )}
        </div>

        <div className="bg-white/5 p-6 border-t-4 border-cozy-red">
          <p className="text-[11px] font-display uppercase text-cozy-red tracking-widest mb-4">My Contribution:</p>
          <ul className="space-y-4">
            {project.process.map((p, i) => (
              <li key={i} className="flex gap-2 items-start ">
                <span className="text-cozy-red font-black">▸</span>
                <p className="font-sans text-md tracking-tighter  text-cozy-paper/90 leading-tight">
                   {p.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <Link to={`/project/${project.id}`} className="text-cozy-paper h-14 w-full flex items-center justify-center rounded-sm font-black uppercase tracking-widest text-xs hover:text-cozy-red transition-all">
          Case Study →
        </Link>
      </div>
    </div>
  );
}

function ContactSection() {
  const socialLinks = [
    { label: "Email", value: "zaidabuzahra2@gmail.com", url: "mailto:zaidabuzahra2@gmail.com", icon: Mail },
    { label: "LinkedIn", value: "zaid-abuzahra", url: "https://linkedin.com/in/zaid-abuzahra-7532141b2", icon: Linkedin },
    { label: "Instagram", value: "@zaid_abuzahra5", url: "https://www.instagram.com/zaid_abuzahra5/", icon: Instagram },
    { label: "WhatsApp/Mobile", value: "+90 5316178831", url: "tel:+905316178831", icon: Phone },
  ];

  return (
    <section id="contact" className="bg-cozy-paper text-cozy-gray py-4 border-t-8 border-cozy-red">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-5xl md:text-6xl tracking-tightest mb-4">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {socialLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.url} 
              // Logic: If it's a social link, open in new tab. 
              // If it's Phone/Email, don't use _blank (prevents weird empty tabs on mobile)
              target={link.url.startsWith('http') ? "_blank" : "_self"} 
              rel="noreferrer"
              className="flex flex-col items-center gap-2 group p-6 border-2 border-transparent transition-all"
            >
              <link.icon className="w-14 h-14 group-hover:text-cozy-red transition-colors" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase opacity-40">{link.label}</span>
                <span className="text-[16px] font-bold break-all tracking-tighter group-hover:text-cozy-red transition-colors">
                  {link.value}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}