/* eslint-disable no-console */
'use strict';

const { createStrapi } = require('@strapi/strapi');

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Laptops', slug: 'laptops', parent: 'electronics' },
  { name: 'Smartphones', slug: 'smartphones', parent: 'electronics' },
  { name: 'Home Appliances', slug: 'home-appliances' },
  { name: 'Audio', slug: 'audio', parent: 'electronics' },
];

const brands = [
  { name: 'NovaTech', slug: 'novatech' },
  { name: 'Auralink', slug: 'auralink' },
  { name: 'HomeGrid', slug: 'homegrid' },
  { name: 'PeakMobile', slug: 'peakmobile' },
];

const products = Array.from({ length: 12 }).map((_, idx) => ({
  name: `Demo Product ${idx + 1}`,
  slug: `demo-product-${idx + 1}`,
  description: `Rich description for demo product ${idx + 1}.`,
  price: (49.99 + idx * 15).toFixed(2),
  currency: 'USD',
  stock: 25 + idx,
  sku: `SKU-${(idx + 1).toString().padStart(4, '0')}`,
  isActive: true,
  attributes: [
    { key: 'color', value: idx % 2 ? 'black' : 'silver' },
    { key: 'warranty', value: '12 months' },
  ],
  seo: {
    metaTitle: `Demo Product ${idx + 1}`,
    metaDescription: `SEO description for demo product ${idx + 1}`,
  },
}));

async function run() {
  const app = await createStrapi().load();

  try {
    const categoryBySlug = {};

    for (const category of categories) {
      const existing = await app.entityService.findMany('api::category.category', {
        filters: { slug: category.slug },
        limit: 1,
      });

      if (existing.length) {
        categoryBySlug[category.slug] = existing[0];
        continue;
      }

      const parentId = category.parent ? categoryBySlug[category.parent]?.id : null;
      const created = await app.entityService.create('api::category.category', {
        data: {
          name: category.name,
          slug: category.slug,
          parent: parentId,
          seo: {
            metaTitle: category.name,
            metaDescription: `${category.name} category`,
          },
          publishedAt: new Date(),
        },
      });

      categoryBySlug[category.slug] = created;
    }

    const brandBySlug = {};

    for (const brand of brands) {
      const existing = await app.entityService.findMany('api::brand.brand', {
        filters: { slug: brand.slug },
        limit: 1,
      });

      if (existing.length) {
        brandBySlug[brand.slug] = existing[0];
        continue;
      }

      const created = await app.entityService.create('api::brand.brand', {
        data: {
          ...brand,
          publishedAt: new Date(),
        },
      });

      brandBySlug[brand.slug] = created;
    }

    for (const [index, product] of products.entries()) {
      const exists = await app.entityService.findMany('api::product.product', {
        filters: { sku: product.sku },
        limit: 1,
      });

      if (exists.length) continue;

      const category = index % 3 === 0 ? 'laptops' : index % 3 === 1 ? 'smartphones' : 'audio';
      const brand = index % 4 === 0 ? 'novatech' : index % 4 === 1 ? 'peakmobile' : index % 4 === 2 ? 'auralink' : 'homegrid';

      await app.entityService.create('api::product.product', {
        data: {
          ...product,
          category: categoryBySlug[category]?.id,
          brand: brandBySlug[brand]?.id,
          publishedAt: new Date(),
        },
      });
    }

    console.log('Seed complete: categories, brands, and products created/verified.');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  }

  await app.destroy();
}

run();
