"use client";

import { useHeaderHeight } from "@/hooks/useHeaderHeight";

export default function ListeningExperience() {
  const headerHeight = useHeaderHeight();
  return (
    <div
      className='iframe-wrapper bg-white'
      style={{
        position: "fixed",
        width: "100%",
        top: headerHeight,
        paddingBottom: "14px",
        bottom: 0,
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
