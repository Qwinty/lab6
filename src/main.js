import { Header } from "./view/header.js";
import { TaskForm } from "./view/task-form.js";
import { appendElement } from "./framework/render.js";
import { TasksBoardPresenter } from "./presenter/tasks-board-presenter.js";
import { TaskModel } from "./model/task-model.js";

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

// Initialize the model
const taskModel = new TaskModel();

// Initialize the board presenter with the model
const tasksBoardPresenter = new TasksBoardPresenter(
  siteContainerElement,
  taskModel
);
tasksBoardPresenter.init();
