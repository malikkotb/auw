"use client";

import Footer from "@/components/Footer/Footer";
import OpacityHoverList from "@/components/OpacityHoverList/OpacityHoverList";
import { useState } from "react";
import ArrowHoverText from "@/components/ArrowHoverText/ArrowHoverText";
import { pageAnimation } from "@/utils/pageAnimation";
import { useTransitionRouter } from "next-view-transitions";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";

// Helper function to check if a URL is a video
const isVideoUrl = (url) => {
  if (!url) return false;
  const videoExtensions = [".mp4", ".webm", ".mov"];
  return videoExtensions.some((ext) =>
    url.toLowerCase().endsWith(ext)
  );
};

export default function WorkClient({ projects }) {
  const [view, setView] = useState("grid");
  const [hoveredId, setHoveredId] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [hoveredProjectTitle, setHoveredProjectTitle] = useState("");
  const router = useTransitionRouter();

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
    >
      {/* Custom Cursor */}
      {showCustomCursor && (
        <div
          className='fixed uppercase pointer-events-none rounded-full z-50 bg-black text-white px-3 pt-2 pb-1 text-sm font-medium whitespace-nowrap'
          style={{
            left: cursorPosition.x - 20,
            top: cursorPosition.y - 10,
            transform: "translateX(-100%)",
          }}
        >
          {hoveredProjectTitle} | View Case Study
        </div>
      )}
      <div className='flex flex-col h-[calc(100vh-28px)] desktop:h-auto desktop:min-h-screen'>
        <motion.div
          className='h1 text-26 items-center desktop:items-start justify-between  flex h-full xl:mb-[120px] xl:mt-[120px]'
          {...fadeInUp}
        >
          <div>
            ALL PROJECTS <span>({projects.length})</span>
          </div>
          <div className='flex items-center gap-4'>
            <span
              onClick={() => setView("grid")}
              style={{
                cursor: "pointer",
              }}
              className={
                view === "grid"
                  ? "text-black italic"
                  : "text-[#626262]"
              }
            >
              GRID
            </span>
            <span
              onClick={() => setView("list")}
              style={{
                cursor: "pointer",
              }}
              className={
                view === "list"
                  ? "text-black italic"
                  : "text-[#626262]"
              }
            >
              LIST
            </span>
          </div>
        </motion.div>
        {view === "list" && <OpacityHoverList projects={projects} />}
        {view === "grid" && (
          <motion.div
            className='w-full flex desktop:h-full h-fit aspect-video overflow-clip'
            {...fadeInUp}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            <motion.button
              key={projects[0]._id}
              {...fadeInUp}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2,
              }}
              className='cursor-pointer'
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/${projects[0].title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`,
                  {
                    onTransitionReady: pageAnimation,
                  }
                );
              }}
            >
              <div className='w-full h-full aspect-video'>
                {isVideoUrl(projects[0].mediaUrl) ? (
                  <video
                    src={projects[0].mediaUrl}
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
                    src={projects[0].mediaUrl}
                    alt={projects[0].title}
                    className='w-full h-full object-cover cursor-pointer'
                    onMouseEnter={() =>
                      handleVideoHover(projects[0].title)
                    }
                    onMouseLeave={handleVideoLeave}
                  />
                )}
              </div>
            </motion.button>
          </motion.div>
        )}
      </div>

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
                onClick={(e) => {
                  e.preventDefault();
                  router.push(
                    `/${project.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`,
                    {
                      onTransitionReady: pageAnimation,
                    }
                  );
                }}
              >
                <div className='w-full h-full aspect-video'>
                  {isVideoUrl(project.mediaUrl) ? (
                    <video
                      src={project.mediaUrl}
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
                      src={project.mediaUrl}
                      alt={project.title}
                      className='w-full h-full object-cover cursor-pointer'
                      onMouseEnter={() =>
                        handleVideoHover(project.title)
                      }
                      onMouseLeave={handleVideoLeave}
                    />
                  )}
                </div>

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
