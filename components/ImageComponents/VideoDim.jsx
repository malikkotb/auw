"use client";

import { motion } from "framer-motion";
import { blurIn } from "@/utils/animations";

export default function VideoDim({ colSpan, imgLink, videoLink }) {
  return (
    <div
      className={`col-span-${colSpan} aspect-video w-full h-full relative overflow-hidden max-h-[calc(100vh-28px)]`}
    >
      {/* Gray background placeholder */}
      <div className='absolute inset-0 bg-gray-300 w-full h-full ' />

      {/* Animated content with blur effect */}
      <motion.div
        className='absolute inset-0 w-full h-full overflow-hidden'
        {...blurIn}
      >
        {/* Show video if both imgLink and videoLink are provided */}
        {imgLink && videoLink && (
          <video
            src={videoLink}
            muted
            playsInline
            autoPlay
            loop
            className='w-full h-full object-fill '
          />
        )}

        {/* Show image if only imgLink is provided */}
        {imgLink && !videoLink && (
          <img
            src={imgLink}
            alt='about'
            className='w-full h-full object-fill '
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
            className='w-full h-full object-fill '
          />
        )}
      </motion.div>
    </div>
  );
}
