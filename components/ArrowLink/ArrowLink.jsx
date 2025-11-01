"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ArrowLink({ link, text }) {
  const svgsRef = useRef(null);
  const animationRef = useRef(null);

  const killAnimation = () => {
    if (animationRef.current) {
      animationRef.current.kill();
    }
  };

  const handleMouseEnter = () => {
    killAnimation();

    if (svgsRef.current) {
      // Get both SVGs and convert to array to reverse order
      const svgs = Array.from(
        svgsRef.current.querySelectorAll("svg")
      ).reverse();

      // Remove classes from both SVGs
      svgs.forEach((svg) => {
        svg.classList.remove("opacity-0", "-translate-x-[10px]");
      });

      // Animate both SVGs with a slight stagger (now in reverse order)
      animationRef.current = gsap.fromTo(
        svgs,
        {
          opacity: 0,
          x: -10,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.08, // Subtle stagger
          ease: "power2.out",
        }
      );
    }
  };

  const handleMouseLeave = () => {
    killAnimation();

    if (svgsRef.current) {
      const svgs = Array.from(
        svgsRef.current.querySelectorAll("svg")
      ).reverse();

      animationRef.current = gsap.to(svgs, {
        opacity: 0,
        x: -10,
        duration: 0.2,
        stagger: 0.05, // Slightly faster stagger on exit
        ease: "power2.in",
        onComplete: () => {
          if (svgsRef.current) {
            svgs.forEach((svg) => {
              svg.classList.add("opacity-0", "-translate-x-[10px]");
            });
          }
        },
      });
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      killAnimation();
    };
  }, []);

  return (
    <a
      className='h2 cursor-pointer flex gap-1 items-start'
      href={link}
      target='_blank'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
      <div ref={svgsRef} className='flex'>
        <svg
          className='external-link-svg mt-[4px] w-[8px] h-[16px] lg:w-[9px] lg:h-[17px] opacity-0 -translate-x-[10px]'
          // className='mt-[4px] lg:w-[10px] lg:h-[21px] w-[8px] h-[16px] opacity-0 -translate-x-[10px]'

          viewBox='0 0 10 21'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.9972 10.009L4.93844 20.0179H0.335938L5.38844 10.009L0.335938 0H4.93844L9.9972 10.009Z'
            fill='black'
          />
        </svg>
        <svg
          className='external-link-svg mt-[4px] -ml-[2px] w-[8px] h-[16px] lg:w-[9px] lg:h-[17px] 3xl:w-[10px] 3xl:h-[21px] opacity-0 -translate-x-[10px]'
          viewBox='0 0 10 21'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.9972 10.009L4.93844 20.0179H0.335938L5.38844 10.009L0.335938 0H4.93844L9.9972 10.009Z'
            fill='black'
          />
        </svg>
      </div>
    </a>
  );
}
