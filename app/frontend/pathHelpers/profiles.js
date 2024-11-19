import apiHelpers from '../api';
import helper from './helper';

export default {
  edit: helper({ apiHelper: apiHelpers.profiles.edit, model: 'profile' }),
  show: helper({ apiHelper: apiHelpers.profiles.show, model: 'profile' }),
  update: helper({ apiHelper: apiHelpers.profiles.update, model: 'profile' }),
};
