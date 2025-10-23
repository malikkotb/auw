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
            videoLink={featuredMediaUrl}
            // videoLink={
            //   isVideoUrl(featuredMediaUrl) ? featuredMediaUrl : null
            // }
          />
        </div>
      </div>

      {/*  pin aniamtion */}
      <div className='relative h-[50vh]'>
        {/* Container controls sticky duration */}
        <div className='pt-[14px] sticky top-[25%]'>
          <ParagraphEyebrow
            eyebrowText={"Overview"}
            mainText={project.overview}
            buttonText={"View Live Site"}
            targetBlank={true}
            buttonLink={project.projectUrl}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-[14px]'>
        {mediaGallery && mediaGallery[0] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[0].image || null}
            videoLink={mediaGallery[0].video || null}
          />
        )}
        {mediaGallery && mediaGallery[1] && (
          <InstaDim
            colSpan={4}
            imgLink={mediaGallery[1].image || null}
            videoLink={mediaGallery[1].video || null}
          />
        )}
        {mediaGallery && mediaGallery[2] && (
          <InstaDim
            colSpan={8}
            imgLink={mediaGallery[2].image || null}
            videoLink={mediaGallery[2].video || null}
          />
        )}
        {mediaGallery && mediaGallery[3] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[3].image || null}
            videoLink={mediaGallery[3].video || null}
          />
        )}
      </div>

      {/*  pin aniamtion */}
      <div className='relative h-[50vh]'>
        {/* Container controls sticky duration */}
        <div className='pt-[14px] sticky top-[25%]'>
          <ParagraphEyebrow
            eyebrowText={"Project Details"}
            mainText={project.textFieldTwo}
          />
        </div>
      </div>

      <div className='grid h-full grid-cols-12 gap-[14px]'>
        {mediaGallery && mediaGallery[4] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[4].image || null}
            videoLink={mediaGallery[4].video || null}
          />
        )}
        {mediaGallery && mediaGallery[5] && (
          <InstaDim
            colSpan={8}
            imgLink={mediaGallery[5].image || mediaGallery[5]}
            videoLink={mediaGallery[5].video || null}
          />
        )}
        {mediaGallery && mediaGallery[6] && (
          <InstaDim
            colSpan={4}
            imgLink={mediaGallery[6].image || null}
            videoLink={mediaGallery[6].video || null}
          />
        )}
        {mediaGallery && mediaGallery[7] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[7].image || null}
            videoLink={mediaGallery[7].video || null}
          />
        )}
      </div>

      {/*  pin aniamtion */}
      <div className='relative h-[50vh]'>
        {/* Container controls sticky duration */}
        <div className='pt-[14px] sticky top-[25%]'>
          <ParagraphEyebrow
            eyebrowText={"Additional Information"}
            mainText={project.textFieldThree}
          />
        </div>
      </div>

      <div className='grid h-full grid-cols-12 gap-[14px]'>
        {mediaGallery && mediaGallery[8] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[8].image || null}
            videoLink={mediaGallery[8].video || null}
          />
        )}
        {mediaGallery && mediaGallery[10] && (
          <InstaDim
            colSpan={4}
            imgLink={mediaGallery[10].image || null}
            videoLink={mediaGallery[10].video || null}
          />
        )}
        {mediaGallery && mediaGallery[9] && (
          <InstaDim
            colSpan={8}
            imgLink={mediaGallery[9].image || null}
            videoLink={mediaGallery[9].video || null}
          />
        )}
        {mediaGallery && mediaGallery[11] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[11].image || null}
            videoLink={mediaGallery[11].video || null}
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
            imgLink={nextProjectMediaUrl.image || null}
            videoLink={nextProjectMediaUrl.video || null}
          />
        </div>
      </div>
    </main>
  );
}
