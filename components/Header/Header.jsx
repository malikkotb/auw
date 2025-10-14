"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Menu from "../Menu/Menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const videoRef = useRef(null);

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
        <div className='relative w-[40px]'>
          <Link
            href='/'
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
          >
            <video
              ref={videoRef}
              src='/auw_logo.webm'
              className='w-full'
              muted
              playsInline
              preload='auto'
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
          <Link href='/about' className='header-link'>
            <div className={pathname === "/about" ? "italic" : ""}>
              About
            </div>
          </Link>
          <Link href='/work' className='header-link'>
            <div className={pathname === "/work" ? "italic" : ""}>
              Work
            </div>
          </Link>
          <Link href='/listening-experience' className='header-link'>
            <div
              className={
                pathname === "/listening-experience" ? "italic" : ""
              }
            >
              Sound
            </div>
          </Link>
          <Link href='/contact' className='header-link'>
            <div className={pathname === "/contact" ? "italic" : ""}>
              Contact
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
