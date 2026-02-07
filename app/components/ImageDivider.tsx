import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "~/projects";

export default function ImageDivider({ project, id }: { project: Project; id?: string }) {
  const containerRef = useRef(null);

  // 1. Track scroll progress specifically for this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 2. The Parallax Offset
  // Instead of percentages, we can use pixel values for "Separated" movement.
  // This moves the image 150px up and down relative to its center.
  const y = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  const alignmentClasses = project.artAlignment === 'left' 
    ? "justify-start px-10 md:px-32" 
    : "justify-center";

  return (
    <div 
      id={id} 
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-12 transition-opacity duration-1000 scroll-mt-40"
    >
      {/* 
          WINDOW (The Container)
          Change this 'h' value to make the window bigger/smaller.
          It will NOT affect the image's internal size.
      */}
      <div 
        ref={containerRef}
        className="relative h-[400px] w-full overflow-hidden border-y border-cozy-brown/20 bg-cozy-dark flex items-center"
      >
        
        {/* 
            PARALLAX IMAGE (The Content)
            - We give the motion div a fixed, much larger height (e.g., 800px).
            - This is now independent of the 400px window.
        */}
        <motion.div 
          style={{ y }} 
          className="absolute inset-x-0 w-full h-auto flex items-center justify-center pointer-events-none"
        >
          <img 
            src={project.backdrop || project.art} 
            className="w-full h-full object-cover grayscale-[20%]" 
            alt="parallax background"
          />
          
          {/* VIGNETTE BLUR: Softens the top/bottom edges inside the window */}
          <div className="absolute inset-0 bg-gradient-to-b from-cozy-gray via-transparent to-cozy-gray opacity-20" />
        </motion.div>

        </div>

      </div>
  );
}