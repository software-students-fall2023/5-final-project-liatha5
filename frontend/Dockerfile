FROM node:18

COPY package*.json ./
RUN npm ci

COPY . .

COPY .env .
EXPOSE 3000

RUN npm run build


CMD [ "npm", "start" ]