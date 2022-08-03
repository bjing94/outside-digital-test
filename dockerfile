FROM node:16-alpine

WORKDIR /user/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . .

RUN npm run build
# RUN npm run typeorm migration:run
# CMD ["node","./dist/main.js"]