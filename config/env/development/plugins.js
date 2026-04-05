module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
    },
  },
  meilisearch: {
    config: {
      host: env('MEILISEARCH_HOST', 'http://127.0.0.1:7700'),
      apiKey: env('MEILISEARCH_API_KEY', ''),
    },
  },
});
