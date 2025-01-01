import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({
    apiHelper: apiHelpers.perUserAllUsersBroadcast.create,
    model: 'per_user_all_users_broadcast',
  }),
};
