const Joi = require('joi');

const AlbumSchema = Joi.object({
  year: Joi.number().integer().required(),
  name: Joi.string().trim().required(),
});

module.exports = AlbumSchema;
