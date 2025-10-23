"use client";

import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useRef } from "react";
import VideoDim from "@/components/ImageComponents/VideoDim";
import InstaDim from "@/components/ImageComponents/InstaDim";
import ParagraphEyebrow from "@/components/ParagraphEyebrow";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pageAnimation } from "@/utils/pageAnimation";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectClient({
  project,
  featuredMediaUrl,
  mediaGallery,
  nextProjectMediaUrl,
}) {
  const router = useTransitionRouter();
  const nextProjectRef = useRef(null);

  //   useEffect(() => {
  //     if (project.nextProjectLink && nextProjectRef.current) {
  //       const scrollTrigger = ScrollTrigger.create({
  //         trigger: nextProjectRef.current,
  //         start: "bottom bottom",
  //         end: "bottom bottom",
  //         markers: true, // Show markers for debugging
  //         onEnter: () => {
  //           // Navigate to the next project
  //           console.log("next project");
  //           router.push(`/${project.nextProjectLink}`, {
  //             onTransitionReady: pageAnimation,
  //           });
  //         },
  //       });

  //       // Cleanup function
  //       return () => {
  //         scrollTrigger.kill();
  //       };
  //     }
  //   }, [project.nextProjectLink, router]);

  // Helper function to check if a URL is a video
  const isVideoUrl = (url) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".webm", ".mov"];
    return videoExtensions.some((ext) =>
      url.toLowerCase().endsWith(ext)
    );
  };

  // Helper function to get aspect ratio class
  const getAspectRatioClass = (dimension) => {
    switch (dimension) {
      case "instagram":
        return "aspect-[4/5]";
      case "video":
        return "aspect-video";
      default:
        return "aspect-video";
    }
  };

  return (
    <main className='h-full w-full'>
      <div className='flex flex-col h-[calc(100vh-28px)] desktop:h-auto desktop:min-h-screen'>
        <div className='h1 text-26 items-center desktop:items-start flex justify-between h-full xl:mb-[120px] xl:mt-[120px]'>
          <div className='flex flex-col'>
            <div className='h1'>{project.title}</div>
            <div className='h1 text-[#838383]'>
              {project.description}
            </div>
          </div>
          <div className='h1'>({project.year})</div>
        </div>
        <div className='w-full grid grid-cols-12 desktop:h-full h-fit overflow-clip'>
          <VideoDim
            colSpan={12}
            imgLink={featuredMediaUrl}
            videoLink={
              isVideoUrl(featuredMediaUrl) ? featuredMediaUrl : null
            }
          />
        </div>
      </div>

      <ParagraphEyebrow
        eyebrowText={"Overview"}
        mainText={project.overview}
        buttonText={"View Live Site"}
        targetBlank={true}
        buttonLink={project.projectUrl}
      />

      <div className='grid grid-cols-12 gap-[14px]'>
        {mediaGallery && mediaGallery[0] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[0]}
            videoLink={
              isVideoUrl(mediaGallery[0]) ? mediaGallery[0] : null
            }
          />
        )}
        {mediaGallery && mediaGallery[1] && (
          <InstaDim
            colSpan={4}
            imgLink={mediaGallery[1]}
            videoLink={
              isVideoUrl(mediaGallery[1]) ? mediaGallery[1] : null
            }
          />
        )}
        {mediaGallery && mediaGallery[2] && (
          <InstaDim
            colSpan={8}
            imgLink={mediaGallery[2]}
            videoLink={
              isVideoUrl(mediaGallery[2]) ? mediaGallery[2] : null
            }
          />
        )}
        {mediaGallery && mediaGallery[3] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[3]}
            videoLink={
              isVideoUrl(mediaGallery[3]) ? mediaGallery[3] : null
            }
          />
        )}
      </div>

      <ParagraphEyebrow
        eyebrowText={"Project Details"}
        mainText={project.textFieldTwo}
      />

      <div className='grid h-full grid-cols-12 gap-[14px]'>
        {mediaGallery && mediaGallery[4] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[4]}
            videoLink={
              isVideoUrl(mediaGallery[4]) ? mediaGallery[4] : null
            }
          />
        )}
        {mediaGallery && mediaGallery[5] && (
          <InstaDim
            colSpan={8}
            imgLink={mediaGallery[5]}
            videoLink={
              isVideoUrl(mediaGallery[5]) ? mediaGallery[5] : null
            }
          />
        )}
        {mediaGallery && mediaGallery[6] && (
          <InstaDim
            colSpan={4}
            imgLink={mediaGallery[6]}
            videoLink={
              isVideoUrl(mediaGallery[6]) ? mediaGallery[6] : null
            }
          />
        )}
        {mediaGallery && mediaGallery[7] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[7]}
            videoLink={
              isVideoUrl(mediaGallery[7]) ? mediaGallery[7] : null
            }
          />
        )}
      </div>

      <ParagraphEyebrow
        eyebrowText={"Additional Information"}
        mainText={project.textFieldThree}
      />

      <div className='grid h-full grid-cols-12 gap-[14px]'>
        {mediaGallery && mediaGallery[8] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[8]}
            videoLink={
              isVideoUrl(mediaGallery[8]) ? mediaGallery[8] : null
            }
          />
        )}
        {mediaGallery && mediaGallery[10] && (
          <InstaDim
            colSpan={4}
            imgLink={mediaGallery[10]}
            videoLink={
              isVideoUrl(mediaGallery[10]) ? mediaGallery[10] : null
            }
          />
        )}
        {mediaGallery && mediaGallery[9] && (
          <InstaDim
            colSpan={8}
            imgLink={mediaGallery[9]}
            videoLink={
              isVideoUrl(mediaGallery[9]) ? mediaGallery[9] : null
            }
          />
        )}
        {mediaGallery && mediaGallery[11] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[11]}
            videoLink={
              isVideoUrl(mediaGallery[11]) ? mediaGallery[11] : null
            }
          />
        )}
      </div>

      {/* Next Project */}
      <div className='margin-bottom margin-top h-full w-full flex justify-between'>
        <div className='flex flex-col'>
          <div className='h1'>{project.nextProjectTitle}</div>
          <div className='h1 text-[#838383]'>
            {project.nextProjectDescription}
          </div>
        </div>
        <div className='h1'>({project.nextProjectYear})</div>
        <Link
          href={`/${project.nextProjectLink}`}
          onClick={(e) => {
            e.preventDefault();

            router.push(`/${project.nextProjectLink}`, {
              onTransitionReady: pageAnimation,
              //   scroll: false, // Prevent automatic scroll to top
            });
          }}
          className='cursor-pointer'
        >
          <div className='h1'>View Next Project</div>
        </Link>
      </div>

      <div className='grid grid-cols-12 gap-[14px]'>
        <div className='col-span-12' ref={nextProjectRef}>
          <VideoDim
            colSpan={12}
            imgLink={nextProjectMediaUrl}
            videoLink={
              isVideoUrl(nextProjectMediaUrl)
                ? nextProjectMediaUrl
                : null
            }
          />
        </div>
      </div>
    </main>
  );
}
