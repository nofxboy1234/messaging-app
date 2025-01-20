import apiHelpers from '../api';
import helper from './helper';

export default {
  index: helper({ apiHelper: apiHelpers.users.index, model: 'user' }),
};
