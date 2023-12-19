FROM node:18

WORKDIR /usr/src/app


COPY package*.json /usr/src/app
RUN npm ci


COPY . /usr/src/app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

EXPOSE 3000


CMD [ "npm", "start" ]