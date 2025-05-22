import { AbstractComponent } from "../framework/view/abstract-component.js";

/**
 * Компонент доски для размещения колонок задач
 */
export class Board extends AbstractComponent {
  getTemplate() {
    return '<div class="tasks-container"></div>';
  }
}
