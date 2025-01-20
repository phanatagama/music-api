require('dotenv').config();

const path = require('node:path');
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');

const AlbumService = require('./services/postgres/AlbumService');
const AlbumSchema = require('./validator/music/schema/album');
const SongService = require('./services/postgres/SongService');
const SongSchema = require('./validator/music/schema/song');
const MusicValidator = require('./validator/music');

const album = require('./api/music/album');
const song = require('./api/music/song');
const ClientError = require('./exceptions/ClientError');

// users
const users = require('./api/music/users');
const UsersService = require('./services/postgres/UsersService');
const UsersPayloadSchema = require('./validator/music/schema/users');

// authentications
const authentications = require('./api/music/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require('./validator/music/schema/authentications');
const TokenManager = require('./tokenize/TokenManager');

// playlists
const playlists = require('./api/music/playlists');
const PlaylistsService = require('./services/postgres/PlaylistsService');
const {
  PostPlaylistPayloadSchema,
  PostSongToPlaylistPayloadSchema,
  DeleteSongFromPlaylistPayloadSchema,
} = require('./validator/music/schema/playlists');

// collaborations
const collaborations = require('./api/music/collaborations');
const CollaborationsService = require('./services/postgres/CollaborationsService');
const CollaborationsPayloadSchema = require('./validator/music/schema/collaborations');

// playlistActivites
const playlistActivities = require('./api/music/playlistActivities');
const PlaylistActivitiesService = require('./services/postgres/PlaylistActivitiesService');

// exports
const _exports = require('./api/music/exports');
const producerService = require('./services/rabbitmq/ProducerService');
const ExportSongsFromPlaylistSchema = require('./validator/music/schema/exports');

// uploads
const uploads = require('./api/music/uploads');
const StorageService = require('./services/storage/StorageService');
const ImageHeadersSchema = require('./validator/music/schema/uploads');

// likeAlbum
const likeAlbum = require('./api/music/likeAlbum');
const LikeAlbumService = require('./services/postgres/LikeAlbumService');
const CacheService = require('./services/redis/CacheService');

const init = async () => {
  const songService = new SongService();
  const albumService = new AlbumService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const collaborationsService = new CollaborationsService();
  const playlistsService = new PlaylistsService(collaborationsService);
  const playlistActivitiesService = new PlaylistActivitiesService();
  const storageService = new StorageService(
    path.resolve(__dirname, './api/music/uploads/assets/images')
  );
  const cacheService = new CacheService();
  const likeAlbumService = new LikeAlbumService(cacheService);

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

      console.log(response);

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
  // register jwt schema for authentication
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  // define strategy for authentication
  server.auth.strategy('musicapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
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
        albumService,
        songService,
        validator: MusicValidator,
        schema: AlbumSchema,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: MusicValidator,
        schema: UsersPayloadSchema,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        validator: MusicValidator,
        schema: {
          PostAuthenticationPayloadSchema,
          PutAuthenticationPayloadSchema,
          DeleteAuthenticationPayloadSchema,
        },
        usersService,
        tokenManager: TokenManager,
      },
    },
    {
      plugin: playlists,
      options: {
        playlistsService,
        songService,
        playlistActivitiesService,
        validator: MusicValidator,
        schema: {
          PostPlaylistPayloadSchema,
          PostSongToPlaylistPayloadSchema,
          DeleteSongFromPlaylistPayloadSchema,
        },
      },
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistsService,
        usersService,
        validator: MusicValidator,
        schema: CollaborationsPayloadSchema,
      },
    },
    {
      plugin: playlistActivities,
      options: {
        playlistActivitiesService,
        playlistsService,
      },
    },
    {
      plugin: _exports,
      options: {
        producerService,
        playlistsService,
        validator: MusicValidator,
        schema: ExportSongsFromPlaylistSchema,
      },
    },
    {
      plugin: uploads,
      options: {
        storageService,
        albumService,
        validator: MusicValidator,
        schema: ImageHeadersSchema,
      },
    },
    {
      plugin: likeAlbum,
      options: {
        likeAlbumService,
        albumService,
      },
    },
  ]);

  // listening server
  await server.start();
  console.log(`[+] Server listening on ${server.info.uri}`);
};

init();
