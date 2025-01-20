const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'GET',
    path: '/albums',
    handler: (request, h) => handler.getAlbumsHandler(request, h),
    options: {
      description: 'Get albums',
      notes: 'Returns all albums',
      tags: ['api', 'albums'],
      response: {
        status: {
          200: Joi.object({
            status: Joi.string(),
            data: {
              albums: Joi.array().items(
                Joi.object({
                  id: Joi.string(),
                  name: Joi.string(),
                  year: Joi.number(),
                  cover_url: Joi.string().allow(null),
                })
              ),
            },
          }),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: (request, h) => handler.getAlbumByIdHandler(request, h),
    options: {
      description: 'Get album by id',
      notes: 'Returns an album by id',
      tags: ['api', 'albums'],
      validate: {
        params: Joi.object({
          id: Joi.string().required().description('the album id'),
        }),
      },
      response: {
        status: {
          200: Joi.object({
            status: Joi.string(),
            data: {
              album: Joi.object({
                id: Joi.string(),
                name: Joi.string(),
                year: Joi.number(),
                coverUrl: Joi.string().allow(null),
                songs: Joi.array().items(
                  Joi.object({
                    id: Joi.string(),
                    title: Joi.string(),
                    performer: Joi.string(),
                  })
                ),
              }),
            },
          }),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/albums',
    handler: (request, h) => handler.postAlbumHandler(request, h),
    options: {
      description: 'Post album',
      notes: 'Add new album',
      tags: ['api', 'albums'],
      validate: {
        payload: handler._schema,
      },
      response: {
        status: {
          201: Joi.object({
            status: Joi.string(),
            data: {
              albumId: Joi.string(),
            },
          }),
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: (request, h) => handler.putAlbumByIdHandler(request, h),
    options: {
      description: 'Put album by id',
      notes: 'Update album by id',
      tags: ['api', 'albums'],
      validate: {
        payload: handler._schema,
        params: Joi.object({
          id: Joi.string().required().description('the album id'),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: (request, h) => handler.deleteAlbumByIdHandler(request, h),
    options: {
      description: 'Delete album by id',
      notes: 'Remove album by id',
      tags: ['api', 'albums'],
      validate: {
        params: Joi.object({
          id: Joi.string().required().description('the album id'),
        }),
      },
    },
  },
];

module.exports = routes;
