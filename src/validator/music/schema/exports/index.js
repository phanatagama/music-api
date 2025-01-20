const Joi = require('joi');

// Define schema for export songs from playlist
const ExportSongsFromPlaylistSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = ExportSongsFromPlaylistSchema;
