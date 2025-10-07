"use client";

import FillButton from "@/components/FillButton/FillButton";
import Link from "next/link";
import React from "react";
import Footer from "@/components/Footer/Footer";

export default function About() {
  const [activeService, setActiveService] = React.useState("Skill");

  const serviceContent = {
    Skill:
      "We combine technical expertise with creative innovation to deliver cutting-edge solutions that push boundaries and set new standards in digital design.",
    Taste:
      "Our refined aesthetic sensibility ensures every project embodies sophistication, elegance, and contemporary design principles that resonate with discerning audiences.",
    Relations:
      "Building lasting partnerships through clear communication, understanding, and collaborative processes that transform ideas into meaningful brand experiences.",
    Physical:
      "Bridging digital and physical realms to create tangible brand experiences that leave lasting impressions in the real world.",
  };
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
        <p className='eyebrow'>Who We Are</p>
        <div className='grid grid-cols-12'>
          <div className='h1 col-span-9'>
            A design studio crafting intentional, cohesive work across
            brand, digital, and physical mediums. We bring every
            element together with clarity, structure, and purpose so
            your brand feels unified and built to last.
          </div>
        </div>
        <div className='w-fit'>
          <FillButton text='Book a call' />
        </div>
      </div>

      <div className='listening-experience lg:my-40 my-20 grid grid-cols-12 gap-[14px] justify-center items-center'>
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
      </div>

      {/* Hover Animation section */}
      

      {/* Details section */}
      <div className='grid grid-cols-12 gap-[14px] relative'>
        <div className='col-span-2 h-full flex flex-col justify-between'>
          <div className='flex flex-col gap-2'>
            <div>
              <p className='eyebrow italic'>Location</p>
              <div className='h1'>New York City</div>
            </div>
            <div>
              <p className='eyebrow italic'>Established</p>
              <div className='h1'>Octover 2023</div>
            </div>
            <div>
              <p className='eyebrow italic'>Founded by</p>
              <div className='h1'>Jeff Visoky</div>
            </div>
          </div>
          <div className='w-fit'>
            <FillButton text='Book a call' />
          </div>
        </div>
        {/* <div className='absolute bottom-0 col-span-1 left-0 w-[calc((100%/12)-14px)]'>
          <FillButton text='Book a call' />
        </div> */}
        <div className='col-span-7 col-start-6 w-full h-full'>
          <img
            src='/images/color_palette.png'
            alt='color-pallette'
            className='w-full h-full'
          />
        </div>
      </div>

      {/* Technical Skillset / Services section */}
      <div className='margin-top grid grid-cols-12 gap-[14px]'>
        <div className='col-span-2 flex flex-col'>
          {Object.keys(serviceContent).map((service) => (
            <h2
              key={service}
              className={`h2 cursor-pointer transition-all duration-300 ${
                activeService === service
                  ? "text-black"
                  : "text-[#838383]"
              }`}
              onMouseEnter={() => setActiveService(service)}
            >
              {service}
            </h2>
          ))}
        </div>
        <div className='col-span-7 col-start-6 w-full h-full'>
          <p className='eyebrow italic pb-2'>Technical Skillset</p>
          <div className='h1 transition-all duration-300'>
            {serviceContent[activeService]}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
