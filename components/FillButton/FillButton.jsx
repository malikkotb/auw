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
  // TODO: maybe transform this into being either anchor tag
  // or button to have both options in terms of functionality

  return (
    <a
      href={link}
      target={targetBlank ? "_blank" : "_self"}
      className={`push-fill-btn cursor-pointer font-medium ${ibmPlexMono.className} ${className}`}
    >
      <div className='push-fill-btn-bg' />
      <span className='btn-text'>{text}</span>
    </a>
  );
}
