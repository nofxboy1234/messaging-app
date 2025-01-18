import apiHelpers from '../api';
import helper from './helper';

export default {
  index: helper({
    apiHelper: apiHelpers.friendshipCategories.index,
    model: 'friendshipCategory',
  }),
};
