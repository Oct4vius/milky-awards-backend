FROM node:20-alpine

WORKDIR /milkyawards


COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
