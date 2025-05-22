import { AbstractComponent } from "../framework/view/abstract-component.js";

/**
 * Компонент формы для добавления новых задач
 */
export class TaskForm extends AbstractComponent {
  #handleTaskAdd = null;

  constructor(onTaskAdd) {
    super();
    this.#handleTaskAdd = onTaskAdd;
    this._setEventListeners();
  }

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

  _setEventListeners() {
    const element = this.getElement();
    const addButton = element.querySelector(".add-btn");
    const inputElement = element.querySelector("input");

    addButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      const taskTitle = inputElement.value.trim();

      if (taskTitle) {
        this.#handleTaskAdd(taskTitle);
        inputElement.value = "";
      }
    });

    // Also handle Enter key press
    inputElement.addEventListener("keydown", (evt) => {
      if (evt.key === "Enter") {
        evt.preventDefault();
        const taskTitle = inputElement.value.trim();

        if (taskTitle) {
          this.#handleTaskAdd(taskTitle);
          inputElement.value = "";
        }
      }
    });
  }
}
