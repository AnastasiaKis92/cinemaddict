import {createElement} from '../render.js';

const createTemplate = () => `
  <button class="films-list__show-more">Show more</button>
`;

export default class ShowMoreButtonView {
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
