"use strict";

const PUBLIC_ACTIONS = [
    "api::product.product.find",
    "api::product.product.findOne",
    "api::product.product.findBySlug",
    "api::product.product.create",
    "api::product.product.update",
    "api::product.product.delete",
    "api::category.category.find",
    "api::category.category.findOne",
    "api::category.category.create",
    "api::category.category.update",
    "api::category.category.delete",
    "api::certificate.certificate.find",
    "api::certificate.certificate.findOne",
    "api::certificate.certificate.create",
    "api::certificate.certificate.update",
    "api::certificate.certificate.delete",
    "api::client.client.find",
    "api::client.client.findOne",
    "api::client.client.create",
    "api::client.client.update",
    "api::client.client.delete",
    "api::machine.machine.find",
    "api::machine.machine.findOne",
    "api::machine.machine.create",
    "api::machine.machine.update",
    "api::machine.machine.delete",
    "api::supplier.supplier.find",
    "api::supplier.supplier.findOne",
    "api::supplier.supplier.create",
    "api::supplier.supplier.update",
    "api::supplier.supplier.delete",
];

module.exports = {
    async bootstrap({ strapi }) {
        const publicRole = await strapi
            .query("plugin::users-permissions.role")
            .findOne({ where: { type: "public" } });

        if (publicRole) {
            await Promise.all(
                PUBLIC_ACTIONS.map(async (action) => {
                    const permission = await strapi
                        .query("plugin::users-permissions.permission")
                        .findOne({
                            where: {
                                action,
                                role: publicRole.id,
                            },
                        });

                    if (!permission) {
                        await strapi
                            .query("plugin::users-permissions.permission")
                            .create({
                                data: {
                                    action,
                                    role: publicRole.id,
                                    enabled: true,
                                },
                            });
                    } else if (!permission.enabled) {
                        await strapi
                            .query("plugin::users-permissions.permission")
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
