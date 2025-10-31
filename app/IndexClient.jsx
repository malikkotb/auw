"use client";
import { IBM_Plex_Mono } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import FillLink from "@/components/FillButton/FillLink";
import ParagraphEyebrowLink from "@/components/ParagraphEyebrowLink";
import Footer from "@/components/Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouterTransition } from "@/contexts/TransitionContext";
import { useRouter } from "next/navigation";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function IndexClient({ clientsData, projects }) {
  const containerRef = useRef(null);
  const animatedDivRef = useRef(null);
  const router = useRouter();
  const [, startRouteTransition] = useRouterTransition();

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // ScrollTrigger animation for the div width expansion
  useEffect(() => {
    if (!animatedDivRef.current) return;

    const element = animatedDivRef.current;
    const wrapper = element.parentElement; // The sticky wrapper
    let scrollTrigger = null;
    let handleResize = null;

    // Wait for next frame to ensure layout is complete
    requestAnimationFrame(() => {
      const triggerElement = wrapper.parentElement; // The relative container
      if (!triggerElement) return;

      // Get wrapper content width (excludes padding) to calculate pixel values
      const wrapperContentWidth = wrapper.clientWidth; // Width excluding padding
      const availableWidth = wrapperContentWidth; // Subtract margins from both sides
      const startWidth = availableWidth * 0.66666667; // 8 columns (66.67% of available width)

      const endWidth = availableWidth; // 12 columns (100% of available width, accounting for margins)
      console.log("startWidth", startWidth);
      console.log("endWidth", endWidth);
      console.log("availableWidth", availableWidth);
      // Set initial width and center positioning with margins
      gsap.set(element, {
        width: startWidth,
        left: "50%",
        x: "-50%",
        top: "25%",
        y: "-25%",
        position: "absolute",
      });

      // Create ScrollTrigger that pins the wrapper and animates width
      scrollTrigger = ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 25%",
        end: "+=200vh",
        scrub: true,
        // markers: true,
        pin: wrapper,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentWidth =
            startWidth + (endWidth - startWidth) * progress;
          gsap.set(element, {
            width: currentWidth,
            left: "50%",
            x: "-50%",
            top: "25%",
            y: "-25%",
          });
        },
      });

      // Handle window resize
      handleResize = () => {
        const newWrapperContentWidth = wrapper.clientWidth;
        const newAvailableWidth = newWrapperContentWidth;
        const newStartWidth = newAvailableWidth * 0.66666667;
        const newEndWidth = newAvailableWidth;

        // Update width calculations if needed
        const progress = scrollTrigger?.progress || 0;
        const currentWidth =
          newStartWidth + (newEndWidth - newStartWidth) * progress;
        gsap.set(element, {
          width: currentWidth,
        });

        scrollTrigger?.refresh();
      };

      window.addEventListener("resize", handleResize);
      ScrollTrigger.refresh();
    });

    // Cleanup
    return () => {
      if (handleResize) {
        window.removeEventListener("resize", handleResize);
      }
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, []);

  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [hoveredProjectTitle, setHoveredProjectTitle] = useState("");

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleVideoHover = (projectTitle) => {
    setShowCustomCursor(true);
    setHoveredProjectTitle(projectTitle);
  };

  const handleVideoLeave = () => {
    setShowCustomCursor(false);
    setHoveredProjectTitle("");
  };

  const [hoveredIndex, setHoveredIndex] = useState(
    clientsData.length - 1
  );

  const capabilities = [
    "Brand Strategy",
    "Brand Positioning",
    "Messaging",
    "Naming",
    "Visual Identity",
    "Logo Design",
    "Typography Systems",
    "Color Systems",
    "Digital Design",
    "Web Design",
    "UI/UX",
    "Packaging Design",
    "Product Branding",
    "Art Direction",
    "Content Creation",
    "Print Design",
    "Editorial Design",
    "Environmental Design",
    "Social Media Design",
    "Communication Design",
  ];

  const press = [
    {
      title: "The Brand Identity",
      link: "https://www.the-brandidentity.com/",
    },
    {
      title: "It's nice that",
      link: "https://www.itsnicethat.com/",
    },
    {
      title: "Dieline",
      link: "https://thedieline.com/",
    },
    {
      title: "Forbes",
      link: "https://www.forbes.com/",
    },
    {
      title: "Creative Boom",
      link: "https://www.creativeboom.com/",
    },
  ];

  return (
    <div ref={containerRef} className='h-full w-full bg-white'>
      {/* Custom Cursor */}
      <AnimatePresence>
        {showCustomCursor && (
          <motion.div
            className={`${ibmPlexMono.className} fixed uppercase pointer-events-none rounded-full z-50 text-white whitespace-nowrap`}
            style={{
              backgroundColor: hoveredProjectTitle.includes("Coming Soon") ? "#626262" : "black",
              fontSize: "12px",
              letterSpacing: "0.24px",
              lineHeight: "1.2",
              padding: "6px 10px",
              right: containerRef.current
                ? containerRef.current.offsetWidth -
                  cursorPosition.x +
                  40
                : 0,
              top: cursorPosition.y - 5,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {hoveredProjectTitle}
          </motion.div>
        )}
      </AnimatePresence>
      <div className='flex flex-col'>
        <motion.div className='section-spacing h1 text-26 flex h-full'>
          Creating brands that feel inevitable.
        </motion.div>
        <motion.div
          className='w-full hidden sm:grid grid-cols-12 cursor-pointer max-h-[calc(100vh-28px)] h-full aspect-video overflow-clip'
          onMouseMove={handleMouseMove}
          onMouseEnter={() => handleVideoHover("View Reel")}
          onMouseLeave={handleVideoLeave}
        >
          <img
            src='/images/about_auw.png'
            alt='Reel'
            className='col-span-12 w-full h-full object-cover'
          />
        </motion.div>
        <motion.div
          className='w-full cursor-pointer grid sm:hidden grid-cols-12 h-full aspect-[4/5] overflow-clip'
          onMouseMove={handleMouseMove}
          onMouseEnter={() => handleVideoHover("View Reel")}
          onMouseLeave={handleVideoLeave}
        >
          <img
            src='/images/6.png'
            alt='Reel'
            className='col-span-12 w-full h-full object-cover'
          />
        </motion.div>
      </div>
      <div className='pt-[14px]'>
        {/* duplicate paragraph eyebrow compnent with filllink instead of fillbutton */}
        <ParagraphEyebrowLink
          eyebrowText={"Who We Are"}
          mainText={
            "We are a design studio that helps brands realize their identity and execute it across branding, digital and physical mediums."
          }
          buttonText={"Contact Us"}
          buttonLink={"/contact"}
        />
      </div>

      <div className='lg:block hidden relative h-full w-full'>
        <div
          className='relative flex justify-center items-center'
          style={{
            height: "85vh",
            minHeight: "700px",
            width: "100%",
          }}
        >
          <motion.div
            ref={animatedDivRef}
            className='cursor-pointer aspect-video max-h-[calc(100vh-28px)]'
            onMouseMove={handleMouseMove}
            onMouseEnter={() =>
              handleVideoHover("LISTENING EXPERIENCE")
            }
            onMouseLeave={handleVideoLeave}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className='w-full h-full object-cover'
            >
              <source
                src='/AUW x LP horizontal_1.webm'
                type='video/webm'
              />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>
      <div className='lg:hidden blockn margin-top relative h-full w-full'>
        <img
          src='/images/about_auw.png'
          alt='about'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='flex margin-top margin-bottom md:flex-row flex-col justify-between'>
        <div className='h1'>
          A look at brands we've helped bring to life.
        </div>
        <div className='w-fit lg:pt-0 pt-[14px]'>
          <FillLink text={"View All Projects"} link={"/work"} />
        </div>
      </div>

      <div className='hidden sm:grid grid-cols-12 gap-[14px]'>
        {projects.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.slug || index}
            className='col-span-12 cursor-pointer aspect-video w-full max-h-[calc(100vh-28px)]'
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
              const statusText = project.isNotAvailable
                ? project.projectStatus === "coming-soon"
                  ? "Coming Soon"
                  : "View Website"
                : project.description;
              handleVideoHover(`${project.title} | ${statusText}`);
            }}
            onClick={() => {
              if (project.isNotAvailable) {
                if (project.projectStatus === "coming-soon") {
                  return;
                } else {
                  window.open(project.projectUrl, "_blank");
                }
              } else {
                startRouteTransition(
                  () => {
                    router.push(
                      `/${project.title.toLowerCase().replace(/\s+/g, "-")}`
                    );
                  },
                  `/${project.title.toLowerCase().replace(/\s+/g, "-")}`
                );
              }
            }}
            onMouseLeave={handleVideoLeave}
            {...fadeInUp}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2 + index * 0.2,
            }}
          >
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className='w-full h-full object-cover'
                onMouseLeave={handleVideoLeave}
              />
            ) : (
              <img
                src={project.imageUrl || "/images/about_auw.png"}
                alt={project.title}
                className='w-full h-full object-cover'
                onMouseLeave={handleVideoLeave}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className='sm:hidden flex flex-col gap-[14px]'>
        {projects.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.slug || index}
            className='cursor-pointer aspect-[4/5] w-full'
            {...fadeInUp}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2 + index * 0.2,
            }}
          >
            {project.videoUrl ? (
              <video
                src={project.videoUrlMobile}
                autoPlay
                loop
                muted
                playsInline
                className='w-full h-full object-cover'
                onMouseLeave={handleVideoLeave}
              />
            ) : (
              <img
                src={
                  project.imageUrlMobile || "/images/about_auw.png"
                }
                alt={project.title}
                className='w-full h-full object-cover'
                onMouseLeave={handleVideoLeave}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className='pt-[14px]'>
        {/* duplicate paragraph eyebrow compnent with filllink instead of fillbutton */}
        <ParagraphEyebrowLink
          eyebrowText={"Studio Overview"}
          mainText={
            "Our work spans industries and mediums, connecting thoughtful strategy with timeless design. Here you'll find a selection of our core capabilities, notable collaborations, and press recognition that reflect the breadth of our practice."
          }
          buttonText={"Learn More"}
          buttonLink={"/about"}
        />
      </div>

      <div className='mt-[120px] md:mt-[240px] grid grid-cols-12 gap-[14px]'>
        <motion.div
          className='md:col-span-3 col-span-12'
          {...fadeInUp}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2,
          }}
        >
          <p className='eyebrow'>Capabilities</p>
          <div className='h-[1px] w-full bg-[#838383] mt-1 mb-2'></div>
          {capabilities.map((capability, index) => (
            <div key={index} className='external-link'>
              {capability}
            </div>
          ))}
        </motion.div>
        <motion.div
          className='md:col-span-3 col-span-12'
          {...fadeInUp}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.4,
          }}
        >
          <p className='eyebrow'>Clients</p>
          <div className='h-[1px] w-full bg-[#838383] mt-1 mb-2'></div>
          <div className='flex flex-col'>
            {clientsData.map((client, index) => (
              <div
                key={index}
                className='external-link cursor-pointer transition-all duration-300 hover:text-[#626262]'
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {client.name}
              </div>
            ))}
          </div>
          <div className='external-link'>& More</div>
        </motion.div>
        <motion.div
          className='md:col-span-3 col-span-12'
          {...fadeInUp}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.6,
          }}
        >
          <p className='eyebrow'>Press</p>
          <div className='h-[1px] w-full bg-[#838383] mt-1 mb-2'></div>
          <div className='flex flex-col'>
            {press.map((press, index) => (
              <ArrowLink
                key={index}
                link={press.link}
                text={press.title}
              />
            ))}
          </div>
        </motion.div>
        <motion.div
          className='relative aspect-[4/5] md:col-span-3 col-span-6 md:col-start-11 w-full mt-[18px]'
          {...fadeInUp}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.8,
          }}
        >
          <div className='flex flex-col'>
            {clientsData.map((client, index) => (
              <img
                key={index}
                src={client.imageUrl}
                alt={client.name}
                className={`w-full absolute top-0 left-0 h-full object-cover ${
                  index === hoveredIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
