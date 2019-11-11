FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/menu-service
WORKDIR /usr/src/menu-service

# Install app dependencies
COPY package.json /usr/src/menu-service
RUN npm install

# Bundle app source
COPY . /usr/src/menu-service

EXPOSE 8088
CMD [ "npm", "start" ]