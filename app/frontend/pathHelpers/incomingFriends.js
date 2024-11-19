import apiHelpers from '../api';
import helper from './helper';

export default {
  index: helper({
    apiHelper: apiHelpers.incomingFriends.index,
    model: 'incoming_friend',
  }),
};
