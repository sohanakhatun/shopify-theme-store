class CustomTabs extends HTMLElement{
  constructor(){
    super()
    this.element = this;
    console.log(this)
    this.checkActiveTag()
  }
checkActiveTag(){
    const letallTab = document.querySelectorAll(".collection-tabs");
    console.log(letallTab);
    letallTab.forEach((eachTab)=> eachTab.addEventListener("click",function(){
      document.querySelector(".active").classList.remove("active")
        this.path = eachTab.dataset.path
        this.sectionId = eachTab.dataset.sectionId
        console.log(this.sectionId);
        fetch(`${this.path}?section_id=${this.sectionId}`)
        .then(response=>response.text())
        .then((responseText) => {
            const html = new DOMParser().parseFromString(responseText,'text/html');
            const container = document.getElementById("product-grid-container")
            const content = html.querySelector("body")
                        console.log(content);
                        container.innerHTML = content.innerHTML;
                        window.history.replaceState({}, '', this.path);
    })
    eachTab.classList.add("active")
    }))
}
  }
customElements.define("custom-tabs", CustomTabs)