FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install typescript -g
RUN npm install -f
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]