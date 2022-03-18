ARG NODE_ENV=production

#Builder stage
FROM node:17.7.1-slim as builder
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Final stage/image
FROM node:17.7.1-slim
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app

COPY --from=builder /app/node_modules node_modules

COPY . .

CMD ["npm", "start"]
