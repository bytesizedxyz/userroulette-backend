FROM node:latest

COPY . /myapp
WORKDIR /myapp

RUN npm install

ENV DATABASE_URL
ENV REDIS_PASSWORD

CMD npm start
