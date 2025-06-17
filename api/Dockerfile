FROM node:22.13.1-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY .docker ./.docker/

RUN yarn install

COPY . .

RUN npx prisma generate && yarn build


FROM node:22.13.1-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.docker ./.docker
COPY --from=builder /app/prisma ./

RUN yarn global add @nestjs/cli
RUN yarn cache clean && yarn install --prod && chmod +x .docker/entrypoint.sh

COPY --from=builder /app/dist ./dist

EXPOSE 8080

ENTRYPOINT [ ".docker/entrypoint.sh" ]
