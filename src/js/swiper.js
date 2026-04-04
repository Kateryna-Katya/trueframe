import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

Swiper.use([Navigation, Pagination]);

function destroySwiper(swiper) {
  if (!swiper) return;

  // destroy + clean styles
  swiper.destroy(true, true);

  // на всякий случай: убрать inline стили, которые могли остаться
  const el = swiper.el;
  el?.removeAttribute("style");

  const wrapper = el?.querySelector(".swiper-wrapper");
  wrapper?.removeAttribute("style");

  el?.querySelectorAll(".swiper-slide").forEach((slide) => {
    slide.removeAttribute("style");
  });
}

function makeResponsiveSwiper({
  rootSelector,
  prevEl,
  nextEl,
  paginationEl,
}) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const swiperEl = root.querySelector(".swiper");
  if (!swiperEl) return;

  let instance = null;
  const mq = window.matchMedia("(min-width: 1440px)");

  const enable = () => {
    if (instance) return;

    instance = new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 450,
      loop: false,
      grabCursor: true,

      navigation: {
        prevEl,
        nextEl,
      },
      pagination: {
        el: paginationEl,
        clickable: true,
        type: "bullets",
      },
    });
  };

  const disable = () => {
    if (!instance) return;
    destroySwiper(instance);
    instance = null;
  };

  const sync = () => {
    if (mq.matches) disable(); // >=1440 — без свипера
    else enable();            // <1440 — свипер есть
  };

  // initial
  sync();

  // changes
  const onChange = () => sync();
  if (mq.addEventListener) mq.addEventListener("change", onChange);
  else mq.addListener(onChange); 
}

makeResponsiveSwiper({
  rootSelector: ".reviews-swiper",
  prevEl: ".reviews-prev",
  nextEl: ".reviews-next",
  paginationEl: ".reviews-pagination",
});

makeResponsiveSwiper({
  rootSelector: ".easy-swiper",
  prevEl: ".easy-prev",
  nextEl: ".easy-next",
  paginationEl: ".easy-pagination",
});