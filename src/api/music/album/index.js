const routes = require('./routes');
const AlbumsHandler = require('./handler');

module.exports = {
  name: 'album',
  version: '1.0.1',
  register: async (
    server,
    { albumService, songService, validator, schema }
  ) => {
    const albumHandler = new AlbumsHandler({
      albumService,
      songService,
      validator,
      schema,
    });

    server.route(routes(albumHandler));
  },
};
