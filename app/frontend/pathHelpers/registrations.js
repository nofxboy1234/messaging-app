import apiHelpers from '../api';
import helper from './helper';

export default {
  new: helper({
    apiHelper: apiHelpers.registrations.new,
    model: 'registration',
  }),
};
