'use strict';

module.exports = {
  getProductIndexSettings() {
    return {
      searchableAttributes: ['name', 'description', 'attributes.key', 'attributes.value', 'sku'],
      filterableAttributes: ['category.slug', 'brand.slug', 'price', 'isActive', 'currency'],
      sortableAttributes: ['price', 'createdAt', 'updatedAt', 'name'],
    };
  },
};
