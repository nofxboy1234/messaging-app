import apiHelpers from '../api';
import { router } from '@inertiajs/react';

function create(apiHelper, data) {
  const helper = () => {
    router.visit(apiHelper.path(), {
      method: apiHelper.httpMethod,
      data: data,
    });
  };

  helper.path = () => apiHelper.path();
  return helper;
}

export default {
  messages: {
    create: (data = { body: 'hello', chat_id: 1 }) => {
      const apiHelper = apiHelpers.messages.create;
      const helper = create(apiHelper, { message: { ...data } });
      helper();
      return helper;
    },
  },
  friends: {
    create: (data = { body: 'hello', chat_id: 1 }) => {
      const apiHelper = apiHelpers.friends.create;
      const helper = create(apiHelper, { friend: { ...data } });
      helper();
      return helper;
    },
  },
};
