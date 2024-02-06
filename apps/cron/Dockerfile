FROM docker.io/node:lts-alpine as dependencies

RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

RUN npm install -g pnpm
COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod


FROM docker.io/node:lts-alpine as runner
RUN apk add --no-cache dumb-init

ENV NODE_ENV production
ENV PORT 3000
ENV HOST 0.0.0.0

WORKDIR /usr/src/app

COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY ./dist/apps/cron/main.js ./
COPY ./.env.production ./.env

USER node
EXPOSE 3000

CMD dumb-init node --env-file=.env main.js
