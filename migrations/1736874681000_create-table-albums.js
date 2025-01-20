exports.up = (pgm) => {
  pgm.createTable('albums', {
    id: {
      type: 'varchar(25)',
      primaryKey: true,
    },
    name: {
      type: 'text',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    cover_url: {
      type: 'text',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('albums');
};
