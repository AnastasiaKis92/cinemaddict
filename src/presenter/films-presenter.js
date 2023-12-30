import {render} from '../render.js';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';

const CARD_COUNT = 5;

export default class FilmsPresenter {
  main = new FilmsView(); // контейнер для списка фильмов .films
  allMovies = new FilmsListView({ name: 'All movies. Upcoming', hidden: true });
  topRated = new FilmsListView({ name: 'Top rated' }, true);
  mostCommented = new FilmsListView({ name: 'Most commented' }, true);

  init = (mainContainer) => {
    this.mainContainer = mainContainer;
    render(this.main, this.mainContainer); // рендер .films
    render(this.allMovies, this.main.getElement());
    render(this.topRated, this.main.getElement());
    render(this.mostCommented, this.main.getElement());
    render(new ShowMoreButtonView(), this.allMovies.getElement());
    const filmsDivElements = document.querySelectorAll('.films-list__container');
    for (let i = 0; i < CARD_COUNT; i++) {
      render(new FilmCardView(), filmsDivElements[0]);
    }
    render(new FilmCardView(), filmsDivElements[1]);
    render(new FilmCardView(), filmsDivElements[2]);
  };
}

