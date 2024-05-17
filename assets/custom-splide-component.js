if (!customElements.get("carousel-component")) {
  class Carousel extends HTMLElement {
    constructor() {
      super();
      this.carouselElement = this;
      if (!this.carouselElement.classList.contains("splide")) return;
      this.initSliders();
      window.addEventListener("resize", this.handleResize.bind(this));
    }
    initSliders() {
      this.thumbnailImageSlider = null;
      this.mainImageSlider = null;
      var carouselElements = document.querySelectorAll(".product-card-slider");

      carouselElements.forEach((carouselElement) => {
        var isDesktop = window.innerWidth >= 1000;
        if (
          carouselElement.classList.contains("slider-wrapper--image-splide")
        ) {
          this.mainImageSlider = new Splide(carouselElement, {
            arrows: true,
            pagination: false,
            perPage: 1,
            perMove: 1,
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
            arrows: false,
          }).mount();
        }
      });
      if (this.thumbnailImageSlider && this.mainImageSlider) {
        this.mainImageSlider.sync(this.thumbnailImageSlider);
      }
    }

    handleResize() {
      if (this.mainImageSlider) {
        this.mainImageSlider.destroy();
      }
      if (this.thumbnailImageSlider) {
        this.thumbnailImageSlider.destroy();
      }
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
