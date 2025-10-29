"use client";

import Footer from "@/components/Footer/Footer";
import OpacityHoverList from "@/components/OpacityHoverList/OpacityHoverList";
import { useState, useEffect, useRef } from "react";
import { pageAnimation } from "@/utils/pageAnimation";
import { fadeInUp } from "@/utils/animations";
import { motion, AnimatePresence } from "framer-motion";
import { IBM_Plex_Mono } from "next/font/google";
import Lenis from "lenis";
import { useRouterTransition } from "@/contexts/TransitionContext";
import { useRouter } from "next/navigation";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function WorkClient({ projects }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  const [view, setView] = useState("grid");
  const [hoveredId, setHoveredId] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [hoveredProjectTitle, setHoveredProjectTitle] = useState("");

  const router = useRouter();
  const [, startRouteTransition] = useRouterTransition();

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleVideoHover = (projectTitle) => {
    setShowCustomCursor(true);
    setHoveredProjectTitle(projectTitle);
  };

  const handleVideoLeave = () => {
    setShowCustomCursor(false);
    setHoveredProjectTitle("");
  };

  return (
    <div
      className='w-full h-full bg-white'
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Custom Cursor */}
      <AnimatePresence>
        {showCustomCursor && (
          <motion.div
            className={`${ibmPlexMono.className} fixed uppercase pointer-events-none rounded-full z-50 bg-black text-white whitespace-nowrap`}
            style={{
              fontSize: "12px",
              letterSpacing: "0.24px",
              lineHeight: "1.2",
              padding: "6px 10px",
              right: containerRef.current
                ? containerRef.current.offsetWidth -
                  cursorPosition.x +
                  40
                : 0,
              top: cursorPosition.y - 5,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {hoveredProjectTitle} | View Case Study
          </motion.div>
        )}
      </AnimatePresence>
      <div className='flex flex-col h-[calc(100vh-28px)] desktop:h-auto desktop:min-h-screen'>
        <motion.div
        style={{
          marginTop: "25vh",
          marginBottom: "25vh",
        }}
        //TODO: might need to remove the justify-between and find a different concept for the spacing
        
          className='h1 text-26 items-center desktop:items-start justify-between flex h-full xl:mb-[120px] xl:mt-[120px]'
          {...fadeInUp}
        >
          <div>ALL PROJECTS</div>
          <div className='flex items-center gap-3'>
            {/* Grid icon */}
            <div
              onClick={() => setView("grid")}
              className='cursor-pointer grid grid-cols-2 gap-1'
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 ${view === "grid" ? "bg-black" : "bg-gray-400"}`}
                />
              ))}
            </div>

            {/* List icon */}
            <div
              onClick={() => setView("list")}
              className='cursor-pointer flex flex-col space-y-1'
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-7 h-[4px] ${view === "list" ? "bg-black" : "bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        {view === "list" && <OpacityHoverList projects={projects} />}
        {view === "grid" && (
          <>
            {/* Desktop */}
            <motion.div
              className='hidden sm:flex w-full cursor-pointer sm:h-full aspect-video max-h-[calc(100vh-28px)] overflow-clip'
              {...fadeInUp}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2,
              }}
            >
              {projects[0].videoUrl ? (
                <video
                  src={projects[0].videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className='w-full h-full object-cover cursor-pointer'
                  onMouseEnter={() =>
                    handleVideoHover(projects[0].title)
                  }
                  onMouseLeave={handleVideoLeave}
                />
              ) : (
                <img
                  src={projects[0].imageUrl}
                  alt={projects[0].title}
                  className='w-full h-full object-cover cursor-pointer'
                  onMouseEnter={() =>
                    handleVideoHover(projects[0].title)
                  }
                  onMouseLeave={handleVideoLeave}
                />
              )}
            </motion.div>
            {/* Mobile */}
            <motion.div
              className='sm:hidden w-full cursor-pointer flex h-fit aspect-[4/5] max-h-[calc(100vh-28px)] overflow-clip'
              {...fadeInUp}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2,
              }}
            >
              {projects[0].videoUrlMobile ? (
                <video
                  src={projects[0].videoUrlMobile}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className='w-full h-full object-cover cursor-pointer'
                  onMouseEnter={() =>
                    handleVideoHover(projects[0].title)
                  }
                  onMouseLeave={handleVideoLeave}
                />
              ) : (
                <img
                  src={projects[0].imageUrlMobile}
                  alt={projects[0].title}
                  className='w-full h-full object-cover cursor-pointer'
                  onMouseEnter={() =>
                    handleVideoHover(projects[0].title)
                  }
                  onMouseLeave={handleVideoLeave}
                />
              )}
            </motion.div>
          </>
        )}
      </div>

      {view === "grid" && (
        <motion.div
          {...fadeInUp}
          viewport={{ once: false, margin: "-50px" }}
          className='pt-1 lg:hidden flex justify-between'
        >
          <div className='flex items-start flex-col'>
            <h3 className='uppercase projects-eyebrow'>
              {projects[0].title}
            </h3>
            <p className='text-[#626262] projects-eyebrow uppercase'>
              {projects[0].description}
            </p>
          </div>
        </motion.div>
      )}

      {view === "grid" && (
        <div className='pt-[14px] flex flex-col gap-[14px]'>
          <div className='flex flex-col gap-[14px]'>
            {projects.slice(1).map((project) => (
              <motion.button
                key={project._id}
                {...fadeInUp}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.2,
                }}
                className='cursor-pointer'
                onClick={() => {
                  startRouteTransition(
                    () => {
                      router.push(
                        `/${project.title.toLowerCase().replace(/\s+/g, "-")}`
                      );
                    },
                    `/${project.title.toLowerCase().replace(/\s+/g, "-")}`
                  );
                }}
              >
                {/* Desktop */}
                <motion.div
                  className='hidden sm:block w-full h-full aspect-video max-h-[calc(100vh-28px)]'
                  {...fadeInUp}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                >
                  {project.videoUrl ? (
                    <video
                      src={project.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className='w-full h-full object-cover cursor-pointer'
                      onMouseEnter={() =>
                        handleVideoHover(project.title)
                      }
                      onMouseLeave={handleVideoLeave}
                    />
                  ) : (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className='w-full h-full object-cover cursor-pointer'
                      onMouseEnter={() =>
                        handleVideoHover(project.title)
                      }
                      onMouseLeave={handleVideoLeave}
                    />
                  )}
                </motion.div>
                {/* Mobile */}
                <motion.div
                  className='sm:hidden w-full h-full aspect-[4/5] max-h-[calc(100vh-28px)]'
                  {...fadeInUp}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                >
                  {project.videoUrlMobile ? (
                    <video
                      src={project.videoUrlMobile}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className='w-full h-full object-cover cursor-pointer'
                      onMouseEnter={() =>
                        handleVideoHover(project.title)
                      }
                      onMouseLeave={handleVideoLeave}
                    />
                  ) : (
                    <img
                      src={project.imageUrlMobile}
                      alt={project.title}
                      className='w-full h-full object-cover cursor-pointer'
                      onMouseEnter={() =>
                        handleVideoHover(project.title)
                      }
                      onMouseLeave={handleVideoLeave}
                    />
                  )}
                </motion.div>

                <div className='pt-1 lg:hidden flex justify-between'>
                  <div className='flex items-start flex-col'>
                    <h3 className='uppercase projects-eyebrow'>
                      {project.title}
                    </h3>
                    <p className='text-[#626262] projects-eyebrow uppercase'>
                      {project.description}
                    </p>
                  </div>
                  {/* <div className='projects-eyebrow uppercase'>
                    <ArrowHoverText
                      isHovered={hoveredId === project._id}
                      text='View Project'
                    />
                  </div> */}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
      {/* {view === "list" && <OpacityHoverList projects={projects} />} */}
      <Footer />
    </div>
  );
}
