"use client";

import FillButton from "@/components/FillButton/FillButton";
import Link from "next/link";

export default function ParagraphEyebrow({
  eyebrowText,
  mainText,
  buttonText,
  buttonLink,
  targetBlank,
  className,
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p className='eyebrow italic'>{eyebrowText}</p>
      <div className='grid grid-cols-12'>
        <div className='h1 col-span-9'>{mainText}</div>
      </div>
      {buttonText && (
        <div className='w-fit'>
          <FillButton
            targetBlank={targetBlank}
            link={buttonLink}
            text={buttonText}
          />
        </div>
      )}
    </div>
  );
}
