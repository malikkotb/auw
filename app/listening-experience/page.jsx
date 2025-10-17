"use client";

import { useHeaderHeight } from "@/hooks/useHeaderHeight";

export default function ListeningExperience() {
  const headerHeight = useHeaderHeight();
  return (
    <div
      className='iframe-wrapper'
      style={{
        position: "fixed",
        width: "100%",
        top: headerHeight,
        bottom: "14px",
        // left: "14px",
        // right: "14px",
        left: 0,
        overflow: "hidden",
        paddingLeft: "14px",
        paddingRight: "14px",
      }}
    >
      <iframe
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        src='https://sound-studio-eight.vercel.app/'
        allowFullScreen
        loading='lazy'
      ></iframe>
    </div>
  );
}
