import apiHelpers from '../../api';
import helper from '../helper';

export default {
  new: helper({
    apiHelper: apiHelpers.usersSessions.new,
    model: 'user',
  }),
  create: helper({
    apiHelper: apiHelpers.usersSessions.create,
    model: 'user',
  }),
  destroy: helper({
    apiHelper: apiHelpers.usersSessions.destroy,
    model: 'user',
  }),
};
