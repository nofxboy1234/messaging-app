import { createInertiaApp } from '@inertiajs/react';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import Layout from '../pages/Layout';

createInertiaApp({
  // Set default page title
  // see https://inertia-rails.netlify.app/guide/title-and-meta
  //
  // title: title => title ? `${title} - App` : 'App',

  // Disable progress bar
  //
  // see https://inertia-rails.netlify.app/guide/progress-indicators
  // progress: false,

  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.jsx', { eager: true });
    // return pages[`../pages/${name}.jsx`];

    // To use a default layout, import the Layout component
    // and use the following lines.
    // see https://inertia-rails.netlify.app/guide/pages#default-layouts
    //
    const page = pages[`../pages/${name}.jsx`];
    page.default.layout ||=
      name.startsWith('sessions/') || name.startsWith('registrations/')
        ? undefined
        : (page) => createElement(Layout, null, page);
    return page;
  },

  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(createElement(App, props));
  },
});
