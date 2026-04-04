'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { DEFAULT_POPULATE } = require('../../../../helpers/constants/catalog');

const buildPopulateObject = () =>
  DEFAULT_POPULATE.reduce((acc, field) => {
    acc[field] = true;
    return acc;
  }, {});

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const product = await strapi.entityService.findMany('api::product.product', {
      publicationState: 'live',
      filters: { slug, isActive: true },
      populate: buildPopulateObject(),
      limit: 1,
    });

    if (!product || product.length === 0) {
      return ctx.notFound('Product not found');
    }

    const sanitized = await this.sanitizeOutput(product[0], ctx);
    return this.transformResponse(sanitized);
  },
}));
