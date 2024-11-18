import { router } from '@inertiajs/react';

export default function helper({ apiHelper, data = {}, id = null }) {
  const path = id ? apiHelper.path({ id: id }) : apiHelper.path();

  const helper = () => {
    router.visit(path, {
      method: apiHelper.httpMethod,
      data: data,
    });
  };

  helper.path = () => path;
  return helper;
}
