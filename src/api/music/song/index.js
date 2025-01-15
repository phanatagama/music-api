const SongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'song',
  version: '1.0.1',
  register: async (server, { service, validator, schema }) => {
    const songsHandler = new SongsHandler(service, validator, schema);

    server.route(routes(songsHandler));
  },
};
