import {render} from './render.js';
import SortView from './view/sort-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import ProfileView from './view/profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';
// import CommentsModel from './model/comments-model.js';

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const moviesModel = new MoviesModel();
const films = new FilmsPresenter(main, moviesModel);
// console.log(films);
// const movieDetail = moviesModel.movies[0];
// const commentsModel = new CommentsModel();

render(new ProfileView(), header);
render(new MainNavigationView(), main);
render(new SortView(), main);
render(new FooterStatisticsView(), footer);
// render(new FilmDetailsView(movieDetail, commentsModel), footer, 'afterend');
films.init();
