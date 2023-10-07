FROM node:20.5.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --omit=dev
RUN npm install -g serve

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "dist"]