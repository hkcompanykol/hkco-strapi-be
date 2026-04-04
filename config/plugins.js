const meiliSyncService = require('../services/external/meilisearch-sync');

module.exports = ({ env }) => ({
  upload: {
    config: env('UPLOAD_PROVIDER', 'local') === 'cloudinary'
      ? {
          provider: 'cloudinary',
          providerOptions: {
            cloud_name: env('CLOUDINARY_NAME'),
            api_key: env('CLOUDINARY_KEY'),
            api_secret: env('CLOUDINARY_SECRET'),
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        }
      : {},
  },
  meilisearch: {
    config: {
      host: env('MEILISEARCH_HOST', 'http://127.0.0.1:7700'),
      apiKey: env('MEILISEARCH_API_KEY', ''),
      product: {
        indexName: env('MEILISEARCH_PRODUCTS_INDEX', 'products'),
        entriesQuery: {
          locale: '*',
          publicationState: 'live',
          populate: {
            category: {
              fields: ['name', 'slug'],
            },
            brand: {
              fields: ['name', 'slug'],
            },
            attributes: true,
          },
        },
        settings: meiliSyncService.getProductIndexSettings(),
      },
    },
  },
});
