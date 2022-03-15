import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return { 
    database: {
      mongo_uri: process.env.MONGO_URI,
    },
    secret_key: process.env.SECRET_KEY,
  };
});