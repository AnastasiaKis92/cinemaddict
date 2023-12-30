import {createElement} from '../render.js';

const createTemplate = () => `
  <ul class="sort">
    <li><a href="#" class="sort__button">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
  </ul>
`;

export default class SortView {
  getTemplate() {
    return createTemplate();
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    } // Создаем св-во класса // Условие если элемент не был создан ранее
    return this.element;
  }
}
