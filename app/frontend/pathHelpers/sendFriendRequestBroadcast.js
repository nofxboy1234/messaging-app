import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({
    apiHelper: apiHelpers.sendFriendRequestBroadcast.create,
    model: 'send_friend_request_broadcast',
  }),
};
