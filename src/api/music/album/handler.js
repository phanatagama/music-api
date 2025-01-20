class AlbumsHandler {
  constructor({ albumService, songService, validator, schema }) {
    this._albumService = albumService;
    this._songService = songService;
    this._validator = validator;
    this._schema = schema;
  }

  async postAlbumHandler(req, h) {
    this._validator.validatePayloadWithSchema(req.payload, this._schema);
    const { name = 'untitled album', year } = req.payload;

    const albumId = await this._albumService.addAlbum({ name, year });

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
    const albums = await this._albumService.getAlbums();

    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }

  async getAlbumByIdHandler(req, h) {
    const { id } = req.params;

    const songs = await this._songService.getSongsInAlbum(id);
    const album = await this._albumService.getAlbumById(id);

    const response = h.response({
      status: 'success',
      data: {
        album: {
          ...album,
          songs,
        },
      },
    });

    return response;
  }

  async putAlbumByIdHandler(req, h) {
    const { id } = req.params;

    this._validator.validatePayloadWithSchema(req.payload, this._schema);

    await this._albumService.editAlbumById(id, req.payload);

    return h.response({
      status: 'success',
      message: 'Album berhasil diperbarui',
    });
  }

  async deleteAlbumByIdHandler(req, h) {
    const { id } = req.params;

    await this._albumService.deleteAlbumById(id);

    return h.response({
      status: 'success',
      message: 'Album berhasil dihapus',
    });
  }
}

module.exports = AlbumsHandler;
