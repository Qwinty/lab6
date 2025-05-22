import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";
import { TaskStatus } from "../const.js";

export class TaskModel {
  #tasks = [];
  #observers = [];

  constructor() {
    this.#tasks = tasks;
  }

  get tasks() {
    return this.#tasks;
  }

  /**
   * Adds an observer to the list
   * @param {Object} observer - Observer with update method
   */
  addObserver(observer) {
    this.#observers.push(observer);
  }

  /**
   * Removes an observer from the list
   * @param {Object} observer - Observer to remove
   */
  removeObserver(observer) {
    this.#observers = this.#observers.filter(
      (existingObserver) => existingObserver !== observer
    );
  }

  /**
   * Notifies all observers about changes
   */
  _notify() {
    this.#observers.forEach((observer) => observer.update());
  }

  /**
   * Creates a new task and adds it to the backlog
   * @param {string} title - Task title
   */
  createTask(title) {
    const newTask = {
      id: generateID(),
      title,
      status: TaskStatus.BACKLOG,
    };

    this.#tasks.push(newTask);
    this._notify();
  }

  /**
   * Clears all tasks from trash
   */
  clearTrash() {
    this.#tasks = this.#tasks.filter(
      (task) => task.status !== TaskStatus.TRASH
    );
    this._notify();
  }
}
