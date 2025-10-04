"use client";

import FillButton from "@/components/FillButton/FillButton";
import Link from "next/link";

export default function About() {
  return (
    <div className='h-full w-full margin-top mb-20'>
      <div className='h1 margin-bottom'>
        We turn ideas into brands people instantly understand.
      </div>
      <div className='w-full h-full'>
        <img src='/images/about_auw.png' alt='about' />
      </div>
      <div className='pt-[34px] flex flex-col gap-6'>
        <p className='uppercase text-[12px] text-[#838383]'>
          Who We Are
        </p>
        <div className='h1'>
          A design studio crafting intentional, cohesive work across
          brand, digital, and physical mediums. We bring every element
          together with clarity, structure, and purpose so your brand
          feels unified and built to last.
        </div>
        <div className='w-fit'>
          <FillButton text='Book a call' />
        </div>
      </div>

      <div className='listening-experience my-20 flex justify-center items-center'>
        <Link href='/listening-experience'>
          <img
            src='/images/listening_experience.png'
            alt='listening-experience'
          />
        </Link>
      </div>
    </div>
  );
}
