"use client";

import { useHeaderHeight } from "@/hooks/useHeaderHeight";

export default function ListeningExperience() {
  const headerHeight = useHeaderHeight();
  return (
    <div
      className='iframe-wrapper'
      style={{
        position: "relative",
        width: "100%",
        height: `calc(100vh - ${headerHeight}px)`,
        overflow: "hidden",
      }}
    >
      <iframe
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        src='https://sound-studio-eight.vercel.app/'
        // frameBorder='0'
        allowFullScreen
        loading='lazy'
      ></iframe>
    </div>
  );
}
