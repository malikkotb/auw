/**
 * Shared Framer Motion animation variants
 * Centralized location for consistent animations across all pages
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, margin: "-100px" },
};

export const growFromLeft = {
  initial: { width: 0 },
  whileInView: { width: "100%" },
  transition: { duration: 0.6, ease: "easeInOut" },
  viewport: { once: true },
};

export const staggerVariants = {
  container: {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
};

export const blurIn = {
  initial: { filter: "blur(80px)", opacity: 0 },
  whileInView: {
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      //   ease: [0.04, 0.64, 0.17, 1] // Custom easing for smooth acceleration and deceleration
    },
  },
  viewport: { once: true, margin: "-250px" },
};
