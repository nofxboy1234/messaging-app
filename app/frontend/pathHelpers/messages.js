import helpers from '../api';
import { router } from '@inertiajs/react';

export default {
  create: (data = { message: { body: 'hello', chat_id: 1 } }) => {
    const helper = helpers.messages.create;

    router.visit(helper.path(), {
      method: helper.httpMethod,
      data: data,
    });
  },
};
