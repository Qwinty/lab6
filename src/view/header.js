import { AbstractComponent } from "../framework/view/abstract-component.js";

/**
 * Компонент заголовка для названия страницы
 */
export class Header extends AbstractComponent {
  getTemplate() {
    return "<h1 class='title'>Список задач</h1>";
  }
}
