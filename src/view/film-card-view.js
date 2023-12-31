import {createElement} from '../render.js';
import { filmDate, getTimeFromMinutes, cutDescription } from '../helpers.js';

const createTemplate = (movie) => {
  const { title, totalRating, poster, description, genre, runtime, release } = movie;
  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${filmDate(release.date)}</span>
          <span class="film-card__duration">${getTimeFromMinutes(runtime)}</span>
          <span class="film-card__genre">${genre.join(', ')} </span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${cutDescription(description)}</p>
        <span class="film-card__comments">5 comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>
  `);
};

export default class FilmCardView {
  #element;
  #movie;

  constructor(movie) {
    this.#movie = movie;
  }

  get template() {
    return createTemplate(this.#movie);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    } // Создаем св-во класса // Условие если элемент не был создан ранее
    return this.#element;
  }
}
