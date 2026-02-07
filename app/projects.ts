export interface Project {
  id: string;
  category: 'professional' | 'published' | 'demo';
  title: string;
  role: string;
  description: string;
  media: string; // Gameplay Video
  type: 'video' | 'image';
  thumbnail: string;
  art: string;
  artAlignment?: 'center' | 'left';
  backdrop: string;
  images: string[]; // Project Screenshots
  storeType?: 'steam' | 'itch' | 'playstore'; // NEW
  storeUrl?: string; // NEW
  documents?: { 
    title: string; 
    url: string; 
    category: string; // e.g., "Design", "Technical", "Post-Mortem"
  }[];
  stats: { label: string; value: string }[];
  longDescription: string;
  progressGallery: { url: string; caption: string }[];
  process: { step: string; detail: string }[];
  responsibilities: string[];
}

export const projects: Project[] = [
  {
    id: "Little Woody",
    category: "professional",
    title: "Little Woody",
    role: "Game Designer",
    description: "A 2D point-and-click puzzle adventure where players guide a sentient wooden soul through shifting environments. The core experience focuses on the synergy between narrative discovery and mechanical problem-solving.",
    media: "/game footage/Little Woody_Trailer_V4.mp4",
    type: "video",
    thumbnail: "/images/LittleWoodyThumbnail.jpg",
    art: "/images/LittleWoodyArt.png",
    storeType: "steam",
    storeUrl: "https://store.steampowered.com/app/123456/Little_Woody/",
    backdrop: "/images/LittleWoodyArt.png",
    images: ["/images/LittleWoody-1.jpg", "/images/LittleWoody-2.jpg", "/images/LittleWoody-3.jpg", "/images/LittleWoody-4.jpg", "/images/LittleWoody-5.png", "/images/LittleWoody-6.png", "/images/LittleWoody-7.jpg", "/images/LittleWoody-8.jpg"],
    documents: [ 
      { 
        title: "Little Woody GDD (Restricted by NDA)",
        url: "/pdfs/Little Woody’s GDD.pdf",
        category: "Design",
      },
      { 
        title: "Puzzle Document - Public Demo",
        url: "/pdfs/LittleWoodyAct1.pdf",
        category: "Design",
      }
    ],
    
    // STATS BLOCK (For the Detail Page HUD)
    stats: [
      { label: "Engine", value: "Unity / C#" },
      { label: "Team Size", value: "5 Members" },
      { label: "Status", value: "Professional Project" },
      { label: "Platform", value: "PC / Steam" }
    ],

    // LONG DESCRIPTION (For the Detail Page Technical Overview)
    longDescription: `Little Woody is an exploration-heavy puzzle game where the environment acts as both the narrator and the obstacle. My work centered on ensuring that players couldn't solve puzzles through trial and error; instead, they are required to decipher narrative cues hidden within the world. \n\nI focused heavily on the bridge between narrative design and system architecture, creating a documentation pipeline that allowed our art team to build complex, shifting assets that remained functionally aligned with the game's logic.`,

    // HIGHLIGHTS (For the Home Page Fact Sheet)
    process: [
      { 
        step: "Narrative-Driven Mechanics", 
        detail: "Designed levels and environmental puzzles where mechanical solutions are gated by narrative comprehension, forcing players to engage deeply with world-building." 
      },
      { 
        step: "Technical Documentation", 
        detail: "Authored and maintained exhaustive level/puzzle GDDs, serving as the central technical blueprint for the art department and ensuring cross-team alignment." 
      },
      { 
        step: "Iterative Design Optimization", 
        detail: "Systematically analyzed player feedback to execute design iterations, significantly improving the game's UX and difficulty curve." 
      },
      { 
        step: "Market & Community Strategy", 
        detail: "Led the project's market positioning and community management on Reddit; represented the title at local industry conferences and regional showcases." 
      }
    ],

    // PROGRESS GALLERY (For the Detail Page Static Gallery)
    progressGallery: [
      { url: "/images/LittleWoody_Greybox.jpg", caption: "Initial Greybox: Validating sightlines for narrative cues." },
      { url: "/images/LittleWoody_PuzzleLogic.jpg", caption: "Logic Flow: Node-based puzzle architecture for shifting environments." },
      { url: "/images/LittleWoody_ArtPass.jpg", caption: "Art Integration: Final environmental polish with functional markers." }
    ],

    responsibilities: [
      "Cross-departmental lead for mechanical and narrative synergy.",
      "Primary author of all Level and Puzzle Design Documentation.",
      "Lead for QA and community-driven design iteration."
    ]
  },
  {
    id: "Aqua Rush",
    category: "published",
    title: "Aqua Rush",
    role: "Solo Developer",
    description: "A mobile auto runner casual game published on Google Play Store. My goal for this project was to experience the full cycle of game publishing to learn the mobile publishing process.",
    media: "/game footage/AquaRushVVideo.mp4",
    type: "video",
    thumbnail: "/images/ICon.png",
    storeType: "playstore",
    storeUrl: "https://play.google.com/store/apps/details?id=com.oneactionstudioes.aquarush",
    art: "/images/AquaRushArt.png",
    backdrop: "/images/AquaRushArt.png",
    images: ["/images/AquaRush-2.jpeg", "/images/AquaRush-4.jpeg", "/images/AquaRush-1.jpeg", "/images/AquaRush-3.jpeg"],
    stats: [
      { label: "Engine", value: "Unity / C#" },
      { label: "Team Size", value: "Solo Project" },
      { label: "Status", value: "Self-Published" },
      { label: "Platform", value: "Mobile / iOS & Android" }
    ],
    longDescription: `Aqua Rush is a 2D auto-runner mobile game where players control a water droplet navigating through an endless, 
    procedurally generated environment. The core gameplay loop focuses on quick reflexes and strategic use of power-ups to survive as 
    long as possible while collecting points. \n\nAs the sole developer, I was responsible for every aspect of the game's creation, 
    from initial concept and design to programming, art creation, and deployment. This project allowed me to explore the full lifecycle 
    of game development and hone my skills in both technical and creative domains.`,
    progressGallery: [
      { url: "/images/LittleWoody-1.jpg", caption: "Initial Concept Sketch: Visualizing the core gameplay loop and art style." },
      { url: "/images/LittleWoody-2.jpg", caption: "Early Prototype: Implementing basic mechanics and procedural generation." },
      { url: "/images/LittleWoody-3.jpg", caption: "Final Version: Polished art and refined gameplay for release." },
      { url: "/images/LittleWoody-4.jpg", caption: "Final Version: Polished art and refined gameplay for release." }
    ],
    process: [
      { step: "", detail: "Programmed gameplay mechanics and logic in C# for Unity." },
      { step: "", detail: "Integrated a survival feature for the player to manage risk and reward." },
      { step: "", detail: "Designed and created all game assets including characters and environments." },
      { step: "", detail: "Managed the entire publishing process on the Google Play Store and implemented advertisement integration." },
    ],
    responsibilities: [
      "Solely developed the game from concept to deployment on the App Store and Google Play.",
      "Designed all game assets including characters, environments, and UI elements."
    ]
  },
  {
    id: "Where Vines Whisper Lies",
    category: "published",
    title: "Where Vines Whisper Lies",
    role: "Team Leader, Developer, Game Designer, and Environment Designer",
    description: "A 3D puzzle-adventure game where two delusional scientists get stuck in a loop trying to complete their world-changing research that is doomed to fail.",
    media: "https://youtu.be/6-0Wym8406A",
    type: "video",
    thumbnail: "/images/WhereVinesWhisperLiesArt.png",
    storeType: "itch",
    storeUrl: "https://oneaction.itch.io/where-vines-whisper-lies",
    art: "/images/WhereVinesWhisperLiesArt.png",
    backdrop: "/game footage/WhereVinesWhisperLiesMainMenu.gif",
    images: ["/art/vines-1.jpg", "/art/vines-2.jpg", "/art/vines-3.jpg"],

    stats: [
      { label: "Engine", value: "Unity / C#" },
      { label: "Team Size", value: "Solo Project" },
      { label: "Status", value: "Self-Published" },
      { label: "Platform", value: "Mobile / iOS & Android" }
    ],
    longDescription: `Aqua Rush is a 2D auto-runner mobile game where players control a water droplet navigating through an endless, 
    procedurally generated environment. The core gameplay loop focuses on quick reflexes and strategic use of power-ups to survive as 
    long as possible while collecting points. \n\nAs the sole developer, I was responsible for every aspect of the game's creation, 
    from initial concept and design to programming, art creation, and deployment. This project allowed me to explore the full lifecycle 
    of game development and hone my skills in both technical and creative domains.`,
    progressGallery: [
      { url: "/images/AquaRush_Sketch1.jpg", caption: "Initial Concept Sketch: Visualizing the core gameplay loop and art style." },
      { url: "/images/AquaRush_Prototype.jpg", caption: "Early Prototype: Implementing basic mechanics and procedural generation." },
      { url: "/images/AquaRush_Final.jpg", caption: "Final Version: Polished art and refined gameplay for release." }
    ],

    process: [
      { step: "", detail: "Led a team of 4 in designing and developing the game over a full academic year." },
      { step: "", detail: "Designed and implemented core gameplay mechanics and puzzles." },
      { step: "", detail: "Managed all aspects of development including design, programming, and art direction." },
      { step: "", detail: "Analyzed player feedback and game metrics to refine gameplay and improve storytelling and environment design." },
    ],
    responsibilities: [
      "Led a team of 4 in designing core gameplay mechanics and puzzles.",
      "Created all 3D art assets including characters, environments, and props."
    ]
  },
  {
    id: "Party Roulette",
    category: "published",
    title: "Party Roulette",
    role: "Team Leader & Programmer",
    description: "2D puzzle-platformer featuring a movement-based gravity gun that alters object orientation.",
    media: "/game footage/Zero-G_Trailer.mp4",
    type: "video",
    thumbnail: "/thumbnails/zero-g-thumb.png",
    storeType: "itch",
    storeUrl: "https://oneaction.itch.io/partyroulitte",
    art: "/art/zero-g-art.png",
    backdrop: "/images/LittleWoodyArt.png",
    images: ["/art/sketch1.png", "/art/sketch4.png"],
    process: [
      { step: "Mechanic Design", detail: "Programmed a complex gravity gun mechanic that changes physics based on movement." },
      { step: "Structure", detail: "Managed code structure and team leadership for a high-performing academic project." }
    ],
    stats: [
      { label: "Engine", value: "Unity / C#" },
      { label: "Team Size", value: "Solo Project" },
      { label: "Status", value: "Self-Published" },
      { label: "Platform", value: "Mobile / iOS & Android" }
    ],
    longDescription: `Aqua Rush is a 2D auto-runner mobile game where players control a water droplet navigating through an endless, 
    procedurally generated environment. The core gameplay loop focuses on quick reflexes and strategic use of power-ups to survive as 
    long as possible while collecting points. \n\nAs the sole developer, I was responsible for every aspect of the game's creation, 
    from initial concept and design to programming, art creation, and deployment. This project allowed me to explore the full lifecycle 
    of game development and hone my skills in both technical and creative domains.`,
    progressGallery: [
      { url: "/images/AquaRush_Sketch1.jpg", caption: "Initial Concept Sketch: Visualizing the core gameplay loop and art style." },
      { url: "/images/AquaRush_Prototype.jpg", caption: "Early Prototype: Implementing basic mechanics and procedural generation." },
      { url: "/images/AquaRush_Final.jpg", caption: "Final Version: Polished art and refined gameplay for release." }
    ],
    responsibilities: [
      "Led a team of 5 in designing and implementing core gameplay mechanics.",
      "Programmed the gravity gun mechanic and ensured smooth physics interactions."
    ]
  }
];