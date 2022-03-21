import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return { 
    database: {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    secret_key: process.env.SECRET_KEY,
    email_service: process.env.EMAIL_SERVICE,
    email_user: process.env.EMAIL_USER,
    email_password: process.env.EMAIL_PASSWORD,
    client_url: process.env.CLIENT_URL,
  };
});