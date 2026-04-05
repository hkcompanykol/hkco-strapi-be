'use strict';

const PUBLIC_ACTIONS = [
  'api::product.product.find',
  'api::product.product.findOne',
  'api::product.product.findBySlug',
  'api::product.product.create',
  'api::product.product.update',
  'api::product.product.delete',
  'api::user.user.find',
  'api::user.user.findOne',
  'api::user.user.create',
  'api::user.user.update',
  'api::user.user.delete',
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
