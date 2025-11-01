"use client";

import { useEffect, useRef } from "react";
import VideoDim from "@/components/ImageComponents/VideoDim";
import InstaDim from "@/components/ImageComponents/InstaDim";
import ParagraphEyebrow from "@/components/ParagraphEyebrow";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "@/components/TransitionLink";
import Lenis from "lenis";
import { useRouterTransition } from "@/contexts/TransitionContext";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectClient({
  project,
  featuredMediaUrl,
  featuredMediaUrlMobile,
  mediaGallery,
  nextProjectMediaUrl,
  nextProjectMediaUrlMobile,
}) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  const nextProjectRef = useRef(null);
  const [, startRouteTransition] = useRouterTransition();
  const router = useRouter();
  useEffect(() => {
    if (project.nextProjectLink && nextProjectRef.current) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: nextProjectRef.current,
        start: "top top",
        markers: true,
        onEnter: () => {
          startRouteTransition(
            () => {
              // Ensure we scroll to the top on this specific navigation
              if (typeof window !== "undefined") {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "auto",
                });
              }
              router.push(
                `/${project.nextProjectLink.toLowerCase().replace(/\s+/g, "-")}`
              );
            },
            `/${project.nextProjectLink.toLowerCase().replace(/\s+/g, "-")}`
          );
        },
      });

      // Cleanup function
      return () => {
        scrollTrigger.kill();
      };
    }
  }, [project.nextProjectLink]);

  return (
    <main className='h-full w-full bg-white'>
      <div className='flex flex-col'>
        <div className='section-spacing h1 items-start flex justify-between h-full'>
          <div className='flex flex-col'>
            <div className='h1'>{project.title}</div>
            <div className='h1 text-[#838383]'>
              {project.description}
            </div>
          </div>
          <div className='h1'>({project.year})</div>
        </div>
        <div className='w-full grid sm:hidden grid-cols-12 desktop:h-full h-fit overflow-clip'>
          <InstaDim
            withBlurIn={true}
            viewportMargin='0px'
            colSpan={12}
            imgLink={featuredMediaUrlMobile?.image || "/images/3.png"}
            videoLink={featuredMediaUrlMobile?.video || null}
          />
        </div>
        <div className='sm:grid hidden w-full grid-cols-12 desktop:h-full h-fit overflow-clip'>
          <VideoDim
            withBlurIn={true}
            viewportMargin='0px'
            colSpan={12}
            imgLink={featuredMediaUrl?.image || null}
            videoLink={featuredMediaUrl?.video || null}
          />
        </div>
      </div>
      {/*  pin aniamtion */}
      <div className='relative h-[75vh] lg:h-[50vh]'>
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
            imgLink={mediaGallery[0]?.image || null}
            videoLink={mediaGallery[0]?.video || null}
          />
        )}
        {mediaGallery && mediaGallery[1] && (
          <InstaDim
            colSpan={4}
            imgLink={mediaGallery[1]?.image || null}
            videoLink={mediaGallery[1]?.video || null}
          />
        )}
        {mediaGallery && mediaGallery[2] && (
          <InstaDim
            colSpan={8}
            imgLink={mediaGallery[2]?.image || null}
            videoLink={mediaGallery[2]?.video || null}
          />
        )}
        {mediaGallery && mediaGallery[3] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[3]?.image || null}
            videoLink={mediaGallery[3]?.video || null}
          />
        )}
      </div>

      {/*  pin aniamtion */}
      <div className='relative h-[75vh] lg:h-[50vh]'>
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
            imgLink={mediaGallery[4]?.image || null}
            videoLink={mediaGallery[4]?.video || null}
          />
        )}
        {mediaGallery && mediaGallery[5] && (
          <InstaDim
            colSpan={8}
            imgLink={mediaGallery[5]?.image || mediaGallery[5]}
            videoLink={mediaGallery[5]?.video || null}
          />
        )}
        {mediaGallery && mediaGallery[6] && (
          <InstaDim
            colSpan={4}
            imgLink={mediaGallery[6]?.image || null}
            videoLink={mediaGallery[6]?.video || null}
          />
        )}
        {mediaGallery && mediaGallery[7] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[7]?.image || null}
            videoLink={mediaGallery[7]?.video || null}
          />
        )}
      </div>

      {/*  pin aniamtion */}
      <div className='relative h-[75vh] lg:h-[50vh]'>
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
            imgLink={mediaGallery[8]?.image || null}
            videoLink={mediaGallery[8]?.video || null}
          />
        )}
        {mediaGallery && mediaGallery[10] && (
          <InstaDim
            colSpan={4}
            imgLink={mediaGallery[10]?.image || null}
            videoLink={mediaGallery[10]?.video || null}
          />
        )}
        {mediaGallery && mediaGallery[9] && (
          <InstaDim
            colSpan={8}
            imgLink={mediaGallery[9]?.image || null}
            videoLink={mediaGallery[9]?.video || null}
          />
        )}
        {mediaGallery && mediaGallery[11] && (
          <VideoDim
            colSpan={12}
            imgLink={mediaGallery[11]?.image || null}
            videoLink={mediaGallery[11]?.video || null}
          />
        )}
      </div>

      {/* Next Project */}
      <div
        ref={nextProjectRef}
        className='padding-bottom padding-top h-full w-full flex justify-between'
      >
        <div className='flex flex-col'>
          <div className='h1'>
            {project.nextProjectTitle ?? "No title available"}
          </div>
          <div className='h1 text-[#838383]'>
            {project.nextProjectDescription ??
              "No description available"}
          </div>
        </div>
        <div className='h1'>
          ({project.nextProjectYear ?? "20XX"})
        </div>
      </div>

      <div className='grid grid-cols-12 gap-[14px]'>
        <div className='col-span-12 sm:block hidden'>
          <VideoDim
            colSpan={12}
            imgLink={nextProjectMediaUrl?.image || null}
            videoLink={nextProjectMediaUrl?.video || null}
          />
        </div>
        <div className='col-span-12 sm:hidden block'>
          <InstaDim
            colSpan={12}
            imgLink={
              nextProjectMediaUrlMobile?.image || "/images/3.png"
            }
            videoLink={nextProjectMediaUrlMobile?.video || null}
          />
        </div>
      </div>
    </main>
  );
}
