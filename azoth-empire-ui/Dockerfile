ARG NODE_ENV=development

#Builder stage
FROM node:14 as builder
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm ci
RUN npm i plotly.js-dist-min

# Final stage/image
FROM node:14
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

COPY . .

EXPOSE 3333

CMD ["npm", "start"]
