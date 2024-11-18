import apiHelpers from '../api';
import helper from './helper';

export default {
  index: () => {
    const apiHelper = apiHelpers.memberLists.index;
    const pathHelper = helper({ apiHelper });
    pathHelper();
    return pathHelper;
  },
  create: (data = { body: 'hello', chat_id: 1 }) => {
    const apiHelper = apiHelpers.memberLists.create;
    const pathHelper = helper({
      apiHelper,
      data: { memberLists: { ...data } },
    });
    pathHelper();
    return pathHelper;
  },
  // new: () => {
  //   const apiHelper = apiHelpers.memberLists.new;
  //   const pathHelper = helper({ apiHelper });
  //   pathHelper();
  //   return pathHelper;
  // },
  // edit: ({ id }) => {
  //   const apiHelper = apiHelpers.memberLists.edit;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  // show: ({ id }) => {
  //   const apiHelper = apiHelpers.memberLists.show;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  // update: ({ id }, data = { body: 'hello', chat_id: 1 }) => {
  //   const apiHelper = apiHelpers.memberLists.update;
  //   const pathHelper = helper({
  //     apiHelper,
  //     id: id,
  //     data: { memberLists: { ...data } },
  //   });
  //   pathHelper();
  //   return pathHelper;
  // },
  // destroy: ({ id }) => {
  //   const apiHelper = apiHelpers.memberLists.update;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
};
