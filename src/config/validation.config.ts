import * as joi from 'joi';

export const schemaValidation = joi.object({
  PORT: joi.number().default(3000).required(),
  NODE_DEV: joi.string().default('dev').required(),
  CORS_ORIGIN: joi.string().required(),
  DB_HOST: joi.string().default('localhost').required(),
  DB_USER: joi.string().default('development').required(),
  DB_PASSWORD: joi.string().default('local123xdt').required(),
  DB_NAME: joi.string().default('link-manager').required(),
  DB_PORT: joi.number().default(5432).required(),
  DB_AUTOLOAD: joi.boolean().default(true).required(),
  DB_SYNCRO: joi.boolean().default(true).required(),
  HASH_SALT: joi.number().default(10).required(),
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRES: joi.string().default('2d').required(),
  UNSPLASH_KEY: joi.string().required(),
  SWAGGER_TITLE: joi.string().required(),
  SWAGGER_DESCRIPTION: joi.string().required(),
  SWAGGER_VERSION: joi.string().required().default('1.0'),
});
