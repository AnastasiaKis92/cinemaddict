import {render} from '../render.js';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import { MOVIES_COUNT, MOVIES_COUNT_TOP, MOVIES_COUNT_ROW } from '../constants.js';
import FilmDetailsView from '../view/film-details-view.js';

const footer = document.querySelector('.footer');
const body = document.querySelector('body');

export default class FilmsPresenter {
  #mainContainer;
  #moviesModel;
  #movies; // массив с фильмами
  #renderedMoviesCount = MOVIES_COUNT_ROW;
  #allMoviesContainer;
  #allMovies;
  #allMoviesTitle;
  #main = new FilmsView(); // контейнер для списка фильмов .films
  #topRated = new FilmsListView({ name: 'Top rated' }, true);
  #topRatedContainer = this.#topRated.element.querySelector('.films-list__container');
  #mostCommented = new FilmsListView({ name: 'Most commented' }, true);
  #mostCommentedContainer = this.#mostCommented.element.querySelector('.films-list__container');
  #showMoreButton = new ShowMoreButtonView();

  constructor(mainContainer, moviesModel) {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#movies = [...this.#moviesModel.movies]; // спред чтобы сделать новый массив и не сломать его
    this.#allMoviesTitle = this.#movies.length > 0 ? 'All movies. Upcoming' : 'There are no movies in our database';
    this.#allMovies = new FilmsListView({ name: this.#allMoviesTitle, hidden: this.#movies.length > 0 });
    this.#allMoviesContainer = this.#allMovies.element.querySelector('.films-list__container');
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
      openPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

  };

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#movies.slice(this.#renderedMoviesCount, this.#renderedMoviesCount + MOVIES_COUNT_ROW).forEach((movie) => render(new FilmCardView(movie.filmInfo), this.#allMoviesContainer));
    this.#renderedMoviesCount += MOVIES_COUNT_ROW;
    if (this.#renderedMoviesCount > MOVIES_COUNT) {
      this.#showMoreButton.element.remove();
    }
  };

  init = () => {
    render(this.#main, this.#mainContainer); // рендер .films
    render(this.#allMovies, this.#main.element);
    render(this.#topRated, this.#main.element);
    render(this.#mostCommented, this.#main.element);

    if (this.#movies.length > MOVIES_COUNT_ROW) {
      render(this.#showMoreButton, this.#allMovies.element);
      this.#showMoreButton.element.addEventListener('click', this.#handleShowMoreButtonClick);
    }

    for (let i = 0; i < Math.min(this.#movies.length, MOVIES_COUNT_ROW); i++) { // Выбирает минимальное значение из кол-ва фильмов и значения константы = 5
      const film = new FilmCardView(this.#movies[i].filmInfo);
      render(film, this.#allMoviesContainer);
      this.#renderPopup(film, this.#movies[i]);
    }

    for (let i = 0; i < Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP); i++) {
      const film = new FilmCardView(this.#movies[i].filmInfo);
      render(film, this.#topRatedContainer);
      this.#renderPopup(film, this.#movies[i]);
    }

    for (let i = 0; i < Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP); i++) {
      const film = new FilmCardView(this.#movies[i].filmInfo);
      render(film, this.#mostCommentedContainer);
      this.#renderPopup(film, this.#movies[i]);
    }
  };
}

