import apiHelpers from '../api';
import helper from './helper';

export default {
  index: helper({
    apiHelper: apiHelpers.friendRequests.index,
    model: 'friend_request',
  }),
  create: helper({
    apiHelper: apiHelpers.friendRequests.create,
    model: 'friend_request',
  }),
  destroy: helper({
    apiHelper: apiHelpers.friendRequests.destroy,
    model: 'friend_request',
  }),
};
