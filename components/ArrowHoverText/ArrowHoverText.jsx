"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ArrowHoverText({ text, isHovered }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const svgsRef = useRef(null);
  const animationRef = useRef({});

  const killAnimations = () => {
    Object.values(animationRef.current).forEach(anim => {
      if (anim) anim.kill();
    });
  };

  useEffect(() => {
    killAnimations();

    if (containerRef.current && textRef.current && svgsRef.current) {
      const svgs = Array.from(svgsRef.current.querySelectorAll("svg")).reverse();
      
      if (isHovered) {
        // Slide up animation for text and container
        animationRef.current.slideUp = gsap.fromTo(
          [textRef.current, svgsRef.current],
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          }
        );

        // Create timeline for SVG animations
        const tl = gsap.timeline({delay: 0.2});
        
        // First animate y only
        tl.fromTo(svgs, 
          {
            y: 100,
          },
          {
            y: 0,
            duration: 0.3,
            stagger: 0.08,
            ease: "power2.out",
          }
        )
        // Then animate x and opacity together
        .fromTo(svgs,
          {
            opacity: 0,
            x: -10,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2" // Start earlier during the y animation
        );
        
        animationRef.current.svgSlide = tl;
      } else {
        // Hide everything
        animationRef.current.slideDown = gsap.to(
          [textRef.current, svgsRef.current],
          {
            opacity: 0,
            y: 100,
            duration: 0.3,
            ease: "power2.in",
          }
        );

        // Slide out SVGs
        animationRef.current.svgSlideOut = gsap.to(
          svgs,
          {
            opacity: 0,
            x: -10,
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.in",
          }
        );
      }
    }
  }, [isHovered]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      killAnimations();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='external-link flex gap-1 items-start overflow-hidden'
    >
      <div ref={textRef} className="opacity-0 translate-y-[100%]">
        {text}
      </div>
      <div ref={svgsRef} className='flex'>
        <svg
          className='mt-[4px] w-[8px] h-[16px] lg:w-[9px] lg:h-[17px] opacity-0 translate-y-[100%] -translate-x-[10px]'
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
          className='mt-[4px] -ml-[2px] w-[8px] h-[16px] lg:w-[9px] lg:h-[17px] 3xl:w-[10px] 3xl:h-[21px] opacity-0 translate-y-[100%] -translate-x-[10px]'
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
    </div>
  );
}
