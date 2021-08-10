FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5001

VOLUME [ "/app/node_modules" ]

CMD ["npm" , "start"]