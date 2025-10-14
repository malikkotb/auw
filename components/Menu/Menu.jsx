"use client";
import Link from "next/link";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FillButton from "../FillButton/FillButton";

export default function Menu({ menuOpen, setMenuOpen }) {
  const menuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const menu = menuRef.current;

    if (menuOpen) {
      // Animate menu in
      gsap.to(menu, {
        y: "0%",
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      // Animate menu out
      gsap.to(menu, {
        y: "-110%",
        duration: 0.4,
        ease: "power2.in",
      });
    }

    return () => {
      gsap.killTweensOf(menu);
    };
  }, [menuOpen]);


  return (
    <div
      ref={menuRef}
      style={{
        zIndex: 100,
        transform: "translateY(-110%)",
        height: "calc(100dvh - 60px)",
        top: 0,
        left: 0,
      }}
      className='fixed grid lg:hidden gap-[14px] mt-[60px] grid-rows-5 w-full p-[14px] bg-black text-white'
    >
      <div className='row-start-2 row-span-2 flex flex-col h2'>
        <Link onClick={() => setMenuOpen(false)} href='/about'>
          <div className={pathname === "/about" ? "italic" : ""}>
            About
          </div>
        </Link>
        <Link onClick={() => setMenuOpen(false)} href='/work'>
          <div className={pathname === "/work" ? "italic" : ""}>
            Work
          </div>
        </Link>
        <Link
          onClick={() => setMenuOpen(false)}
          href='/listening-experience'
        >
          <div
            className={
              pathname === "/listening-experience" ? "italic" : ""
            }
          >
            Sound
          </div>
        </Link>
        <Link onClick={() => setMenuOpen(false)} href='/contact'>
          <div className={pathname === "/contact" ? "italic" : ""}>
            Contact
          </div>
        </Link>
      </div>
      <div className='row-start-5 row-span-1 flex items-end justify-between'>
        <a
          onClick={() => setMenuOpen(false)}
          target='_blank'
          href='https://www.instagram.com/aunifiedwhole/'
        >
          Instagram
        </a>
        <a
          onClick={() => setMenuOpen(false)}
          target='_blank'
          href='https://www.linkedin.com/company/aunifiedwhole/'
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
