(() => {
  const carousel = document.querySelector("[data-project-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const previous = carousel.querySelector("[data-carousel-previous]");
  const next = carousel.querySelector("[data-carousel-next]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  let timer;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.toggleAttribute("inert", !isActive);
    });

    dots.forEach((dot, dotIndex) => {
      dot.setAttribute("aria-current", String(dotIndex === activeIndex));
    });
  };

  const stopAutoplay = () => window.clearInterval(timer);
  const startAutoplay = () => {
    if (reduceMotion || slides.length < 2) return;
    stopAutoplay();
    timer = window.setInterval(() => showSlide(activeIndex + 1), 7000);
  };

  previous?.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    startAutoplay();
  });

  next?.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    startAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startAutoplay();
    });
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", startAutoplay);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  startAutoplay();
})();
