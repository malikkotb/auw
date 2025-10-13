"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer/Footer";
import gsap from "gsap";
import FillLink from "@/components/FillButton/FillLink";

export default function About() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeService, setActiveService] = useState("Skill");

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

  const skills = ["Brand", "Digital", "Motion"];

  const image1 = useRef(null);
  const image2 = useRef(null);
  const image3 = useRef(null);

  useEffect(() => {
    // TODO: add smoother easing to these animations (animations on the web course)
    if (activeSkill === skills[0]) {
      gsap.to([image1.current], {
        y: "0%",
      });
      gsap.to([image2.current, image3.current], {
        y: "105%",
      });
    } else if (activeSkill === skills[1]) {
      gsap.to([image2.current], {
        y: "0%",
      });
      gsap.to([image1.current, image3.current], {
        y: "105%",
      });
    } else if (activeSkill === skills[2]) {
      gsap.to([image3.current], {
        y: "0%",
      });
      gsap.to([image1.current, image2.current], {
        y: "105%",
      });
    } else if (activeSkill === null) {
      gsap.to([image1.current, image2.current, image3.current], {
        y: "0",
      });
    }
  }, [activeSkill]);

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
          <div className='h1 col-span-12'>
            A design studio crafting intentional, cohesive work across
            brand, digital, and physical mediums. We bring every
            element together with clarity, structure, and purpose so
            your brand feels unified and built to last.
          </div>
        </div>
        <div className='w-fit'>
          <FillLink text='Book a call' />
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

      {/* Hover Card Translation-Animation section */}
      <div className='grid grid-cols-12 gap-[14px] mb-[50vh]'>
        <div className='col-span-3'>
          {skills.map((skill) => (
            <h2
              key={skill}
              className={`h2 cursor-pointer transition-all duration-300 ${
                activeSkill === skill
                  ? "text-black"
                  : "text-[#838383]"
              }`}
              onMouseEnter={() => setActiveSkill(skill)}
              onMouseLeave={() => setActiveSkill(null)}
            >
              {skill}
            </h2>
          ))}
          <h2 className={`h2`}>& More</h2>
        </div>
        <div className='col-span-3 w-full h-full aspect-ig'>
          {/* TODO: get correct image here from figma */}
          <img
            ref={image1}
            src='images/3.png'
            className='object-cover w-full h-full'
            alt=''
          />
        </div>
        <div className='col-span-3 w-full h-full aspect-ig'>
          {/* TODO: get correct image here from figma */}
          <img
            ref={image2}
            src='images/3.png'
            className='object-cover w-full h-full'
            alt=''
          />
        </div>
        <div className='col-span-3 w-full h-full aspect-ig'>
          {/* TODO: get correct image here from figma */}
          <img
            ref={image3}
            src='images/3.png'
            className='object-cover w-full h-full'
            alt=''
          />
        </div>
      </div>

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
            <FillLink text='Book a call' />
          </div>
        </div>
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
