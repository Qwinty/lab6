import { AbstractComponent } from "../framework/view/abstract-component.js";

/**
 * Компонент задачи для отображения одной задачи
 */
export class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return `<div class="task">${this._task.title}</div>`;
  }
}
