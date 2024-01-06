import { createMovie } from '../fish/movie.js';
import { MOVIES_COUNT } from '../constants.js';

export default class MoviesModel {
  #movies = Array.from({ length:MOVIES_COUNT }, createMovie);
  get movies() {
    return this.#movies;
  }
}
