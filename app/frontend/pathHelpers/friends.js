import apiHelpers from '../api';
import helper from './helper';

export default {
  new: helper({ apiHelper: apiHelpers.friends.new, model: 'friend' }),
  create: helper({ apiHelper: apiHelpers.friends.create, model: 'friend' }),
  edit: helper({ apiHelper: apiHelpers.friends.edit, model: 'friend' }),
  update: helper({ apiHelper: apiHelpers.friends.update, model: 'friend' }),
  destroy: helper({ apiHelper: apiHelpers.friends.destroy, model: 'friend' }),
  show: helper({ apiHelper: apiHelpers.friends.show, model: 'friend' }),
  index: helper({ apiHelper: apiHelpers.friends.index }),
};
