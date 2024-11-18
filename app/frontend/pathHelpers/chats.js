import apiHelpers from '../api';
import helper from './helper';

export default {
  index: () => {
    const apiHelper = apiHelpers.chats.index;
    const pathHelper = helper({ apiHelper });
    pathHelper();
    return pathHelper;
  },
  create: (data = { body: 'hello', chat_id: 1 }) => {
    const apiHelper = apiHelpers.chats.create;
    const pathHelper = helper({ apiHelper, data: { chat: { ...data } } });
    pathHelper();
    return pathHelper;
  },
  // new: () => {
  //   const apiHelper = apiHelpers.chats.new;
  //   const pathHelper = helper({ apiHelper });
  //   pathHelper();
  //   return pathHelper;
  // },
  // edit: ({ id }) => {
  //   const apiHelper = apiHelpers.chats.edit;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
  show: ({ id }) => {
    const apiHelper = apiHelpers.chats.show;
    const pathHelper = helper({ apiHelper, id: id });
    pathHelper();
    return pathHelper;
  },
  // update: ({ id }, data = { body: 'hello', chat_id: 1 }) => {
  //   const apiHelper = apiHelpers.chats.update;
  //   const pathHelper = helper({
  //     apiHelper,
  //     id: id,
  //     data: { chat: { ...data } },
  //   });
  //   pathHelper();
  //   return pathHelper;
  // },
  // destroy: ({ id }) => {
  //   const apiHelper = apiHelpers.chats.update;
  //   const pathHelper = helper({ apiHelper, id: id });
  //   pathHelper();
  //   return pathHelper;
  // },
};
