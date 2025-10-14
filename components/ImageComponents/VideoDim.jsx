"use client";

export default function VideoDim({ colSpan, imgLink, videoLink }) {
  // Add functionaltiy, if both imgLink and videoLink are provided, show the video
  if (imgLink && videoLink) {
    return (
      <div
        className={`col-span-${colSpan} aspect-video w-full h-full`}
      >
        <video
          src={videoLink}
          muted
          playsInline
          autoPlay
          loop
          className='w-full h-full object-cover'
        ></video>
      </div>
    );
  }
  // if only imgLink is provided, show the img
  if (imgLink) {
    return (
      <div
        className={`col-span-${colSpan} aspect-video w-full h-full`}
      >
        <img
          src={imgLink}
          alt='about'
          className='w-full h-full object-cover'
        />
      </div>
    );
  }
  // if only videoLink is provided, show the video
  if (videoLink) {
    return (
      <div
        className={`col-span-${colSpan} aspect-video w-full h-full`}
      >
        <video
          src={videoLink}
          muted
          playsInline
          autoPlay
          loop
          className='w-full h-full object-cover'
        ></video>
      </div>
    );
  }
}
