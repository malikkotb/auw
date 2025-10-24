"use client";

import { useHeaderHeight } from "@/hooks/useHeaderHeight";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import FillLink from "@/components/FillButton/FillLink";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import Lenis from "lenis";
export default function AboutClient({ clientsData }) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const headerHeight = useHeaderHeight();
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
    <div className='h-full w-full bg-white'>
      <div className='flex flex-col h-[calc(100vh-28px)] desktop:h-auto desktop:min-h-screen'>
        <motion.div
          className='h1 text-26 items-center desktop:items-start flex h-full xl:mb-[120px] xl:mt-[120px]'
          {...fadeInUp}
        >
          We turn ideas into brands people instantly understand.
        </motion.div>
        <motion.div
          className='w-full flex desktop:h-full h-fit aspect-video overflow-clip'
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

      <motion.div
        className='pt-[34px] flex flex-col gap-2'
        {...fadeInUp}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <p className='eyebrow'>Our Mission</p>
        <div className='grid grid-cols-12'>
          <div className='h1 col-span-12'>
            Our mission is to design brands that are clear, connected,
            and built to last. We work closely with our clients to
            turn their ideas into visual systems that people connect
            with and remember.
          </div>
        </div>
        <div className='w-fit'>
          <FillLink text='Contact Us' />
        </div>
      </motion.div>

      {/* Capabilities, Clients, Press */}
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
      {/* </div> */}
      <Footer />
    </div>
  );
}
