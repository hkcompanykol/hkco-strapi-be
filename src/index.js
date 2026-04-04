'use strict';

const PUBLIC_ACTIONS = [
  'api::product.product.find',
  'api::product.product.findOne',
  'api::product.product.findBySlug',
  'api::category.category.find',
  'api::category.category.findOne',
  'api::brand.brand.find',
  'api::brand.brand.findOne',
];

module.exports = {
  async bootstrap({ strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      await Promise.all(
        PUBLIC_ACTIONS.map(async (action) => {
          const permission = await strapi
            .query('plugin::users-permissions.permission')
            .findOne({
              where: {
                action,
                role: publicRole.id,
              },
            });

          if (!permission) {
            await strapi
              .query('plugin::users-permissions.permission')
              .create({
                data: {
                  action,
                  role: publicRole.id,
                  enabled: true,
                },
              });
          } else if (!permission.enabled) {
            await strapi
              .query('plugin::users-permissions.permission')
              .update({
                where: { id: permission.id },
                data: { enabled: true },
              });
          }
        })
      );
    }
  },
};
