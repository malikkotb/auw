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
  const router = useTransitionRouter();
  return (
    <div className='w-full h-full bg-white'>
      <div className='flex flex-col min-h-screen'>
        <motion.div
          {...fadeInUp}
          className='h1 margin-top margin-bottom flex items-center justify-between'
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
        {view === "grid" && (
          <div className='flex flex-col gap-12'>
            <div className='flex flex-col gap-8'>
              {projects.map((project) => (
                <motion.button
                  key={project._id}
                  {...fadeInUp}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                  className='cursor-pointer'
                  onMouseEnter={() => setHoveredId(project._id)}
                  onMouseLeave={() => setHoveredId(null)}
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
                  <div className='w-full h-full pb-1 aspect-video'>
                    {isVideoUrl(project.mediaUrl) ? (
                      <video
                        src={project.mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <img
                        src={project.mediaUrl}
                        alt={project.title}
                        className='w-full h-full object-cover'
                      />
                    )}
                  </div>

                  <div className='flex justify-between'>
                    <div className='flex items-start flex-col'>
                      <h3 className='uppercase projects-eyebrow'>
                        {project.title}
                      </h3>
                      <p className='text-[#626262] projects-eyebrow uppercase'>
                        {project.description}
                      </p>
                    </div>
                    <div className='projects-eyebrow uppercase'>
                      <ArrowHoverText
                        isHovered={hoveredId === project._id}
                        text='View Project'
                      />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
        {view === "list" && <OpacityHoverList projects={projects} />}
      </div>
      <Footer />
    </div>
  );
}
