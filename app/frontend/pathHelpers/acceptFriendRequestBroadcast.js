import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({
    apiHelper: apiHelpers.acceptFriendRequestBroadcast.create,
    model: 'accept_friend_request_broadcast',
  }),
};
