import apiHelpers from '../api';
import helper from './helper';

export default {
  // index: helper({
  //   apiHelper: apiHelpers.sessions.index,
  //   model: 'session',
  // }),
  // show: helper({
  //   apiHelper: apiHelpers.sessions.show,
  //   model: 'session',
  // }),
  destroy: helper({
    apiHelper: apiHelpers.sessions.destroy,
    model: 'session',
  }),
  create: helper({
    apiHelper: apiHelpers.sessions.create,
    model: 'session',
  }),
  new: helper({
    apiHelper: apiHelpers.sessions.new,
    model: 'session',
  }),
};
