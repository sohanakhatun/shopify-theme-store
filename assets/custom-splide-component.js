if (!customElements.get("carousel-component")) {
  class Carousel extends HTMLElement {
    constructor() {
      super();
      this.carouselElement = this;
      if (!this.carouselElement.classList.contains("splide")) return;
      this.initSliders();
      window.addEventListener('resize', this.handleResize.bind(this));
    }
    initSliders() {
      // Define the variables and get slider elements
      this.thumbnailImageSlider = null;
      this.mainImageSlider = null;
      var carouselElements = document.querySelectorAll(".product-card-slider");

      carouselElements.forEach((carouselElement) => {
        // Check if the current device is desktop based on the window width
        var isDesktop = window.innerWidth >= 900;
        if (carouselElement.classList.contains("slider-wrapper--image-splide")) {
          this.mainImageSlider = new Splide(carouselElement, {
            arrows: true,
            pagination: false,
            perPage: 1,
            perMove: 1
          }).mount();
        } else {
          this.thumbnailImageSlider = new Splide(carouselElement, {
            gap: 10,
            rewind: true,
            pagination: false,
            isNavigation: true,
            direction: isDesktop ? "ttb" : "ltr",
            height: isDesktop ? "666px" : "auto",
            autoHeight: !isDesktop,
            perPage: 3,
            autoplay: false,
            arrows: false
          }).mount();
        }
      });
      // Sync thumbnail slider with main image slider
      if (this.thumbnailImageSlider && this.mainImageSlider) {
        this.mainImageSlider.sync(this.thumbnailImageSlider);
      }
    }
    handleResize() {
      // Destroy the existing sliders if they exist
      if (this.mainImageSlider) {
        this.mainImageSlider.destroy();
      }
      if (this.thumbnailImageSlider) {
        this.thumbnailImageSlider.destroy();
      }
      // Reinitialize the sliders
      this.initSliders();
    }
  }
  window.Carousel = Carousel;
  customElements.define("carousel-component", Carousel);
}

document.addEventListener("DOMContentLoaded", function () {
  var carouselComponent = document.querySelector("carousel-component");
  if (carouselComponent) {
    carouselComponent.initSliders();
  }
});
