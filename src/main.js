import { Header } from "./view/header.js";
import { TaskForm } from "./view/task-form.js";
import { appendElement } from "./framework/render.js";
import { TasksBoardPresenter } from "./presenter/tasks-board-presenter.js";
import { TaskModel } from "./model/task-model.js";

const siteBodyElement = document.body;
const siteContainerElement = siteBodyElement.querySelector(".container");

// Удалить статический заголовок h1
const staticTitle = siteContainerElement.querySelector("h1.title");
if (staticTitle) {
  staticTitle.remove();
}

// Получить ссылку на секцию .new-task, которая будет точкой привязки для вставки заголовка
const newTaskSection = siteContainerElement.querySelector(".new-task");

// Заголовок
const headerComponent = new Header();
// Вставить заголовок перед секцией .new-task для обеспечения правильного порядка
if (newTaskSection) {
  siteContainerElement.insertBefore(
    headerComponent.getElement(),
    newTaskSection
  );
} else {
  // Запасной вариант, если .new-task не найден (не должно произойти с текущим index.html)
  appendElement(siteContainerElement, headerComponent.getElement());
}

// Инициализировать модель
const taskModel = new TaskModel();

// Форма задачи с обработчиком добавления задачи
const taskFormComponent = new TaskForm((taskTitle) => {
  taskModel.createTask(taskTitle);
});

// Вставить TaskForm после h2
const newTaskHeading = newTaskSection.querySelector("h2");
console.log("newTaskHeading", newTaskHeading);

if (newTaskHeading) {
  newTaskHeading.after(taskFormComponent.getElement());
  console.log("Inserted task form after h2", taskFormComponent.getElement());
} else {
  appendElement(newTaskSection, taskFormComponent.getElement());
  console.log("Appended task form to newTaskSection");
}

// Инициализировать презентер доски задач с моделью
const tasksBoardPresenter = new TasksBoardPresenter(
  siteContainerElement,
  taskModel
);
tasksBoardPresenter.init();
