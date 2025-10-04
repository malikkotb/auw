"use client";
import Link from "next/link";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FillButton from "../FillButton/FillButton";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  //   const footerRef = useRef(null);
  const footerVideoWrapperRef = useRef(null);

  useEffect(() => {
    // Helpers to avoid AbortError
    const safePlay = (video) => {
      if (video.paused) {
        video
          .play()
          .catch((err) =>
            console.warn("Play prevented:", err.message)
          );
      }
    };

    const safePause = (video) => {
      if (!video.paused) {
        video.pause();
      }
    };

    // Play until 50%, then pause
    const playUntilHalf = (video) => {
      safePlay(video);

      const stopAtHalf = () => {
        if (
          video.duration &&
          video.currentTime >= video.duration / 2
        ) {
          safePause(video);
          video.removeEventListener("timeupdate", stopAtHalf);
        }
      };

      video.addEventListener("timeupdate", stopAtHalf);
    };

    // Grab the footer video
    const bgVideo = document.querySelector(
      ".footer-video-wrapper video"
    );

    if (bgVideo) {
      ScrollTrigger.create({
        trigger: ".footer-video-wrapper",
        start: "top 50%",
        // Scrolling down into footer → first half
        onEnter: () => {
          bgVideo.currentTime = 0; // restart from beginning
          playUntilHalf(bgVideo); // play until halfway, then pause
        },

        // Scrolling back up out of footer → second half
        onLeaveBack: () => {
          if (bgVideo.currentTime >= bgVideo.duration / 2) {
            safePlay(bgVideo);

            const stopAtEnd = () => {
              if (bgVideo.currentTime >= bgVideo.duration) {
                safePause(bgVideo);
                bgVideo.removeEventListener("timeupdate", stopAtEnd);
              }
            };

            bgVideo.addEventListener("timeupdate", stopAtEnd);
          }
        },
      });
    }
  }, []);

  return (
    <footer className='margin-top w-full h-full text-[14px]'>
      <div className='footer-header w-full h-full'>
        <div className='h-[1px] w-full bg-[#DEDEDE]'></div>
        <div className='flex flex-col gap-3 mt-5 mb-24'>
          <div className='h1'>
            Excited to see how we can collaborate.
          </div>
          <div className='w-fit'>
            <FillButton text='Book a call' />
          </div>
        </div>
        <div className='h-[1px] w-full bg-[#DEDEDE]'></div>
      </div>
      <div className='grid grid-cols-12 my-3 gap-[14px]'>
        <div className='col-span-4 flex flex-col'>
          <div className=''>A Unified Whole®</div>
          <div className='uppercase text-[#626262]'>
            A Multipurpose Design Studio
          </div>
        </div>
        <div className='col-span-3 flex flex-col'>
          <div className='uppercase text-[#626262]'>Follow Us</div>
          <div className='uppercase flex gap-2'>
            <a href='https://www.instagram.com/aunifiedwhole/'>
              Instagram
            </a>
            <a href='https://www.linkedin.com/company/aunifiedwhole/'>
              LinkedIn
            </a>
          </div>
        </div>
        <div className='col-span-3 flex flex-col'>
          <div className='uppercase text-[#626262]'>Navigation</div>
          <div className='uppercase flex gap-2'>
            <Link href='/work'>Work</Link>
            <Link href='/about'>About</Link>
            <Link href='/contact'>Contact</Link>
            <Link href='/listening-experience'>
              Listening Experience
            </Link>
          </div>
        </div>
        <div className='col-span-2 justify-end flex items-end'>
          <div className='uppercase'>Privcacy Policy</div>
        </div>
      </div>
      <div
        ref={footerVideoWrapperRef}
        className='footer-video-wrapper w-full h-fit aspect-video'
      >
        <video
          src='/images/60FPS.mp4'
          loop
          muted
          playsInline
          preload='auto'
          className='w-full h-full object-cover'
        />
      </div>
    </footer>
  );
}
