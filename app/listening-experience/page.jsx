"use client";

export default function ListeningExperience() {
  return (
    <div
      className='iframe-wrapper'
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 28px)",
        overflow: "hidden",
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: 0,
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
