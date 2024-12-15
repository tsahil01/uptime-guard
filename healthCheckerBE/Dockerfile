FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install typescript -g
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
