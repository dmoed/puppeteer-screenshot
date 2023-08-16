FROM node:16-slim

MAINTAINER DON MOEDJIJO

WORKDIR /app

COPY package*.json .

RUN npm install
RUN npm ci --omit=dev

COPY . .

CMD [ "node", "server.js" ]