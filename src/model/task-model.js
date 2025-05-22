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
   * Updates the status of a task
   * @param {string | number} taskId - The ID of the task to update
   * @param {string} newStatus - The new status for the task
   */
  updateTaskStatus(taskId, newStatus) {
    const task = this.#tasks.find((t) => t.id == taskId); // Use == for type coercion as taskId might be a string
    if (task && task.status !== newStatus) {
      task.status = newStatus;
      this._notify();
    }
  }

  /**
   * Moves a task to a new status and position
   * @param {string | number} taskId - The ID of the task to move
   * @param {string} newStatus - The new status for the task
   * @param {string | number | null} targetBeforeId - The ID of the task before which to insert, or null to append
   */
  moveTask(taskId, newStatus, targetBeforeId) {
    // Find the task to move
    const taskIndex = this.#tasks.findIndex((t) => t.id == taskId);
    if (taskIndex === -1) return;

    // Remove the task from its current position
    const [task] = this.#tasks.splice(taskIndex, 1);

    // Update its status
    task.status = newStatus;

    if (targetBeforeId) {
      // Find the index of the target task to insert before
      const targetIndex = this.#tasks.findIndex((t) => t.id == targetBeforeId);
      if (targetIndex !== -1) {
        // Insert the task at the target position
        this.#tasks.splice(targetIndex, 0, task);
      } else {
        // If target not found, append to the end
        this.#tasks.push(task);
      }
    } else {
      // Find the last task with the same status
      const lastTaskWithStatus = [...this.#tasks]
        .reverse()
        .find((t) => t.status === newStatus);

      if (lastTaskWithStatus) {
        // Insert after the last task with the same status
        const insertIndex = this.#tasks.indexOf(lastTaskWithStatus) + 1;
        this.#tasks.splice(insertIndex, 0, task);
      } else {
        // If no tasks with this status, append to the end
        this.#tasks.push(task);
      }
    }

    // Notify observers about the change
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
