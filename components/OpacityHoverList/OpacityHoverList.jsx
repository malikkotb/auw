import { useState } from "react";
import Link from "next/link";
import { pageAnimation } from "@/utils/pageAnimation";
import { useTransitionRouter } from "next-view-transitions";

// Helper function to check if a URL is a video
const isVideoUrl = (url) => {
  if (!url) return false;
  const videoExtensions = [".mp4", ".webm", ".mov"];
  return videoExtensions.some((ext) =>
    url.toLowerCase().endsWith(ext)
  );
};

export default function OpacityHoverList({ projects }) {
  const [hoveredId, setHoveredId] = useState(null);
  const router = useTransitionRouter();

  // Get the currently hovered project
  const hoveredProject = projects.find(
    (project) => project._id === hoveredId
  );

  return (
    <div className='relative flex flex-col w-full border-t border-black'>
      {projects.map((project) => (
        <Link
          key={project._id}
          onClick={(e) => {
            e.preventDefault();
            router.push(
              `/${project.title.toLowerCase().replace(/\s+/g, "-")}`,
              {
                onTransitionReady: pageAnimation,
              }
            );
          }}
          href={`/${project.title
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          onMouseEnter={() => setHoveredId(project._id)}
          onMouseLeave={() => setHoveredId(null)}
          className='flex h1 cursor-pointer relative w-full justify-between border-b pt-2 pb-1 border-black'
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
        </Link>
      ))}

      {/* Pinned image in bottom right corner */}
      {hoveredProject && hoveredProject.mediaUrl && (
        <div
          className='fixed bottom-[14px] right-[14px] w-64 h-48 z-50 pointer-events-none'
          style={{
            opacity: hoveredId ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <div className='w-full h-full overflow-hidden'>
            {isVideoUrl(hoveredProject.mediaUrl) ? (
              <div className='relative w-full h-full'>
                {/* Always show image first */}
                <img
                  src={hoveredProject.mediaUrl}
                  alt={hoveredProject.title}
                  className='w-full h-full object-cover'
                />
                {/* Video loads on top when ready */}
                <video
                  key={hoveredProject._id}
                  src={hoveredProject.mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload='auto'
                  className='w-full h-full object-cover absolute top-0 left-0'
                  style={{ opacity: 0 }}
                  onLoadedData={(e) => {
                    e.target.style.opacity = "1";
                    e.target.style.transition =
                      "opacity 0.3s ease-in-out";
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <img
                src={hoveredProject.mediaUrl}
                alt={hoveredProject.title}
                className='w-full h-full object-cover'
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
