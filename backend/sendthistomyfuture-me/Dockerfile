FROM node:current-alpine

ENV NODE_VERSION 16.13.2

WORKDIR /app
ADD package.json ./
ADD . .

RUN npm install glob rimraf

RUN npm install --silent
RUN npm run build

ENTRYPOINT [ "npm", "run", "start:prod" ]