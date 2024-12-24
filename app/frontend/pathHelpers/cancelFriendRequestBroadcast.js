import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({
    apiHelper: apiHelpers.cancelFriendRequestBroadcast.create,
    model: 'cancel_friend_request_broadcast',
  }),
};
