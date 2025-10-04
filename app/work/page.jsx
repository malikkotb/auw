"use client";

import HoverList from "@/components/HoverList/HoverList";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "From the Farm",
    image: "/images/ftf.png",
    description: "A2 DAIRY-FREE ICE CREAM",
    url: "https://www.fromthefarmco.com/",
    year: "2025",
  },
  {
    id: 2,
    title: "Paranano",
    image: "/images/paranano.png",
    description: "A bio-technology company",
    url: "https://www.paranano.com/",
    year: "2025",
  },
  {
    id: 3,
    title: "Good Gummies",
    image: "/images/oggg.png",
    description: "Protein, fiver, fun",
    url: "https://www.goodgummies.com/",
    year: "2025",
  },
  {
    id: 4,
    title: "Free range",
    image: "/images/free.png",
    description: "Beef tallow & botanicals in perfect harmony",
    url: "https://www.freerange.com/",
    year: "2025",
  },
];

export default function Work() {
  const [view, setView] = useState("grid");

  return (
    <div className='font-bold w-full h-full work-wrapper'>
      <div className='work-header margin-top flex items-center justify-between'>
        <div>
          ALL PROJECTS <span>(18)</span>
        </div>
        <div className='flex items-center gap-4'>
          <span
            onClick={() => setView("grid")}
            style={{
              cursor: "pointer",
            }}
            className={
              view === "grid" ? "text-black italic" : "text-[#626262]"
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
              view === "list" ? "text-black italic" : "text-[#626262]"
            }
          >
            LIST
          </span>
        </div>
      </div>
      {view === "grid" && (
        <div className='flex flex-col gap-12'>
          <div className='flex flex-col gap-8'>
            {projects.map((project) => (
              <div key={project.id} className=''>
                <div className='w-full h-full pb-1'>
                  <img
                    src={project.image}
                    alt={project.title}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex flex-col'>
                  <h3 className='uppercase'>{project.title}</h3>
                  <p className='text-[#626262] uppercase'>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {view === "list" && <HoverList projects={projects} />}
    </div>
  );
}
