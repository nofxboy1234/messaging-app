import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({
    apiHelper: apiHelpers.allUsersBroadcast.create,
    model: 'all_users_broadcast',
  }),
};
