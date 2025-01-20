const LikeAlbumHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'likeAlbum',
  version: '1.0.1',
  register: async (server, { likeAlbumService, albumService }) => {
    const likeAlbumHandler = new LikeAlbumHandler(
      likeAlbumService,
      albumService
    );

    server.route(routes(likeAlbumHandler));
  },
};
