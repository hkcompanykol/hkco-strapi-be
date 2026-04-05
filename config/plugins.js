module.exports = ({ env }) => ({
  upload: {
    config: {
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
    },
  },
  meilisearch: {
    config: {
      host: env('MEILISEARCH_HOST', 'http://127.0.0.1:7700'),
      apiKey: env('MEILISEARCH_API_KEY', ''),
      product: {
        indexName: env('MEILISEARCH_PRODUCTS_INDEX', 'products'),
        entriesQuery: {
          publicationState: 'live',
        },
        settings: {
          searchableAttributes: ['name', 'description', 'sku'],
          filterableAttributes: ['price', 'isActive', 'currency'],
          sortableAttributes: ['price', 'createdAt', 'updatedAt', 'name'],
        },
      },
    },
  },
});
