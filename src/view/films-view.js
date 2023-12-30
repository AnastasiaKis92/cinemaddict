import {createElement} from '../render.js';

const createTemplate = () => `
  <section class="films"></section>
`;

export default class FilmsView {
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
