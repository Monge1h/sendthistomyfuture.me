import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return { 
    database: {
      mongo_uri: process.env.MONGO_URI,
    },
  };
});