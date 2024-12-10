import apiHelpers from '../api';
import helper from './helper';

export default {
  index: helper({ apiHelper: apiHelpers.chats.index, model: 'chat' }),
  show: helper({ apiHelper: apiHelpers.chats.show, model: 'chat' }),
};
