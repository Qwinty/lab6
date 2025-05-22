import { AbstractComponent } from "../framework/view/abstract-component.js";

/**
 * Компонент TaskList для размещения задач
 */
export class TaskList extends AbstractComponent {
  getTemplate() {
    return '<div class="tasks"></div>';
  }
}
