import apiHelpers from '../api';
import helper from './helper';

export default {
  // new: () => {
  //   const apiHelper = apiHelpers.outgoingFriends.new;
  //   const pathHelper = helper({ apiHelper });
  //   pathHelper();
  //   return pathHelper;
  // },
  create: (data = { body: 'hello', chat_id: 1 }) => {
    const apiHelper = apiHelpers.outgoingFriends.create;
    const pathHelper = helper({
      apiHelper,
      data: { outgoingFriend: { ...data } },
    });
    pathHelper();
    return pathHelper;
  },
  // edit: ({ id }) => {
  //   const apiHelper = apiHelpers.outgoingFriends.edit;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  // update: ({ id }, data = { body: 'hello', chat_id: 1 }) => {
  //   const apiHelper = apiHelpers.outgoingFriends.update;
  //   const pathHelper = helper({
  //     apiHelper,
  //     id: id,
  //     data: { outgoingFriend: { ...data } },
  //   });
  //   pathHelper();
  //   return pathHelper;
  // },
  // destroy: ({ id }) => {
  //   const apiHelper = apiHelpers.outgoingFriends.update;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  // show: ({ id }) => {
  //   const apiHelper = apiHelpers.outgoingFriends.show;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  index: () => {
    const apiHelper = apiHelpers.outgoingFriends.index;
    const pathHelper = helper({ apiHelper });
    pathHelper();
    return pathHelper;
  },
};
