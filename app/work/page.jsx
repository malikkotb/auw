"use client";

import Footer from "@/components/Footer/Footer";
import OpacityHoverList from "@/components/OpacityHoverList/OpacityHoverList";
import { useState } from "react";
import { projects } from "../projects";
import Link from "next/link";

export default function Work() {
  const [view, setView] = useState("grid");

  return (
    <div className='font-bold w-full h-full work-wrapper'>
      <div className='work-header h1 margin-top margin-bottom flex items-center justify-between'>
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
              <Link
                key={project.id}
                className='cursor-pointer'
                href={`/${project.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <div className='w-full h-full pb-1'>
                  <img
                    src={project.mainImgOrVideo}
                    alt={project.title}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex flex-col'>
                  <h3 className='uppercase h1'>{project.title}</h3>
                  <p className='text-[#626262] h1 uppercase'>
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {view === "list" && <OpacityHoverList projects={projects} />}
      <Footer />
    </div>
  );
}
