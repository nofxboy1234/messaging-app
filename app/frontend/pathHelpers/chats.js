import apiHelpers from '../api';
import helper from './helper';

export default {
  create: helper({ apiHelper: apiHelpers.chats.create, model: 'chat' }),
  index: helper({ apiHelper: apiHelpers.chats.index, model: 'chat' }),
  show: helper({ apiHelper: apiHelpers.chats.show, model: 'chat' }),
};
