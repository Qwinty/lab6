import { createElement } from "../framework/render.js";

export class TaskList {
  getTemplate() {
    return '<div class="tasks"></div>';
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
