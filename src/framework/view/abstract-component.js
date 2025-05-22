import { createElement } from "../render.js";

/**
 * Абстрактный базовый класс компонента, от которого должны наследоваться все компоненты представления
 * @abstract
 */
export class AbstractComponent {
  /**
   * Возвращает HTML-шаблон для компонента
   * @abstract
   * @returns {string} HTML-шаблон
   */
  getTemplate() {
    throw new Error("Abstract method not implemented: getTemplate");
  }

  /**
   * Возвращает DOM-элемент для компонента
   * @returns {HTMLElement} DOM-элемент
   */
  getElement() {
    if (!this.element) {
      this.element = createElement("div");
      this.element.innerHTML = this.getTemplate();
      this.element = this.element.firstChild;
    }
    return this.element;
  }

  /**
   * Удаляет ссылку на элемент компонента
   */
  removeElement() {
    this.element = null;
  }
}
