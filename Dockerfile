FROM node:14.16.1-alpine3.13
ENV PORT=4006
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE $PORT
CMD ["npm", "run", "start"]
