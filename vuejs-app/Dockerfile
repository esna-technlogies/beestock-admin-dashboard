FROM node:8.10

WORKDIR /app

COPY . /app

EXPOSE 8080

RUN npm install --save express connect-history-api-fallback

RUN npm install && npm run build

CMD node server.js
