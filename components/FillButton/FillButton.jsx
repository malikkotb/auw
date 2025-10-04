"use client";
import { IBM_Plex_Mono } from "next/font/google";
import "./FillButton.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function FillButton({
  text,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`push-fill-btn font-medium ${ibmPlexMono.className} ${className}`}
    >
      <div className='push-fill-btn-bg' />
      <span className='btn-text'>{text}</span>
    </button>
  );
}
