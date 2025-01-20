const routes = (handler) => [
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: (req, h) => handler.deleteCollaborationHandler(req, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'collaborations'],
      description: 'Hapus kolaborasi',
      notes: 'Hapus kolaborasi',
      validate: {
        payload: handler._schema,
      },
    },
  },
  {
    method: 'POST',
    path: '/collaborations',
    handler: (req, h) => handler.postCollaborationHandler(req, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'collaborations'],
      description: 'Menambahkan kolaborasi',
      notes: 'Menambahkan kolaborasi',
      validate: {
        payload: handler._schema,
      },
    },
  },
];

module.exports = routes;
