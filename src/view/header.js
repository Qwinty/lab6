import { createElement } from "../framework/render.js";

export class Header {
  getTemplate() {
    return "<h1 class='title'>Список задач</h1>";
  }

  getElement() {
    if (!this.element) {
      this.element = createElement("div");
      this.element.innerHTML = this.getTemplate();
      this.element = this.element.firstChild;
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
