exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'varchar(25)',
      primaryKey: true,
    },
    album_id: {
      type: 'varchar(25)',
    },
    title: {
      type: 'text',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    performer: {
      type: 'text',
      notNull: true,
    },
    genre: {
      type: 'text',
      notNull: true,
    },
    duration: {
      type: 'integer',
    },
  });

  pgm.addConstraint('songs', 'fk_songs_album_id_albums_id', {
    foreignKeys: {
      columns: 'album_id',
      references: 'albums(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint('songs', 'fk_songs_album_id_albums_id');
  pgm.dropTable('songs');
};
