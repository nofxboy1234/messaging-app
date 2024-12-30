import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({
    apiHelper: apiHelpers.chatUsersBroadcast.create,
    model: 'chat_users_broadcast',
  }),
};
