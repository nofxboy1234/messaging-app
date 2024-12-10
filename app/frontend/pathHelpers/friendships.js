import apiHelpers from '../api';
import helper from './helper';

export default {
  index: helper({
    apiHelper: apiHelpers.friendships.index,
    model: 'friendship',
  }),
  create: helper({
    apiHelper: apiHelpers.friendships.create,
    model: 'friendship',
  }),
  destroy: helper({
    apiHelper: apiHelpers.friendships.destroy,
    model: 'friendship',
  }),
};
