const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/likes',
    handler: (request, h) => handler.postAlbumLikeHandler(request, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'albums'],
      description: 'Menambahkan like pada album',
      notes: 'Menambahkan like pada album',
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    handler: (request, h) => handler.getAlbumLikeHandler(request, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'albums'],
      description: 'Menampilkan jumlah like pada album',
      notes: 'Menampilkan jumlah like pada album',
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}/likes',
    handler: (request, h) => handler.deleteAlbumLikeHandler(request, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'albums'],
      description: 'Menghapus like pada album',
      notes: 'Menghapus like pada album',
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  },
];

module.exports = routes;
