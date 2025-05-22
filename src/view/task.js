import { createElement } from "../framework/render.js";

export class Task {
  constructor(taskText) {
    this.taskText = taskText;
  }

  getTemplate() {
    return `<div class="task">${this.taskText}</div>`;
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
