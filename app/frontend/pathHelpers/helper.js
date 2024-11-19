import { router } from '@inertiajs/react';

export default function helper({ apiHelper }) {
  const path = (obj) => apiHelper.path(obj);

  const helper = ({ id }, { data = {} }) => {
    router.visit(path({ id }), {
      method: apiHelper.httpMethod,
      data: data,
    });
  };

  helper.path = path;
  return helper;
}
