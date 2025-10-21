/**
 * Page transition animation utility function
 * Creates a smooth fade transition between pages using CSS view transitions
 */
export function pageAnimation() {
  const oldPageAnimation = document.documentElement.animate(
    [
      {
        opacity: 1,
        // transform: "translateY(0)",
      },
      {
        opacity: 0,
        // transform: "translateY(-100px)",
      },
    ],
    {
      duration: 600,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(page-content)",
    }
  );

  // Wait for old page animation to finish, then start new page animation
  oldPageAnimation.addEventListener("finish", () => {
    document.documentElement.animate(
      [
        {
          opacity: 0,
          // transform: "translateY(100px)",
        },
        {
          opacity: 1,
          // transform: "translateY(0)",
        },
      ],
      {
        duration: 600,
        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(page-content)",
      }
    );
  });
}

// const pageAnimation = () => {
//   document.documentElement.animate(
//     [
//       {
//         opacity: 1,
//         scale: 1,
//         transform: "translateY(0)",
//       },
//       {
//         opacity: 0.5,
//         scale: 0.9,
//         transform: "translateY(-100px)",
//       },
//     ],
//     {
//       duration: 1000,
//       easing: "cubic-bezier(0.76, 0, 0.24, 1)",
//       fill: "forwards",
//       pseudoElement: "::view-transition-old(root)",
//     }
//   );

//   document.documentElement.animate(
//     [
//       {
//         transform: "translateY(100%)",
//       },
//       {
//         transform: "translateY(0)",
//       },
//     ],
//     {
//       duration: 1000,
//       easing: "cubic-bezier(0.76, 0, 0.24, 1)",
//       fill: "forwards",
//       pseudoElement: "::view-transition-new(root)",
//     }
//   );
// };
