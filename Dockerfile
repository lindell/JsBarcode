FROM node:8

RUN apt-get update && apt-get install -qq libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

RUN mkdir -p /frontend
WORKDIR /frontend
COPY ./ ./

RUN npm install

CMD npm test

EXPOSE 3000
