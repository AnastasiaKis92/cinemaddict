import {render} from '../render.js';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import { MOVIES_COUNT, MOVIES_COUNT_TOP } from '../constants.js';
import FilmDetailsView from '../view/film-details-view.js';

const footer = document.querySelector('.footer');
const body = document.querySelector('body');

export default class FilmsPresenter {
  #mainContainer;
  #moviesModel;
  #movies;

  #main = new FilmsView(); // контейнер для списка фильмов .films
  #allMovies = new FilmsListView({ name: 'All movies. Upcoming', hidden: true });
  #topRated = new FilmsListView({ name: 'Top rated' }, true);
  #mostCommented = new FilmsListView({ name: 'Most commented' }, true);

  constructor(mainContainer, moviesModel) {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
  }

  #renderPopup = (film, popup) => {
    const link = film.element.querySelector('.film-card__link');
    const filmDetails = new FilmDetailsView(popup);

    const removePopup = () => {
      const popupRemoved = document.querySelector('.film-details');
      popupRemoved.remove();
      body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const openPopup = () => {
      const oldPopup = document.querySelector('.film-details');
      if (oldPopup) {
        removePopup();
      }
      render(filmDetails, footer, 'afterend');
      filmDetails.element.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('film-details__close-btn')) {
          removePopup();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      });
      body.classList.add('hide-overflow');
    };

    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(new FilmDetailsView(popup));
      document.addEventListener('keydown', onEscKeyDown);
    });

  };

  init = () => {
    this.#movies = [...this.#moviesModel.movies]; // спред чтобы сделать новый массив и не сломать его
    render(this.#main, this.#mainContainer); // рендер .films
    render(this.#allMovies, this.#main.element);
    render(this.#topRated, this.#main.element);
    render(this.#mostCommented, this.#main.element);
    render(new ShowMoreButtonView(), this.#allMovies.element);
    const filmsDivElements = document.querySelectorAll('.films-list__container');
    for (let i = 0; i < MOVIES_COUNT; i++) {
      const film = new FilmCardView(this.#movies[i].filmInfo);
      render(film, filmsDivElements[0]);
      this.#renderPopup(film, this.#movies[i]);
    }
    for (let i = 0; i < MOVIES_COUNT_TOP; i++) {
      const film = new FilmCardView(this.#movies[i].filmInfo);
      render(film, filmsDivElements[1]);
      this.#renderPopup(film, this.#movies[i]);
    }
    for (let i = 0; i < MOVIES_COUNT_TOP; i++) {
      const film = new FilmCardView(this.#movies[i].filmInfo);
      render(film, filmsDivElements[2]);
      this.#renderPopup(film, this.#movies[i]);
    }
  };
}

