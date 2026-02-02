FROM node:22-alpine3.18 as build

USER node

ARG ENVIRONMENT
ENV ENVIRONMENT prod

RUN mkdir /home/node/code/
WORKDIR /home/node/code/

COPY --chown=node:node package.json ./
RUN yarn install

COPY --chown=node:node . .
RUN yarn build

#Final image
FROM node:22-alpine3.18

ARG ENVIRONMENT
ENV NODE_ENV prod

RUN apk add --no-cache tzdata
ENV TZ=Etc/GMT+3

WORKDIR /app

COPY --from=build /home/node/code/node_modules ./node_modules
COPY --from=build /home/node/code/dist ./dist
COPY --from=build /home/node/code/dist_server ./dist_server
COPY --from=build /home/node/code/package.json ./package.json

CMD ["node", "--loader", "ts-node/esm", "./dist_server/index.js"]