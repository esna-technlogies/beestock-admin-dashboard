FROM node:8

WORKDIR /app

COPY ../../../vuejs-app/dist /app

EXPOSE 8080

RUN npm install http-server -g

RUN npm install && npm run build

CMD http-server ./dist
