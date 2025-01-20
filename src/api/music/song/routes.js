const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'GET',
    path: '/songs',
    handler: (request, h) => handler.getSongsHandler(request, h),
    options: {
      tags: ['api', 'songs'],
      description: 'Get all songs',
      notes: 'Returns all songs',
    },
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: (request, h) => handler.getSongByIdHandler(request, h),
    options: {
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
      tags: ['api', 'songs'],
      description: 'Get song by id',
      notes: 'Returns a song by id',
    },
  },
  {
    method: 'POST',
    path: '/songs',
    handler: (request, h) => handler.postSongHandler(request, h),
    options: {
      validate: {
        payload: handler._schema,
      },
      tags: ['api', 'songs'],
      description: 'Add new song',
      notes: 'Add new song to database\nThe albumId must be valid',
    },
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: (request, h) => handler.putSongByIdHandler(request, h),
    options: {
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
        payload: handler._schema,
      },
      tags: ['api', 'songs'],
      description: 'Update song by id',
      notes: 'The albumId must be valid',
    },
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: (request, h) => handler.deleteSongByIdHandler(request, h),
    options: {
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
      tags: ['api', 'songs'],
      description: 'Delete song by id',
      notes: 'Delete song by id',
    },
  },
];

module.exports = routes;
