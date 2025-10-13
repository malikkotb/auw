"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Menu from "../Menu/Menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
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
    <header
      style={{ zIndex: 1000 }}
      className='w-full text-[15px] uppercase'
    >
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className='grid grid-cols-12 gap-[14px]'>
        <div className='col-span-2 lg:col-span-1'>
          <Link href='/'>
            {/* TODO: get correct video that has transparent background */}
            {/* TODO: play once on hover */}
            <video
              src='auw_logo.mov'
              className='w-full lg:w-[50%]'
            ></video>
          </Link>
        </div>
        <div className='flex lg:hidden col-span-2 col-start-11 justify-end gap-4'>
          <button className='' onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <div className='relative w-6 h-6'>
                <div className='absolute top-1/2 left-0 w-full h-[1.5px] bg-black rotate-45'></div>
                <div className='absolute top-1/2 left-0 w-full h-[1.5px] bg-black -rotate-45'></div>
              </div>
            ) : (
              <div className='relative w-6 h-6 flex flex-col justify-center gap-1'>
                <div className='w-full h-[1.5px] bg-black'></div>
                <div className='w-full h-[1.5px] bg-black'></div>
              </div>
            )}
          </button>
        </div>
        <div className='hidden lg:flex col-span-2 col-start-11 justify-end gap-4'>
          <Link href='/about'>
            <div className={pathname === "/about" ? "italic" : ""}>
              About
            </div>
          </Link>
          <Link href='/work'>
            <div className={pathname === "/work" ? "italic" : ""}>
              Work
            </div>
          </Link>
          <Link href='/listening-experience'>
            <div
              className={
                pathname === "/listening-experience" ? "italic" : ""
              }
            >
              Sound
            </div>
          </Link>
          <Link href='/contact'>
            <div className={pathname === "/contact" ? "italic" : ""}>
              Contact
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
