import { AbstractComponent } from "../framework/view/abstract-component.js";

/**
 * Компонент формы для добавления новых задач
 */
export class TaskForm extends AbstractComponent {
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
      this.element = document.createElement("div");
      this.element.innerHTML = this.getTemplate();
      this.element = this.element.firstElementChild;
    }
    return this.element;
  }
}
