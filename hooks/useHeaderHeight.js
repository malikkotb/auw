"use client";

import { useState, useEffect } from "react";

export const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        // Get the actual rendered height including padding and borders
        const height = header.getBoundingClientRect().height;
        console.log("Header height updated:", height + "px");
        setHeaderHeight(height);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Create a ResizeObserver to watch the header element
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    const header = document.querySelector("header");
    if (header) {
      resizeObserver.observe(header);
    }

    // Also listen to window resize events for good measure
    window.addEventListener("resize", updateHeaderHeight);

    // Cleanup
    return () => {
      if (header) {
        resizeObserver.unobserve(header);
      }
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []); // Empty dependency array since we want this to run once on mount

  return headerHeight;
};
