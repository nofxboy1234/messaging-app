import apiHelpers from '../api';
import helper from './helper';

export default {
  index: helper({
    apiHelper: apiHelpers.outgoingFriends.index,
    model: 'outgoing_friend',
  }),
  create: helper({
    apiHelper: apiHelpers.outgoingFriends.create,
    model: 'outgoing_friend',
  }),
};
