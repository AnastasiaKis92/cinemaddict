import {createElement} from '../render.js';

const createTemplate = () => `
  <section class="films"></section>
`;

export default class FilmsView {
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
