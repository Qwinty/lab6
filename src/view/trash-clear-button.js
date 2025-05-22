import { createElement } from "../framework/render.js";

export class TrashClearButton {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return `<button class="trash-clear-button">Очистить корзину</button>`;
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
