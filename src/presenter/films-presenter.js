import {render} from '../render.js';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import { MOVIES_COUNT, MOVIES_COUNT_TOP } from '../constants.js';

export default class FilmsPresenter {
  main = new FilmsView(); // контейнер для списка фильмов .films
  allMovies = new FilmsListView({ name: 'All movies. Upcoming', hidden: true });
  topRated = new FilmsListView({ name: 'Top rated' }, true);
  mostCommented = new FilmsListView({ name: 'Most commented' }, true);

  init = (mainContainer, moviesModel) => {
    this.mainContainer = mainContainer;
    this.moviesModel = moviesModel;
    this.movies = [...this.moviesModel.getMovies()]; // спред чтобы сделать новый массив и не сломать его
    render(this.main, this.mainContainer); // рендер .films
    render(this.allMovies, this.main.getElement());
    render(this.topRated, this.main.getElement());
    render(this.mostCommented, this.main.getElement());
    render(new ShowMoreButtonView(), this.allMovies.getElement());
    const filmsDivElements = document.querySelectorAll('.films-list__container');
    for (let i = 0; i < MOVIES_COUNT; i++) {
      render(new FilmCardView(this.movies[i].filmInfo), filmsDivElements[0]);
    }
    for (let i = 0; i < MOVIES_COUNT_TOP; i++) {
      render(new FilmCardView(this.movies[i].filmInfo), filmsDivElements[1]);
    }
    for (let i = 0; i < MOVIES_COUNT_TOP; i++) {
      render(new FilmCardView(this.movies[i].filmInfo), filmsDivElements[2]);
    }
  };
}

