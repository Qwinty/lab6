import { Header } from "./view/header.js";
import { TaskForm } from "./view/task-form.js";
import { Board } from "./view/board.js";
import { TaskList } from "./view/task-list.js";
import { Task } from "./view/task.js";
import { appendElement, createElement } from "./framework/render.js";

const siteBodyElement = document.body;
const siteContainerElement = siteBodyElement.querySelector(".container");

// Remove static header h1
const staticTitle = siteContainerElement.querySelector("h1.title");
if (staticTitle) {
  staticTitle.remove();
}

// Get a reference to the .new-task section, which will be the reference for inserting the header
const newTaskSection = siteContainerElement.querySelector(".new-task");

// Header
const headerComponent = new Header();
// Insert the header before the .new-task section to ensure correct order
if (newTaskSection) {
  siteContainerElement.insertBefore(
    headerComponent.getElement(),
    newTaskSection
  );
} else {
  // Fallback if .new-task is not found (should not happen with current index.html)
  appendElement(siteContainerElement, headerComponent.getElement());
}

// Task Form
const taskFormComponent = new TaskForm();
// Insert TaskForm after h2
const newTaskHeading = newTaskSection.querySelector("h2");
console.log("newTaskHeading", newTaskHeading);

if (newTaskHeading) {
  newTaskHeading.after(taskFormComponent.getElement());
  console.log("Inserted task form after h2", taskFormComponent.getElement());
} else {
  appendElement(newTaskSection, taskFormComponent.getElement());
  console.log("Appended task form to newTaskSection");
}

// Board: Replace static tasks container with the board component's element
const staticTasksContainerElement =
  siteContainerElement.querySelector(".tasks-container");

const boardComponent = new Board();
const boardElementFromComponent = boardComponent.getElement(); // This is the Board's <div class="tasks-container">

if (staticTasksContainerElement) {
  // Ensure the static container is empty before replacing it
  const existingStaticTaskColumns =
    staticTasksContainerElement.querySelectorAll(".task-column");
  existingStaticTaskColumns.forEach((column) => column.remove());
  staticTasksContainerElement.replaceWith(boardElementFromComponent);
} else {
  // Fallback: if static container not found, append to main container
  appendElement(siteContainerElement, boardElementFromComponent);
}

// boardElement will be used to append the task columns.
// It should refer to the element from boardComponent, which is now in the DOM.
const boardElement = boardElementFromComponent;

// Task Lists and Tasks
const taskColumnsData = [
  {
    title: "Бэклог",
    id: "backlog",
    tasks: ["Выучить JS", "Выучить React", "Сделать домашку"],
  },
  {
    title: "В процессе",
    id: "in-progress",
    tasks: ["Выпить смузи", "Попить воды"],
  },
  { title: "Готово", id: "done", tasks: ["Позвонить маме", "Погладить кота"] },
  {
    title: "Корзина",
    id: "trash",
    tasks: ["Сходить почитать", "Прочитать Войну и Мир"],
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

  columnData.tasks.forEach((taskText) => {
    const taskComponent = new Task(taskText);
    appendElement(taskListElement, taskComponent.getElement());
  });
  appendElement(boardElement, columnDiv);
});
