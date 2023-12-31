import {createElement} from '../render.js';

const createTemplate = (title, extra) => `
  <section class="films-list ${ extra ? 'films-list--extra' : '' }">
    <h2 class="films-list__title${ title.hidden ? 'visually-hidden' : '' } ">${title.name}</h2>
    <div class="films-list__container"></div>
  </section>
`;

export default class FilmsListView {
  #title;
  #extra;
  #element;

  constructor(title, extra) {
    this.#title = title;
    this.#extra = extra;
  }

  get template() {
    return createTemplate(this.#title, this.#extra);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    } // Создаем св-во класса // Условие если элемент не был создан ранее
    return this.#element;
  }
}
