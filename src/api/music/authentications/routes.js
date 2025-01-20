const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: (req, h) => handler.postAuthenticationHandler(req, h),
    options: {
      description: 'Menambahkan authentication',
      notes: 'Menambahkan authentication baru',
      tags: ['api', 'authentications'],
      validate: {
        payload: handler._schema.PostAuthenticationPayloadSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: (req, h) => handler.deleteAuthenticationHandler(req, h),
    options: {
      description: 'Menghapus authentication',
      notes: 'Menghapus authentication',
      tags: ['api', 'authentications'],
      validate: {
        payload: handler._schema.DeleteAuthenticationPayloadSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: (req, h) => handler.putAuthenticationHandler(req, h),
    options: {
      description: 'Memperbarui authentication',
      notes: 'Memperbarui authentication',
      tags: ['api', 'authentications'],
      validate: {
        payload: handler._schema.PutAuthenticationPayloadSchema,
      },
    },
  },
];

module.exports = routes;
