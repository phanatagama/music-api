const Joi = require('joi');

const ImageHeadersSchema = Joi.object({
  'content-type': Joi.string()
    .valid(
      'image/avif',
      'image/apng',
      'image/gif',
      'image/png',
      'image/webp',
      'image/jpeg'
    )
    .required(),
}).unknown();

module.exports = ImageHeadersSchema;
