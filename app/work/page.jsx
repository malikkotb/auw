"use client";

import Footer from "@/components/Footer/Footer";
import HoverList from "@/components/HoverList/HoverList";
import { useState } from "react";
import { projects } from "../projects";

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
                    src={project.mainImgOrVideo}
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
      <Footer />
    </div>
  );
}
