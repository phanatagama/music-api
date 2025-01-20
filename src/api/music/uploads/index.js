const UploadAlbumCoverHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'uploads',
  version: '1.0.0',
  register: async (
    server,
    { storageService, albumService, validator, schema }
  ) => {
    const uploadAlbumCoverHandle = new UploadAlbumCoverHandler({
      storageService,
      albumService,
      validator,
      schema,
    });

    server.route(routes(uploadAlbumCoverHandle));
  },
};
