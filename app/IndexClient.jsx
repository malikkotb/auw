"use client";
import { IBM_Plex_Mono } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { useTransitionRouter } from "next-view-transitions";
import FillLink from "@/components/FillButton/FillLink";
import ParagraphEyebrowLink from "@/components/ParagraphEyebrowLink";
import Footer from "@/components/Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function IndexClient({ clientsData, projects }) {
  const containerRef = useRef(null);
  const animatedDivRef = useRef(null);

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

  // ScrollTrigger animation for the div width and height
  useEffect(() => {
    if (animatedDivRef.current) {
      gsap.fromTo(
        animatedDivRef.current,
        {
          width: "66.666667%", // col-span-8 equivalent (8/12 = 66.67%)
          height: "auto", // Start with auto height
        },
        {
          width: "100%", // col-span-12 equivalent
          height: "100%", // Fill the full height of the relative container
          scrollTrigger: {
            trigger: animatedDivRef.current,
            start: "top 90%",
            end: "top 10%",
            scrub: 0.5,
          },
        }
      );
    }
  }, []);

  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const router = useTransitionRouter();
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
            className={`${ibmPlexMono.className} fixed uppercase pointer-events-none rounded-full z-50 bg-black text-white whitespace-nowrap`}
            style={{
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
      <div className='flex flex-col h-[calc(100vh-28px)] desktop:h-auto desktop:min-h-screen'>
        <motion.div
          className='h1 text-26 items-center desktop:items-start flex h-full xl:mb-[120px] xl:mt-[120px]'
          {...fadeInUp}
        >
          Creating brands that feel inevitable.
        </motion.div>
        <motion.div
          className='w-full cursor-pointer flex desktop:h-full h-fit aspect-video overflow-clip'
          onMouseMove={handleMouseMove}
          onMouseEnter={() => handleVideoHover("View Reel")}
          onMouseLeave={handleVideoLeave}
          {...fadeInUp}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2,
          }}
        >
          <img
            src='/images/about_auw.png'
            alt='about'
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

      {/* TODO: disable on screens smaller than 1024px */}
      <div className='relative h-[75vh]'>
        <div className='sticky my-[10%] top-[25%] flex justify-center gap-[14px]'>
          <motion.div
            ref={animatedDivRef}
            className='col-start-3 cursor-pointer'
            onMouseMove={handleMouseMove}
            onMouseEnter={() =>
              handleVideoHover("LISTENING EXPERIENCE")
            }
            onMouseLeave={handleVideoLeave}
            {...fadeInUp}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            <img
              src='/images/about_auw.png'
              alt='about'
              className='w-full h-full object-cover'
            />
          </motion.div>
        </div>
      </div>

      <div className='flex margin-top margin-bottom md:flex-row flex-col justify-between'>
        <div className='h1'>
          A look at brands we've helped bring to life.
        </div>
        <div className='w-fit'>
          <FillLink text={"View All Projects"} link={"/work"} />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-[14px]'>
        <motion.div
          className='col-span-12 cursor-pointer'
          onMouseMove={handleMouseMove}
          onMouseEnter={() =>
            handleVideoHover(
              `${projects[0].title} | ${projects[0].description}`
            )
          }
          onMouseLeave={handleVideoLeave}
          {...fadeInUp}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2,
          }}
        >
          {projects[0].videoUrl ? (
            <video
              src={projects[0].videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className='w-full h-full object-cover'
              onMouseLeave={handleVideoLeave}
            />
          ) : (
            <img
              src={projects[0].imageUrl || "/images/about_auw.png"}
              alt={projects[0].title}
              className='w-full h-full object-cover'
              onMouseLeave={handleVideoLeave}
            />
          )}
        </motion.div>
        <motion.div
          className='col-span-12 cursor-pointer'
          onMouseMove={handleMouseMove}
          onMouseEnter={() =>
            handleVideoHover(
              `${projects[1].title} | ${projects[1].description}`
            )
          }
          onMouseLeave={handleVideoLeave}
          {...fadeInUp}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.4,
          }}
        >
          {projects[1].videoUrl ? (
            <video
              src={projects[1].videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className='w-full h-full object-cover'
              onMouseLeave={handleVideoLeave}
            />
          ) : (
            <img
              src={projects[1].imageUrl}
              alt={projects[1].title}
              className='w-full h-full object-cover'
              onMouseLeave={handleVideoLeave}
            />
          )}
        </motion.div>
        <motion.div
          className='col-span-12 cursor-pointer'
          onMouseMove={handleMouseMove}
          onMouseEnter={() =>
            handleVideoHover(
              `${projects[2].title} | ${projects[2].description}`
            )
          }
          onMouseLeave={handleVideoLeave}
          {...fadeInUp}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.6,
          }}
        >
          {projects[2].videoUrl ? (
            <video
              src={projects[2].videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className='w-full h-full object-cover'
              onMouseLeave={handleVideoLeave}
            />
          ) : (
            <img
              src={projects[2].imageUrl || "/images/about_auw.png"}
              alt={projects[2].title}
              className='w-full h-full object-cover'
              onMouseLeave={handleVideoLeave}
            />
          )}
        </motion.div>
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
