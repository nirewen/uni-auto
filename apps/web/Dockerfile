FROM docker.io/node:20.5.1-alpine

COPY ./dist/apps/web ./dist

RUN npm install -g serve

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "dist"]
