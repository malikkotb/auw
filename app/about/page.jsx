"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer/Footer";
import gsap from "gsap";
import FillLink from "@/components/FillButton/FillLink";
import ArrowLink from "@/components/ArrowLink/ArrowLink";

export default function About() {
  const clients = [
    "Acid",
    "AWGE",
    "Bad Influence",
    "Barsys",
    "Blatt Billiards",
    "Free Range",
    "Good Gummies",
    "Good Routine",
    "Heaven Mayhem",
    "LacPac",
    "Lost In Spice",
    "Nogum",
    "Oenza",
    "ParaNano",
    "Pet Finn",
    "Scala Computing",
    "Shop Spicy Dan",
    "Sprout Society",
    "The M Jewelers",
  ];
  const [hoveredIndex, setHoveredIndex] = useState(
    clients.length - 1
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

  const clientImages = [
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/6.png",
    "images/7.png",
    "images/8.png",
    "images/9.png",
    "images/10.png",
    "images/11.png",
    "images/12.png",
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/6.png",
    "images/7.png",
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
    <div className='h-full w-full margin-top'>
      <div className='h1 margin-bottom'>
        We turn ideas into brands people instantly understand.
      </div>
      <div className='w-full h-full grid grid-cols-12 gap-[14px]'>
        <img
          src='/images/about_auw.png'
          alt='about'
          className='col-span-12 w-full h-full object-cover'
        />
      </div>
      <div className='pt-[34px] flex flex-col gap-2'>
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
      </div>

      {/* <div className='listening-experience lg:my-40 my-20 grid grid-cols-12 gap-[14px] justify-center items-center'>
        <Link
          href='/listening-experience'
          className='col-start-3 col-span-8'
        >
          <img
            src='/images/listening_experience.png'
            alt='listening-experience'
            className='w-full h-full'
          />
        </Link>
      </div> */}

      {/* Capabilities, Clients, Press */}
      <div className='mt-[80px] md:mt-[160px] grid grid-cols-12 gap-[14px]'>
        <div className='md:col-span-3 col-span-12'>
          <p className='eyebrow'>Capabilities</p>
          <div className='h-[1px] w-full bg-[#838383] mt-1 mb-2'></div>
          {capabilities.map((capability, index) => (
            <div key={index} className='h1'>
              {capability}
            </div>
          ))}
        </div>
        <div className='md:col-span-3 col-span-12'>
          <p className='eyebrow'>Clients</p>
          <div className='h-[1px] w-full bg-[#838383] mt-1 mb-2'></div>
          <div className='flex flex-col'>
            {clients.map((client, index) => (
              <div
                key={index}
                className='h1 cursor-pointer transition-all duration-300 hover:text-[#626262]'
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {client}
              </div>
            ))}
          </div>
          <div className='h1'>& More</div>
        </div>
        <div className='md:col-span-3 col-span-12'>
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
        </div>
        <div className='relative aspect-[4/5] md:col-span-3 col-span-6 md:col-start-11 w-full mt-[18px]'>
          <div className='flex flex-col'>
            {clientImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt='about'
                className={`w-full absolute top-0 left-0 h-full object-cover ${
                  index === hoveredIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
