import {render} from './render.js';
import SortView from './view/sort-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import ProfileView from './view/profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmDetailsView from './view/film-details-view.js';

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const films = new FilmsPresenter;

render(new ProfileView(), header);
render(new MainNavigationView(), main);
render(new SortView(), main);
render(new FooterStatisticsView(), footer);
render(new FilmDetailsView(), footer, 'afterend');

films.init(main);
