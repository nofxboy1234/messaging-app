import apiHelpers from '../../api';
import helper from '../helper';

export default {
  cancel: helper({
    apiHelper: apiHelpers.usersRegistrations.cancel,
    model: 'user',
  }),
  new: helper({
    apiHelper: apiHelpers.usersRegistrations.new,
    model: 'user',
  }),
  edit: helper({
    apiHelper: apiHelpers.usersRegistrations.edit,
    model: 'user',
  }),
  update: helper({
    apiHelper: apiHelpers.usersRegistrations.update,
    model: 'user',
  }),
  destroy: helper({
    apiHelper: apiHelpers.usersRegistrations.destroy,
    model: 'user',
  }),
  create: helper({
    apiHelper: apiHelpers.usersRegistrations.create,
    model: 'user',
  }),
};
