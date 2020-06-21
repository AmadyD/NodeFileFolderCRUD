FROM node:10
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8081
CMD [ "node", "server.js" ]