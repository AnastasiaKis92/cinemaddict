import { createComment } from '../fish/comment';
import { COMMENTS_COUNT } from '../constants.js';

export default class CommentsModel {
  #comments = Array.from({ length: COMMENTS_COUNT }, createComment); // приватная переменная
  get comments() {
    return this.#comments;
  }
}
