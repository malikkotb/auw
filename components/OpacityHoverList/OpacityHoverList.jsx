import { useState } from "react";
import Link from "next/link";

export default function OpacityHoverList({ projects }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className='flex flex-col w-full border-t border-black'>
      {projects.map((project) => (
        <Link
          key={project._id}
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
    </div>
  );
}
