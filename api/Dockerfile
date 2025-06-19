FROM node:22.13.1-alpine as builder

WORKDIR /app

COPY package*.json package-lock.json ./
COPY .docker ./.docker/

RUN npm ci

COPY . .

RUN npx prisma generate && npm run build
RUN rm -rf node_modules
RUN npm ci --prod


FROM node:22.13.1-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.docker ./.docker

RUN chmod +x .docker/entrypoint.sh

EXPOSE 8080

ENTRYPOINT [ ".docker/entrypoint.sh" ]
