// export routes
const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: (req, h) => handler.postExportPlaylistHandler(req, h),
    options: {
      auth: 'musicapp_jwt',
      tags: ['api', 'playlist'],
      description: 'Export playlist to file',
      notes: 'Export playlist to file and send to your email',
    },
  },
];

module.exports = routes;
