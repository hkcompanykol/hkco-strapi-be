'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const product = await strapi.entityService.findMany('api::product.product', {
      publicationState: 'live',
      filters: { slug, isActive: true },
      populate: '*',
      limit: 1,
    });

    if (!product || product.length === 0) {
      return ctx.notFound('Product not found');
    }

    const sanitized = await this.sanitizeOutput(product[0], ctx);
    return this.transformResponse(sanitized);
  },
}));
