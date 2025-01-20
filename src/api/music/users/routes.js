// routes
const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: (req, h) => handler.postUserHandler(req, h),
    options: {
      tags: ['api', 'users'],
      description: 'Menambahkan user',
      notes: 'Menambahkan user baru',
      validate: {
        payload: handler._schema,
      },
    },
  },
];

module.exports = routes;
