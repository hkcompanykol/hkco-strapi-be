'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/products/slug/:slug',
      handler: 'product.findBySlug',
      config: {
        auth: false,
      },
    },
  ],
};
