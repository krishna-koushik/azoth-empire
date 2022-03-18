ARG NODE_ENV=development

#Builder stage
FROM node:17.7.1-slim as builder
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm i plotly.js-dist-min
RUN npm ci

# Final stage/image
FROM node:17.7.1-slim
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

COPY . .

EXPOSE 3333

CMD ["npm", "start"]
