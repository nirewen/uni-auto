ARG IMAGE=node:20.5.1-alpine

FROM ${IMAGE} AS builder
WORKDIR /app
COPY . .
RUN npm i

FROM builder AS dev
CMD [""]

FROM builder AS prod-build
RUN npm run build
RUN npm prune --omit=dev

FROM ${IMAGE} AS prod
COPY --chown=node:node --from=prod-build /app/dist /app/dist
COPY --chown=node:node --from=prod-build /app/node_modules /app/node_modules
COPY --chown=node:node --from=prod-build /app/.env /app/dist/.env.prod

ENV NODE_ENV=production
WORKDIR /app/dist
ENTRYPOINT ["node", "./main.js"]
CMD [""]

USER node
