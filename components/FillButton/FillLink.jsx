"use client";
import { IBM_Plex_Mono } from "next/font/google";
import "./FillButton.css";
import Link from "next/link";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function FillLink({ text, className = "" }) {
  return (
    <Link
      href={"/contact"}
      className={`push-fill-btn cursor-pointer font-medium ${ibmPlexMono.className} ${className}`}
    >
      <div className='push-fill-btn-bg' />
      <span className='btn-text'>{text}</span>
    </Link>
  );
}
