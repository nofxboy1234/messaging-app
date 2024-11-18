import apiHelpers from '../api';
import helper from './helper';

export default {
  index: () => {
    const apiHelper = apiHelpers.messages.index;
    const pathHelper = helper({ apiHelper });
    pathHelper();
    return pathHelper;
  },
  create: (data = { body: 'hello', chat_id: 1 }) => {
    const apiHelper = apiHelpers.messages.create;
    const pathHelper = helper({ apiHelper, data: { message: { ...data } } });
    pathHelper();
    return pathHelper;
  },
  new: () => {
    const apiHelper = apiHelpers.messages.new;
    const pathHelper = helper({ apiHelper });
    pathHelper();
    return pathHelper;
  },
  edit: ({ id }) => {
    const apiHelper = apiHelpers.messages.edit;
    const pathHelper = helper({ apiHelper, id: id });
    pathHelper();
    return pathHelper;
  },
  show: ({ id }) => {
    const apiHelper = apiHelpers.messages.show;
    const pathHelper = helper({ apiHelper, id: id });
    pathHelper();
    return pathHelper;
  },
  update: ({ id }, data) => {
    const apiHelper = apiHelpers.messages.update;
    const pathHelper = helper({ apiHelper, id: id, data: data });
    pathHelper();
    return pathHelper;
  },
  destroy: ({ id }) => {
    const apiHelper = apiHelpers.messages.update;
    const pathHelper = helper({ apiHelper, id: id });
    pathHelper();
    return pathHelper;
  },
};
