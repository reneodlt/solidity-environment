# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app
# Install Truffle globally
RUN npm install -g truffle

# Install Ganache CLI globally
RUN npm install -g ganache-cli

# Install Solc (Solidity Compiler) globally
RUN npm install -g solc

RUN npm install --save-dev -g jest

RUN yarn add --dev jest-junit

#RUN npm install truffle-plugin-junit-reporter --save-dev

# Add `node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install application dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY --chown=node:node . .

RUN chown node:node ./build

# Expose port 8545 for Ganache CLI
EXPOSE 8545

# At the end, set the user to use when running this image
# USER node

#CMD ganache-cli & sleep 5 && npm test
# This version is currently working
CMD ganache-cli > /dev/null & sleep 5 && truffle compile && truffle migrate && npm test
#CMD ganache-cli > /dev/null & sleep 5 && truffle compile && truffle migrate && sleep 1200
#CMD sleep 1200