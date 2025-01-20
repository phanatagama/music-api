class LikeAlbumHandler {
  constructor(likeAlbumService, albumService) {
    this._likeAlbumService = likeAlbumService;
    this._albumService = albumService;
  }

  async postAlbumLikeHandler(req, h) {
    const { id: albumId } = req.params;
    const { id: credentialId } = req.auth.credentials;
    await this._albumService.getAlbumById(albumId);
    await this._likeAlbumService.likeAlbum(credentialId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menyukai album',
    });

    response.code(201);
    return response;
  }

  async deleteAlbumLikeHandler(req) {
    const { id: albumId } = req.params;
    const { id: credentialId } = req.auth.credentials;

    await this._likeAlbumService.unlikeAlbum(credentialId, albumId);

    return {
      status: 'success',
      message: 'Berhasil batal menyukai album',
    };
  }

  async getAlbumLikeHandler(req, h) {
    const { id: albumId } = req.params;

    const likesData = await this._likeAlbumService.getAlbumLikeCount(albumId);

    const { fromCache = null, likeCount } = likesData;

    const response = h.response({
      status: 'success',
      data: {
        likes: likeCount,
      },
    });

    if (fromCache) {
      response.header('X-Data-Source', 'cache');
    }

    return response;
  }
}

module.exports = LikeAlbumHandler;
