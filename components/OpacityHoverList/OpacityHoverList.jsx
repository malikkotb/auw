"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { staggerVariants } from "@/utils/animations";
import { useRouter } from "next/navigation";
import { useRouterTransition } from "@/contexts/TransitionContext";

export default function OpacityHoverList({ projects }) {
  const [hoveredId, setHoveredId] = useState(null);

  // Get the currently hovered project
  const hoveredProject = projects.find(
    (project) => project._id === hoveredId
  );
  // console.log("hoveredProject", hoveredProject?.videoUrl);

  const router = useRouter();
  const [, startRouteTransition] = useRouterTransition();

  return (
    <motion.div
      className='relative min-h-[70vh] flex flex-col w-full'
      variants={staggerVariants.container}
      initial='initial'
      whileInView='whileInView'
      viewport={{ once: true, margin: "-50px" }}
    >
      {projects.map((project) => (
        <motion.button
          key={project._id}
          variants={staggerVariants.item}
          onClick={() => {
            if (project.isNotAvailable) {
              if (project.projectStatus === "coming-soon") {
                return;
              } else {
                window.open(project.projectUrl, "_blank");
              }
            } else {
              startRouteTransition(
                () => {
                  router.push(
                    `/${project.title.toLowerCase().replace(/\s+/g, "-")}`
                  );
                },
                `/${project.title.toLowerCase().replace(/\s+/g, "-")}`
              );
            }
          }}
          onMouseEnter={() => {
            console.log("MouseEnter triggered", project._id);
            setHoveredId(project._id);
          }}
          onMouseLeave={() => {
            console.log("MouseLeave triggered", project._id);
            setHoveredId(null);
          }}
          className={`flex h1 ${project.projectStatus === "coming-soon" ? "cursor-not-allowed" : "cursor-pointer"} relative w-full justify-between border-b pt-2 pb-1 border-black ${
            projects.indexOf(project) === 0 ? "border-t" : ""
          }`}
          style={{
            backgroundColor:
              hoveredId === project._id ? "black" : "transparent",
            transition:
              hoveredId === project._id
                ? "none"
                : "background-color 1s ease-out",
          }}
        >
          <div
            className='uppercase'
            style={{
              color: hoveredId === project._id ? "white" : "black",
              transition: "none",
            }}
          >
            {project.title}
          </div>
          <div
            className='uppercase md:block hidden pt-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            style={{
              color: hoveredId === project._id ? "white" : "black",
              transition: "none",
            }}
          >
            {project.description}
          </div>
          <div
            className='uppercase'
            style={{
              color: hoveredId === project._id ? "white" : "black",
              transition: "none",
            }}
          >
            ({project.year})
          </div>
        </motion.button>
      ))}
      {/* Pinned image in bottom right corner */}
      <div
        className='fixed hidden lg:flex bottom-[14px] right-[14px] aspect-video max-w-[400px] z-50 pointer-events-none'
        style={{
          opacity: hoveredId && hoveredProject ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          visibility: hoveredId && hoveredProject ? "visible" : "hidden",
        }}
      >
        {hoveredProject && (
          <div className='relative w-full h-full overflow-hidden'>
            {hoveredProject.videoUrl ? (
              <video
                key={hoveredProject._id}
                src={hoveredProject.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                preload='auto'
                className='w-full h-full object-cover'
              />
            ) : (
              <img
                key={hoveredProject._id}
                src={hoveredProject.imageUrl}
                alt={hoveredProject.title}
                className='w-full h-full object-cover'
              />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
