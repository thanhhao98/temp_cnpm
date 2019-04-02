FROM node:11.11.0
MAINTAINER thanhhao<hao.phanthanh98@gmail.com>
WORKDIR /usr/src/project
COPY package.json ./
COPY start.sh ./
RUN npm install
RUN chmod +x ./start.sh
RUN npm install -g nodemon@1.18.10
COPY . .
EXPOSE 8080