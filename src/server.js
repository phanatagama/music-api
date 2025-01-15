require('dotenv').config();

const Hapi = require('@hapi/hapi');

const AlbumService = require('./services/postgres/AlbumService');
const AlbumSchema = require('./validator/music/schema/album');
const SongService = require('./services/postgres/SongService');
const SongSchema = require('./validator/music/schema/song');
const MusicValidator = require('./validator/music');

const album = require('./api/music/album');
const song = require('./api/music/song');
const ClientError = require('./exceptions/ClientError');

const init = async () => {
  const songService = new SongService();
  const albumService = new AlbumService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      // error handler for client error
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      // error handler for server error
      if (!response.isServer) {
        return h.continue;
      }

      // error handler for server error
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    // if response is not an error
    return h.continue;
  });

  // register all plugin
  await server.register([
    {
      plugin: song,
      options: {
        service: songService,
        validator: MusicValidator,
        schema: SongSchema,
      },
    },
    {
      plugin: album,
      options: {
        service: albumService,
        validator: MusicValidator,
        schema: AlbumSchema,
      },
    },
  ]);

  // listening server
  await server.start();
  console.log(`[+] Server listening on ${server.info.uri}`);
};

init();
