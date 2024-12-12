import { router } from '@inertiajs/react';

export default function helper({ apiHelper, model }) {
  const path = (obj) => apiHelper.path(obj);

  const helper = ({ obj = undefined, data = {}, options = {} } = {}) => {
    router.visit(path(obj), {
      method: apiHelper.httpMethod,
      data: { [model]: data },
      ...options,
    });
  };

  helper.path = path;
  return helper;
}
