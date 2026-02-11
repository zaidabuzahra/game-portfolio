import DialogueManager from "./Code/DialogueManager.cs?raw";
import Dialogue from "./Code/Dialogue.cs?raw";

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
  responsibilities?: string[];
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
    images: ["/images/LittleWoody-1.jpg", "/images/LittleWoody-2.jpg", "/images/LittleWoody-3.jpg", "/images/LittleWoody-4.jpg", "/images/LittleWoody-5.png", "/images/LittleWoody-6.png", "/images/LittleWoody-7.jpg"],
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
      { label: "Engine", value: "Unreal Engine 5" },
      { label: "Team Size", value: "7 Members" },
      { label: "Status", value: "Professional Project" },
      { label: "Platform", value: "PC / Steam" }
    ],

    // LONG DESCRIPTION (For the Detail Page Technical Overview)
    longDescription: 
    `
    Little Woody is a cute 2D point-and-click exploration-heavy puzzle game where the environment acts as both the narrator and the obstacle.
     My work centered on ensuring that players couldn't solve puzzles through trial and error; instead, they are required to decipher 
     narrative cues hidden within the world. 
     
     \n\n!I focused heavily on the bridge between narrative design and system architecture, 
     creating a documentation pipeline that allowed our art team to build complex, shifting assets that remained functionally aligned 
     with the game's logic. This involved writing detailed GDDs that specified not only the puzzle mechanics but also the narrative 
     beats and how they should be visually represented, ensuring a cohesive player experience with aligned story and gameplay progression.
     
     \n\n!You can find a snippet of the GDD and the documentation for the demo's puzzles in the "Documentation" section below, which includes the narrative 
     cues and the intended player experience for each puzzle.
     
     \n\n!The point-and-click genre is relatively niche, so I wanted to push the boundaries of what players expect from it 
     by integrating more dynamic environmental storytelling and mechanics that require players to engage with the narrative on a 
     deeper level to progress, rather than relying on traditional inventory-based puzzles. 
     \n\nTo achieve this, I shifted the game mechanics     towards meeting new characters, each giving the player new abilities 
     that interact with the environment in unique ways, creating a 
     layered puzzle design that evolves as the player progresses through the story. This approach supported the game's cuteness design 
     pillar by introducing charming characters and funny interactions.
     \n\n!One of the challenges I faced was ensuring that the puzzles were intuitive and that players could make logical 
     connections between the narrative clues and the mechanics. To address this, I implemented a system of visual and environmental 
     cues that subtly guided players towards the solutions without breaking immersion or making the puzzles feel hand-holdy. 
     This involved close collaboration with the story, art, and sound teams to ensure the delivery of an immersive and fun experience.
     \n\nA good example would be the "Lubrication Puzzle" from the demo. In this room, the player needs to assemble a mechanical arm 
     to use throughout the game to open locks and interact with the environment. To get the arm, they have to manufacture 3 pieces separately
     by fusing them with a dectated formula of oil mixture that they can learn about by reading a chart on the wall. 
     \n\n
     \n\n!Early testers struggled with this puzzle for a number of reasons:
      \n\n!1. They were unaware of what their goal is in here.
      \n\n!2. They got confused by the functionality of the tank in the backroom. This distracted them from the actual solution and caused 
      consfusion, and ultimately, frustration with this puzzle.
      \n\n!3. Clicking the activation button without the correct mixture would cause the machine to break down, which was a frustrating experience 
      for players who didn't understand the mechanics yet.
      \n\n!To address the feedback, I made a number of changes to the art and interaction logic:
      \n\n!1. I built a need for a mechanical arm in a previous room to unlock a door. In addition, I placed posters on the wall
      to support the identity of the arm and its function, which made the player's goal in the lubrication room clearer.
      \n\n!2. I fixed colors and oil icons to be consistent across the chart, the pieces, and the tank. I also redesigned the tank and how the player
      interacts with it to a single point where all functionality is accessible. This made the function of the tank clearer and removed 
      confusion.
      \n\n!3. I made it so that clicking the activation button would activate the machine regardless of the formula they inserted. Then, if the formula was incorrect, 
      the claw machine would recycle the piece, hinting that they made a mistake with the formula. This way, I made the environment teach the player the mechanics 
      through interaction, rather than punishing them for not understanding it yet.
      \n\nAnd here is the final look after the adjustments:\n\n
      \n\n!These adjustments significantly improved player comprehension and reduced frustration, leading to a much more enjoyable 
      experience with the puzzle while still maintaining its challenge and depth... 
      \n\n!While I am at it, let me explain the reasoning behind the optional design of the tank functionality. In case you didn't try out the demo,
      finding the correct values to lock the tank filters at are completely optional and the puzzle can be solved by refilling the tank for 
      each piece. Figuring out the correct values, on the other hand, allows you to complete the puzzle in one go.
      I left a room for this optional functionality because I wanted to challenge and reward players that love and are used to this genre,
      while not punishing players who are still adjusting to the game's style and driving them away from the game this early on.
      \n\n!Overall, Little Woody was a rewarding project that allowed me to explore the intersection of narrative and mechanics in a way 
      that felt fresh and engaging for players, while also pushing the boundaries of the point-and-click genre. Innovating within a niche 
      genre was a unique challenge that required creative problem-solving and A LOT of research and learning uncomfortable facts about
       bugs and plants, but it ultimately resulted in a game that I'm proud of and that offers a fun and cute experience for players.
     `,

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
        detail: "Systematically analyzed player feedback to execute design iterations, significantly improving the game's experience and difficulty curve." 
      },
      { 
        step: "Market & Community Strategy", 
        detail: "Led the project's market positioning and community management on Reddit; represented the title at local industry conferences and regional showcases." 
      }
    ],

    // PROGRESS GALLERY (For the Detail Page Static Gallery)
    progressGallery: [
      { url: "/images/LittleWoodyArt.png", caption: "Art Integration: Final environmental polish with functional markers." },
      { url: "/LittleWoodyCaseStudy/BB.gif", caption: "A character that enables the player to push heavy objects" },
      { url: "/LittleWoodyCaseStudy/Env_Lubrication Room_V2.png", caption: "First iteration of the lubrication room design." },
      { url: "/LittleWoodyCaseStudy/Env_Lubrication Room_BackLayer_V2.png", caption: "Support back layer containing the tank and resources." },
      { url: "/LittleWoodyCaseStudy/Env_Lubrication_Final.png", caption: "Final iteration of the lubrication room design after player feedback." },
      { url: "/LittleWoodyCaseStudy/Env_Lubrication_BackLayer_Final.png", caption: "Final iteration of the back layer with added visual cues." },
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
      { label: "Platform", value: "Mobile / Android" }
    ],
    longDescription: `!Aqua Rush is a 2D auto-runner mobile game where players control a water droplet navigating through an endless, 
    procedurally generated environment. The core gameplay loop focuses on quick reflexes and strategic use of power-ups to survive as 
    long as possible while collecting points.
    
    \n\n!As the sole developer, I was responsible for every aspect of the game's creation, 
    from initial concept and design to programming, art creation, and deployment. This project allowed me to explore the full lifecycle 
    of game development and hone my skills in both technical and creative domains.

    \n\n!This game was an educational project for me to experience the full cycle of game publishing, so I focused on 
    learning and executing every step of the process, including market research, concept ideation, prototyping, development, 
    testing, and finally publishing on the Google Play Store. Through this project, I gained valuable insights into the 
    mobile game market and the challenges of self-publishing, which has informed my approach to future projects and collaborations 
    in the industry.
    
    \n\nWith that being said, this hasn't stopped me from trying to make the game fun and innovate on the genre. I added a survival 
    feature where the player has to manage risk by collecting water droplets that exist on tough platforms to survive longer, which 
    adds a layer of strategy to the traditional auto-runner gameplay.
    `,
    progressGallery: [
      { url: "/AquaRushCaseStudy/SurvivalFeature.gif", caption: "Platforming to access bubbles for survival." },
    ],
    process: [
      { step: "", detail: "Programmed gameplay mechanics and logic in C# for Unity." },
      { step: "", detail: "Integrated a survival feature for the player to manage risk and reward." },
      { step: "", detail: "Designed and created all game assets including characters and environments." },
      { step: "", detail: "Managed the entire publishing process on the Google Play Store and implemented advertisement integration." },
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
    images: ["/images/WVWL-1.png", "/images/WVWL-2.png", "/images/WVWL-3.png", "/images/WVWL-4.png", "/images/WVWL-5.png"],
    documents: [
      { 
        title: "Where Vines Whisper Lies GDD",
        url: "/pdfs/WhereVinesWhisperLies GDD.pdf",
        category: "Design",
      }
    ],

    stats: [
      { label: "Engine", value: "Unity / C#" },
      { label: "Team Size", value: "4 Members" },
      { label: "Status", value: "Self-Published" },
      { label: "Platform", value: "PC / Itch.io" }
    ],
    longDescription: 
    `!Where Vines Whisper Lies is a 3D adventure game about a loop of two delusional scientists trying to complete 
    their world-changing research that is doomed to fail. The game is designed to be an atmospheric and engaging experience, with a focus on 
     exploration and storytelling. The game was developed as a year-long project for my Game Design graduation project, where we had to 
     design and develop a game from scratch in a team of 4.
    \n\n!As the team leader, developer, game designer, and environment designer, I was responsible for overseeing the development process, 
    ensuring that the team stayed on track and that our vision for the game was realized. To manage that, I created and maintained a 
    detailed GDD that outlined the game's mechanics, story direction, and art direction, which served as a central reference for the team 
    throughout development. You can find the GDD in the "Documentation" section below.
    \n\n!I took on full programming responsibilities, implementing core gameplay mechanics and controllers. 
    One of the challenges I faced was ensuring that the dialogue system was flexible enough to accommodate the branching storylines 
    and multiple dialogue options, while also being easy for our writers to use. To address this, I created a custom dialogue manager that 
    allowed writers to create and manage dialogue trees using ScriptableObjects, which provided a user-friendly interface for creating 
    complex dialogues without needing to modify code. This system also allowed for easy integration of voice acting and animations, 
    which enhanced the overall player experience.
    \n\n?Dialogue Manager
    \n\n?Dialogue ScriptableObject 
    \n\n!
    \n\nI was also responsible for the environment design, I worked closely with our art team to create immersive and atmospheric 
    environments that supported the narrative and gameplay. I utilized Unity's lighting and post-processing tools to create a moody 
    and atmospheric aesthetic that complemented the game's themes of delusion and obsession.
    \n\n
     
     \n\n!I analyzed player feedback and game metrics to refine the gameplay and improve the storytelling through environment 
     design and dialogue. Originally, we had a lot of feedback about players struggling to understand or care about the game's story and narrative,
     which led to frustration and disengagement. To address this, I made a number of adjustments to the game's design and narrative delivery:
     \n\n!1. I reworked the game's opening sequence to provide a clearer introduction to the characters and their motivations, which helped players connect with the story from the beginning.
     \n\n!2. I helped rewrite the dialogue to be more concise and impactful, focusing on key narrative beats and character development to keep players engaged and invested in the story.
     \n\n!3. I redesigned the environments to better support the narrative and provide more visual storytelling cues, which helped players understand the story through exploration and environmental details.
     \n\n!4. I redesigned the puzzles and mechanics to be more tied to the narrative and character development, which made the gameplay feel more meaningful and connected to the story.
     \n\n!These adjustments significantly improved player engagement and understanding of the game's narrative, leading to a much more enjoyable and immersive experience overall.
     \n\n!Where Vines Whisper Lies was my opporunity to design a narrative-driven game from the ground up. As someone who takes Uncharted
     as their favorite game of all time, I wanted to create a game that had a strong narrative focus and that allowed players to engage 
     with the story in a meaningful way. Working on this project taught me a lot about the challenges of creating a narrative-driven game,
      and how to design mechanics and environments that support and enhance the storytelling, while listing to player feedback and 
      iterating on the design to create a more engaging and immersive experience.
    
    `,
    progressGallery: [
      { url: "/WVWLCaseStudy/BeforeWVWL.jpeg", caption: "Early level blockout" },
      { url: "/WVWLCaseStudy/AfterWVWL.jpeg", caption: "Final level design with art and lighting" },
    ],

    process: [
      { step: "", detail: "Led a team of 4 in designing and developing the game over a full academic year, managing tasks, timelines, team alignment, and documentation." },
      { step: "", detail: "Designed and implemented gun switching mechanics by managing animations and logic states to switch gun functionality and interaction." },
      { step: "", detail: "Implemented an interactive dialogue system with branching storylines and multiple dialogue options by creating a custom dialogue manager and UI system." },
      { step: "", detail: "Analyzed player feedback and game metrics to refine gameplay and improve storytelling through environment design and dialogue." },
    ],
    responsibilities: [
      DialogueManager,
      Dialogue
    ]
  },
  {
    id: "Party Roulette",
    category: "published",
    title: "Party Roulette",
    role: "Team Leader & Programmer",
    description: "Party Roulette is a turn-based party game. Developed in a game jam, you and your friends play Russian roulette with a twist. Instead of having one chance to die, players choose cards each round to alter the chances.",
    media: "/game footage/PartyRouletteVideo.mp4",
    type: "video",
    thumbnail: "/images/PartyRouletteArt.png",
    storeType: "itch",
    storeUrl: "https://oneaction.itch.io/partyroulitte",
    art: "/images/PartyRouletteArt.png",
    backdrop: "/images/PartyRouletteArt.png",
    images: ["/images/PartyRoulette-1.png", "/images/PartyRoulette-2.png", "/images/PartyRoulette-3.png", "/images/PartyRoulette-4.png"],
    process: [
      { step: "", detail: "Led a team of 4 in designing and developing the game during a 48-hour game jam with the theme 'One Chance'." },
      { step: "", detail: "Implemented and programmed the core game mechanics and developed a custom structure for creating new cards and abiliies." },
      { step: "", detail: "Used DOTween library for smooth animations and transitions for card interactions and camera transitions." }
    ],
    stats: [
      { label: "Engine", value: "Unity / C#" },
      { label: "Team Size", value: "4 Members" },
      { label: "Status", value: "Self-Published" },
      { label: "Platform", value: "PC / Itch.io" }
    ],
    longDescription: `!Party Roulette is a turn-based party game where players play a version of Russian roulette where the number of bullets
    are decided each round. Instead of having just one chance to die, players choose from a variety of cards each round that can alter their
     chances of survival, or even mess with other players' chances. The game is designed to be a fun and social experience, with a focus 
     on player interaction and strategic decision-making.
     \n\n!As the team leader and programmer, I was responsible for overseeing the development process, ensuring that the team stayed on 
     track and that our vision for the game was realized. I also took on the programming responsibilities, implementing the core game 
     mechanics and developing a custom structure for creating new cards and abilities. This involved designing a flexible card system 
     that allowed for a wide variety of effects and interactions, as well as implementing smooth animations and transitions using the 
     DOTween library to enhance the player experience.
     \n\n!The game was developed during a 48-hour game jam with the theme 'One Chance', which provided a unique challenge in terms of 
     time management and rapid prototyping. We were able to create a polished and enjoyable game that has been well-received by other
     developers in that community. The experience taught me valuable lessons about teamwork, rapid iteration, and creative problem-solving 
     under pressure, which I have carried forward into subsequent projects.`,
    progressGallery: [
      { url: "/images/AquaRush_Sketch1.jpg", caption: "Initial Concept Sketch: Visualizing the core gameplay loop and art style." },
    ],
    responsibilities: [
      "Led a team of 4 in designing and implementing core gameplay mechanics."
    ]
  },
  {
    id: "Demo",
    category: "demo",
    title: "4 Squares",
    role: "Solo Developer",
    description: `A prototype for a 2D platformer game where players can switch between four different colors, each with unique abilities
    and interactions with the environment. The player can change colors at anytime, creating a dynamic control and feel.`,
    media: "https://youtu.be/fRgd-K5in9g?si=7rlJlkup-RtQ0fM-",
    type: "video",
    thumbnail: "/images/WhereVinesWhisperLiesArt.png",
    art: "/images/WhereVinesWhisperLiesArt.png",
    backdrop: "/images/WhereVinesWhisperLiesArt.png",
    images: [],
    process: [
      { step: "", detail: `Designed and implemented platforming mechanics to create a dynamic movement controller based on speed and momentum.` },
      { step: "", detail: "Implemented an art style that delivers a cohesive game theme with a relaxing tone." },
      { step: "", detail: "Managed level props and level design that changes with the form chosen by the player." }
    ],
    stats: [
      { label: "Engine", value: "Unity / C#" },
      { label: "Team Size", value: "Solo Project" },
      { label: "Status", value: "Self-Published" },
      { label: "Platform", value: "PC / Windows" }
    ],
    longDescription: ``,
    progressGallery: []
  },
  {
    id: "Demo",
    category: "demo",
    title: "RTS Prototype",
    role: "Solo Developer",
    description: `A prototype for a real-time strategy game where players control a group of units to gather resources, build structures,
     and defeat enemies. The game features a resource management system where players must balance their economy while also managing 
     their army.`,
    media: "https://youtu.be/vjiGHNq4Msw?si=4ujGu36vw5ixEb-7",
    type: "video",
    thumbnail: "/images/WhereVinesWhisperLiesArt.png",
    art: "/images/WhereVinesWhisperLiesArt.png",
    backdrop: "/images/WhereVinesWhisperLiesArt.png",
    images: [],
    process: [
      { step: "", detail: "Designed and implemented RTS mechanics and controls like building structures, employing troops, and mouse-based controls." },
      { step: "", detail: "Implemented AI logic and pathfinding algorithms using Unity's NavMesh system." },
      { step: "", detail: "Designed and implemented a skill tree system that allows players to upgrade troops." }
    ],
    stats: [
      { label: "Engine", value: "Unity / C#" },
      { label: "Team Size", value: "Solo Project" },
      { label: "Status", value: "Self-Published" },
      { label: "Platform", value: "PC / Windows & macOS" }
    ],
    longDescription: ``,
    progressGallery: []
  }
];