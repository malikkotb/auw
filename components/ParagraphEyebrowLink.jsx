"use client";

import FillLink from "@/components/FillButton/FillLink";

export default function ParagraphEyebrowLink({
  eyebrowText,
  mainText,
  buttonText,
  buttonLink,
  className,
}) {
  return (
    // <div className={`mt-[25%] flex flex-col gap-2 mb-2 ${className}`}>
    <div className={`flex flex-col gap-2 pb-[14px] ${className}`}>
      <p className='eyebrow'>{eyebrowText}</p>
      <div className='grid grid-cols-12'>
        <div className='h2 col-span-12 sm:col-span-9'>{mainText}</div>
      </div>
      {buttonText && (
        <div className='w-fit h-full flex items-center'>
          <FillLink text={buttonText} link={buttonLink} />
        </div>
      )}
    </div>
  );
}
