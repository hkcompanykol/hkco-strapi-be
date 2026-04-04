'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::product.product');

const defaultRoutes = defaultRouter.routes;

const customRoutes = [
  {
    method: 'GET',
    path: '/products/:slug',
    handler: 'product.findBySlug',
    config: {
      auth: false,
    },
  },
];

module.exports = {
  routes: [
    ...customRoutes,
    ...defaultRoutes,
  ],
};
