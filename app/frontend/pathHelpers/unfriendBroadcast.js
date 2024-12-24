import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({
    apiHelper: apiHelpers.unfriendBroadcast.create,
    model: 'unfriend_broadcast',
  }),
};
