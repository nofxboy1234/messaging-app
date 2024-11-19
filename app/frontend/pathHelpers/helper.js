import { router } from '@inertiajs/react';

export default function helper({ apiHelper, model }) {
  const path = (obj) => apiHelper.path(obj);

  const helper = ({ obj, data = {} }) => {
    router.visit(path(obj), {
      method: apiHelper.httpMethod,
      data: { [model]: data },
    });
  };

  helper.path = path;
  return helper;
}
