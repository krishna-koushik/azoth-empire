ARG NODE_ENV=production

#Builder stage
FROM node:16 as builder
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm ci --production

# Final stage/image
FROM node:16
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

COPY . .

CMD ["npm", "start"]
