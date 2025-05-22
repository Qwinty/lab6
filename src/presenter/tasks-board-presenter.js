import { Board } from "../view/board.js";
import { TaskList } from "../view/task-list.js";
import { Task } from "../view/task.js";
import { appendElement, createElement } from "../framework/render.js";
import { TaskStatus, TaskStatusNames } from "../const.js";
import { TrashClearButton } from "../view/trash-clear-button.js";

export class TasksBoardPresenter {
  constructor(boardContainer, taskModel) {
    this.boardContainer = boardContainer;
    this.boardComponent = new Board();
    this.taskModel = taskModel;
    this.boardTasks = [];
  }

  init() {
    // Get tasks from model
    this.boardTasks = this.taskModel.getTasks();

    // Replace static tasks container with the board component's element
    const staticTasksContainerElement =
      this.boardContainer.querySelector(".tasks-container");
    const boardElementFromComponent = this.boardComponent.getElement();

    if (staticTasksContainerElement) {
      // Ensure the static container is empty before replacing it
      const existingStaticTaskColumns =
        staticTasksContainerElement.querySelectorAll(".task-column");
      existingStaticTaskColumns.forEach((column) => column.remove());
      staticTasksContainerElement.replaceWith(boardElementFromComponent);
    } else {
      // Fallback: if static container not found, append to main container
      appendElement(this.boardContainer, boardElementFromComponent);
    }

    // boardElement will be used to append the task columns.
    const boardElement = boardElementFromComponent;

    // Task Lists and Tasks
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

      const taskListComponent = new TaskList();
      const taskListElement = taskListComponent.getElement();
      taskListElement.id = columnData.id;
      appendElement(columnDiv, taskListElement);

      // Filter tasks by status
      const tasksForColumn = this.boardTasks.filter(
        (task) => task.status === columnData.id
      );

      tasksForColumn.forEach((task) => {
        const taskComponent = new Task(task);
        appendElement(taskListElement, taskComponent.getElement());
      });

      // Add trash clear button if this is the trash column
      if (columnData.id === TaskStatus.TRASH) {
        const trashClearButton = new TrashClearButton();
        appendElement(columnDiv, trashClearButton.getElement());
      }

      appendElement(boardElement, columnDiv);
    });
  }
}
