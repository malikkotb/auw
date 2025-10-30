"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Menu from "../Menu/Menu";
import TransitionLink from "../TransitionLink";
import { pageAnimation } from "../../utils/pageAnimation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const videoRef = useRef(null);
  const closeButtonLinesRef = useRef([]);
  const bgRef = useRef(null);
  const logoRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollThreshold = 50; // How many pixels to scroll before showing/hiding

      if (scrollingDown && currentScrollY > scrollThreshold) {
        setIsVisible(false);
      } else if (!scrollingDown) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   const handleEnded = () => {
  //     video.pause();
  //   };

  //   video.addEventListener("ended", handleEnded);
  //   return () => video.removeEventListener("ended", handleEnded);
  // }, []);

  useEffect(() => {
    const [line1, line2, line3] = closeButtonLinesRef.current;
    if (!line1 || !line2) return;

    const tl = gsap.timeline();

    if (menuOpen) {
      // Animate to X
      tl.to([line1, line2], {
        delay: 0.2,
        duration: 0.4,
        ease: "power2.inOut",
      })
        // fade out the third line so only two lines form the X
        .to(
          line3,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          line1,
          {
            rotate: 45,
            top: "50%",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          line2,
          {
            rotate: -45,
            top: "50%",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "<"
        );
    } else {
      // Animate to hamburger
      tl.to([line1, line2], {
        delay: 0.5,
        duration: 0.4,
        ease: "power2.inOut",
      })
        // fade the third line back in to show hamburger state
        .to(
          line3,
          {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          line1,
          {
            rotate: 0,
            top: "40%",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          line2,
          {
            rotate: 0,
            top: "60%",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "<"
        );
    }

    // Toggle body scroll
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          zIndex: 1000,
          transform: `translateY(${isVisible ? "0" : "-100%"})`,
          color: "white",
          mixBlendMode: "difference",
          backgroundColor: "black",
        }}
        className='fixed top-0 left-0 w-full text-body pt-[14px] pl-[14px] pr-[14px] pb-[10px] uppercase transition-transform duration-300 ease-in-out'
      >
        <div className='grid grid-cols-12 gap-[14px]'>
          {/* old logo */}
          <div className='flex relative lg:hidden col-span-2 col-start-11 justify-end gap-4'>
            <button
              className='cursor-pointer'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className='relative w-6 h-6 -mt-[6px]'>
                <div
                  ref={(el) => (closeButtonLinesRef.current[0] = el)}
                  className='absolute bg-white top-[40%] left-0 w-full h-[1.5px] origin-center'
                ></div>
                <div
                  ref={(el) => (closeButtonLinesRef.current[1] = el)}
                  className='absolute bg-white top-[60%] left-0 w-full h-[1.5px] origin-center'
                ></div>
                <div
                  ref={(el) => (closeButtonLinesRef.current[2] = el)}
                  className='absolute bg-white top-[80%] left-0 w-full h-[1.5px] origin-center'
                ></div>
              </div>
            </button>
          </div>
          <div className='hidden relative lg:flex col-span-2 col-start-11 justify-end gap-4'>
            <TransitionLink href='/about' className='header-link'>
              <div className={pathname === "/about" ? "italic" : ""}>
                About
              </div>
            </TransitionLink>
            <TransitionLink href='/work' className='header-link'>
              <div className={pathname === "/work" ? "italic" : ""}>
                Work
              </div>
            </TransitionLink>
            <TransitionLink
              href='/listening-experience'
              className='header-link'
            >
              <div
                className={
                  pathname === "/listening-experience" ? "italic" : ""
                }
              >
                Sound
              </div>
            </TransitionLink>
            <TransitionLink href='/contact' className='header-link'>
              <div
                className={pathname === "/contact" ? "italic" : ""}
              >
                Contact
              </div>
            </TransitionLink>
          </div>
        </div>
      </header>
      <div
        ref={logoRef}
        style={{
          zIndex: 1000,
          transform: `translateY(${isVisible ? "0" : "-150%"})`,
        }}
        className='fixed top-[14px] left-[14px] w-fit transition-transform duration-300 ease-in-out'
      >
        {pathname === "/listening-experience" ? (
          <TransitionLink
            href='/'
            className='cursor-pointer whitespace-nowrap transition-color duration-400'
            // style={{ color: menuOpen ? "#FFFFFF" : "white" }}
          >
            A UNIFIED WHOLE®
          </TransitionLink>
        ) : (
          <TransitionLink
            href='/'
            className='cursor-pointer'
            // onMouseEnter={() => {
            //   if (videoRef.current) {
            //     videoRef.current.currentTime = 0;
            //     videoRef.current
            //       .play()
            //       .catch((err) =>
            //         console.warn("Video play prevented:", err)
            //       );
            //   }
            // }}
            // onMouseLeave={() => {
            //   if (videoRef.current) {
            //     videoRef.current.pause();
            //     videoRef.current.currentTime = 0;
            //     videoRef.current.load();
            //   }
            // }}
          >
            <div className='relative w-[27px] h-[34px] lg:w-[36px] lg:h-[45px]'>
              {/* <video
                    ref={videoRef}
                    src='/auw_logo.webm'
                    // poster='/logo_poster.png'
                    className='absolute inset-0 w-full h-full object-cover'
                    muted
                    playsInline
                    preload='auto'
                  ></video> */}
              <img
                src='/auw_logo.png'
                alt='auw logo'
                className='z-10 w-full h-full object-cover'
              />
            </div>
          </TransitionLink>
        )}
      </div>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}
