FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/recipe-engine-service
WORKDIR /usr/src/recipe-engine-service

# Install app dependencies
COPY package.json /usr/src/recipe-engine-service
RUN npm install

# Bundle app source
COPY . /usr/src/recipe-engine-service

EXPOSE 8088
CMD [ "npm", "start" ]