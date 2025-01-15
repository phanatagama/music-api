const Joi = require('joi');

const SongSchema = Joi.object({
  albumId: Joi.string(),
  title: Joi.string().required(),
  performer: Joi.string().required(),
  year: Joi.number().integer().required(),
  genre: Joi.string().required(),
  duration: Joi.number().integer(),
});

module.exports = SongSchema;
