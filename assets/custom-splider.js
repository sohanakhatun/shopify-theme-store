if (!customElements.get("splider-component")) {
  class Carousel extends HTMLElement {
    constructor() {
      super();
      this.splideElement = this;

      // Carousel element should have class splide
      if (!this.splideElement.classList.contains("splide")) return;

      this.desktopPerPage = this.splideElement.dataset["desktopperpage"] || 3;
      this.mobilePerPage = this.splideElement.dataset["mobileperpage"] || 1;
      this.focus = this.splideElement.dataset["focus"] || "center";
      this.type = this.splideElement.dataset["type"] || "slide";
      this.gap = this.splideElement.dataset["gapbetweenslides"] || 10;
      this.gapMobile =
        this.splideElement.dataset["gapbetweenslidesonmobile"] || 10;
      this.autoplaySpeed = parseInt(this.dataset["autoplaySpeed"]) || 3000;
      this.direction = this.splideElement.dataset["direction"] || "ltr";
      this.mobilePaddingLeft =
        this.splideElement.dataset["mobilepaddingleft"] || "0";
      this.mobilePaddingRight =
        this.splideElement.dataset["mobilepaddingright"] || "0";
      this.desktopPaddingLeft =
        this.splideElement.dataset["desktoppaddingleft"] || "0";
      this.desktopPaddingRight =
        this.splideElement.dataset["desktoppaddingright"] || "0";

      // Data attribute string matching for correct boolean value
      // The fallback is used if the developer make mistake the code is forgiving
      // Read more here https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
      this.showarrows =
        this.splideElement.dataset["showarrows"] === "true" || false;
      this.autoplay =
        this.splideElement.dataset["autoplay"] === "true" || false;
      this.showarrowsonmobile =
        this.splideElement.dataset["showarrowsonmobile"] === "true" || false;
      this.showdots =
        this.splideElement.dataset["showdots"] === "true" || false;
      this.showdotsonmobile =
        this.splideElement.dataset["showdotsonmobile"] === "true" || false;
      this.isNavigation =
        this.splideElement.dataset["isnavigation"] === "true" || false;
      this.disableDrag =
        this.splideElement.dataset["disabledrag"] === "true" || false;
      this.destroyOnMobile =
        this.splideElement.dataset["enableonmobile"] == "false" || false;
      this.destroyOnDesktop =
        this.splideElement.dataset["enableondesktop"] == "false" || false;

      this.sync = this.splideElement.dataset["carouselsyncselector"] || false;

      this.initCarousel();
    }

    initCarousel() {
      if (this.destroyOnMobile && this.destroyOnDesktop) return;

      // More option available here https://splidejs.com/documents/
      // This slider can be customized as require check the above doc before adding any new
      // Slider library.
      this.carousel = new Splide(this.splideElement, {
        perPage: this.desktopPerPage,
        type: this.type,
        autoplay: this.autoplay,
        interval: this.autoplaySpeed,
        gap: this.gap,
        arrows: this.showarrows,
        pagination: this.showdots,
        isNavigation: this.isNavigation,
        drag: !this.disableDrag,
        direction: this.direction,
        destroy: this.destroyOnDesktop,
        padding: {
          left: this.desktopPaddingLeft,
          right: this.desktopPaddingRight,
        },
        breakpoints: {
          750: {
            padding: {
              left: this.mobilePaddingLeft,
              right: this.mobilePaddingRight,
            },
            perPage: this.mobilePerPage,
            arrows: this.showarrowsonmobile,
            pagination: this.showdotsonmobile,
            gap: this.gapMobile,
            destroy: this.destroyOnMobile,
          },
        },
      });

      if (this.sync) {
        this.initCarouselSync();
      } else {
        this.carousel.mount();
      }
    }

    initCarouselSync() {
      this.syncElement = document.querySelector(this.sync);
      this.direction = this.syncElement.dataset["direction"] || "ltr";

      this.carouselSync = new Splide(this.sync, {
        updateOnMove: true,
        perPage: this.syncElement.dataset["desktopperpage"] || 5,
        type: this.syncElement.dataset["type"] || "loop",
        focus: this.syncElement.dataset["focus"] || "center",
        isNavigation:
          this.syncElement.dataset["isnavigation"] === "true" || false,
        pagination: false,
        arrows: this.syncElement.dataset["showarrows"] === "true" || false,
        drag: true,
        // Conditional configuration for 'ttb' direction
        ...(this.direction === "ttb" && {
          height: this.getPrimarySlideFirstImageHeight(),
          direction: "ttb",
          autoHeight: true,
        }),
        breakpoints: {
          767: {
            height: "auto",
            direction: "ltr",
            gap: this.gapMobile,
          },
        },
      });

      this.carousel.sync(this.carouselSync);
      this.carousel.mount();
      this.carouselSync.mount();
    }

    refreshSlider() {
      this.carousel.refresh();
      if (this.carouselSync) {
        this.carouselSync.refresh();
      }
    }

    getPrimarySlideFirstImageHeight() {
      const image = this.querySelector(".splide__list img");
      const containerWidth = this.querySelector(".splide__list").clientWidth;

      // Get the original width and height of the image
      const originalWidth = image.getAttribute("width");
      const originalHeight = image.getAttribute("height");

      // Calculate the scaled height to fit within the container
      return (containerWidth / originalWidth) * originalHeight;
    }
  }

  // Exposing the Carousel class globally to allow other custom elements, like the product-form, to extend its functionality.
  window.Carousel = Carousel;
  customElements.define("splider-component", Carousel);
}
