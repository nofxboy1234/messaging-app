import apiHelpers from '../api';
import helper from './helper';

export default {
  // new: () => {
  //   const apiHelper = apiHelpers.incomingFriends.new;
  //   const pathHelper = helper({ apiHelper });
  //   pathHelper();
  //   return pathHelper;
  // },
  // create: (data = { body: 'hello', chat_id: 1 }) => {
  //   const apiHelper = apiHelpers.incomingFriends.create;
  //   const pathHelper = helper({
  //     apiHelper,
  //     data: { incomingFriend: { ...data } },
  //   });
  //   pathHelper();
  //   return pathHelper;
  // },
  // edit: ({ id }) => {
  //   const apiHelper = apiHelpers.incomingFriends.edit;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  // update: ({ id }, data = { body: 'hello', chat_id: 1 }) => {
  //   const apiHelper = apiHelpers.incomingFriends.update;
  //   const pathHelper = helper({
  //     apiHelper,
  //     id: id,
  //     data: { incomingFriend: { ...data } },
  //   });
  //   pathHelper();
  //   return pathHelper;
  // },
  // destroy: ({ id }) => {
  //   const apiHelper = apiHelpers.incomingFriends.update;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  // show: ({ id }) => {
  //   const apiHelper = apiHelpers.incomingFriends.show;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  index: () => {
    const apiHelper = apiHelpers.incomingFriends.index;
    const pathHelper = helper({ apiHelper });
    pathHelper();
    return pathHelper;
  },
};
