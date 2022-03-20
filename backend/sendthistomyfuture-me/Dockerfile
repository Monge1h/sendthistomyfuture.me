
FROM node:current-alpine

ENV NODE_VERSION 16.13.2

WORKDIR /app
ADD package.json package-lock.json ./
ADD . .

RUN npm install --silent
ENTRYPOINT [ "npm", "run", "docker" ]