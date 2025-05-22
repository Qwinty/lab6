import { createElement } from "../framework/render.js";

export class TaskForm {
  getTemplate() {
    return `
      <div class="task-input">
        <input type="text" placeholder="Название задачи..." />
        <button class="add-btn" type="submit">+ Добавить</button>
      </div>
    `;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement("div");
      this.element.innerHTML = this.getTemplate();
      this.element = this.element.firstElementChild;
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
