"use client";
import Link from "next/link";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FillLink from "../FillButton/FillLink";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { pageAnimation } from "@/utils/pageAnimation";
import { motion } from "framer-motion";
import { fadeInUp, growFromLeft } from "@/utils/animations";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  //   const footerRef = useRef(null);
  const footerVideoWrapperRef = useRef(null);
  const footerNavRef = useRef(null);
  const router = useTransitionRouter();
  const pathname = usePathname();
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
        trigger: footerNavRef.current,
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
    <footer
      style={{
        height: "100dvh",
        overflow: "hidden",
      }}
      className='pt-[14px] flex flex-col w-full h-full text-body relative'
    >
      <div className='footer-wrapper w-full bg-white pt-[14px] flex flex-col relative z-10'>
        <motion.div
          className='footer-header w-full h-full'
          // {...fadeInUp}
          // transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            className='h-[1px] w-full bg-black'
            // {...growFromLeft}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeInOut",
            //   delay: 0.4,
            // }}
          />{" "}
          <div className='flex flex-col gap-3 mt-5 mb-24'>
            <div className='h1'>
              Excited to see how we can collaborate.
            </div>
            <div className='w-fit'>
              <FillLink text='Book a call' />
            </div>
          </div>
          <motion.div
            className='h-[1px] w-full bg-black'
            // {...growFromLeft}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeInOut",
            //   delay: 0.6,
            // }}
          />
        </motion.div>
        <div
          ref={footerNavRef}
          className='footer-nav hidden lg:grid grid-cols-12 py-[14px] gap-[14px]'
        >
          <motion.div
            className='col-span-4 flex flex-col'
            // {...fadeInUp}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeOut",
            //   delay: 0.1,
            // }}
          >
            <div
              style={{ letterSpacing: "0.14px" }}
              className='uppercase text-[#626262]'
            >
              DESIGN WITH PURPOSE.
            </div>
            <div className='uppercase'>© A UNIFIED WHOLE LLC</div>
          </motion.div>
          <motion.div
            className='col-span-3 flex flex-col'
            // {...fadeInUp}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeOut",
            //   delay: 0.2,
            // }}
          >
            <div
              style={{ letterSpacing: "0.14px" }}
              className='uppercase text-[#626262]'
            >
              Follow Us
            </div>
            <div className='uppercase flex gap-2'>
              <a
                href='https://www.instagram.com/aunifiedwhole/'
                className='footer-link'
              >
                Instagram
              </a>
              <a
                href='https://www.linkedin.com/company/aunifiedwhole/'
                className='footer-link'
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
          <motion.div
            className='col-span-3 flex flex-col'
            // {...fadeInUp}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeOut",
            //   delay: 0.3,
            // }}
          >
            <div
              style={{ letterSpacing: "0.14px" }}
              className='uppercase text-[#626262]'
            >
              Navigation
            </div>
            <div className='uppercase flex gap-2'>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname !== "/work") {
                    router.push("/work", {
                      onTransitionReady: pageAnimation,
                    });
                  }
                }}
                href='/work'
                className='footer-link'
              >
                Work
              </Link>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname !== "/about") {
                    router.push("/about", {
                      onTransitionReady: pageAnimation,
                    });
                  }
                }}
                href='/about'
                className='footer-link'
              >
                About
              </Link>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname !== "/contact") {
                    router.push("/contact", {
                      onTransitionReady: pageAnimation,
                    });
                  }
                }}
                href='/contact'
                className='footer-link'
              >
                Contact
              </Link>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname !== "/listening-experience") {
                    router.push("/listening-experience", {
                      onTransitionReady: pageAnimation,
                    });
                  }
                }}
                href='/listening-experience'
                className='whitespace-nowrap footer-link'
              >
                Listening Experience
              </Link>
            </div>
          </motion.div>
          <motion.div
            className='col-span-2 uppercase justify-end flex items-end'
            // {...fadeInUp}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeOut",
            //   delay: 0.4,
            // }}
          >
            <Link
              onClick={(e) => {
                e.preventDefault();
                if (pathname !== "/privacy") {
                  router.push("/privacy", {
                    onTransitionReady: pageAnimation,
                  });
                }
              }}
              href='/privacy'
              className='footer-link'
            >
              Privacy Policy
            </Link>
          </motion.div>
        </div>

        {/* mobile footer nav: */}
        <div className='footer-nav lg:hidden flex flex-grow flex-col my-[14px] gap-[14px]'>
          <motion.div
            className='col-span-4 flex flex-col'
            // {...fadeInUp}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeOut",
            //   delay: 0.1,
            // }}
          >
            <div className=''>A Unified Whole®</div>
            <div className='uppercase text-[#626262]'>
              A Multipurpose Design Studio
            </div>
          </motion.div>
          <motion.div
            className='col-span-3 flex flex-col'
            // {...fadeInUp}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeOut",
            //   delay: 0.2,
            // }}
          >
            <div className='uppercase text-[#626262]'>Follow Us</div>
            <div className='uppercase flex gap-2'>
              <a
                target='_blank'
                href='https://www.instagram.com/aunifiedwhole/'
                className='footer-link'
              >
                Instagram
              </a>
              <a
                target='_blank'
                href='https://www.linkedin.com/company/aunifiedwhole/'
                className='footer-link'
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
          <motion.div
            className='col-span-3 flex flex-col'
            // {...fadeInUp}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeOut",
            //   delay: 0.3,
            // }}
          >
            <div className='uppercase text-[#626262]'>Navigation</div>
            <div className='uppercase flex gap-2'>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname !== "/work") {
                    router.push("/work", {
                      onTransitionReady: pageAnimation,
                    });
                  }
                }}
                href='/work'
                className='footer-link'
              >
                Work
              </Link>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname !== "/about") {
                    router.push("/about", {
                      onTransitionReady: pageAnimation,
                    });
                  }
                }}
                href='/about'
                className='footer-link'
              >
                About
              </Link>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname !== "/contact") {
                    router.push("/contact", {
                      onTransitionReady: pageAnimation,
                    });
                  }
                }}
                href='/contact'
                className='footer-link'
              >
                Contact
              </Link>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname !== "/listening-experience") {
                    router.push("/listening-experience", {
                      onTransitionReady: pageAnimation,
                    });
                  }
                }}
                href='/listening-experience'
                className='footer-link'
              >
                Listening Experience
              </Link>
            </div>
          </motion.div>
          <motion.div
            className='col-span-2 uppercase'
            // {...fadeInUp}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeOut",
            //   delay: 0.4,
            // }}
          >
            <Link
              onClick={(e) => {
                e.preventDefault();
                if (pathname !== "/privacy") {
                  router.push("/privacy", {
                    onTransitionReady: pageAnimation,
                  });
                }
              }}
              href='/privacy'
              className='footer-link'
            >
              Privacy Policy
            </Link>
          </motion.div>
        </div>
      </div>
      <div className='iframe-wrapper w-full overflow-hidden bg-white flex-1 relative z-0'>
        <iframe
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          src='https://auw-wind-chimes.vercel.app/'
          allowFullScreen
          loading='lazy'
        ></iframe>
      </div>
      {/* <div
        ref={footerVideoWrapperRef}
        className='footer-video-wrapper w-full h-fit aspect-video relative z-0'
      >
        <video
          src='/images/60FPS.mp4'
          muted
          playsInline
          preload='auto'
          className='w-full h-full object-cover'
        />
      </div> */}
    </footer>
  );
}
