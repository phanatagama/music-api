const Joi = require('joi');
const routes = (handler) => [
  {
    method: 'GET',
    path: '/playlists',
    handler: (req, h) => handler.getPlaylistsHandler(req, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'playlists'],
      description: 'Get all playlists',
      notes: 'Returns all playlists',
    },
  },
  {
    method: 'POST',
    path: '/playlists',
    handler: (req, h) => handler.postPlaylistHandler(req, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'playlists'],
      description: 'Add new playlist',
      notes: 'Add new playlist to database',
      validate: {
        payload: handler._schema.PostPlaylistPayloadSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: (req, h) => handler.deletePlaylistByIdHandler(req, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'playlists'],
      description: 'Delete playlist by id',
      notes: 'Delete playlist by id',
      validate: {
        params: Joi.object({
          id: Joi.string().required().description('id playlist'),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: (req, h) =>
      handler.postSongToPlaylistUsingPlaylistIdHandler(req, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'playlists'],
      description: 'Add song to playlist by id',
      notes: 'Add song to playlist by id',
      validate: {
        params: Joi.object({
          id: Joi.string().required().description('id playlist'),
        }),
        payload: handler._schema.PostSongToPlaylistPayloadSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: (req, h) =>
      handler.getSongsInPlaylistUsingPlaylistIdHandler(req, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'playlists'],
      description: 'Get all songs in playlist by id',
      notes: 'Get all songs in playlist by id',
      validate: {
        params: Joi.object({
          id: Joi.string().required().description('id playlist'),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: (req, h) =>
      handler.deleteSongFromPlaylistUsingPlaylistIdHandler(req, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'playlists'],
      description: 'Delete song from playlist by id',
      notes: 'Delete song from playlist by id',
      validate: {
        params: Joi.object({
          id: Joi.string().required().description('id playlist'),
        }),
        payload: handler._schema.DeleteSongFromPlaylistPayloadSchema,
      },
    },
  },
];

module.exports = routes;
