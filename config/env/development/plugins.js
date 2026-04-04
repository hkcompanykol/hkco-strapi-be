module.exports = ({ env }) => ({
  upload: {
    config: {},
  },
  meilisearch: {
    config: {
      host: env('MEILISEARCH_HOST', 'http://127.0.0.1:7700'),
      apiKey: env('MEILISEARCH_API_KEY', ''),
    },
  },
});
