import {createElement} from '../render.js';

const createTemplate = () => `
  <button class="films-list__show-more">Show more</button>
`;

export default class ShowMoreButtonView {
  #element;

  get template() {
    return createTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    } // Создаем св-во класса // Условие если элемент не был создан ранее
    return this.#element;
  }
}
