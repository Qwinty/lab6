import { tasks } from "../mock/task.js";

export class TaskModel {
  constructor() {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }
}
