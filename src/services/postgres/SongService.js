const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapSongDBToModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ albumId, title, year, performer, genre, duration }) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, albumId, title, year, performer, genre, duration],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Song gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongs({ title, performer }) {
    let query;

    if (title && performer) {
      query = {
        text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1 AND performer ILIKE $2',
        values: [`%${title}%`, `%${performer}%`],
      };
    } else if (title) {
      query = {
        text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1',
        values: [`%${title}%`],
      };
    } else if (performer) {
      query = {
        text: 'SELECT id, title, performer FROM songs WHERE performer ILIKE $1',
        values: [`%${performer}%`],
      };
    } else {
      query = 'SELECT id, title, performer FROM songs';
    }

    const result = await this._pool.query(query);
    const songs = result.rows.map(mapSongDBToModel);
    return songs;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song tidak ditemukan');
    }

    return result.rows[0];
  }

  async getSongsInAlbum(albumId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
        INNER JOIN albums ON songs.album_id = albums.id
        WHERE albums.id = $1`,
      values: [albumId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async editSongById(id, { title, year, genre, performer, duration, albumId }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, performer, genre, duration, albumId, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui song. Id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = SongService;
