'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/products/:slug',
      handler: 'product.findBySlug',
      config: {
        auth: false,
      },
    },
  ],
};
