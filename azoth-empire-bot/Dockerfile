FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --production

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]
