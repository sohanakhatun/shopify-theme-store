if (!customElements.get("carousel-component")) {
  class Carousel extends HTMLElement {
    constructor() {
      super();
      this.carouselElement = this;

      if (!this.carouselElement.classList.contains("splide")) return;
      document.addEventListener("DOMContentLoaded", function () {
        var testimonialSlider;
        var mainImageSlider;
        var carouselElements = document.querySelectorAll(".splide");
        carouselElements.forEach(function (carouselElement) {
          if (
            carouselElement.classList.contains("slider-wrapper--image-splide")
          ) {
            mainImageSlider = new Splide(carouselElement, {
              arrows: false,
              pagination: false,
            }).mount();
          } else {
            testimonialSlider = new Splide(carouselElement, {
              arrows: false,
            }).mount();
          }
        });
        // Sync testimonial slider with main image slider
        if (testimonialSlider && mainImageSlider) {
          testimonialSlider.on("moved", function (newIndex) {
            mainImageSlider.go(newIndex);
          });
        }
      });

      this.desktopPerPage = this.carouselElement.dataset["desktopperpage"] || 4;
      this.mobilePerPage = this.carouselElement.dataset["mobileperpage"] || 1;
      this.focus = this.carouselElement.dataset["focus"] || "center";
      this.type = this.carouselElement.dataset["type"] || "slide";
      this.gap = this.carouselElement.dataset["gapbetweenslides"] || 10;
      this.gapMobile =
        this.carouselElement.dataset["gapbetweenslidesonmobile"] || 10;
      this.autoplaySpeed = parseInt(this.dataset["autoplaySpeed"]) || 3000;
      this.mobilePaddingLeft =
        this.carouselElement.dataset["mobilepaddingleft"] || "0";
      this.mobilePaddingRight =
        this.carouselElement.dataset["mobilepaddingright"] || "0";
      this.desktopPaddingLeft =
        this.carouselElement.dataset["desktoppaddingleft"] || "0";
      this.desktopPaddingRight =
        this.carouselElement.dataset["desktoppaddingright"] || "0";
      this.showarrows =
        this.carouselElement.dataset["showarrows"] === "true" || false;
      this.autoplay =
        this.carouselElement.dataset["autoplay"] === "true" || false;
      this.showarrowsonmobile =
        this.carouselElement.dataset["showarrowsonmobile"] === "true" || false;
      this.showdots =
        this.carouselElement.dataset["showdots"] === "true" || false;
      this.showdotsonmobile =
        this.carouselElement.dataset["showdotsonmobile"] === "true" || false;
      this.isNavigation =
        this.carouselElement.dataset["isnavigation"] === "true" || false;
      this.disableDrag =
        this.carouselElement.dataset["disabledrag"] === "true" || false;
      this.destroyOnMobile =
        this.carouselElement.dataset["enableonmobile"] == "false" || false;
      this.destroyOnDesktop =
        this.carouselElement.dataset["enableondesktop"] == "false" || false;
      this.initCarousel();
    }

    initCarousel() {
      if (this.destroyOnMobile && this.destroyOnDesktop) return;
      document.addEventListener("DOMContentLoaded", function () {
        this.carousel = new Splide(this.carouselElement, {
          perPage: this.desktopPerPage,
          type: this.type,
          autoplay: this.autoplay,
          interval: this.autoplaySpeed,
          gap: this.gap,
          arrows: false,
          pagination: this.showdots,
          isNavigation: this.isNavigation,
          drag: !this.disableDrag,
          destroy: this.destroyOnDesktop,
          padding: {
            left: this.desktopPaddingLeft,
            right: this.desktopPaddingRight,
          },
        });
      });
      this.carousel.mount();
    }
  }

  window.Carousel = Carousel;
  customElements.define("carousel-component", Carousel);
}
