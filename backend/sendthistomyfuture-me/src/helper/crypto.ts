import Cryptr from 'cryptr';

const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const cryptr = new Cryptr(secretKey);

function encrypt(text: string): any {
  const encryptedString = cryptr.encrypt(text);
  return {
    content: encryptedString,
  };
}

function decrypt(hash) {
  const decryptedString = cryptr.decrypt(hash);

  return decryptedString;
}

function hashUrl(): string {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }
    return token
}

export { encrypt, decrypt, hashUrl }