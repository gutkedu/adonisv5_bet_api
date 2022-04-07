FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm i && npm i argon2

COPY . .

EXPOSE 3333

CMD ["node", "ace", "serve", "--watch"]
