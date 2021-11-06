ARG NODE_ENV=production

#Builder stage
FROM node:16 as builder
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app

COPY package*.json ./
COPY secrets secrets
RUN npm i -g npm@latest
RUN apt-get update && \
    apt-get install -qy --no-install-recommends python3 python3-setuptools python3-pip libleptonica-dev tesseract-ocr
RUN npm ci

# Final stage/image
FROM node:16
RUN apt-get update && \
    apt-get install -qy --no-install-recommends python3 python3-setuptools python3-pip libleptonica-dev tesseract-ocr

ENV NODE_ENV=${NODE_ENV}
WORKDIR /app

COPY --from=builder /app/node_modules node_modules

COPY . .
RUN pip3 install -r bin/ae-roster-parser/requirements.txt

EXPOSE 4000

CMD ["npm", "start"]
