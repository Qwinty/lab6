import { Board } from "../view/board.js";
import { TaskList } from "../view/task-list.js";
import { Task } from "../view/task.js";
import { appendElement, createElement } from "../framework/render.js";
import { TaskStatus, TaskStatusNames } from "../const.js";
import { TrashClearButton } from "../view/trash-clear-button.js";
import { EmptyTaskList } from "../view/empty-task-list.js";

export class TasksBoardPresenter {
  #boardContainer = null;
  #boardComponent = null;
  #taskModel = null;
  #boardTasks = [];
  #trashClearButton = null;

  constructor(boardContainer, taskModel) {
    this.#boardContainer = boardContainer;
    this.#boardComponent = new Board();
    this.#taskModel = taskModel;
    this.#boardTasks = [];

    // Subscribe to model changes
    this.#taskModel.addObserver(this);
  }

  init() {
    // Получить задачи из модели
    this.#boardTasks = this.#taskModel.tasks;

    // Render the board
    this.#renderBoard();
  }

  /**
   * Update method for Observer pattern
   */
  update() {
    // Update local tasks from model
    this.#boardTasks = this.#taskModel.tasks;

    // Clear and re-render the board
    this.#clearBoard();
    this.#renderBoard();
  }

  /**
   * Clears the board
   */
  #clearBoard() {
    const boardElement = this.#boardComponent.getElement();
    boardElement.innerHTML = "";
  }

  /**
   * Renders the board with all task columns
   */
  #renderBoard() {
    // Заменить статический контейнер задач элементом компонента доски
    const staticTasksContainerElement =
      this.#boardContainer.querySelector(".tasks-container");
    const boardElementFromComponent = this.#boardComponent.getElement();

    if (staticTasksContainerElement) {
      // Убедиться, что статический контейнер пуст перед заменой
      const existingStaticTaskColumns =
        staticTasksContainerElement.querySelectorAll(".task-column");
      existingStaticTaskColumns.forEach((column) => column.remove());
      staticTasksContainerElement.replaceWith(boardElementFromComponent);
    } else {
      // Запасной вариант: если статический контейнер не найден, добавить к основному контейнеру
      appendElement(this.#boardContainer, boardElementFromComponent);
    }

    // boardElement будет использоваться для добавления колонок задач.
    const boardElement = boardElementFromComponent;

    // Списки задач и задачи
    const taskColumnsData = [
      {
        title: TaskStatusNames[TaskStatus.BACKLOG],
        id: TaskStatus.BACKLOG,
      },
      {
        title: TaskStatusNames[TaskStatus.IN_PROGRESS],
        id: TaskStatus.IN_PROGRESS,
      },
      {
        title: TaskStatusNames[TaskStatus.DONE],
        id: TaskStatus.DONE,
      },
      {
        title: TaskStatusNames[TaskStatus.TRASH],
        id: TaskStatus.TRASH,
      },
    ];

    taskColumnsData.forEach((columnData) => {
      const columnDiv = createElement("div", { class: "task-column" });

      const columnHeaderDiv = createElement("div", { class: "column-header" }, [
        columnData.title,
      ]);
      appendElement(columnDiv, columnHeaderDiv);

      const taskListComponent = new TaskList(this.#handleTaskDrop.bind(this));
      const taskListElement = taskListComponent.getElement();
      taskListElement.id = columnData.id;
      appendElement(columnDiv, taskListElement);

      // Фильтровать задачи по статусу
      const tasksForColumn = this.#boardTasks.filter(
        (task) => task.status === columnData.id
      );

      this.#renderTasksList(taskListElement, tasksForColumn);

      // Добавить кнопку очистки корзины, если это колонка корзины
      if (columnData.id === TaskStatus.TRASH) {
        this.#renderTrashClearButton(columnDiv);
      }

      appendElement(boardElement, columnDiv);
    });
  }

  /**
   * Рендерит одну задачу
   * @param {HTMLElement} container - Контейнер для добавления задачи
   * @param {Object} task - Данные задачи
   */
  #renderTask(container, task) {
    const taskComponent = new Task(task);
    appendElement(container, taskComponent.getElement());
  }

  /**
   * Рендерит список задач или пустой плейсхолдер
   * @param {HTMLElement} container - Контейнер для добавления задач
   * @param {Array} tasks - Массив данных задач
   */
  #renderTasksList(container, tasks) {
    if (tasks.length === 0) {
      this.#renderEmptyList(container);
    } else {
      tasks.forEach((task) => {
        this.#renderTask(container, task);
      });
    }
  }

  /**
   * Рендерит кнопку очистки корзины
   * @param {HTMLElement} container - Контейнер для добавления кнопки
   */
  #renderTrashClearButton(container) {
    // Check if trash has tasks
    const trashTasks = this.#boardTasks.filter(
      (task) => task.status === TaskStatus.TRASH
    );

    // Only render button if there are tasks in trash
    if (trashTasks.length > 0) {
      this.#trashClearButton = new TrashClearButton();
      const buttonElement = this.#trashClearButton.getElement();

      // Add event listener for clearing trash
      buttonElement.addEventListener(
        "click",
        this.#handleTrashClearClick.bind(this)
      );

      appendElement(container, buttonElement);
    }
  }

  /**
   * Handler for trash clear button click
   */
  #handleTrashClearClick() {
    this.#taskModel.clearTrash();
  }

  /**
   * Handler for task drop event
   * @param {string | number} taskId - ID of the task being dropped
   * @param {string} newStatus - New status for the task
   * @param {string | number | null} targetTaskId - ID of the task before which to insert the dropped task, or null
   */
  #handleTaskDrop(taskId, newStatus, targetTaskId) {
    this.#taskModel.moveTask(taskId, newStatus, targetTaskId);
  }

  /**
   * Рендерит пустой плейсхолдер списка
   * @param {HTMLElement} container - Контейнер для добавления плейсхолдера
   */
  #renderEmptyList(container) {
    const emptyListComponent = new EmptyTaskList();
    appendElement(container, emptyListComponent.getElement());
  }
}
