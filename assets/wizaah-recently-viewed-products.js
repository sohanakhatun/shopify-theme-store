window.wizaah = window.wizaah || {};

wizaah.RecentlyViewedProducts = (function () {
  class RecentlyViewedProducts {
    constructor(element) {
      this.container = document.querySelector(
        '[data-section-type="' + element + '"]'
      );

      if (!this.container) {
        return;
      }

      this.options = JSON.parse(
        this.container.getAttribute("data-section-settings")
      );

      if (this.options["productId"]) {
        this.saveCurrentProduct();
      }

      this.fetchProducts();
      this.attachEventListeners();
    }
    attachEventListeners() {
      //ADD ANY EVENTLISTNRES LIKE :: ADD TO CART, QUICK VIEW ETC..
    }
    fetchProducts() {
      var _this = this;
      var queryString = this.getSearchQueryString();

      if (queryString === "") {
        return;
      }

      fetch(
        "/search?view=wizaah-recently-viewed-products&type=product&q=".concat(
          queryString
        ),
        {
          credentials: "same-origin",
          method: "GET",
        }
      ).then(function (response) {
        response.text().then(function (content) {
          var blankDivElement = document.createElement("div");
          blankDivElement.innerHTML = content;

          _this.container.querySelector(
            ".recentlyviewed__container"
          ).innerHTML = blankDivElement.querySelector(
            '[data-section-type="wizaah-recently-viewed-products"] .recentlyviewed__container'
          ).innerHTML;
          _this.container.parentNode.style.display = "block";

          _this.initSlider();
        });
      });
    }
    saveCurrentProduct() {
      /*
       * - Check if the current product already exists, and if it does not, add it at the start
       * - Then, we save the current product into the local storage, by keeping only the 8 most recent
       */
      var items = JSON.parse(
          localStorage.getItem("mmRecentlyViewedProducts") || "[]"
        ),
        productId = this.options["productId"];

      if (!items.includes(productId)) {
        items.unshift(productId);
      }

      try {
        localStorage.setItem(
          "mmRecentlyViewedProducts",
          JSON.stringify(items.slice(0, 8))
        );
      } catch (error) {}
    }
    getSearchQueryString() {
      var items = JSON.parse(
        localStorage.getItem("mmRecentlyViewedProducts") || "[]"
      );

      if (items.includes(this.options["productId"])) {
        items.splice(items.indexOf(this.options["productId"]), 1);
      }

      return items
        .map(function (item) {
          return "id:" + item;
        })
        .join(" OR ");
    }
    initSlider() {
      // Get the parent element
      var parentElement = document.querySelector(
        ".mm-recentlyviewed__products"
      );

      // Check if the parent element exists
      if (!parentElement) {
        console.error("Parent element not found");
        return;
      }

      // Initialize the Splide slider
      new Splide(parentElement, {
       
        type: "carousel",
        perPage: 1,
        arrows:true
      
      }).mount();
      console.log("splide is mounted")
    }
  }

  return RecentlyViewedProducts;
})();

new wizaah.RecentlyViewedProducts("wizaah-recently-viewed-products");
