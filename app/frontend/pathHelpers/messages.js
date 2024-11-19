import apiHelpers from '../api';
import helper from './helper';

export default {
  index: helper({
    apiHelper: apiHelpers.messages.index,
    model: 'message',
  }),
  create: helper({
    apiHelper: apiHelpers.messages.create,
    model: 'message',
  }),
};
