import apiHelpers from '../api';
import helper from './helper';

export default {
  index: helper({
    apiHelper: apiHelpers.incomingFriends.index,
    model: 'incoming_friend',
  }),
  destroy: helper({
    apiHelper: apiHelpers.incomingFriends.destroy,
    model: 'incoming_friend',
  }),
};
