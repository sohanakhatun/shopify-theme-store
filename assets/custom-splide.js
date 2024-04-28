if (!customElements.get("carousel-component")) {
  class Carousel extends HTMLElement {
    constructor() {
      super();
      console.log("Carousel constructor called");

      this.carouselElement = this;
      if (!this.carouselElement.classList.contains("splide")) {
        return;
      }
      this.type = this.getAttribute("data-type") || "slide";
      console.log(this.type);
      this.gap = parseInt(this.getAttribute("data-gapbetweenslides")) || 10;
      console.log(this.gap);
      this.autoplaySpeed =
        parseInt(this.getAttribute("data-autoplay-speed")) || 1000;
      console.log(this.autoplaySpeed);
      this.showarrows = this.getAttribute("data-showarrows") === "true";
      console.log(this.showarrows);
      this.autoplay = this.getAttribute("data-autoplay") === "true";
      console.log(this.autoplay);
      this.initCarousel();
    }

    initCarousel() {
      console.log("Init carousel");
      document.addEventListener("DOMContentLoaded", () => {
        console.log("DOM content loaded");
        this.carousel = new Splide(this.carouselElement, {
          type: this.type,
          autoplay: this.autoplay,
          interval: this.autoplaySpeed,
          gap: this.gap,
          arrows: this.showarrows,
          pagination: false,
          perPage: 1,
          perMove: 1,
          rewind: false,
        }).mount();

        console.log(this.carousel)

        this.carousel.on("moved", (newIndex) => {
          const prevButton = this.carousel.root.querySelector(
            ".splide__arrow--prev"
          );
          const nextButton = this.carousel.root.querySelector(
            ".splide__arrow--next"
          );

          if (newIndex === 0) {
            prevButton.disabled = true;
          } else {
            prevButton.disabled = false;
          }

          if (newIndex === this.carousel.length - 1) {
            nextButton.disabled = true;
          } else {
            nextButton.disabled = false;
          }
        });
      });
    }
  }

  window.Carousel = Carousel;
  customElements.define("carousel-component", Carousel);
}
