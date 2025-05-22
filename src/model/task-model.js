import { tasks } from "../mock/task.js";

export class TaskModel {
  #tasks = [];

  constructor() {
    this.#tasks = tasks;
  }

  get tasks() {
    return this.#tasks;
  }
}
