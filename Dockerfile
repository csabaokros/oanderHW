#Specify a base image
FROM node:12.18.3-alpine3.11

#Specify a working directory
WORKDIR /usr/app

#Copy the dependencies file
COPY ./package.json ./
COPY ./package-lock.json ./

#Install dependencies
RUN npm install 

#Copy remaining files
COPY ./index.js ./index.js
COPY ./src ./src

#Default command
CMD ["npm","start"]