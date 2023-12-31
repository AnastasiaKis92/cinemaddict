import {createElement} from '../render.js';

const createTemplate = () => `
  <section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>
`;

export default class FooterStatisticsView {
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
