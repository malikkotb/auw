import React, { useEffect } from "react";
import "./HoverList.css";
const HoverList = ({ projects }) => {
  useEffect(() => {
    function initDirectionalListHover() {
      const directionMap = {
        top: "translateY(-100%)",
        bottom: "translateY(100%)",
        left: "translateX(-100%)",
        right: "translateX(100%)",
      };

      document
        .querySelectorAll("[data-directional-hover]")
        .forEach((container) => {
          const type = container.getAttribute("data-type") || "all";

          container
            .querySelectorAll("[data-directional-hover-item]")
            .forEach((item) => {
              const tile = item.querySelector(
                "[data-directional-hover-tile]"
              );
              if (!tile) return;

              item.addEventListener("mouseenter", (e) => {
                const dir = getDirection(e, item, type);
                tile.style.transition = "none";
                tile.style.transform =
                  directionMap[dir] || "translate(0, 0)";
                void tile.offsetHeight; // force reflow
                tile.style.transition = "";
                tile.style.transform = "translate(0%, 0%)";
                item.setAttribute("data-status", `enter-${dir}`);
              });

              item.addEventListener("mouseleave", (e) => {
                const dir = getDirection(e, item, type);
                item.setAttribute("data-status", `leave-${dir}`);
                tile.style.transform =
                  directionMap[dir] || "translate(0, 0)";
              });
            });

          function getDirection(event, el, type) {
            const {
              left,
              top,
              width: w,
              height: h,
            } = el.getBoundingClientRect();
            const x = event.clientX - left;
            const y = event.clientY - top;

            if (type === "y") return y < h / 2 ? "top" : "bottom";
            if (type === "x") return x < w / 2 ? "left" : "right";

            const distances = {
              top: y,
              right: w - x,
              bottom: h - y,
              left: x,
            };

            return Object.entries(distances).reduce((a, b) =>
              a[1] < b[1] ? a : b
            )[0];
          }
        });
    }

    initDirectionalListHover();
  }, []);

  return (
    <div
      data-directional-hover
      data-type='y'
      className='directional-list'
    >
      <div className='directional-list__collection'>
        <div className='directional-list__list'>
          {projects.map((project) => (
            <a
              key={project.id}
              data-directional-hover-item
              href={project.url}
              target='_blank'
              rel='noreferrer'
              className='directional-list__item'
            >
              <div
                data-directional-hover-tile
                className='directional-list__hover-tile'
              ></div>
              <div className='directional-list__border is--item'></div>
              <div className='directional-list__col-award'>
                <p className='direcitonal-list__p'>{project.title}</p>
              </div>
              <div className='directional-list__col-client'>
                <p className='direcitonal-list__p'>
                  {project.description}
                </p>
              </div>
              <div className='directional-list__col-year'>
                <p className='direcitonal-list__p'>
                  ({project.year})
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className='directional-list__border'></div>
    </div>
  );
};

export default HoverList;
