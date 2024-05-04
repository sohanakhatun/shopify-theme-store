class ProductCard extends HTMLElement {
    constructor() {
      super();
  
      this.productHandle = this.dataset.productHandle;
      this.sectionId = this.dataset.sectionId;
      if (this.querySelector("script")) {
        this.variantData = JSON.parse(this.querySelector("script").textContent);
        console.log(this.variantData);
      }
      this.addEventListener("change", this.onOptionChange);
    }
    
    onOptionChange() {
      console.log("clicked");
      console.log("product-handle", this.productHandle);
      console.log("variant data",this.variantData);
  
      this.selectedOptions = Array.from(
        this.querySelectorAll('input[type="radio"]:checked'),
        (input) => input.value
      );
      console.log("selectedoption",this.selectedOptions)
      this.currentVariant = this.variantData.find(
        (item) =>
          JSON.stringify(item.options) == JSON.stringify(this.selectedOptions)
      );
      console.log("variantdata", this.variantData);
      console.log("current variant", this.currentVariant);
      this.getUpdatedCard();
    }
  
    getUpdatedCard() {
    //   const url = `/products/${this.productHandle}?variant=${this.currentVariant.id}&section_id=custom-product-card`;
      const url = `/products/${this.productHandle}?view=product-card&variant=${this.currentVariant.id}`;
      console.log(url);
      fetch(url)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, "text/html");
          console.log("html",html);
          // this.innerHTML = html.querySelector(
          //   `[data-product-handle="${this.productHandle}"]`
          // ).innerHTML;
          this.innerHTML = html.querySelector('product-card').innerHTML;
        });
    }
  }
  
  customElements.define("product-card", ProductCard);