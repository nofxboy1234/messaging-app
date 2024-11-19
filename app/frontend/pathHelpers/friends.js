import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({ apiHelper: apiHelpers.friends.create, model: 'friend' }),
  index: helper({ apiHelper: apiHelpers.friends.index, model: 'friend' }),
};
