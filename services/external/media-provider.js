'use strict';

module.exports = {
  resolveProvider(env) {
    return env('UPLOAD_PROVIDER', 'local') === 'cloudinary' ? 'cloudinary' : 'local';
  },
};
