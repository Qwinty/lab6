import { AbstractComponent } from "../framework/view/abstract-component.js";

/**
 * Компонент TaskList для размещения задач
 */
export class TaskList extends AbstractComponent {
  #handleTaskDrop = null;

  constructor(onTaskDrop) {
    super();
    this.#handleTaskDrop = onTaskDrop;
    this._setEventListeners();
  }

  getTemplate() {
    return '<div class="tasks"></div>';
  }

  /**
   * Determines which task element the dragged task should be placed after
   * @param {HTMLElement} container - The container with task elements
   * @param {number} y - The y-coordinate of the mouse pointer
   * @returns {string|null} - ID of the task to insert after, or null if should be placed at the end
   */
  #getDragAfterElement(container, y) {
    // Get all task elements that are not currently being dragged
    const taskElements = [
      ...container.querySelectorAll(".task:not(.dragging)"),
    ];

    // Find the task whose middle point is closest to the mouse position from below
    return (
      taskElements
        .reduce(
          (closest, taskElement) => {
            const box = taskElement.getBoundingClientRect();
            const offset = y - (box.top + box.height / 2); // Distance from mouse to the middle of the element

            // If offset is negative, mouse is above the middle of the element
            // We want the closest element that's below the mouse (smallest negative offset)
            if (offset < 0 && offset > closest.offset) {
              return { offset, element: taskElement };
            } else {
              return closest;
            }
          },
          { offset: Number.NEGATIVE_INFINITY }
        )
        .element?.getAttribute("data-task-id") || null
    );
  }

  _setEventListeners() {
    const element = this.getElement();

    element.addEventListener("dragover", (evt) => {
      evt.preventDefault();
      element.classList.add("drag-over");
    });

    element.addEventListener("dragleave", (evt) => {
      element.classList.remove("drag-over");
    });

    element.addEventListener("drop", (evt) => {
      evt.preventDefault();
      element.classList.remove("drag-over");

      const taskId = evt.dataTransfer.getData("text/plain");
      const newStatus = element.id; // The id of the task list element is the status

      // Find the task element that should come after the dropped task
      const targetTaskId = this.#getDragAfterElement(element, evt.clientY);

      if (taskId && newStatus && this.#handleTaskDrop) {
        this.#handleTaskDrop(taskId, newStatus, targetTaskId);
      }
    });
  }
}
