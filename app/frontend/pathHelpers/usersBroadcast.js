import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({
    apiHelper: apiHelpers.usersBroadcast.create,
    model: 'users_broadcast',
  }),
};
