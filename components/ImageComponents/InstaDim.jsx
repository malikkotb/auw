"use client";

import { motion } from "framer-motion";
import { blurIn } from "@/utils/animations";

export default function InstaDim({ colSpan, imgLink, videoLink, viewportMargin = "-150px", withBlurIn = true }) {
  const getColSpanClass = (span) => {
    const classes = {
      1: "sm:col-span-1",
      2: "sm:col-span-2",
      3: "sm:col-span-3",
      4: "sm:col-span-4",
      5: "sm:col-span-5",
      6: "sm:col-span-6",
      7: "sm:col-span-7",
      8: "sm:col-span-8",
      9: "sm:col-span-9",
      10: "sm:col-span-10",
      11: "sm:col-span-11",
      12: "sm:col-span-12",
    };
    return classes[span] || "sm:col-span-12";
  };

  // If neither imgLink nor videoLink are provided, show nothing
  if (!imgLink && !videoLink) {
    return null;
  }

  return (
    <div
      className={`${getColSpanClass(
        colSpan
      )} col-span-12 aspect-[4/5] w-full relative`}
    >
      {/* Gray background placeholder */}
      <div className='absolute inset-0 bg-gray-300 w-full h-full ' />

      {/* Animated content with blur effect */}
      <motion.div
        className='absolute inset-0 w-full h-full'
        {...(withBlurIn ? blurIn : {})}
        viewport={{ once: true, margin: viewportMargin }}
      >
        {/* Show video if both imgLink and videoLink are provided */}
        {imgLink && videoLink && (
          <video
            src={videoLink}
            muted
            playsInline
            autoPlay
            loop
            className='w-full h-full object-cover'
          />
        )}

        {/* Show image if only imgLink is provided */}
        {imgLink && !videoLink && (
          <img
            src={imgLink}
            alt='about'
            className='w-full h-full object-cover'
          />
        )}

        {/* Show video if only videoLink is provided */}
        {videoLink && !imgLink && (
          <video
            src={videoLink}
            muted
            playsInline
            autoPlay
            loop
            className='w-full h-full object-cover'
          />
        )}
      </motion.div>
    </div>
  );
}
