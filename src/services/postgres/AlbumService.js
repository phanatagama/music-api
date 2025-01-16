const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO albums VALUES ($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbums() {
    const result = await this._pool.query('SELECT * FROM albums');
    return result.rows;
  }

  async getAlbumById(id) {
    const query = {
      text: `
      SELECT 
        albums.*, 
        songs.id AS song_id, 
        songs.title AS song_title,
        songs.performer AS song_performer
      FROM 
        albums 
        INNER JOIN songs ON albums.id = songs.album_id
      WHERE 
        albums.id = $1
      `,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      const query2 = {
        text: 'SELECT * FROM albums WHERE id = $1',
        values: [id],
      };

      const result2 = await this._pool.query(query2);

      if (!result2.rows.length) {
        throw new NotFoundError('Album tidak ditemukan');
      }

      return result2.rows.map(({ id: _id, name, year }) => ({
        id: _id,
        name,
        year,
        songs: [],
      }))[0];
    }

    const { id: albumId, name, year } = result.rows[0];

    const songs = result.rows.map((row) => ({
      id: row.song_id,
      title: row.song_title,
      performer: row.song_performer,
    }));

    return {
      id: albumId,
      name,
      year,
      songs,
    };
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
