import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({
    apiHelper: apiHelpers.profileBroadcast.create,
    model: 'profile_broadcast',
  }),
};
