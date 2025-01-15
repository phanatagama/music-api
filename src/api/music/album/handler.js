class AlbumsHandler {
  constructor(service, validator, schema) {
    this._service = service;
    this._validator = validator;
    this._schema = schema;
  }

  async postAlbumHandler(req, h) {
    this._validator.validatePayloadWithSchema(req.payload, this._schema);
    const { name = 'untitled album', year } = req.payload;

    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });

    response.code(201);
    return response;
  }

  async getAlbumsHandler() {
    const albums = await this._service.getAlbums();

    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }

  async getAlbumByIdHandler(req, h) {
    const { id } = req.params;

    const album = await this._service.getAlbumById(id);

    const response = h.response({
      status: 'success',
      data: {
        album,
      },
    });

    return response;
  }

  async putAlbumByIdHandler(req, h) {
    const { id } = req.params;

    this._validator.validatePayloadWithSchema(req.payload, this._schema);

    await this._service.editAlbumById(id, req.payload);

    return h.response({
      status: 'success',
      message: 'Album berhasil diperbarui',
    });
  }

  async deleteAlbumByIdHandler(req, h) {
    const { id } = req.params;

    await this._service.deleteAlbumById(id);

    return h.response({
      status: 'success',
      message: 'Album berhasil dihapus',
    });
  }
}

module.exports = AlbumsHandler;
