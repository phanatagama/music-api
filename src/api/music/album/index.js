const routes = require('./routes');
const AlbumsHandler = require('./handler');

module.exports = {
  name: 'album',
  version: '1.0.1',
  register: async (server, { service, validator, schema }) => {
    const albumHandler = new AlbumsHandler(service, validator, schema);

    server.route(routes(albumHandler));
  },
};
