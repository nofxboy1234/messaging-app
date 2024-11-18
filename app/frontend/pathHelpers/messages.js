import helpers from '../api';
import { router } from '@inertiajs/react';

export default {
  create: (data = { message: { body: 'hello', chat_id: 1 } }) => {
    const apiHelper = helpers.messages.create;
    const helper = () => {
      router.visit(apiHelper.path(), {
        method: apiHelper.httpMethod,
        data: data,
      });
    };

    helper.path = () => apiHelper.path();
    helper();
    return helper;
  },
};
