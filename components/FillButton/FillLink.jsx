"use client";
import { IBM_Plex_Mono } from "next/font/google";
import "./FillButton.css";
import TransitionLink from "../TransitionLink";
import { pageAnimation } from "@/utils/pageAnimation";
import { usePathname } from "next/navigation";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function FillLink({
  text,
  className = "",
  link = "/contact",
}) {
  const pathname = usePathname();
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
    <TransitionLink
      href={link}
      className={`push-fill-btn cursor-pointer font-medium ${ibmPlexMono.className} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: "white",
        border: "1px solid black",
        padding: "6px 12px",
      }}
    >
      <div className='btn-text' style={{ color: "black" }}>
        {text}
      </div>
    </TransitionLink>
  );
}
