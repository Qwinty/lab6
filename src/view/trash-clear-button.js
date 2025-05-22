import { AbstractComponent } from "../framework/view/abstract-component.js";

/**
 * Компонент кнопки для очистки корзины
 */
export class TrashClearButton extends AbstractComponent {
  getTemplate() {
    return `<button class="trash-clear-button">Очистить корзину</button>`;
  }

  getElement() {
    if (!this.element) {
      this.element = document.createElement("div");
      this.element.innerHTML = this.getTemplate();
      this.element = this.element.firstElementChild;
    }
    return this.element;
  }
}
