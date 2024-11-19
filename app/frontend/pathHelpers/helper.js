import { router } from '@inertiajs/react';

export default function helper({ apiHelper }) {
  const path = ({ id } = {}) => {
    let interpolatedPath;

    if (id) {
      interpolatedPath = apiHelper.path({ id: id });
    } else {
      interpolatedPath = apiHelper.path();
    }

    return interpolatedPath;
  };

  const helper = ({ id }, { data = {} }) => {
    router.visit(path({ id }), {
      method: apiHelper.httpMethod,
      data: data,
    });
  };

  helper.path = path;
  return helper;
}
