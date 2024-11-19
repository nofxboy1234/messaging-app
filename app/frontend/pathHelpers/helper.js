import { router } from '@inertiajs/react';

export default function helper({ apiHelper }) {
  function path(obj) {
    let interpolatedPath = apiHelper.path(obj);

    return interpolatedPath;
  }

  const helper = ({ id }, { data = {} }) => {
    router.visit(path({ id }), {
      method: apiHelper.httpMethod,
      data: data,
    });
  };

  helper.path = path;
  return helper;
}
