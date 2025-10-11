"use client";

import FillButton from "@/components/FillButton/FillButton";
import Link from "next/link";
import React from "react";
import Footer from "@/components/Footer/Footer";
import { projects } from "../../projects";
import ParagraphEyebrow from "@/components/ParagraphEyebrow";
import InstaDim from "@/components/ImageComponents/InstaDim";
import VideoDim from "@/components/ImageComponents/VideoDim";

export default function LostInSpace() {
  const project = projects[0]; // lost in space project

  const isVideo = (link) => {
    
    return link.includes(".mp4") || link.includes(".webm") || link.includes(".mov");
  };

  return (
    <div className='h-full w-full margin-top'>
      <div className='margin-bottom w-full flex justify-between'>
        <div className='flex flex-col'>
          <div className='h1'>{project.title}</div>
          <div className='h1 text-[#838383]'>
            {project.description}
          </div>
        </div>
        <div className='h1'>({project.year})</div>
      </div>
      <div className='pb-[34px] grid grid-cols-12 w-full h-full'>
        <VideoDim
          colSpan={12}
          imgLink={project.mainImgOrVideo}
          videoLink={project.mainImgOrVideo}
        />
      </div>
      <ParagraphEyebrow
        eyebrowText={"Overview"}
        mainText={
          "We partnered with From The Farm to refresh their brand digitally and visually. We built a custom Shopify site with vintage-inspired design and created realistic 3D packaging renderings, uniting charm and function to connect authentically with customers."
        }
        buttonText={"View Live Site"}
        targetBlank={true}
        buttonLink={project.liveSiteUrl}
      />

      <div className='grid h-full grid-cols-12 gap-[14px]'>
        <VideoDim
          colSpan={12}
          imgLink={project.images[0]}
          videoLink={null}
        />
        <InstaDim
          colSpan={4}
          imgLink={project.images[1]}
          videoLink={null}
        />
        <InstaDim
          colSpan={8}
          imgLink={project.images[2]}
          videoLink={null}
        />
        <VideoDim
          colSpan={12}
          imgLink={project.images[3]}
          videoLink={null}
        />
      </div>

      <ParagraphEyebrow
        eyebrowText={"Overview"}
        mainText={
          "We partnered with From The Farm to refresh their brand digitally and visually. We built a custom Shopify site with vintage-inspired design and created realistic 3D packaging renderings, uniting charm and function to connect authentically with customers."
        }
      />

      <div className='grid h-full grid-cols-12 gap-[14px]'>
        <VideoDim
          colSpan={12}
          imgLink={project.images[4]}
          videoLink={null}
        />
        <InstaDim
          colSpan={8}
          imgLink={project.images[5]}
          videoLink={null}
        />
        <InstaDim
          colSpan={4}
          imgLink={project.images[6]}
          videoLink={null}
        />
        <VideoDim
          colSpan={12}
          imgLink={project.images[7]}
          videoLink={null}
        />
      </div>

      <Footer />
    </div>
  );
}
