import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return { 
    database: {
      mongo_uri: process.env.MONGO_URI,
    },
    secret_key: process.env.SECRET_KEY,
    email_service: process.env.EMAIL_SERVICE,
    email_user: process.env.EMAIL_USER,
    email_password: process.env.EMAIL_PASSWORD,
    client_url: process.env.CLIENT_URL,
  };
});