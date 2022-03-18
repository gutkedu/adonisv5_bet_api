FROM node:alpine

WORKDIR /usr/app_bet_api

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["node", "ace", "serve", "--watch"]
