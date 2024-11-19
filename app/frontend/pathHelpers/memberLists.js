import apiHelpers from '../api';
import helper from './helper';

export default {
  index: helper({
    apiHelper: apiHelpers.memberLists.index,
    model: 'member_list',
  }),
  create: helper({
    apiHelper: apiHelpers.memberLists.create,
    model: 'member_list',
  }),
};
