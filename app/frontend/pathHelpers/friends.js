import apiHelpers from '../api';
import helper from './helper';

export default {
  // new: () => {
  //   const apiHelper = apiHelpers.friends.new;
  //   const pathHelper = helper({ apiHelper });
  //   pathHelper();
  //   return pathHelper;
  // },
  create: (data = { body: 'hello', chat_id: 1 }) => {
    const apiHelper = apiHelpers.friends.create;
    const pathHelper = helper({
      apiHelper,
      data: { friend: { ...data } },
    });
    pathHelper();
    return pathHelper;
  },
  // edit: ({ id }) => {
  //   const apiHelper = apiHelpers.friends.edit;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  // update: ({ id }, data = { body: 'hello', chat_id: 1 }) => {
  //   const apiHelper = apiHelpers.friends.update;
  //   const pathHelper = helper({
  //     apiHelper,
  //     id: id,
  //     data: { friend: { ...data } },
  //   });
  //   pathHelper();
  //   return pathHelper;
  // },
  // destroy: ({ id }) => {
  //   const apiHelper = apiHelpers.friends.update;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  // show: ({ id }) => {
  //   const apiHelper = apiHelpers.friends.show;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  index: () => {
    const apiHelper = apiHelpers.friends.index;
    const pathHelper = helper({ apiHelper });
    pathHelper();
    return pathHelper;
  },
};
