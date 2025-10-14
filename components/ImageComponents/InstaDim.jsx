"use client";

export default function InstaDim({ colSpan, imgLink, videoLink }) {
  // Create a mapping for column span classes
  const getColSpanClass = (span) => {
    const classes = {
      1: "sm:col-span-1",
      2: "sm:col-span-2",
      3: "sm:col-span-3",
      4: "sm:col-span-4",
      5: "sm:col-span-5",
      6: "sm:col-span-6",
      7: "sm:col-span-7",
      8: "sm:col-span-8",
      9: "sm:col-span-9",
      10: "sm:col-span-10",
      11: "sm:col-span-11",
      12: "sm:col-span-12",
    };
    return classes[span] || "sm:col-span-12";
  };
  // Add functionaltiy, if both imgLink and videoLink are provided, show the video
  if (imgLink && videoLink) {
    return (
      <div
        className={`${getColSpanClass(
          colSpan
        )} col-span-12 aspect-[4/5] w-full`}
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
        className={`${getColSpanClass(
          colSpan
        )} col-span-12 aspect-[4/5] w-full`}
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
        className={`${getColSpanClass(
          colSpan
        )} col-span-12 aspect-[4/5] w-full`}
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
  // if neither imgLink nor videoLink are provided, show nothing
  return null;
}
