import { AbstractComponent } from "../framework/view/abstract-component.js";

/**
 * Пустой компонент-заглушка для списка задач
 */
export class EmptyTaskList extends AbstractComponent {
  getTemplate() {
    return `<div class="empty-list">Нет задач</div>`;
  }
}
