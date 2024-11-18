import apiHelpers from '../api';
import helper from './helper';

export default {
  // index: () => {
  //   const apiHelper = apiHelpers.profiles.index;
  //   const pathHelper = helper({ apiHelper });
  //   pathHelper();
  //   return pathHelper;
  // },
  // create: (data = { body: 'hello', chat_id: 1 }) => {
  //   const apiHelper = apiHelpers.profiles.create;
  //   const pathHelper = helper({ apiHelper, data: { profile: { ...data } } });
  //   pathHelper();
  //   return pathHelper;
  // },
  // new: () => {
  //   const apiHelper = apiHelpers.profiles.new;
  //   const pathHelper = helper({ apiHelper });
  //   pathHelper();
  //   return pathHelper;
  // },
  edit: ({ id }) => {
    const apiHelper = apiHelpers.profiles.edit;
    const pathHelper = helper({ apiHelper, id: id });
    pathHelper();
    return pathHelper;
  },
  show: ({ id }) => {
    const apiHelper = apiHelpers.profiles.show;
    const pathHelper = helper({ apiHelper, id: id });
    pathHelper();
    return pathHelper;
  },
  update: ({ id }, data = { body: 'hello', chat_id: 1 }) => {
    const apiHelper = apiHelpers.profiles.update;
    const pathHelper = helper({
      apiHelper,
      id: id,
      data: { profile: { ...data } },
    });
    pathHelper();
    return pathHelper;
  },
  // destroy: ({ id }) => {
  //   const apiHelper = apiHelpers.profiles.update;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
};
