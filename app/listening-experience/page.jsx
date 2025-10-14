"use client";

export default function ListeningExperience() {
  return (
    <div
      className='iframe-wrapper'
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 68px)", // 40px (header) - 14px (margin) - 14px padding on listening experience page
        overflow: "hidden",
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: "14px",
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
