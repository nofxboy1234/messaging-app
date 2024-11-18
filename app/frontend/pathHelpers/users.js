import apiHelpers from '../api';
import helper from './helper';

export default {
  index: () => {
    const apiHelper = apiHelpers.users.index;
    const pathHelper = helper({ apiHelper });
    pathHelper();
    return pathHelper;
  },
  create: (data = { body: 'hello', chat_id: 1 }) => {
    const apiHelper = apiHelpers.users.create;
    const pathHelper = helper({ apiHelper, data: { user: { ...data } } });
    pathHelper();
    return pathHelper;
  },
  new: () => {
    const apiHelper = apiHelpers.users.new;
    const pathHelper = helper({ apiHelper });
    pathHelper();
    return pathHelper;
  },
  edit: ({ id }) => {
    const apiHelper = apiHelpers.users.edit;
    const pathHelper = helper({ apiHelper, id: id });
    pathHelper();
    return pathHelper;
  },
  show: ({ id }) => {
    const apiHelper = apiHelpers.users.show;
    const pathHelper = helper({ apiHelper, id: id });
    pathHelper();
    return pathHelper;
  },
  update: ({ id }, data = { body: 'hello', chat_id: 1 }) => {
    const apiHelper = apiHelpers.users.update;
    const pathHelper = helper({
      apiHelper,
      id: id,
      data: { user: { ...data } },
    });
    pathHelper();
    return pathHelper;
  },
  destroy: ({ id }) => {
    const apiHelper = apiHelpers.users.update;
    const pathHelper = helper({ apiHelper, id: id });
    pathHelper();
    return pathHelper;
  },
};
