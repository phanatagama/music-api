const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (
    server,
    {
      playlistsService,
      songService,
      playlistActivitiesService,
      validator,
      schema,
    }
  ) => {
    const playlistsHandler = new PlaylistsHandler({
      playlistsService,
      songService,
      playlistActivitiesService,
      validator,
      schema,
    });

    server.route(routes(playlistsHandler));
  },
};
