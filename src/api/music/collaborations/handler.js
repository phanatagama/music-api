class CollaborationsHandler {
  constructor({
    collaborationsService,
    playlistsService,
    usersService,
    validator,
    schema,
  }) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._usersService = usersService;
    this._validator = validator;
    this._schema = schema;
  }

  async deleteCollaborationHandler(req) {
    await this._validator.validatePayloadWithSchema(req.payload, this._schema);

    const { playlistId, userId } = req.payload;
    const { id: credentialId } = req.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._collaborationsService.deleteCollaboration(playlistId, userId);

    return {
      status: 'success',
      message: 'Kolaborator berhasil dihapus',
    };
  }

  async postCollaborationHandler(req, h) {
    await this._validator.validatePayloadWithSchema(req.payload, this._schema);

    const { playlistId, userId } = req.payload;
    const { id: credentialId } = req.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._usersService.getUserById(userId);
    const collaborationId = await this._collaborationsService.addCollaboration(
      playlistId,
      userId
    );

    const response = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: {
        collaborationId,
      },
    });

    response.code(201);
    return response;
  }
}

module.exports = CollaborationsHandler;
