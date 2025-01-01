import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({
    apiHelper: apiHelpers.sendMessageBroadcast.create,
    model: 'send_message_broadcast',
  }),
};
