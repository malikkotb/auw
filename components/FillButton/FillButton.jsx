"use client";
import { IBM_Plex_Mono } from "next/font/google";
import "./FillButton.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function FillButton({
  text,
  link,
  targetBlank = false,
  onClick,
  className = "",
}) {
  const handleMouseEnter = (e) => {
    // Instant change on hover
    e.currentTarget.style.transition = "none";
    e.currentTarget.style.backgroundColor = "black";
    const textEl = e.currentTarget.querySelector(".btn-text");
    textEl.style.transition = "none";
    textEl.style.color = "white";
  };

  const handleMouseLeave = (e) => {
    // Smooth transition on mouse leave
    e.currentTarget.style.transition = "background-color 1s ease-out";
    e.currentTarget.style.backgroundColor = "white";
    const textEl = e.currentTarget.querySelector(".btn-text");
    textEl.style.transition = "color 1s ease-out";
    textEl.style.color = "black";
  };

  return (
    <a
      href={link}
      target={targetBlank ? "_blank" : "_self"}
      className={`push-fill-btn cursor-pointer font-medium ${ibmPlexMono.className} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: "white",
        border: "1px solid black",
        // paddingLeft: "12px",
        // paddingRight: "12px",
        // paddingTop: "6px",
        // paddingBottom: "6px",
      }}
    >
      <div className='btn-text' style={{ color: "black" }}>
        {text}
      </div>
    </a>
  );
}
