import { createElement } from "../framework/render.js";

export class Board {
  getTemplate() {
    return '<div class="tasks-container"></div>';
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
