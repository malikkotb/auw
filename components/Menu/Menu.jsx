"use client";
import Link from "next/link";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FillButton from "../FillButton/FillButton";
import { pageAnimation } from "../../utils/pageAnimation";

export default function Menu({ menuOpen, setMenuOpen }) {
  const menuRef = useRef(null);
  const pathname = usePathname();
  const router = useTransitionRouter();
  const linksRef = useRef([]);
  const bgRef = useRef(null);

  useEffect(() => {
    const menu = menuRef.current;
    const bg = bgRef.current;
    const links = linksRef.current.filter((link) => link !== null);

    const tl = gsap.timeline();

    if (menuOpen) {
      // Animate everything together
      tl.to([menu, bg], {
        y: "0%",
        duration: 0.6,
        ease: "power3.out",
      }).fromTo(
        links,
        {
          opacity: 0,
          x: 20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        "<0.2" // Start 0.2s after menu animation begins
      );
    } else {
      // Animate menu and background out
      tl.to([menu, bg], {
        y: "-110%",
        duration: 0.4,
        ease: "power2.in",
        stagger: -0.1, // Background leaves slightly before menu
      });
    }

    return () => {
      tl.kill();
    };
  }, [menuOpen]);

  return (
    <>
      <div
        ref={bgRef}
        style={{
          transform: "translateY(-110%)",
          height: "80px",
          top: 0,
          left: 0,
          zIndex: 999,
        }}
        className='fixed lg:hidden w-full bg-black'
      />
      <div
        ref={menuRef}
        style={{
          zIndex: 9999,
          transform: "translateY(-110%)",
          height: "calc(100dvh - 60px)",
          top: 0,
          left: 0,
        }}
        className='fixed grid lg:hidden gap-[14px] mt-[60px] grid-rows-5 w-full p-[14px] bg-black text-white'
      >
        <div className='row-start-2 row-span-2 flex flex-col h2'>
          <Link
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              setTimeout(() => {
                if (pathname !== "/about") {
                  router.push("/about", {
                    onTransitionReady: pageAnimation,
                  });
                }
              }, 400); // Wait for menu close animation (0.4s duration)
            }}
            href='/about'
            ref={(el) => (linksRef.current[0] = el)}
            className='footer-link w-fit'
          >
            <div>About</div>
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              setTimeout(() => {
                if (pathname !== "/work") {
                  router.push("/work", {
                    onTransitionReady: pageAnimation,
                  });
                }
              }, 400); // Wait for menu close animation (0.4s duration)
            }}
            href='/work'
            ref={(el) => (linksRef.current[1] = el)}
            className='footer-link w-fit'
          >
            <div>Work</div>
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              setTimeout(() => {
                if (pathname !== "/listening-experience") {
                  router.push("/listening-experience", {
                    onTransitionReady: pageAnimation,
                  });
                }
              }, 400); // Wait for menu close animation (0.4s duration)
            }}
            href='/listening-experience'
            ref={(el) => (linksRef.current[2] = el)}
            className='footer-link w-fit'
          >
            <div>Sound</div>
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              setTimeout(() => {
                if (pathname !== "/contact") {
                  router.push("/contact", {
                    onTransitionReady: pageAnimation,
                  });
                }
              }, 400); // Wait for menu close animation (0.4s duration)
            }}
            href='/contact'
            ref={(el) => (linksRef.current[3] = el)}
            className='footer-link w-fit'
          >
            <div>Contact</div>
          </Link>
        </div>
        <div className='row-start-5 row-span-1 flex items-end justify-between'>
          <a
            onClick={() => setMenuOpen(false)}
            target='_blank'
            href='https://www.instagram.com/aunifiedwhole/'
            className='footer-link'
          >
            Instagram
          </a>
          <a
            onClick={() => setMenuOpen(false)}
            target='_blank'
            href='https://www.linkedin.com/company/aunifiedwhole/'
            className='footer-link'
          >
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
