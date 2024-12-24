import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({
    apiHelper: apiHelpers.rejectFriendRequestBroadcast.create,
    model: 'reject_friend_request_broadcast',
  }),
};
