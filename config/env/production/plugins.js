module.exports = ({ env }) => ({
  upload: {
    config: env('UPLOAD_PROVIDER', 'cloudinary') === 'cloudinary'
      ? {
          provider: 'cloudinary',
          providerOptions: {
            cloud_name: env('CLOUDINARY_NAME'),
            api_key: env('CLOUDINARY_KEY'),
            api_secret: env('CLOUDINARY_SECRET'),
          },
        }
      : {},
  },
});
