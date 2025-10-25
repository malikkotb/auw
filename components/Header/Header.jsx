"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Menu from "../Menu/Menu";
import Link from "next/link";
import { pageAnimation } from "../../utils/pageAnimation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const videoRef = useRef(null);
  const closeButtonLinesRef = useRef([]);
  const bgRef = useRef(null);


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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.pause();
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    const [line1, line2] = closeButtonLinesRef.current;
    if (!line1 || !line2) return;

    const tl = gsap.timeline();

    if (menuOpen) {
      // Animate to X
      tl.to([line1, line2], {
        ...(pathname === "/listening-experience" && {
          backgroundColor: "white",
        }),
        delay: 0.2,
        duration: 0.4,
        ease: "power2.inOut",
      })
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
        ...(pathname === "/listening-experience" && {
          backgroundColor: "black",
        }),
        delay: 0.5,
        duration: 0.4,
        ease: "power2.inOut",
      })
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
          color:
            pathname === "/listening-experience" ? "black" : "white",
          // mixBlendMode:
          //   pathname === "/listening-experience"
          //     ? "normal"
          //     : "difference",
          mixBlendMode: "difference",
        }}
        className='fixed top-0 left-0 w-full text-body pt-[14px] pl-[14px] pr-[14px] pb-[10px] uppercase transition-transform duration-300 ease-in-out'
      >
        <div className='grid grid-cols-12 gap-[14px]'>
          <div className='relative'>
            {pathname === "/listening-experience" ? (
              <Link
                href='/'
                // onClick={(e) => {
                //   e.preventDefault();
                //   if (pathname !== "/") {
                //     if (menuOpen) {
                //       setMenuOpen(false);
                //       setTimeout(() => {
                //         router.push("/", {
                //           onTransitionReady: pageAnimation,
                //         });
                //       }, 400); // Wait for menu close animation (0.4s duration)
                //     } else {
                //       router.push("/", {
                //         onTransitionReady: pageAnimation,
                //       });
                //     }
                //   }
                // }}
                className='cursor-pointer whitespace-nowrap transition-color duration-400'
                style={{ color: menuOpen ? "#FFFFFF" : "#000000" }}
              >
                A UNIFIED WHOLE®
              </Link>
            ) : (
              <Link
                href='/'
                // onClick={(e) => {
                //   e.preventDefault();
                //   if (pathname !== "/") {
                //     if (menuOpen) {
                //       setMenuOpen(false);
                //       setTimeout(() => {
                //         router.push("/", {
                //           onTransitionReady: pageAnimation,
                //         });
                //       }, 400); // Wait for menu close animation (0.4s duration)
                //     } else {
                //       router.push("/", {
                //         onTransitionReady: pageAnimation,
                //       });
                //     }
                //   }
                // }}
                className='cursor-pointer'
                onMouseEnter={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current
                      .play()
                      .catch((err) =>
                        console.warn("Video play prevented:", err)
                      );
                  }
                }}
                onMouseLeave={() => {
                  if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                    videoRef.current.load();
                  }
                }}
              >
                <div className='w-[27px] h-[34px] lg:w-[36px] lg:h-[45px] relative'>
                  <video
                    ref={videoRef}
                    src='/auw_logo.webm'
                    // poster='/logo_poster.png'
                    className='absolute inset-0 w-full h-full object-cover'
                    muted
                    playsInline
                    preload='auto'
                  ></video>
                </div>
              </Link>
            )}
          </div>
          <div className='flex relative lg:hidden col-span-2 col-start-11 justify-end gap-4'>
            <button
              className='cursor-pointer'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className='relative w-6 h-6 -mt-[6px]'>
                <div
                  ref={(el) => (closeButtonLinesRef.current[0] = el)}
                  style={{
                    backgroundColor:
                      pathname === "/listening-experience"
                        ? "black"
                        : "white",
                  }}
                  className='absolute top-[40%] left-0 w-full h-[1.5px] origin-center'
                ></div>
                <div
                  ref={(el) => (closeButtonLinesRef.current[1] = el)}
                  style={{
                    backgroundColor:
                      pathname === "/listening-experience"
                        ? "black"
                        : "white",
                  }}
                  className='absolute top-[60%] left-0 w-full h-[1.5px] origin-center'
                ></div>
              </div>
            </button>
          </div>
          <div className='hidden relative lg:flex col-span-2 col-start-11 justify-end gap-4'>
            <Link
              href='/about'
              className='header-link'
              style={{}}
              // onClick={(e) => {
              //   e.preventDefault();
              //   if (pathname !== "/about") {
              //     router.push("/about", {
              //       onTransitionReady: pageAnimation,
              //     });
              //   }
              // }}
            >
              <div className={pathname === "/about" ? "italic" : ""}>
                About
              </div>
            </Link>
            <Link
              href='/work'
              className='header-link'
              // onClick={(e) => {
              //   e.preventDefault();
              //   if (pathname !== "/work") {
              //     router.push("/work", {
              //       onTransitionReady: pageAnimation,
              //     });
              //   }
              // }}
            >
              <div className={pathname === "/work" ? "italic" : ""}>
                Work
              </div>
            </Link>
            <Link
              href='/listening-experience'
              className='header-link'
              // onClick={(e) => {
              //   e.preventDefault();
              //   if (pathname !== "/listening-experience") {
              //     router.push("/listening-experience", {
              //       onTransitionReady: pageAnimation,
              //     });
              //   }
              // }}
            >
              <div
                className={
                  pathname === "/listening-experience" ? "italic" : ""
                }
              >
                Sound
              </div>
            </Link>
            <Link
              href='/contact'
              className='header-link'
              // onClick={(e) => {
              //   e.preventDefault();
              //   if (pathname !== "/contact") {
              //     router.push("/contact", {
              //       onTransitionReady: pageAnimation,
              //     });
              //   }
              // }}
            >
              <div
                className={pathname === "/contact" ? "italic" : ""}
              >
                Contact
              </div>
            </Link>
          </div>
        </div>
      </header>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}
