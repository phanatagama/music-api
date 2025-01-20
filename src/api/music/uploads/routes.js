const path = require('node:path');

const routes = (handler) => [
  {
    method: 'GET',
    path: '/assets/{params*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'assets'),
      },
    },
  },
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: (req, h) => handler.postAlbumCoverHandler(req, h),
    options: {
      payload: {
        output: 'stream',
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 512000,
      },
    },
  },
];

module.exports = routes;
