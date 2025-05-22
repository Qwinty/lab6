import { AbstractComponent } from "../framework/view/abstract-component.js";

/**
 * Компонент задачи для отображения одной задачи
 */
export class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
    this._setEventListeners();
  }

  getTemplate() {
    return `<div class="task" draggable="true" data-task-id="${this._task.id}">${this._task.title}</div>`;
  }

  _setEventListeners() {
    const taskElement = this.getElement();
    taskElement.addEventListener("dragstart", (evt) => {
      evt.dataTransfer.setData("text/plain", String(this._task.id));
      evt.dataTransfer.effectAllowed = "move";
      setTimeout(() => {
        taskElement.classList.add("dragging");
      }, 0);
    });

    taskElement.addEventListener("dragend", () => {
      taskElement.classList.remove("dragging");
    });
  }
}
