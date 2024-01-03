import data from './data.json';
import { getRandomItem } from '../helpers';

const { comment } = data;

export const createComment = () => ({
  'text': getRandomItem(comment.text),
  'emotion': getRandomItem(comment.emotion),
  'author': getRandomItem(comment.author),
  'date': '2019-05-11T16:12:32.554Z',
});
