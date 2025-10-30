"use client";

import { motion } from "framer-motion";
import { blurIn } from "@/utils/animations";

export default function VideoDim({
  colSpan,
  imgLink,
  videoLink,
  viewportMargin = "-150px",
  withBlurIn = true,
}) {
  return (
    <div
      className={`col-span-${colSpan} aspect-video w-full h-full relative overflow-hidden max-h-[calc(100vh-28px)]`}
    >
      {/* Gray background placeholder */}
      <div className='absolute inset-0 bg-gray-300 w-full h-full ' />

      {/* Animated content with blur effect */}
      <motion.div
        className='absolute inset-0 w-full h-full overflow-hidden'
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
            className='w-full h-full object-cover '
          />
        )}

        {/* Show image if only imgLink is provided */}
        {imgLink && !videoLink && (
          <img
            src={imgLink}
            alt='about'
            className='w-full h-full object-cover '
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
            className='w-full h-full object-cover '
          />
        )}
      </motion.div>
    </div>
  );
}
